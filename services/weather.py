import requests


def get_weather(lat, lon):
    try:
        url = (
            "https://api.open-meteo.com/v1/forecast"
            f"?latitude={lat}"
            f"&longitude={lon}"
            "&current=temperature_2m,"
            "relative_humidity_2m,"
            "wind_speed_10m,"
            "weather_code,"
            "apparent_temperature,"
            "is_day"
            "&daily=sunrise,sunset"
            "&timezone=auto"
        )

        response = requests.get(
            url,
            timeout=10,
            headers={
                "User-Agent": "SmartTourismPlanner/1.0"
            }
        )

        # Handle rate limit
        if response.status_code == 429:
            print("Open-Meteo rate limit exceeded.")

            return {
                "temperature": "--",
                "feels_like": "--",
                "humidity": "--",
                "wind": "--",
                "weather_code": 0,
                "description": "Weather Temporarily Unavailable",
                "icon": "🌤️",
                "is_day": 1,
                "sunrise": "--",
                "sunset": "--",
                "advice": "Weather service is busy. Please try again in a few minutes."
            }

        response.raise_for_status()

        data = response.json()

        current = data.get("current")
        daily = data.get("daily")

        if not current or not daily:
            print("Weather API returned unexpected data.")
            return None

        weather_codes = {
            0: ("Clear Sky", "☀️"),
            1: ("Mainly Clear", "🌤"),
            2: ("Partly Cloudy", "⛅"),
            3: ("Overcast", "☁️"),
            45: ("Fog", "🌫"),
            48: ("Depositing Rime Fog", "🌫"),
            51: ("Light Drizzle", "🌦"),
            53: ("Moderate Drizzle", "🌦"),
            55: ("Dense Drizzle", "🌧"),
            56: ("Freezing Drizzle", "🌨"),
            57: ("Heavy Freezing Drizzle", "🌨"),
            61: ("Light Rain", "🌦"),
            63: ("Moderate Rain", "🌧"),
            65: ("Heavy Rain", "🌧"),
            66: ("Freezing Rain", "🌨"),
            67: ("Heavy Freezing Rain", "🌨"),
            71: ("Light Snow", "❄️"),
            73: ("Moderate Snow", "❄️"),
            75: ("Heavy Snow", "❄️"),
            77: ("Snow Grains", "🌨"),
            80: ("Rain Showers", "🌦"),
            81: ("Heavy Rain Showers", "🌧"),
            82: ("Violent Rain Showers", "⛈"),
            85: ("Snow Showers", "❄️"),
            86: ("Heavy Snow Showers", "❄️"),
            95: ("Thunderstorm", "⛈"),
            96: ("Thunderstorm with Hail", "⛈"),
            99: ("Severe Thunderstorm", "⛈")
        }

        description, icon = weather_codes.get(
            current.get("weather_code"),
            ("Unknown Weather", "🌍")
        )

        temperature = current.get("temperature_2m", 0)

        if temperature >= 35:
            advice = "🥤 Stay hydrated and avoid direct sunlight."
        elif temperature >= 28:
            advice = "😎 Great weather for sightseeing. Carry sunglasses."
        elif temperature >= 20:
            advice = "🚶 Pleasant weather for outdoor activities."
        elif temperature >= 10:
            advice = "🧥 Carry a light jacket for the evening."
        else:
            advice = "❄️ Wear warm clothes and stay protected from the cold."

        if "Rain" in description or "Drizzle" in description:
            advice = "☔ Carry an umbrella or raincoat."

        if "Thunderstorm" in description:
            advice = "⚠️ Avoid outdoor activities during thunderstorms."

        return {
            "temperature": current.get("temperature_2m"),
            "feels_like": current.get("apparent_temperature"),
            "humidity": current.get("relative_humidity_2m"),
            "wind": current.get("wind_speed_10m"),
            "weather_code": current.get("weather_code"),
            "description": description,
            "icon": icon,
            "is_day": current.get("is_day"),
            "sunrise": daily["sunrise"][0],
            "sunset": daily["sunset"][0],
            "advice": advice
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
            "sunrise": "--",
            "sunset": "--",
            "advice": "Unable to fetch weather information."
        }