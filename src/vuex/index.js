import Vue from 'vue';
import Vuex from 'vuex';

import trending from './modules/trending';
import ranking from './modules/ranking';
import details from './modules/details';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        trending,
        ranking,
        details
    },
    strict: false
});
