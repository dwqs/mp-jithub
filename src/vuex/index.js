import Vue from 'vue';
import Vuex from 'vuex';

import trending from './modules/trending';
import ranking from './modules/ranking';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        trending,
        ranking
    },
    strict: false
});
