const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
const lines = input.split('\r\n').filter(Boolean)

function parseStacksOfCrates() {
  const tallestStack = input.match(/^.*\[/gm).length
  const maxCharacters = lines[tallestStack - 1].length
  const stacksOfCrates = []

  for (let h = 1; h < maxCharacters; h += 4) {
    let tmpStack = []

    for (let v = 0; v < tallestStack; v++) {
      tmpStack.push(lines[v].charAt(h))
    }

    stacksOfCrates.push(
      tmpStack.reverse().filter((crate) => /[A-Z]/.test(crate))
    )
  }

  return stacksOfCrates
}

function rearrangeStacksOfCrates(stacksOfCrates) {
  const matches = input.matchAll(
    /^move (?<move>\d+) from (?<from>\d+) to (?<to>\d+)$/gm
  )

  for (const match of matches) {
    const move = match.groups.move
    const from = match.groups.from - 1
    const to = match.groups.to - 1

    const cratesToTransfer = stacksOfCrates[from].splice(-move)

    stacksOfCrates[to].push(...cratesToTransfer.reverse())
  }
}

function getCratesOnTop(stacksOfCrates) {
  let cratesOnTop = ''

  for (const stack of stacksOfCrates) {
    cratesOnTop += stack.pop()
  }

  return cratesOnTop
}

const stacksOfCrates = parseStacksOfCrates()
rearrangeStacksOfCrates(stacksOfCrates)
const cratesOnTop = getCratesOnTop(stacksOfCrates)

console.log('Crates on top:', cratesOnTop)
