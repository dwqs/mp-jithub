import * as CONSTANT from '../mutation-types';

const state = {
    count: 2
};

const getters = {
    getCount (state) {
        return state.count;
    }
}

const actions = {
    increment ({commit}, payload) {
        commit({
            type: CONSTANT.INCREMENT,
        })
    },

    decrement ({commit}, payload) {
        commit({
            type: CONSTANT.DECREMENT,
        })
    }
}

const mutations = {
    [CONSTANT.INCREMENT](state, payload){
        const obj = state;
        obj.count += 1;
    },
    [CONSTANT.DECREMENT](state, payload) {
        const obj = state;
        obj.count -= 1;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}