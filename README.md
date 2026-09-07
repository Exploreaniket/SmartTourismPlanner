# 🌍 Smart Tourism Planner

An AI-powered travel planning web application that generates personalized travel itineraries based on user preferences. The application provides live weather updates, nearby tourist attractions, interactive maps, and AI-generated travel plans to help users organize their trips efficiently.

---

## 🚀 Live Demo

🔗 https://smarttourismplanner.onrender.com

---

## ✨ Features

- 🤖 AI-powered travel itinerary generation using Google Gemini AI
- 🌦️ Live weather updates using OpenWeather API
- 🗺️ Interactive destination map
- 📍 Nearby tourist attractions
- 💰 Budget-based trip planning
- 👨‍👩‍👧 Traveler-based recommendations
- ❤️ Interest-based travel suggestions
- 🧭 Personalized travel experience
- 🔍 Destination search
- 📱 Fully responsive design
- ⚡ Fast and user-friendly interface
- ☁️ Deployed on Render

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask

### APIs Used
- Google Gemini API
- OpenWeather API
- Geoapify Geocoding API
- Geoapify Places API

### Deployment
- GitHub
- Render

---

## 📂 Project Structure

```
SmartTourismPlanner/
│
├── app.py
├── requirements.txt
├── README.md
├── .env.example
├── .gitignore
│
├── services/
│   ├── ai_service.py
│   ├── weather.py
│   ├── geocoding.py
│   └── places.py
│
├── static/
│   ├── css/
│   ├── js/
│   └── images/
│
└── templates/
    ├── base.html
    ├── index.html
    └── dashboard.html
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Exploreaniket/SmartTourismPlanner.git

cd SmartTourismPlanner
```

---

### 2. Create Virtual Environment

```bash
python -m venv venv
```

Activate the virtual environment

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / macOS

```bash
source venv/bin/activate
```

---

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Configure Environment Variables

Create a `.env` file in the project root.

```env
GEMINI_API_KEY=your_gemini_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
GEOAPIFY_API_KEY=your_geoapify_api_key
```

---

### 5. Run the Application

```bash
python app.py
```

Open your browser and visit

```
http://127.0.0.1:5000
```

---



## 🌟 Key Functionalities

### 🤖 AI Trip Planner

Generates personalized travel itineraries based on:

- Destination
- Budget
- Number of days
- Travel interests
- Number of travelers
- Trip type

---

### 🌦️ Live Weather

Displays:

- Temperature
- Feels Like
- Humidity
- Wind Speed
- Sunrise
- Sunset
- Weather Description
- Travel Advice

---

### 🗺️ Interactive Map

Provides destination location using an interactive map for better navigation.

---

### 📍 Nearby Attractions

Shows popular tourist attractions around the selected destination.

---

## 🔐 Environment Variables

The project requires the following API keys.

| Variable | Description |
|----------|-------------|
| GEMINI_API_KEY | Google Gemini AI API Key |
| OPENWEATHER_API_KEY | OpenWeather API Key |
| GEOAPIFY_API_KEY | Geoapify API Key |

---

## 🚀 Deployment

This project is deployed on **Render**.

To deploy:

1. Push code to GitHub.
2. Connect the repository to Render.
3. Add environment variables.
4. Deploy.

---

## 📈 Future Enhancements

- 🔐 User Authentication
- ❤️ Save Favorite Trips
- 📄 Download Trip as PDF
- 🏨 Hotel Recommendations
- ✈️ Flight Suggestions
- 💬 AI Travel Chat Assistant
- 🌐 Multi-language Support
- 💳 Travel Expense Calculator

---

## 👨‍💻 Author

**Aniket Prajapati**

GitHub:
https://github.com/Exploreaniket

Project Repository:
https://github.com/Exploreaniket/SmartTourismPlanner

---

## 📜 License

This project is developed for educational and portfolio purposes.

© 2026 Aniket Prajapati. All Rights Reserved.
