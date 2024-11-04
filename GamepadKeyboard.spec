# GamepadKeyboard.spec

from PyInstaller.utils.hooks import collect_submodules
import platform

# Collect all submodules of eel and other hidden imports
hiddenimports = collect_submodules('eel') + collect_submodules('pynput')

# Analysis phase for your main script and additional dependencies
a = Analysis(
    ['eel_app.py'],  # Your main entry file
    pathex=['.'],
    binaries=[],
    datas=[
        ('front', 'front'),  # Include "front" folder with HTML, CSS, JS
    ],
    hiddenimports=hiddenimports,
    hookspath=[],
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=None,
)

# Build the executable
exe = EXE(
    a.scripts,
    a.binaries,
    a.zipfiles,
    a.datas,
    [],
    name='GamepadKeyboard',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False if platform.system() == "Windows" else True,  # Hide console on Windows
    icon='icon.ico' if platform.system() == "Windows" else None,  # Optional icon for Windows
)

# Collect everything into a single package
coll = COLLECT(exe, a.binaries, a.zipfiles, a.datas, strip=False, upx=True, name='GamepadKeyboard')
