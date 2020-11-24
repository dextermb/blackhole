const lodash = require('lodash')
const constant = require('../../constants/mail')

const filterPaths = (obj, paths, regexp, replacement) => {
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]
    const original = lodash.get(obj, path)

    obj = lodash.set(
      obj, path,
      original.replace(regexp, replacement)
    )
  }

  return obj
}

const filter = {
  [constant.FILTER.SUBJECT]: (obj, filter, replacement) => {
    const regexp = new RegExp(filter, 'gm')
    const paths = [
      'subject'
    ]

    // Filter basic paths
    obj = filterPaths(obj, paths, regexp, replacement)

    // Filter subject in headers
    if (obj.headers && obj.headers.dataType) {
      const header = lodash.findIndex(obj.headers, h => h[0] === 'subject')
      if (header !== -1) {
        const path = `headers.value[${header}][1]`
        const original = lodash.get(obj, path)

        obj = lodash.set(
          obj, path,
          original.replace(regexp, replacement)
        )
      }
    }

    // Filter subject in headerLines
    const headerLine = lodash.indexOf(lodash.map(obj.headerLines, 'key'), 'subject')
    if (headerLine !== -1) {
      const path = `headerLines[${headerLine}].line`
      const original = lodash.get(obj, path)

      obj = lodash.set(
        obj, path,
        original.replace(regexp, replacement)
      )
    }

    return obj
  },
  [constant.FILTER.CONTENT]: (obj, filter, replacement) => {
    const regexp = new RegExp(filter, 'gm')
    const paths = [
      'text',
      'textAsHtml'
    ]

    // Filter basic paths
    obj = filterPaths(obj, paths, regexp, replacement)

    return obj
  }
}

module.exports = filter
