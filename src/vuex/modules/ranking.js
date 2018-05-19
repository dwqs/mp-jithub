import awaitTo from 'async-await-error-handling';

import * as CONSTANT from '../mutation-types';
import api from '@src/network/api';

const state = {
    items: [],
    loading: true,
    page: 1,
    lang: '',
    perPage: 15
};

const getters = {
    getRankingState (state) {
        return state;
    }
};

const actions = {
    async getRankingData ({ commit, state }, payload) {
        const params = {
            page: (payload && payload.page) ? payload.page : 1,
            sort: 'followers',
            q: state.lang ? `location:China language:${state.lang}` : `location:China`,
            /* eslint-disable camelcase */
            per_page: state.perPage
        };

        const [err, res] = await awaitTo(api.getRankingItems(params));
        
        if (!err && res.statusCode <= 400) {
            const items = [].concat(res.data.items);
            const result = (payload && payload.page) ? [].concat(state.items) : [];
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const [e, r] = await awaitTo(api.getUserInfo(item.login));
                if (!e) {
                    const d = r.data;
                    item['meta_data'] = {
                        name: d.name,
                        location: d.location ? d.location : '',
                        email: d.email ? d.email : '',
                        repos: d['public_repos'],
                        followers: d.followers
                    };
                } else {
                    item['meta_data'] = {
                        name: '',
                        location: '',
                        email: '',
                        repos: -1,
                        followers: -1
                    };
                }
                result.push(item);
            }
            commit({
                type: CONSTANT.GET_RANK_DATA,
                res: result,
                page: (payload && payload.page) ? payload.page : 1
            });
        } else {
            commit({
                type: CONSTANT.GET_RANK_DATA,
                res: []
            });
        }
    },

    setRankLang ({ commit }, payload) {
        commit({
            type: CONSTANT.SET_RANK_LANG,
            value: payload
        });
    }
};

const mutations = {
    [CONSTANT.GET_RANK_DATA] (state, payload) {
        state.loading = false;
        state.page = payload.page;
        state.items = [].concat(payload.res);
    },
    [CONSTANT.SET_RANK_LANG] (state, payload) {
        if (payload.value !== state.lang) {
            state.lang = payload.value;
            state.loading = true;
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
