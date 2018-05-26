import Vue from 'vue';
import App from './app';
import store from './vuex/index';
import './common.less';

Vue.prototype.$store = store;
Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();

export default {
    config: {
        pages: [
            '^pages/index/index',
            'pages/lang/lang',
            'pages/rank/rank',
            'pages/repo-details/repo-details',
            'pages/user-details/user-details'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#FFFFFF',
            navigationBarTitleText: 'Jithub',
            navigationBarTextStyle: 'black'
        },
        tabBar: {
            color: '#7A7E83',
            selectedColor: '#2AB62F',
            borderStyle: 'black',
            backgroundColor: '#FFFFFF',
            list: [{
                pagePath: 'pages/index/index',
                iconPath: '/static/images/trending.png',
                selectedIconPath: '/static/images/trending-selected.png',
                text: 'Trending'
            }, {
                pagePath: 'pages/rank/rank',
                iconPath: '/static/images/rank.png',
                selectedIconPath: '/static/images/rank-selected.png',
                text: 'Ranking'
            }]
        }
    }
};
