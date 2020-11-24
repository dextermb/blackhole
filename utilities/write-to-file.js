const fs = require('fs')
const util = require('util')
const { dirname } = require('path')

const d = require('make-dir')
const w = util.promisify(fs.writeFile)
const a = util.promisify(fs.appendFile)

const writeToFile = async (path, content, append = false) => {
  // Make directory
  await d(dirname(path))

  if (append) {
    // Append to file
    await a(path, content)
  } else {
    // Write to file
    await w(path, content)
  }
}

module.exports = writeToFile
