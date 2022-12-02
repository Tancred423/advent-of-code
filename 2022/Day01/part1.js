const fs = require('fs')

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
const lines = input.split('\r\n')
const caloriesByElf = new Map()
let i = 1

for (const line of lines) {
  if (line === '') {
    i++
    continue
  }

  const currentCalories = caloriesByElf.get(i)

  if (currentCalories) caloriesByElf.set(i, currentCalories + parseInt(line))
  else caloriesByElf.set(i, parseInt(line))
}

const highestEntry = [...caloriesByElf.entries()].reduce((previous, current) =>
  current[1] > previous[1] ? current : previous
)

console.log(
  `The ${highestEntry[0]}. elf is carrying the most calories with ${highestEntry[1]}.`
)
