from flask import Flask, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app) # This enables CORS for all domains. Adjust accordingly for production.

API_KEY = os.getenv('ALPHA_VANTAGE_API_KEY')
BASE_URL = "https://www.alphavantage.co/query"

@app.route('/ftse100', methods=['GET'])
def get_ftse100_data():
    params = {
        "function": "TIME_SERIES_DAILY",
        "symbol": "^FTSE",
        "apikey": API_KEY
    }
    response = requests.get(BASE_URL, params=params)
    data = response.json()
    simplified_data = [{
        "date": key,
        "close": float(value["4. close"])
    } for key, value in data["Time Series (Daily)"].items()] # Adjust as needed
    return jsonify(simplified_data[:30]) # Return the last 30 entries

if __name__ == '__main__':
    app.run(debug=True)
