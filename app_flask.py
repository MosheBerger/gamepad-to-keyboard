# source v-env/bin/activate

from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from pynput.keyboard import Controller, Key
import modules.type_and_click as type_and_click

app = Flask(__name__, static_folder='front')
CORS(app)
keyboard = Controller()

# serve static files
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static_file(path):
    return send_from_directory(app.static_folder, path)



# Endpoint to press a single key
@app.route('/press_key', methods=['POST'])
def press_key():
    try:
        data = request.get_json()
        key = data.get('key')

        type_and_click.click_key(key)
        
        return jsonify({'status': 'done'}), 200
    except Exception as e:
        print(f"Error pressing key: {e}")
        return jsonify({'status': 'error', 'error': str(e)}), 500


# Endpoint to type a string of text
@app.route('/type', methods=['POST'])
def type_text():
    try:
        data = request.get_json()
        text = data.get('text')  

        # Type the specified text
        type_and_click.type_text(text)        
        
        return jsonify({'status': 'done'}), 200
    except Exception as e:
        print(f"Error typing: {e}")
        return jsonify({'status': 'error', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
