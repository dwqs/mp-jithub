import awaitTo from 'async-await-error-handling';

import * as CONSTANT from '../mutation-types';
import api from '@src/network/api';

let lang = '';
let since = '';
wx.clearStorageSync();
try {
    lang = wx.getStorageSync('lang');
    since = wx.getStorageSync('since');
} catch (e) {

}

if (lang) {
    lang = lang === 'All Languages' ? '' : lang;
}

const state = {
    repos: [],
    loading: true,
    lang: lang,
    since: since ? since : 'daily'
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

    setSince ({ commit }, payload) {
        commit({
            type: CONSTANT.SET_SINCE,
            value: payload
        });
    },

    saveSetting ({ commit }, payload) {
        commit({
            type: CONSTANT.SAVE_SETTING,
            value: payload
        });
    },

    setLang ({ commit }, payload) {
        commit({
            type: CONSTANT.SET_LANG,
            value: payload
        });
    },

    async getTrendingRepos ({ commit }, payload) {
        const [err, res] = await awaitTo(api.getTrendingRepos(payload));
        
        if (!err && res.data.code === 0) {
            commit({
                type: CONSTANT.GET_TRNEDING_REPOS,
                res: res.data.repos
            });
        } else {
            commit({
                type: CONSTANT.GET_TRNEDING_REPOS,
                res: []
            });
        }
    },

    async filterTrendingRepos ({ commit, state }, payload) {
        const [err, res] = await awaitTo(api.filterTrendingRepos(state.lang, { since: state.since }));
        
        if (!err && res.data.code === 0) {
            commit({
                type: CONSTANT.GET_TRNEDING_REPOS,
                res: res.data.repos
            });
        } else {
            commit({
                type: CONSTANT.GET_TRNEDING_REPOS,
                res: []
            });
        }
    },

    async filterTrendingReposBySetting ({ commit, state }, payload) {
        const { lang, since } = payload;
        const [err, res] = await awaitTo(api.filterTrendingRepos(lang, { since }));
        
        if (!err && res.data.code === 0) {
            commit({
                type: CONSTANT.GET_TRNEDING_REPOS,
                res: res.data.repos
            });
        } else {
            commit({
                type: CONSTANT.GET_TRNEDING_REPOS,
                res: []
            });
        }
    }
};

const mutations = {
    [CONSTANT.GET_TRNEDING_REPOS] (state, payload) {
        state.loading = false;
        state.repos = payload.res;
    },

    [CONSTANT.SET_TRNEDING_LOADING] (state, payload) {
        state.loading = payload.value;
    },

    [CONSTANT.SET_SINCE] (state, payload) {
        state.since = payload.value;
        state.loading = true;
    },

    [CONSTANT.SET_LANG] (state, payload) {
        if (payload.value !== state.lang) {
            state.lang = payload.value;
            state.loading = true;
        }
    },

    [CONSTANT.SAVE_SETTING] (state, payload) {
        const { since, lang } = payload.value;
        since && (state.since = since);
        if (lang) {
            lang === 'All Languages' ? (state.lang = '') : (state.lang = lang);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
