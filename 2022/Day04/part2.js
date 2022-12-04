const fs = require('fs')

function getElfPairs() {
  const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
  return input.split('\r\n').filter(Boolean)
}

function isRangeOverlapping(range1, range2) {
  return (
    parseInt(range1[1]) >= parseInt(range2[0]) &&
    parseInt(range1[0]) <= parseInt(range2[1])
  )
}

const elfPairs = getElfPairs()
let amountOfOverlappingAssignmentPairs = 0

for (const elfPair of elfPairs) {
  const elfSections = elfPair.split(',')
  const elf1SectionBorders = elfSections[0].split('-')
  const elf2SectionBorders = elfSections[1].split('-')

  if (isRangeOverlapping(elf1SectionBorders, elf2SectionBorders)) {
    amountOfOverlappingAssignmentPairs++
  }
}

console.log(
  'Amount of overlapping assignment pairs:',
  amountOfOverlappingAssignmentPairs
)
