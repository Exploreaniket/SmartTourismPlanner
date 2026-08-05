import requests
from services.geocode import get_coordinates

import os

API_KEY = os.getenv("GEOAPIFY_API_KEY")


def get_places(destination):

    coords = get_coordinates(destination)

    if not coords:
        return []

    lat = coords["lat"]
    lon = coords["lon"]

    url = (
        "https://api.geoapify.com/v2/places"
        f"?categories=tourism.sights,accommodation.hotel,catering.restaurant"
        f"&filter=circle:{lon},{lat},5000"
        "&limit=30"
        f"&apiKey={API_KEY}"
    )

    try:

        response = requests.get(url, timeout=15)
        response.raise_for_status()

        data = response.json()

        places = []

        for feature in data.get("features", []):

            prop = feature.get("properties", {})

            geometry = feature.get("geometry", {})

            coordinates = geometry.get("coordinates", [])

            if len(coordinates) != 2:
                continue

            name = prop.get("name")

            if not name:
                continue

            categories = prop.get("categories", [])

            place_type = "tourist"

            if any("accommodation.hotel" in c for c in categories):
                place_type = "hotel"

            elif any("catering.restaurant" in c for c in categories):
                place_type = "restaurant"

            elif any("tourism" in c for c in categories):
                place_type = "tourist"

            places.append({

                "name": name,

                "lat": coordinates[1],

                "lon": coordinates[0],

                "type": place_type

            })

        return places

    except Exception as e:

        print("Geoapify Error:", e)

        return []