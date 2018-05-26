import awaitTo from 'async-await-error-handling';

import * as CONSTANT from '../mutation-types';
import api from '@src/network/api';
import { formatDateToString, formatSize } from '@src/utils/index';

const state = {
    repoInfo: {},
    branches: [],
    userInfo: {},
    userRepoList: []
};

const getters = {
    getRepoDetailState (state) {
        return state.repoInfo;
    },

    getBranches (state) {
        return state.branches;
    },

    getUserInfo (state) {
        return state.userInfo;
    },

    getUserRepoList (state) {
        return state.userRepoList;
    }
};

const actions = {
    async getRepoDetailInfo ({ commit }, payload) {
        const [err, res] = await awaitTo(api.getRepoDetailInfo(payload));
        if (!err && res.statusCode <= 400) {
            res.data['created_date'] = formatDateToString(new Date(res.data['created_at']));
            res.data['format_size'] = formatSize(res.data['size']);
            res.data['avatar_url'] = res.data['owner']['avatar_url'];
            commit({
                type: CONSTANT.GET_REPO_DETAIL,
                res: res.data
            });
        } else {
            commit({
                type: CONSTANT.GET_REPO_DETAIL,
                res: undefined
            });
        }
        return res;
    },

    async getRepoBranches ({ commit }, payload) {
        const [err, res] = await awaitTo(api.getRepoBranches(payload));
        if (!err && res.statusCode <= 400) {
            commit({
                type: CONSTANT.GET_REPO_BRANCHES,
                res: res.data
            });
        } else {
            commit({
                type: CONSTANT.GET_REPO_BRANCHES,
                res: undefined
            });
        }
        return res;
    },

    async getUserDefailtInfo ({ commit }, payload) {
        const [err, res] = await awaitTo(api.getUserInfo(payload));
        if (!err && res.statusCode <= 400) {
            res.data['created_date'] = formatDateToString(new Date(res.data['created_at']));
            commit({
                type: CONSTANT.GET_USER_DETAIL,
                res: res.data
            });
        } else {
            commit({
                type: CONSTANT.GET_USER_DETAIL,
                res: undefined
            });
        }
        return res;
    }
};

const mutations = {
    [CONSTANT.GET_REPO_DETAIL] (state, payload) {
        if (payload.res) {
            state.repoInfo = payload.res;
        }
    },
    [CONSTANT.GET_REPO_BRANCHES] (state, payload) {
        if (payload.res) {
            state.branches = [].concat(payload.res);
        }
    },
    [CONSTANT.GET_USER_DETAIL] (state, payload) {
        if (payload.res) {
            state.userInfo = payload.res;
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
