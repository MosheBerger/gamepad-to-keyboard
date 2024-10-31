from pynput.keyboard import Controller, Key

keyboard = Controller()

def type_text(text):
    # Type the specified text
    keyboard.type(text)
    print('typing:', text)
    

def click_key(key):
            # Check if the key is a special key (e.g., 'enter', 'space')
        if hasattr(Key, key):
            keyboard.tap(getattr(Key, key))
            print(f'pressing special key: {key}')
        else:
            # Press regular character key
            keyboard.tap(key)
            print(f'pressing character key: {key}')
