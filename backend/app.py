from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.route('/weather')
def get_weather():
    city = request.args.get('city')
    api_key = os.getenv('WEATHER_API_KEY')
    if not city or not api_key:
        return jsonify({'error': 'Missing city or API key'}), 400

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    try:
        response = requests.get(url)
        data = response.json()
        if response.status_code != 200:
            return jsonify({'error': 'City not found'}), 404

        return jsonify({
            "name": data["name"],
            "sys": {"country": data["sys"]["country"]},
            "main": {
                "temp": data["main"]["temp"],
                "feels_like": data["main"]["feels_like"],
                "humidity": data["main"]["humidity"],
                "pressure": data["main"]["pressure"]
            },
            "weather": [{
                "main": data["weather"][0]["main"],
                "description": data["weather"][0]["description"]
            }],
            "wind": {"speed": data["wind"]["speed"]},
            "visibility": data["visibility"]
        })
    except Exception as e:
        return jsonify({'error': 'Something went wrong', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
