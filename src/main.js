import Vue from 'vue';
import App from './app';
import store from './vuex/index';

Vue.prototype.$store = store;
Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();

export default {
    config: {
        pages: [
            '^pages/index/index'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'Jithub',
            navigationBarTextStyle: 'black'
        }
    }
};
