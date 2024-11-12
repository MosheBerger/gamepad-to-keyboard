import ctypes
import platform

def calc_window_size_and_position(scale=1.2):
    
    # Set dimensions
    WIDTH = int(250 * scale)
    HEIGHT = int(100 * scale)


    # Get screen size (only on Windows)
    if platform.system() == "Windows":
        user32 = ctypes.windll.user32
        screen_size = user32.GetSystemMetrics(0), user32.GetSystemMetrics(1)
    else:
        screen_size = (800, 600)  # Default size for Linux if needed


    window_position = (screen_size[0] - WIDTH, screen_size[1] - HEIGHT)
    window_size = (WIDTH, HEIGHT)
    
    return {'pos': window_position, 'size': window_size}