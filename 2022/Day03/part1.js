const fs = require('fs')

function getRucksacksAsArray() {
  const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
  return input.split('\r\n').filter(Boolean)
}

const rucksacks = getRucksacksAsArray()
const wrongItemTypes = []

for (const rucksack of rucksacks) {
  const compartmentSize = rucksack.length / 2
  const compartment1 = rucksack.substring(0, compartmentSize)
  const compartment2 = rucksack.substring(compartmentSize, rucksack.length)

  for (const character of compartment1) {
    if (compartment2.includes(character)) {
      wrongItemTypes.push(character)
      break
    }
  }
}

const itemTypePriorities =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let sumOfPriorities = 0

for (const wrongItemType of wrongItemTypes) {
  sumOfPriorities += itemTypePriorities.indexOf(wrongItemType) + 1
}

console.log('Sum of the priorities:', sumOfPriorities)
