# import eel
# import ctypes
import platform
import subprocess


def set_always_on_top():
    if platform.system() == "Windows":
        # Windows-specific code
        import win32gui
        import win32con

        def find_window_by_partial_title(partial_title):
            hwnd = None
            def callback(handle, extra):
                nonlocal hwnd
                if partial_title in win32gui.GetWindowText(handle):
                    hwnd = handle
            win32gui.EnumWindows(callback, None)
            return hwnd

        hwnd = find_window_by_partial_title("gamepad keyboard")
        if hwnd:
            win32gui.SetWindowPos(hwnd, win32con.HWND_TOPMOST, 0, 0, 0, 0,
                                win32con.SWP_NOMOVE | win32con.SWP_NOSIZE)
            print("Window set to always on top on Windows!")
        else:
            print("Window not found on Windows.")

    elif platform.system() == "Linux":
        # Linux-specific code using xdotool
        try:
            # Use xdotool to find the window by title and set it to always on top
            subprocess.call(["xdotool", "search", "--name", "gamepad keyboard", "windowactivate", "--sync"])
            subprocess.call(["xdotool", "search", "--name", "gamepad keyboard", "windowactivate", "--sync", "windowraise", "--sync"])
            subprocess.call(["xdotool", "search", "--name", "gamepad keyboard", "windowactivate", "--sync", "windowraise", "windowfocus"])
            print("Window set to always on top on Linux!")
        except Exception as e:
            print("Failed to set window on top on Linux:", e)
