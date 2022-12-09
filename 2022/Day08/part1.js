const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
const lines = input.split('\r\n').filter(Boolean)

function hasBlockingTrees(trees, originTree) {
  return trees.filter((tree) => parseInt(tree) >= originTree).length > 0
}

function getTreesY(x) {
  const treesY = []
  for (const line of lines) treesY.push(line.charAt(x))
  return treesY
}

const width = lines[0].length
const height = lines.length

let visibleTrees = width * 2 + height * 2 - 4

for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const originTree = parseInt(lines[y][x])

    const treesX = lines[y].split('')
    const treesXBefore = treesX.splice(0, x)
    const treesXAfter = treesX.splice(1)

    const treesY = getTreesY(x)
    const treesYBefore = treesY.splice(0, y)
    const treesYAfter = treesY.splice(1)

    if (
      hasBlockingTrees(treesXBefore, originTree) &&
      hasBlockingTrees(treesXAfter, originTree) &&
      hasBlockingTrees(treesYBefore, originTree) &&
      hasBlockingTrees(treesYAfter, originTree)
    )
      continue

    visibleTrees++
  }
}

console.log('Visible trees from the outside:', visibleTrees)
