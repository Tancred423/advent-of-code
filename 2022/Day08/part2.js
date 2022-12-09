const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
const lines = input.split('\r\n').filter(Boolean)

function getTreesY(x) {
  const treesY = []
  for (const line of lines) treesY.push(line.charAt(x))
  return treesY
}

function getAmountOfSmallerTrees(trees, originTree) {
  let amount = 0

  for (const tree of trees) {
    amount++
    if (parseInt(tree) >= originTree) break
  }

  return amount
}

const width = lines[0].length
const height = lines.length

let highestScenicScore = 0

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const originTree = parseInt(lines[y][x])

    const treesX = lines[y].split('')
    const treesXBefore = treesX.splice(0, x).reverse()
    const treesXAfter = treesX.splice(1)

    const treesY = getTreesY(x)
    const treesYBefore = treesY.splice(0, y).reverse()
    const treesYAfter = treesY.splice(1)

    const scenicScore =
      getAmountOfSmallerTrees(treesXBefore, originTree) *
      getAmountOfSmallerTrees(treesXAfter, originTree) *
      getAmountOfSmallerTrees(treesYBefore, originTree) *
      getAmountOfSmallerTrees(treesYAfter, originTree)

    highestScenicScore = Math.max(highestScenicScore, scenicScore)
  }
}

console.log('Highest scenic score:', highestScenicScore)
