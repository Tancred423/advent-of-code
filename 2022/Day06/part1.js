const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const markerLength = 4
let markerCharacters = input.slice(0, markerLength).split('')

for (const character of input) {
  if (new Set(markerCharacters).size !== markerLength) {
    markerCharacters.shift()
    markerCharacters.push(character)
    continue
  }

  const regex = new RegExp('(.*?)' + markerCharacters.join(''))
  console.log('Marker:', input.match(regex)[0].length)
  break
}
