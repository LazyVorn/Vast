const baseUrl = '/api'
const apiVersion = '/v1'
const api = {
    login: () => `${baseUrl}/user/log`,
    sign: () => `${baseUrl}/user`,
    precondition: () => `${baseUrl}/user/precondition`,
    fetchProList: () => `${baseUrl}/project/list`,
    addPro: () => `${baseUrl}/project`
}
export function rul(name, _store, params = {}) {
    if (_store) {
        params.id = _store.state.projectId
    }
    return baseUrl + api[name](params)
        // return baseUrl + apiVersion + api[name](params)
}
export default api