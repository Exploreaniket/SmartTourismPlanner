import os
import requests
from dotenv import load_dotenv

load_dotenv()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")


def get_weather(lat, lon):
    try:

        if not OPENWEATHER_API_KEY:
            print("OpenWeather API Key not found.")
            return None

        url = (
            "https://api.openweathermap.org/data/2.5/weather"
            f"?lat={lat}"
            f"&lon={lon}"
            "&units=metric"
            f"&appid={OPENWEATHER_API_KEY}"
        )

        response = requests.get(
            url,
            timeout=10,
            headers={
                "User-Agent": "SmartTourismPlanner/1.0"
            }
        )

        response.raise_for_status()

        data = response.json()
                # =====================================================
        # EXTRACT WEATHER DATA
        # =====================================================

        main = data.get("main", {})
        wind = data.get("wind", {})
        weather = data.get("weather", [{}])[0]
        sys = data.get("sys", {})

        temperature = main.get("temp", "--")
        feels_like = main.get("feels_like", "--")
        humidity = main.get("humidity", "--")

        # OpenWeather returns wind speed in m/s
        wind_speed = round(wind.get("speed", 0) * 3.6, 1)

        description = weather.get("description", "Unknown").title()
        icon_code = weather.get("icon", "")

        # =====================================================
        # WEATHER ICON
        # =====================================================

        weather_icons = {
            "01d": "☀️",
            "01n": "🌙",
            "02d": "🌤️",
            "02n": "🌥️",
            "03d": "☁️",
            "03n": "☁️",
            "04d": "☁️",
            "04n": "☁️",
            "09d": "🌦️",
            "09n": "🌧️",
            "10d": "🌦️",
            "10n": "🌧️",
            "11d": "⛈️",
            "11n": "⛈️",
            "13d": "❄️",
            "13n": "❄️",
            "50d": "🌫️",
            "50n": "🌫️"
        }

        icon = weather_icons.get(icon_code, "🌍")

        sunrise = sys.get("sunrise")
        sunset = sys.get("sunset")

        is_day = 1 if icon_code.endswith("d") else 0
                # =====================================================
        # TRAVEL ADVICE
        # =====================================================

        if temperature >= 35:
            advice = "🥤 Stay hydrated and avoid direct sunlight."

        elif temperature >= 28:
            advice = "😎 Great weather for sightseeing. Carry sunglasses."

        elif temperature >= 20:
            advice = "🚶 Pleasant weather for outdoor activities."

        elif temperature >= 10:
            advice = "🧥 Carry a light jacket for the evening."

        else:
            advice = "❄️ Wear warm clothes."

        if "Rain" in description:
            advice = "☔ Carry an umbrella."

        if "Thunderstorm" in description:
            advice = "⚠️ Avoid outdoor activities during thunderstorms."

        # =====================================================
        # RETURN DATA
        # =====================================================

        return {
            "temperature": temperature,
            "feels_like": feels_like,
            "humidity": humidity,
            "wind": wind_speed,
            "weather_code": icon_code,
            "description": description,
            "icon": icon,
            "is_day": is_day,
            "sunrise": sunrise,
            "sunset": sunset,
            "advice": advice
        }
    except requests.exceptions.HTTPError as e:
        print("OpenWeather HTTP Error:", e)

        return {
            "temperature": "--",
            "feels_like": "--",
            "humidity": "--",
            "wind": "--",
            "weather_code": 0,
            "description": "Weather Unavailable",
            "icon": "🌤️",
            "is_day": 1,
            "sunrise": None,
            "sunset": None,
            "advice": "Unable to fetch weather information at the moment."
        }

    except Exception as e:
        print("Weather Error:", e)

        return {
            "temperature": "--",
            "feels_like": "--",
            "humidity": "--",
            "wind": "--",
            "weather_code": 0,
            "description": "Weather Unavailable",
            "icon": "🌤️",
            "is_day": 1,
            "sunrise": None,
            "sunset": None,
            "advice": "Unable to fetch weather information at the moment."
        }