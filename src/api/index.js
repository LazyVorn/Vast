const baseUrl = '/api'
const apiVersion = '/v1'
const api = {
    reqTJ: (projectId, code) => `${baseUrl}/v1/projects/${projectId}/tj/${code}`
}
export function rul(name, _store, params = {}) {
    if (_store) {
        params.id = _store.state.projectId
    }
    return baseUrl + apiVersion + api[name](params)
}
export default api