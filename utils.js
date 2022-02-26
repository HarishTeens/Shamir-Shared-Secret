const MIN = 0
const MAX = 255

// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

const generateRandom = (min = MIN, max = MAX) => {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

const utils = {
    generateRandom
}

module.exports = utils