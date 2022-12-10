const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
const lines = input.split('\r\n').filter(Boolean)

let x = 1
let cycle = 1
let signalStrengthTotal = 0

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
  if ([20, 60, 100, 140, 180, 220].includes(cycle))
    signalStrengthTotal += x * cycle

  const instruction = instructions.get(cycle)

  if (typeof instruction !== 'undefined')
    x += parseInt(instruction.split(' ')[1])
}

console.log('Total signal strength:', signalStrengthTotal)
