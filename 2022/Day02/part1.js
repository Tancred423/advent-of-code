const fs = require('fs')

/*
 * A, X = Rock
 * B, Y = Paper
 * C, Z = Scissor
 */

function getStrategiesPerRound() {
  const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
  return input.split('\r\n').filter(Boolean)
}

const pointsPerShape = new Map([
  ['X', 1],
  ['Y', 2],
  ['Z', 3],
])
const strategiesPerRound = getStrategiesPerRound()
let myScore = 0

for (const strategy of strategiesPerRound) {
  const shapes = strategy.split(' ')
  const enemyShape = shapes[0]
  const myShape = shapes[1]

  myScore += pointsPerShape.get(myShape)

  if (isDraw(enemyShape, myShape)) myScore += 3
  else if (isWin(enemyShape, myShape)) myScore += 6
}

console.log('My score:', myScore)

function isDraw(enemyShape, myShape) {
  switch (enemyShape) {
    case 'A':
      return myShape === 'X'
    case 'B':
      return myShape === 'Y'
    default: // C
      return myShape === 'Z'
  }
}

function isWin(enemyShape, myShape) {
  switch (enemyShape) {
    case 'A':
      return myShape === 'Y'
    case 'B':
      return myShape === 'Z'
    default: // C
      return myShape === 'X'
  }
}
