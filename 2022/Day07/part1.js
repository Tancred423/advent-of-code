const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

function getTotalSizeOfFolder(folderName) {
  const regex = new RegExp(
    `\\$ cd ${folderName}\\r\\n\\$ ls\\r\\n([a-z0-9 .\\r\\n]+)`,
    'gm'
  )
  const folderIndex = folderIndices.get(folderName) ?? 0
  const contents = input.match(regex)[folderIndex].split('\r\n').filter(Boolean)

  folderIndices.set(folderName, folderIndex + 1)

  let folderSize = 0

  for (const content of contents) {
    if (content.startsWith('dir')) {
      folderSize += getTotalSizeOfFolder(content.split(' ')[1])
    } else if (/^\d+ /.test(content)) {
      folderSize += parseInt(content.split(' ')[0])
    }
  }

  folderSizes.set(folderName + folderIndex, folderSize)

  return folderSize
}

const folderIndices = new Map()
const folderSizes = new Map()
getTotalSizeOfFolder('/')

console.log(
  'Sum of folder sizes below 100000:',
  Array.from(folderSizes.values())
    .filter((value) => value <= 100000)
    .reduce((a, b) => a + b, 0)
)
