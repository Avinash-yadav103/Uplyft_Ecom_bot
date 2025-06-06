from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  

@app.route('/')
def index():
    gemini_api_key = os.environ.get('GEMINI_API_KEY', '')
    return render_template('index.html', gemini_api_key=gemini_api_key)
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
