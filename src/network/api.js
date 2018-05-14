import network from './index';

export default {
    async getTrendingRepos (data = {}) {
        const res = await network.get(`/jithub/trending`, data);
        return res;
    },

    async filterTrendingRepos (lang, data = {}) {
        lang = lang.split(' ').map(t => t.toLowerCase()).join('-');
        const res = await network.get(`/jithub/trending/${lang}`, data);
        return res;
    }
};
