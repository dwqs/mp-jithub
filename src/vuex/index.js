import Vue from 'vue';
import Vuex from 'vuex';

import trending from './modules/trending';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        trending
    },
    strict: false
});
