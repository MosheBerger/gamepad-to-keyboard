import sys
# import pyautogui

# letter = sys.argv[1] 

# https://github.com/gandalf113/node-python-tutorial
# pyautogui.typewrite(letter)


from pynput.keyboard import Controller, Key
keyboard = Controller()


keyboard.press('ש')
keyboard.release('ש')
