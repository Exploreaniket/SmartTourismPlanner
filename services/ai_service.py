import os
import re
import json
import time

from dotenv import load_dotenv
from google import genai

# ============================================================
# LOAD ENVIRONMENT
# ============================================================

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise Exception("❌ GEMINI_API_KEY not found inside .env")

# ============================================================
# GEMINI CLIENT
# ============================================================

client = genai.Client(
    api_key=API_KEY
)

MODEL_NAME = "gemini-3.6-flash"

# ============================================================
# LOGGER
# ============================================================

def log(message):
    print(f"[AI] {message}")

# ============================================================
# JSON EXTRACTOR
# ============================================================

def extract_json(text):

    if not text:
        raise Exception("Gemini returned an empty response.")

    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    match = re.search(r"\{.*\}", text, re.DOTALL)

    if not match:
        raise Exception("No valid JSON found.")

    return json.loads(match.group())

# ============================================================
# GENERATE TRIP
# ============================================================

def generate_trip(
    mode,
    from_destination,
    destination,
    budget,
    days,
    travelers,
    interest,
    trip_type
):

    log("Creating Prompt...")

    if mode == "route":

        prompt = f"""
You are an expert Indian Route Planner.

Return ONLY valid JSON.

Do not explain anything.

Plan a complete journey.

FROM:
{from_destination}

TO:
{destination}

Trip Type:
{trip_type}

Budget:
₹{budget}

Travelers:
{travelers}
"""
        prompt += """

Return JSON in this exact format:

{
    "trip_summary":"",

    "route":{

        "distance":"",

        "estimated_time":"",

        "best_transport":"",

        "fuel_cost":"",

        "toll_cost":""

    },

    "stops":[

        {

            "place":"",

            "reason":"",

            "recommended_time":""

        }

    ],

    "destination_plan":{

        "best_time_to_visit":"",

        "top_places":[

            "",

            "",

            ""

        ]

    },

    "hotels":[

        {

            "name":"",

            "price":"",

            "why":""

        }

    ],

    "restaurants":[

        {

            "name":"",

            "speciality":""

        }

    ],

    "packing":[

        ""

    ],

    "travel_tips":[

        ""

    ],

    "emergency":{

        "police":"112",

        "ambulance":"108"

    }

}
"""
    else:

        prompt = f"""
You are an expert Indian Travel Planner.

Return ONLY valid JSON.

Do not write markdown.

Do not use ```json.

Do not explain anything.

Create a personalized travel itinerary.

Destination:
{destination}

Duration:
{days} Days

Budget:
₹{budget}

Travelers:
{travelers}

Trip Type:
{trip_type}

Travel Interests:
{interest}

Return JSON in this exact format:

{{
    "trip_summary":"",

    "travel_info":{{
        "best_transport":"",
        "estimated_travel_time":"",
        "best_time_to_visit":"",
        "nearest_airport":"",
        "nearest_railway_station":""
    }},

    "itinerary":[
        {{
            "day":1,
            "morning":"",
            "afternoon":"",
            "evening":"",
            "estimated_cost":""
        }}
    ],

    "budget":{{
        "Hotel":"",
        "Food":"",
        "Transport":"",
        "Activities":"",
        "Emergency":""
    }},

    "hotels":[
        {{
            "name":"",
            "price":"",
            "why":""
        }}
    ],

    "restaurants":[
        {{
            "name":"",
            "speciality":""
        }}
    ],

    "packing":[
        ""
    ],

    "travel_tips":[
        ""
    ],

    "emergency":{{
        "police":"112",
        "ambulance":"108"
    }}
}}
"""
            # ============================================================
    # SEND TO GEMINI
    # ============================================================

    log("Sending request to Gemini...")

    start = time.time()

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    end = time.time()

    log(f"Gemini Response Time : {end - start:.2f} sec")

    if not response.text:
        raise Exception("Gemini returned an empty response.")

    log("Extracting JSON...")

    try:

        trip = extract_json(response.text)

        # Add planner mode to response
        trip["planner_mode"] = mode

        # Add journey information if Route Mode
        if mode == "route":

            trip["journey"] = {
                "from": from_destination,
                "to": destination
            }

        log("Trip Generated Successfully")

        return trip

    except json.JSONDecodeError:

        log("JSON Decode Error")

        print("\n========== RAW GEMINI RESPONSE ==========\n")
        print(response.text)
        print("\n=========================================\n")

        raise Exception("Gemini returned invalid JSON.")

    except Exception as e:

     error = str(e)

    print("Gemini Error:", error)

    if "RESOURCE_EXHAUSTED" in error or "429" in error:

        return {
            "success": False,
            "message": "AI request limit reached. Please try again after some time."
        }

    return {
        "success": False,
        "message": "Unable to generate trip."
    }