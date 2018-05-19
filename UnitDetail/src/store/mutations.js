import * as types from './mutation-types'

export default {
    [types.INIT_PROJECT_ID](state,id) {
        state.projectId = id
    },
    [types.INIT_ALL_TAGS](state,arr) {
        state.allTags = arr
    }
}