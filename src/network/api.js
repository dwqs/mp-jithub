import network from './index';
// token: https://developer.github.com/v3/#rate-limiting
import { token } from '../../config/host';

const auth = {
    /* eslint-disable */
    access_token: token
};

export default {
    async getTrendingRepos (data = {}) {
        const res = await network.get(`/jithub/trending`, data);
        return res;
    },

    async filterTrendingRepos (lang, data = {}) {
        lang = lang.split(' ').map(t => t.toLowerCase()).join('-');
        const res = await network.get(`/jithub/trending/${lang}`, data);
        return res;
    },

    async getRankingItems (data) {
        const params = {
            ...data,
            ...auth
        };
        const res = await network.get(`/search/users`, params);
        return res;
    },

    async getUserInfo (username) {
        const res = await network.get(`/users/${username}`, auth);
        return res;
    },

    async getRepoDetailInfo (payload) {
        const { username, reponame } = payload;
        const res = await network.get(`/repos/${username}/${reponame}`, auth);
        return res;
    },

    async getRepoBranches (payload) {
        const { username, reponame } = payload;
        const res = await network.get(`/repos/${username}/${reponame}/branches`, auth);
        return res;
    },

    async getUserReposList (payload, pageSize, page) {
        const res = await network.get(`/users/${payload}/repos`, {
            page,
            /* eslint-disable camelcase */
            per_page: pageSize,
            ...auth
        });
        return res;
    }
};
