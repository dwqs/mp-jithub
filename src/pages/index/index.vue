<template>
    <div class="trending-wrap">
        <!-- <refresh v-if="refreshing"></refresh> -->
        <div class="show-query-info">
            <span class="picker lang" @click="setLanguages">{{trending.lang ? trending.lang : 'All languages'}}</span>
            <span class="picker picker-icon large-margin"></span>
            <picker :range="dates" class="picker" @change="dateChange">
                <span class="date">{{trending.since}}</span>
            </picker>
            <span class="picker picker-icon"></span>
        </div>
        <ul class="jithub-list trending-list" v-if="trending.repos.length">
            <li class="trending-item" v-for="(repo, index) in trending.repos" :key="index" @click="enterRepo(repo)">
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
        </ul>
        <div class="jithub-list empty-data" v-if="!trending.repos.length && !trending.loading">
            <h3 class="empty-title">
                It looks like we don’t have any trending repositories for {{trending.lang}}.
            </h3>
            <p class="empty-desc">
                If you create a {{trending.lang}} repository on Github, you can really own the place.<br/>
                We’d even let it slide if you started calling yourself the mayor.
            </p>
        </div>
        <loading v-if="trending.loading"></loading>
    </div>
</template>

<script>
    import './index.less';
    import { mapActions, mapGetters } from 'vuex';

    import loading from '@src/components/loading/index.vue';
    // #365
    // import refresh from '@src/components/refresh/index.vue';

    export default {
        data () {
            return {
                userInfo: {},
                refreshing: false,
                dates: ['daily', 'weekly', 'monthly']
            };
        },

        components: {
            loading
        },

        computed: {
            ...mapGetters({
                trending: 'getTrendingState'
            })
        },

        watch: {
            'trending.lang' (val) {
                if (!val) {
                    this.getTrendingRepos({
                        since: this.trending.since
                    });
                } else {
                    this.filterTrendingRepos();
                }
            }
        },

        methods: {
            ...mapActions([
                'setTrendingLoading',
                'getTrendingRepos',
                'filterTrendingRepos',
                'setSince'
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
            },

            setLanguages () {
                wx.navigateTo({
                    url: '../lang/lang?from=trending'
                });
            },

            enterRepo (repo) {                
                try {
                    wx.setStorageSync('repo-detail', JSON.stringify(repo));
                } catch (e) {
                    wx.showModal({
                        title: '',
                        content: '可能出现了一些错误, 请稍后再试',
                        showCancel: false,
                        confirmText: '我知道了'
                    });
                    return;
                }
                wx.navigateTo({
                    url: `../repo-details/repo-details`
                });
            },

            dateChange (e) {
                const index = e.mp.detail.value;
                this.setSince(this.dates[index]);
                if (this.trending.lang) {
                    this.filterTrendingRepos();
                } else {
                    this.getTrendingRepos({
                        since: this.dates[index]
                    });
                }
            }
        },

        // onPullDownRefresh () {
        //     wx.showNavigationBarLoading();
        //     this.refreshing = true;
        //     this.getTrendingRepos().then(() => {
        //         wx.hideNavigationBarLoading();
        //         this.refreshing = false;
        //         wx.stopPullDownRefresh();
        //     });
        // },

        onShareAppMessage () {
            return {
                title: 'Jithub Trending',
                desc: 'Jithub Trending - 通过小程序随时随地查看 Github Trending 榜单',
                imageUrl: '',
                path: '/pages/index/index'
            };
        },

        created () {
            this.getUserInfo();
            // this.setTrendingLoading(true);
            this.getTrendingRepos();
        }
    };
</script>