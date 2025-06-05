from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "This is your data!"})

@app.route('/api/echo', methods=['POST'])
def echo():
    data = request.json
    return jsonify({"you_sent": data})

if __name__ == '__main__':
    app.run(debug=True)
