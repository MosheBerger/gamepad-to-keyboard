from flask import Flask, send_from_directory, request
from pynput.keyboard import Controller, Key


app = Flask(__name__, static_folder='front')
keyboard = Controller()

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/key/<key>', methods=['GET'])
def press_key(key):
    try:
        # Press the specified key
        keyboard.press(key)
        keyboard.release(key)
        
        print('pressing', key)
        return 'done', 200
    except Exception as e:
        print(f"Error processing character: {e}")
        return 'error', 500
    

@app.route('/type/<text>', methods=['GET'])
def process_character(text):
    try:
        # Press the specified text
        keyboard.type(text)
        
        print('typing', text)
        return 'done', 200
    except Exception as e:
        print(f"Error processing character: {e}")
        return 'error', 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
