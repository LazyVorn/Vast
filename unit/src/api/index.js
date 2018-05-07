const baseUrl = ''
const apiVersion = '/v1'
const api = {
    getDicList: (projectId) => `${baseUrl}/unit/ability/list?projectId=${projectId}`,
    editDic: (userId) => `${baseUrl}/unit/ability?userId=${userId}`,
    delDic: (ids, userId, projectId) => `${baseUrl}/unit/ability?ids=${ids}&userId=${userId}&projectId=${projectId}`,
    editTag: (userId) => `${baseUrl}/unit/ability/tag?userId=${userId}`,
    delTag: (ids, userId, projectId) => `${baseUrl}/unit/ability/tag/?userId=${userId}&ids=${ids}&projectId=${projectId}`,
    getAllTage: (projectId) => `${baseUrl}/unit/ability/tag/list?projectId=${projectId}`,
}
export function url(name, _store, params = {}) {
    if (_store) {
        params.id = _store.state.projectId;
    }
    return baseUrl + apiVersion + api[name](params);
}
export default api