import webview
from modules.window_size import calc_window_size_and_position as winsizepos
from modules.js_api import expose_it

SCALE = 1.2
winsp = winsizepos(SCALE)


window = webview.create_window(
    'gp controller',
    url='front/index.html',
    on_top=True,
    width=winsp['size'][0],
    height=winsp['size'][1],
    x=(winsp['pos'][0]/2).__floor__(),
    y=(winsp['pos'][1]/2).__floor__(),
    frameless=True,
    easy_drag=True,

    # js_api=True,
    # confirm_close=True
)

expose_it(window)

# def exit():
#     window.destroy()

# window.expose(exit)

# vm = webview.menu
# menu = [vm.Menu(
#     'exit',
#     [
#         vm.MenuAction('exit',exit)
#     ]
# )]



webview.start(
    debug=True,
    # menu=menu,
    )
