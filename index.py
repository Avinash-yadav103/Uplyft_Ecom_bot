from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables from .env file (keeping this for other potential env vars)
load_dotenv()

app = Flask(__name__)
CORS(app)  

@app.route('/')
def index():
    # Remove any gemini_api_key variable if present
    return render_template('index.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "This is your data!"})

@app.route('/api/echo', methods=['POST'])
def echo():
    data = request.json
    return jsonify({"you_sent": data})

if __name__ == '__main__':
    app.run(debug=True)
