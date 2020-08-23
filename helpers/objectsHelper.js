
const isEmpty = (object = {}) => JSON.stringify(object) === JSON.stringify({})
const hasSomething = (object = {}) => !isEmpty(object)

module.exports = { isEmpty, hasSomething }