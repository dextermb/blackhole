function replacer (key, value) {
  const obj = this[key]

  if (obj instanceof Map) {
    return {
      dataType: 'map',
      value: Array.from(obj.entries())
    }
  }

  return value
}

const toJson = obj => {
  if (obj && typeof obj === 'object') {
    return JSON.stringify(obj, replacer)
  }

  return '{}'
}

module.exports = toJson
