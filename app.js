const express = require('express');
const app = express()

const { readFileSync} = require('node:fs')
const robot = require('robotjs')
const {keyboard ,Key} = require('@nut-tree-fork/nut-js')
const buildPath = require('path')
const FRONTEND_PATH = buildPath.join(__dirname, 'front')

app.get('/', (req, res) => {
    res.send(readFileSync(buildPath.join(__dirname, 'front', 'index.html'), 'utf8'))
})

app.use(express.static(FRONTEND_PATH))

// robot.keyTap('d')
// robot.keyTap('א')
keyboard.type('t')
// keyboard.type(Key.Z)t
console.log('יג');
app.get('/process_character/:letter', (req, res) => {
    const letter  = req.params.letter
    
    keyboard.type(letter)
    // robot.keyTap(letter)
    //todo fix hebrew doesn't work on robotjs 
    console.log(letter)
    res.send('done')
})

app.listen(3000, () => console.log('Example app listening on http://localhost:3000'))