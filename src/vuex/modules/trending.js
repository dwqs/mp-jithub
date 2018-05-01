import awaitTo from 'async-await-error-handling';

import * as CONSTANT from '../mutation-types';
import api from '@src/network/api';

const state = {
    repos: [],
    loading: false
};

const getters = {
    getTrendingState (state) {
        return state;
    }
};

const actions = {
    setTrendingLoading ({ commit }, payload) {
        commit({
            type: CONSTANT.SET_TRNEDING_LOADING,
            value: payload
        });
    },

    async getTrendingRepos ({ commit }, payload) {
        const [err, res] = await awaitTo(api.getTrendingRepos());
        console.log('1111111', res);
        if (err) {

        } else {

        }
        commit({
            type: CONSTANT.GET_TRNEDING_REPOS,
            res: []
        });
    }
};

const mutations = {
    [CONSTANT.GET_TRNEDING_REPOS] (state, payload) {

    },

    [CONSTANT.SET_TRNEDING_LOADING] (state, payload) {
        state.loading = payload;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
