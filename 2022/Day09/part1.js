const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
const lines = input.split('\r\n').filter(Boolean)

const coordsH = [[0, 0]]
const coordsT = [[0, 0]]

for (const line of lines) {
  const direction = line.split(' ')[0]
  const amount = line.split(' ')[1]

  const isHorizontal = ['L', 'R'].includes(direction)
  const add = ['L', 'D'].includes(direction) ? -1 : 1

  for (let i = 0; i < amount; i++) {
    // Move head
    const latestCoordsH = coordsH[coordsH.length - 1]
    const x = latestCoordsH[0] + (isHorizontal ? add : 0)
    const y = latestCoordsH[1] + (isHorizontal ? 0 : add)

    coordsH.push([x, y])

    // Let tail follow
    const latestCoordsT = coordsT[coordsT.length - 1]

    const isInRange =
      Math.abs(latestCoordsT[0] - x) <= 1 && Math.abs(latestCoordsT[1] - y) <= 1

    if (isInRange) coordsT.push(latestCoordsT)
    else coordsT.push(coordsH[coordsH.length - 2])
  }
}

console.log(
  'Amount of unique tail positions:',
  new Set(coordsT.map((x) => JSON.stringify(x))).size
)
