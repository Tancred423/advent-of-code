const fs = require('fs')

/*
 * A = Rock
 * B = Paper
 * C = Scissor
 *
 * X = Need to lose
 * Y = Need to draw
 * Z = Need to win
 */

function getStrategiesPerRound() {
  const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
  return input.split('\r\n').filter(Boolean)
}

const pointsPerShape = new Map([
  ['A', 1],
  ['B', 2],
  ['C', 3],
])
const pointsPerOutcome = new Map([
  ['X', 0],
  ['Y', 3],
  ['Z', 6],
])
const strategiesPerRound = getStrategiesPerRound()
let myScore = 0

for (const strategy of strategiesPerRound) {
  const shapes = strategy.split(' ')
  const enemyShape = shapes[0]
  const outcome = shapes[1]

  myScore += pointsPerOutcome.get(outcome)

  const myShape = getMyShape(enemyShape, outcome)

  myScore += pointsPerShape.get(myShape)
}

console.log('My score:', myScore)

function getMyShape(enemyShape, outcome) {
  switch (enemyShape) {
    case 'A':
      if (outcome === 'X') return 'C' // Lose
      else if (outcome === 'Z') return 'B' // Win
      else return enemyShape // Draw
    case 'B':
      if (outcome === 'X') return 'A' // Lose
      else if (outcome === 'Z') return 'C' // Win
      else return enemyShape // Draw
    default: // C
      if (outcome === 'X') return 'B' // Lose
      else if (outcome === 'Z') return 'A' // Win
      else return enemyShape // Draw
  }
}
