#pip install eel
import eel
import modules.always_on_top as aot
import modules.type_and_click as tnc
from modules.window_size import calc_window_size_and_position as winsizepos

SCALE = 1.2
win_s_p = winsizepos(SCALE)

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

eel.start(
    'index copy.html',\
    size=win_s_p['size'] ,
    position=win_s_p['pos'],
)