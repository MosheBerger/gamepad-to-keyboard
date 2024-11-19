const keyboardsMaps = {
    qwerty: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
    ],
    capslock: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'],
    ],
    symbolAndNumber: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['-', '=', '(', ')', '[', ']', '{', '}', '\\', '|'],
        ['+', '*', '/', '"', "'", '>', '%', '^', '&', '*'],
    ],//todo! fix this mapping
    programming: [
        ['console.log', '()=>{}', 'if(){\n\n}', 'else{\n\n}',]
    ],
    hebrew: [
        ['/', "'", 'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
        ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'],
        ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ', '.'],
    ]
}

const mapsName = ['qwerty', 'capslock', 'symbolAndNumber', 'hebrew', 'programming']

export function selectKeyboard(index) {
    index = index % mapsName.length

    const keyboardsMap = keyboardsMaps[mapsName[index]]
    console.log('🚀 -> mapKeyboards -> keyboardsMaps:', keyboardsMaps)
    console.log('🚀 -> mapKeyboards -> keyboardsMap:', keyboardsMap)


    const linesLeft = []
    const linesRight = []

    // const lines = document.querySelectorAll('.lines')

    for (const line of keyboardsMap) {
        linesLeft.push(line.slice(0, 5))
        linesRight.push(line.slice(5, 10))
    }

    const lines = [...linesLeft, ...linesRight]
    const chars = lines.flat()
    console.log('keys', chars);

    document.querySelectorAll('.key').forEach((key, i) => {
        key.innerHTML = chars[i] || ''
    })
}

selectKeyboard(0)