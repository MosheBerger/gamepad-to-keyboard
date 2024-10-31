import eel

# get the screen size
import ctypes
user32 = ctypes.windll.user32
screensize = user32.GetSystemMetrics(0), user32.GetSystemMetrics(1)

WIDTH = 250 * 1.2
HEIGHT = 100 * 1.2


eel.init('front')
eel.start('index.html', size=(WIDTH, HEIGHT),
                        # position=(screensize[0] - WIDTH, screensize[1] - HEIGHT),
)