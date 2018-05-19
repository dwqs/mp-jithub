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
    }
};
