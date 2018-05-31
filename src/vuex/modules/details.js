import awaitTo from 'async-await-error-handling';

import * as CONSTANT from '../mutation-types';
import api from '@src/network/api';
import { formatDateToString, formatSize } from '@src/utils/index';

const state = {
    repoInfo: {},
    branches: [],
    userInfo: {},
    userRepoList: [],
    pageInfo: {
        page: 1,
        pageSize: 30,
        isAll: false
    }
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
    },

    getPageInfo (state) {
        return state.pageInfo;
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
    },

    async getUserRepos ({ commit, state }, payload) {
        const { pageSize, page } = state.pageInfo;
        const [err, res] = await awaitTo(api.getUserReposList(payload, pageSize, page));
        if (!err && res.statusCode <= 400) {
            commit({
                type: CONSTANT.GET_USER_REPO_LIST,
                res: res.data
            });
        } else {
            commit({
                type: CONSTANT.GET_USER_REPO_LIST,
                res: undefined
            });
        }
        return res;
    },

    resetData ({ commit, state }, payload) {
        commit({
            type: CONSTANT.RESET_DETAIL_INFO,
            res: payload
        });
    }
};

const mutations = {
    [CONSTANT.RESET_DETAIL_INFO] (state, payload) {
        if (payload.res === 1) {
            // user detail
            state.userInfo = {};
        } else if (payload.res === 2) {
            // repo detail
            state.repoInfo = {};
            state.branches = [];
        } else if (payload.res === 3) {
            // repos list
            state.pageInfo = {
                page: 1,
                pageSize: 30,
                isAll: false
            };
            state.userRepoList = [];
        }
    },
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
    },

    [CONSTANT.GET_USER_REPO_LIST] (state, payload) {
        const { pageSize, page } = state.pageInfo;
        if (payload.res) {
            state.userRepoList = [].concat(state.userRepoList, payload.res);
            state.pageInfo = {
                page: payload.res.length < pageSize ? page : page + 1,
                pageSize,
                isAll: payload.res.length < pageSize
            };
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
