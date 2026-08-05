import requests


def get_coordinates(city):

    url = (
        "https://nominatim.openstreetmap.org/search"
        f"?q={city}"
        "&format=json"
        "&limit=1"
    )

    headers = {
        "User-Agent": "SmartTourismPlanner/1.0"
    }

    response = requests.get(
        url,
        headers=headers,
        timeout=10
    )

    data = response.json()

    if not data:
        return None

    return {
        "lat": data[0]["lat"],
        "lon": data[0]["lon"]
    }