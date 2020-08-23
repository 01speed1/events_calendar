const APIPrefix = process.env.NODE_API_PREFIX || '/'

const endpointStringBuilder = (endpointName = '') => `${APIPrefix}/${endpointName}`

module.exports = { endpointStringBuilder }