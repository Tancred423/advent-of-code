const fs = require('fs')

function getRucksacksAsArray() {
  const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
  return input.split('\r\n').filter(Boolean)
}

function splitIntoElfGroups(rucksacks) {
  const elfGroups = []
  let elfGroup = []

  for (let i = 0; i < rucksacks.length; i++) {
    if (i !== 0 && i % 3 === 0) {
      elfGroups.push(elfGroup)
      elfGroup = []
    }

    elfGroup.push(rucksacks[i])
  }

  elfGroups.push(elfGroup)

  return elfGroups
}

function getBadges(elfGroups) {
  const badges = []

  for (const elfGroup of elfGroups) {
    for (const character of elfGroup[0]) {
      if (elfGroup[1].includes(character) && elfGroup[2].includes(character)) {
        badges.push(character)
        break
      }
    }
  }

  return badges
}

function getSumOfPriorities(badges) {
  const badgePriorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let sumOfPriorities = 0

  for (const badge of badges) {
    sumOfPriorities += badgePriorities.indexOf(badge) + 1
  }

  return sumOfPriorities
}

const rucksacks = getRucksacksAsArray()
const elfGroups = splitIntoElfGroups(rucksacks)
const badges = getBadges(elfGroups)
const sumOfPriorities = getSumOfPriorities(badges)

console.log('Sum of priorities:', sumOfPriorities)
