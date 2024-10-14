const express = require('express')
const app = express()

const fs = require('node:fs')
const { spawn } = require('child_process')

app.get('/', (req, res) => {
    res.send(fs.readFileSync('index.html', 'utf8'))
})

app.get('/process_character/:letter', (req, res) => {
    const letter  = req.params.letter
    spawn('python', ['./type.py', letter])
    console.log(letter)
    res.send('done')
})

app.listen(3000, () => console.log('Example app listening on localhost:3000'))