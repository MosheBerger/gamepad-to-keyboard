from flask import Flask, send_from_directory, request, jsonify
from pynput.keyboard import Controller, Key

app = Flask(__name__, static_folder='front')
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

        # Check if the key is a special key (e.g., 'enter', 'space')
        if hasattr(Key, key):
            keyboard.tap(getattr(Key, key))
            print(f'pressing special key: {key}')
        else:
            # Press regular character key
            keyboard.tap(key)
            print(f'pressing character key: {key}')

        
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
        keyboard.type(text)
        
        print('typing:', text)
        return jsonify({'status': 'done'}), 200
    except Exception as e:
        print(f"Error typing: {e}")
        return jsonify({'status': 'error', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
