<template>
    <div class="user-repos-list-wrap">
        <div class="jithub-list user-repos-list" v-if="reposList.length">
            <scroll-view class="repos-scroll-view" scroll-y @scrolltolower="lower" enable-back-to-top :lower-threshold="150">
                <li class="user-repo" v-for="(repo, index) in reposList" :key="index" @click="enterRepoDetail(repo)">
                    <div class="user-repo-name">
                        <h3>{{repo.name}}</h3>
                    </div>
                    <div class="user-repo-desc">{{repo.description}}</div>
                    <div class="user-repo-meta">
                        <span class="repo-lang">
                            <img src="/static/images/lang.png" alt="lang">
                            {{repo.language}}
                        </span>
                        <span class="repo-stars">
                            <img src="/static/images/star.png" alt="star">
                            {{repo.stargazers_count}}
                        </span>
                        <span class="repo-forks">
                            <img src="/static/images/fork.png" alt="fork">
                            {{repo.forks_count}}
                        </span>
                    </div>
                </li>
            </scroll-view>
            <div class="loading-next-page" v-if="next && !pageInfo.isAll">
                <img src="/static/images/refresh.png" alt="refresh">正在加载...
            </div>
            <div class="loading-next-page" v-if="!hasMore">
                No more data
            </div>
        </div>
        <div class="jithub-list empty-data" v-if="!reposList.length && !loading">
            <h3 class="empty-title">
                No Data.
            </h3>
            <p class="empty-desc">
                Maybe some error thing was happened.<br/>
                You can sumbit a issue at https://github.com/dwqs/mp-jithub/issues.
            </p>
        </div>
        <loading v-if="loading"></loading>
    </div>
</template>

<script>
    import './index.less';
    import { mapActions, mapGetters } from 'vuex';

    import loading from '@src/components/loading/index.vue';

    export default {
        data () {
            return {
                userInfo: {},
                loading: false,
                next: false,
                hasMore: true
            };
        },

        components: {
            loading
        },

        computed: {
            ...mapGetters({
                reposList: 'getUserRepoList',
                userDetails: 'getUserInfo',
                pageInfo: 'getPageInfo'
            })
        },

        methods: {
            ...mapActions([
                'getUserRepos',
                'resetData'
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

            lower () {
                if (this.pageInfo.isAll) {
                    this.hasMore = false;
                    return;
                }

                if (!this.next) {
                    this.next = true;
                    this.getUserRepos(this.userDetails.login || 'ruanyf')
                        .then(() => {
                            this.next = false;
                        }).catch(() => {
                            this.next = false;
                        });
                }
            },

            resetLoading () {
                this.loading = false;
            },  

            enterRepoDetail (repo) {
                const reponame = repo.name;
                const username = repo.owner.login;
                try {
                    wx.setStorageSync('repo-detail', JSON.stringify({
                        username,
                        reponame
                    }));
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
                    url: `../repo-details/repo-details?from=owner`
                });
            }
        },

        mounted () {
            this.getUserInfo();
            wx.setNavigationBarTitle({
                title: this.userDetails.login
            });
            this.loading = true;
            this.getUserRepos(this.userDetails.login).then(this.resetLoading).catch(this.resetLoading);
        },

        onUnload () {
            this.resetData();
        }
    };
</script>