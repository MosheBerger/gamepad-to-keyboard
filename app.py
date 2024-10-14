from flask import Flask, request, send_file
import pyautogui

app = Flask(__name__)

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/process_character/<character>', methods=['GET'])
def process_character(character):
    print('🔵 '+character+' 🔵')
    pyautogui.typewrite(character)
    # character = request.args.get('character')
    # כאן תקראי לפונקציה שלך כדי לעבד את התו
    # result = your_function(character)
    # return str(result)
    return str(character)

if __name__ == '__main__':
    app.run(debug=True)
    