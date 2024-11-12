import modules.type_and_click as tnc



def expose_it(window):

    def type_text(text):
        print('typing:', text)
        tnc.type_text(text)

    def click_key(key):
        print('clicking:', key)
        tnc.click_key(key)
        
    def exit():
        print('exiting...')
        window.destroy()

    window.expose(
        type_text,
        click_key,
        exit
    )
