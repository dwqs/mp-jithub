import network from './index';

export default {
    async getTrendingRepos (data = {}) {
        const res = await network.get(`/jithub/trending`, data);
        return res;
    }
};
