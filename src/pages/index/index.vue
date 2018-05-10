<template>
    <div class="trending-wrap">
        <refresh v-if="refreshing"></refresh>
        <scroll-view class="trending-repos-list" scroll-y enable-back-to-top>
            <li class="trending-item" v-for="(repo, index) in trending.repos" :key="index">
                <div class="repo-name">
                    <h3>{{repo.username}} / {{repo.reponame}}</h3>
                </div>
                <div class="repo-desc">{{repo.description}}</div>
                <div class="repo-meta">
                    <span class="repo-lang" v-if="repo.lang">
                        <img src="/static/images/lang.png" alt="lang">
                        {{repo.lang}}
                    </span>
                    <span class="repo-stars">
                        <img src="/static/images/star.png" alt="star">
                        {{repo.stars}}
                    </span>
                    <span class="repo-forks">
                        <img src="/static/images/fork.png" alt="fork">
                        {{repo.forks}}
                    </span>
                    <span class="repo-stars-text" v-if="repo.starsText">
                        <img src="/static/images/star.png" alt="star">
                        {{repo.starsText}}
                    </span>
                </div>
            </li>
        </scroll-view>
        <loading v-if="trending.loading"></loading>
    </div>
</template>

<script>
    import './index.less';
    import { mapActions, mapGetters } from 'vuex';
    // #365
    import loading from '@src/components/loading/index.vue';
    import refresh from '@src/components/refresh/index.vue';

    export default {
        data () {
            return {
                userInfo: {},
                refreshing: false
            };
        },

        components: {
            loading,
            refresh
        },

        computed: {
            ...mapGetters({
                trending: 'getTrendingState'
            })
        },

        methods: {
            ...mapActions([
                'setTrendingLoading',
                'getTrendingRepos'
            ]),
            getUserInfo () {
                // 调用登录接口
                wx.login({
                    success: () => {
                        wx.getUserInfo({
                            success: (res) => {
                                this.userInfo = res.userInfo;
                            }
                        });
                    }
                });
            }
        },

        onPullDownRefresh () {
            wx.showNavigationBarLoading();
            this.refreshing = true;
            this.getTrendingRepos().then(() => {
                wx.hideNavigationBarLoading();
                this.refreshing = false;
                wx.stopPullDownRefresh();
            });
        },

        created () {
            this.getUserInfo();
            this.setTrendingLoading(true);
            this.getTrendingRepos();
        }
    };
</script>