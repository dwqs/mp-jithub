import Vue from 'vue';
import App from './App';
import store from './vuex/index';

Vue.prototype.$store = store;
Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();

export default {
    // 这个字段走 app.json
    config: {
        pages: [
            'pages/logs/logs', 
            '^pages/index/index', 
            'pages/counter/counter'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        }
    }
}
