const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

function getMonkeyInfo(monkey) {
  const regex = new RegExp(
    `Monkey ${monkey}:\\r\\n  Starting items: (?<items>.*)\\r\\n  Operation: new = old (?<operation>[\+\*]) (?<amount>\\w+)\\r\\n  Test: divisible by (?<divisible>\\d+)\\r\\n    If true: throw to monkey (?<true>\\d+)\\r\\n    If false: throw to monkey (?<false>\\d+)`
  )
  const info = input.match(regex)

  return {
    items: info.groups.items.split(', ').map((x) => parseInt(x)),
    operation: info.groups.operation,
    amount: info.groups.amount === 'old' ? -1 : parseInt(info.groups.amount),
    divisible: parseInt(info.groups.divisible),
    true: parseInt(info.groups.true),
    false: parseInt(info.groups.false),
    inspected: 0,
  }
}

const highestMonkeyIndex = Array.from(input.matchAll(/Monkey (\d)/g)).pop()[1]
const monkeys = []

for (let i = 0; i <= highestMonkeyIndex; i++) monkeys.push(getMonkeyInfo(i))

// Let the game begin

for (let round = 1; round <= 20; round++) {
  for (let monkeyIndex = 0; monkeyIndex <= highestMonkeyIndex; monkeyIndex++) {
    while (monkeys[monkeyIndex].items.length > 0) {
      // Count inspections
      monkeys[monkeyIndex].inspected++

      // Monkey inspects an item - Worry level increases
      if (monkeys[monkeyIndex].operation === '+') {
        monkeys[monkeyIndex].items[0] +=
          monkeys[monkeyIndex].amount === -1
            ? monkeys[monkeyIndex].items[0]
            : monkeys[monkeyIndex].amount
      } else {
        monkeys[monkeyIndex].items[0] *=
          monkeys[monkeyIndex].amount === -1
            ? monkeys[monkeyIndex].items[0]
            : monkeys[monkeyIndex].amount
      }

      // Monkey gets bored with item
      monkeys[monkeyIndex].items[0] = Math.floor(
        monkeys[monkeyIndex].items[0] / 3
      )

      // Item is thrown
      const receivingMonkey =
        monkeys[monkeyIndex].items[0] % monkeys[monkeyIndex].divisible === 0
          ? monkeys[monkeyIndex].true
          : monkeys[monkeyIndex].false

      monkeys[receivingMonkey].items.push(monkeys[monkeyIndex].items.shift())
    }
  }
}

const twoMostActiveMonkeys = monkeys.map((monkey) => monkey.inspected)
twoMostActiveMonkeys.sort((a, b) => a - b)

console.log(
  'Level of monkey business:',
  twoMostActiveMonkeys.pop() * twoMostActiveMonkeys.pop()
)
