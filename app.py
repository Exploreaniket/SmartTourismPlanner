from flask import Flask, render_template, request, jsonify

from dotenv import load_dotenv
import os

load_dotenv()

from services.places import get_places
from services.ai_service import generate_trip
from services.geocode import get_coordinates
from services.weather import get_weather

app = Flask(__name__)

# ==========================================================
# HOME
# ==========================================================

@app.route("/")
def home():
    return render_template("index.html")


# ==========================================================
# AI TRIP GENERATOR
# ==========================================================

@app.route("/generate", methods=["POST"])
def generate():

    try:

        data = request.get_json()

        # -------------------------------------------------
        # Planner Mode
        # -------------------------------------------------

        mode = data.get("mode", "destination")

        from_destination = data.get("from", "").strip()

        destination = data.get("destination", "").strip()

        budget = data.get("budget", "")

        days = data.get("days", "")

        travelers = data.get("travelers", "")

        interest = data.get("interest", "")

        trip_type = data.get("tripType", "Solo")

       
        # -------------------------------------------------
        # GENERATE AI TRIP
        # -------------------------------------------------

        trip = generate_trip(
            mode=mode,
            from_destination=from_destination,
            destination=destination,
            budget=budget,
            days=days,
            travelers=travelers,
            interest=interest,
            trip_type=trip_type
        )

        print("✅ AI Trip Generated")

        # -------------------------------------------------
        # WEATHER
        # -------------------------------------------------

        print("Getting Coordinates...")

        coords = get_coordinates(destination)

        print("Coordinates :", coords)

        if coords:

            print("Getting Weather...")

            weather = get_weather(
                coords["lat"],
                coords["lon"]
            )

            trip["weather"] = weather

            print("Weather Added")

        else:

            print("Coordinates Not Found")

            trip["weather"] = None

        print("Returning JSON")

        return jsonify(trip)

    except Exception as e:

     print("ERROR:", e)

    return jsonify({
        "success": False,
        "message": "Something went wrong. Please try again later."
    }), 500


# ==========================================================
# WEATHER API
# ==========================================================

@app.route("/weather")
def weather():

    try:

        destination = request.args.get("destination")

        coords = get_coordinates(destination)

        if not coords:

            return jsonify({
                "success": False
            })

        weather = get_weather(
            coords["lat"],
            coords["lon"]
        )

        return jsonify({
            "success": True,
            "weather": weather
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        })


# ==========================================================
# MAP API
# ==========================================================

@app.route("/map")
def map_location():

    try:

        destination = request.args.get("destination", "").strip()

        if not destination:

            return jsonify({
                "success": False,
                "message": "Destination is required."
            })

        coords = get_coordinates(destination)

        if not coords:

            return jsonify({
                "success": False,
                "message": "Location not found."
            })

        return jsonify({

            "success": True,

            "name": destination,

            "lat": coords["lat"],

            "lon": coords["lon"]

        })

    except Exception as e:

        print("Map Error:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500

    # ==========================================================
# PLACES API
# ==========================================================

@app.route("/places")
def places():

    try:

        destination = request.args.get("destination", "").strip()

        if not destination:

            return jsonify({

                "success": False,

                "message": "Destination is required."

            })

        places = get_places(destination)

        return jsonify({

            "success": True,

            "count": len(places),

            "places": places

        })

    except Exception as e:

        print("Places API Error:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500


# ==========================================================
# RUN
# ==========================================================

if __name__ == "__main__":
    app.run(debug=True)