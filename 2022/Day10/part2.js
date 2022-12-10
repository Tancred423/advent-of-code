const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
const lines = input.split('\r\n').filter(Boolean)

let x = 1
let cycle = 1

const crtRows = []
let currentCrtRow = []
let spritePosition = '###.....................................'.split('')

const instructions = new Map()

for (const instruction of lines) {
  if (instruction === 'noop') {
    cycle++
  } else {
    instructions.set(cycle + 1, instruction)
    cycle += 2
  }
}

const instructionsKeys = Array.from(instructions.keys())
const lastCycle = instructionsKeys[instructionsKeys.length - 1]

for (cycle = 1; cycle <= lastCycle; cycle++) {
  currentCrtRow.push(spritePosition[(cycle % 40) - 1])

  const instruction = instructions.get(cycle)

  if (typeof instruction !== 'undefined') {
    x += parseInt(instruction.split(' ')[1])

    spritePosition = '........................................'.split('')
    spritePosition.splice(x - 1, 3, '#', '#', '#')
  }

  if (cycle % 40 === 0) {
    crtRows.push(currentCrtRow.join(''))
    currentCrtRow = []
  }
}

crtRows.push(currentCrtRow.join(''))

console.log('CRT render:\n' + crtRows.join('\n'))
