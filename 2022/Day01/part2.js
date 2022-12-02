const fs = require('fs')

const amountElves = 3
const caloriesByElf = getCaloriesByElf()
const topCarryingElves = getTopCarryingElves(amountElves, caloriesByElf)
const total = getTotalCalories(topCarryingElves)

console.log('Top carrying elves:', topCarryingElves)
console.log('Total calories:', total)

function getCaloriesByElf() {
  const input = fs.readFileSync('Day01/input.txt', 'utf8')
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
  return caloriesByElf
}

function getTopCarryingElves(amountElves, caloriesByElf) {
  const topCarryingElves = []
  let i = 0

  while (i < amountElves) {
    const topCarryingElf = getHighestEntryOfMap(caloriesByElf)
    topCarryingElves.push(topCarryingElf)
    caloriesByElf.delete(topCarryingElf[0])
    i++
  }

  return topCarryingElves
}

function getHighestEntryOfMap(map) {
  return [...map.entries()].reduce((previous, current) =>
    current[1] > previous[1] ? current : previous
  )
}

function getTotalCalories(topCarryingElves) {
  let total = 0

  topCarryingElves.forEach((elf) => {
    total += elf[1]
  })

  return total
}
