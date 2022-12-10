const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
const lines = input.split('\r\n').filter(Boolean)

const coords = [
  [[0, 0]], // 0 - H
  [[0, 0]], // 1
  [[0, 0]], // 2
  [[0, 0]], // 3
  [[0, 0]], // 4
  [[0, 0]], // 5
  [[0, 0]], // 6
  [[0, 0]], // 7
  [[0, 0]], // 8
  [[0, 0]], // 9 - T
]

for (const line of lines) {
  const direction = line.split(' ')[0]
  const amount = line.split(' ')[1]

  const isHorizontal = ['L', 'R'].includes(direction)
  const add = ['L', 'D'].includes(direction) ? -1 : 1

  for (let i = 0; i < amount; i++) {
    // Move head
    const latestCoordsH = coords[0][coords[0].length - 1]
    const x = latestCoordsH[0] + (isHorizontal ? add : 0)
    const y = latestCoordsH[1] + (isHorizontal ? 0 : add)

    coords[0].push([x, y])

    // Move knots
    for (let knotIndex = 1; knotIndex <= 9; knotIndex++) {
      moveKnot(knotIndex)
    }
  }
}

function moveKnot(knotIndex) {
  const knotCoords = coords[knotIndex]
  const knot = knotCoords[knotCoords.length - 1]

  const leadingKnotCoords = coords[knotIndex - 1]
  const leadingKnot = leadingKnotCoords[leadingKnotCoords.length - 1]

  // Do not move if leading knot is in range

  const isInRange =
    Math.abs(leadingKnot[0] - knot[0]) <= 1 &&
    Math.abs(leadingKnot[1] - knot[1]) <= 1

  if (isInRange) return coords[knotIndex].push(knot)

  // Move knot in same direction if they are on the same row or column

  if (leadingKnot[0] === knot[0]) {
    // Same row
    return coords[knotIndex].push([
      knot[0],
      knot[1] + (leadingKnot[1] - knot[1] > 0 ? 1 : -1),
    ])
  }

  if (leadingKnot[1] === knot[1]) {
    // Same column
    return coords[knotIndex].push([
      knot[0] + (leadingKnot[0] - knot[0] > 0 ? 1 : -1),
      knot[1],
    ])
  }

  // Move knot diagonally

  return coords[knotIndex].push([
    knot[0] + (leadingKnot[0] - knot[0] > 0 ? 1 : -1),
    knot[1] + (leadingKnot[1] - knot[1] > 0 ? 1 : -1),
  ])
}

console.log(
  'Amount of unique tail positions:',
  new Set(coords[9].map((x) => JSON.stringify(x))).size
)
