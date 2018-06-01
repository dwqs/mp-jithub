import awaitTo from 'async-await-error-handling';

import * as CONSTANT from '../mutation-types';
import api from '@src/network/api';

const state = {
    readmePic: {
        error: '',
        url: ''
    },
    loading: false
};

const getters = {
    getReadmePic (state) {
        return state.readmePic;
    },

    getLoadingStatus (state) {
        return state.loading;
    }
};

const actions = {
    setLoadingStatus ({ commit }, payload) {
        commit({
            type: CONSTANT.SET_LOADING_STATUS,
            res: payload
        });
    },

    resetContent ({ commit }, payload) {
        commit({
            type: CONSTANT.RESET_REPO_CONTENTS,
            res: payload
        });
    },

    async getRepoReadmePic ({ commit }, payload) {
        const [err, res] = await awaitTo(api.getReadmePic(payload));
        if (!err && res.data.code === 0) {
            commit({
                type: CONSTANT.GET_REPO_CONTENTS,
                res: 1,
                contents: res.data
            });
        } else {
            commit({
                type: CONSTANT.GET_REPO_CONTENTS,
                res: 1,
                contents: (res && res.data) || {
                    error: 'There is no readme file in this repository'
                }
            });
        }
        return res;
    }
};

const mutations = {
    [CONSTANT.SET_LOADING_STATUS] (state, payload) {
        state.loading = payload.res;
    },

    [CONSTANT.RESET_REPO_CONTENTS] (state, payload) {
        if (payload.res === 1) {
            state.readmePic = {
                error: '',
                url: ''
            };
        }
    },
    [CONSTANT.GET_REPO_CONTENTS] (state, payload) {
        if (payload.contents) {
            if (payload.res === 1) {
                state.readmePic = payload.contents;
                state.loading = false;
            }
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
