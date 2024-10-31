import eel
import ctypes
import platform
import always_on_top as aot
import type_and_click as tnc

# Set dimensions
WIDTH = int(250 * 1.2)
HEIGHT = int(100 * 1.2)

# Get screen size (only on Windows)
if platform.system() == "Windows":
    user32 = ctypes.windll.user32
    screensize = user32.GetSystemMetrics(0), user32.GetSystemMetrics(1)
else:
    screensize = (800, 600)  # Default size for Linux if needed


@eel.expose
def set_always_on_top():
    aot.set_always_on_top()

@eel.expose
def type_text(text):
    tnc.type_text(text)

@eel.expose
def click_key(key):
    tnc.click_key(key)

eel.init('front')

eel.start('index.html', size=(WIDTH, HEIGHT),
          position=(screensize[0] - WIDTH, screensize[1] - HEIGHT),
          
)