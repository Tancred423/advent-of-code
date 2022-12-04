const fs = require('fs')

function getElfPairs() {
  const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
  return input.split('\r\n').filter(Boolean)
}

function isRangeFullyContained(range1, range2) {
  return (
    parseInt(range1[0]) >= parseInt(range2[0]) &&
    parseInt(range1[range1.length - 1]) <= parseInt(range2[range2.length - 1])
  )
}

const elfPairs = getElfPairs()
let amountOfFullyContainedAssignmentPairs = 0

for (const elfPair of elfPairs) {
  const elfSections = elfPair.split(',')
  const elf1SectionsBorders = elfSections[0].split('-')
  const elf2SectionsBorders = elfSections[1].split('-')

  if (
    isRangeFullyContained(elf1SectionsBorders, elf2SectionsBorders) ||
    isRangeFullyContained(elf2SectionsBorders, elf1SectionsBorders)
  ) {
    amountOfFullyContainedAssignmentPairs++
  }
}

console.log(
  'Amount of fully contained assignment pairs:',
  amountOfFullyContainedAssignmentPairs
)
