import PyInstaller.__main__

PyInstaller.__main__.run([
    'eel_app.py',
    'front',
    '--noconsole',
    '--onefile'
])

# python -m    --noconsole --onefile