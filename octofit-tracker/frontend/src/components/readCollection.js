export function readCollection(payload) {
  if (Array.isArray(payload)) return payload

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) return payload.results
    if (Array.isArray(payload.data)) return payload.data
    if (Array.isArray(payload.items)) return payload.items
  }

  throw new TypeError('API response must be an array or contain a results, data, or items array')
}
