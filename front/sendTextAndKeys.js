

export const send = {
    
    key(key = '') {

        fetch('http://localhost:3000/press_key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key: key })
        })
            .then(response => console.log('response', response))
            .catch(error => console.error('Error:', error))
    },


    text(text = '') {

        fetch('http://localhost:3000/type', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        })
            .then(response => console.log('response', response))
            .catch(error => console.error('Error:', error))

    }
}
