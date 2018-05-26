<template>
    <div class="user-details-page">
        <div class="common-flex user-summary">
            <div class="summary-item user-avatar">
                <img v-show="loaded && userDetails['avatar_url']" :src="userDetails['avatar_url']" @load="load">
                <img v-if="!loaded" src="/static/images/avatar-default.png">
            </div>
            <div class="summary-item user-login-name">
                {{userDetails.login ? userDetails.login : 'N/A'}}
            </div>
            <div class="summary-item user-bio">
                {{userDetails.bio ? userDetails.bio : 'N/A'}}
            </div>
        </div>
        <div class="common-flex user-meta-data">
            <div class="user-meta">
                <span class="user-repos">{{userDetails['public_repos'] ? userDetails['public_repos'] : 0}}</span>
                <span>Repos</span>
            </div>
            <div class="user-meta">
                <span class="user-follower">{{userDetails['followers'] ? userDetails['followers'] : 0}}</span>
                <span>Followers</span>
            </div>
            <div class="user-meta">
                <span class="user-following">{{userDetails['following'] ? userDetails['following'] : 0}}</span>
                <span>Following</span>
            </div>
        </div>
        <div class="user-basic-info">
            <div class="common-flex">
                <span class="flex-item">
                    <img src="/static/images/email.png">
                    {{userDetails['email'] ? userDetails['email'] : 'N/A'}}
                </span>
            </div>
            <div class="common-flex">
                <span class="flex-item">
                    <img src="/static/images/company.png">
                    {{userDetails['company'] ? userDetails['company'] : 'N/A'}}
                </span>
            </div>
            <div class="common-flex">
                <span class="flex-item">
                    <img src="/static/images/location.png">
                    {{userDetails['location'] ? userDetails['location'] : 'N/A'}}
                </span>
            </div>
            <div class="common-flex">
                <span class="flex-item">
                    <img src="/static/images/date.png">
                    {{userDetails['created_date'] ? userDetails['created_date'] : 'N/A'}}
                </span>
            </div>  
            <div class="common-flex owner" @click="enterRepoList">
                <span class="flex-item">
                    <img src="/static/images/repo.png">
                    Repositories
                    <span class="more-info">
                        <i class="right-arrow"></i>
                    </span>
                </span>
            </div>
        </div>
        <loading v-if="loading"></loading>
    </div>
</template>

<script>
    import '../repo-details/index.less';
    import { mapActions, mapGetters } from 'vuex';

    import loading from '@src/components/loading/index.vue';

    export default {
        data () {
            return {
                userInfo: {},
                loaded: false,
                loading: false,
                username: ''
            };
        },

        components: {
            loading
        },

        computed: {
            ...mapGetters({
                userDetails: 'getUserInfo',
                branches: 'getBranches'
            })
        },

        methods: {
            ...mapActions([
                'getUserDefailtInfo'
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

            load () {
                this.loaded = true;
            },

            resetLoading () {
                this.loading = false;
            },  

            enterRepoList () {
                wx.navigateTo({
                    url: `../repos-list/repos-list`
                });
            }
        },

        onShareAppMessage () {
            return {
                title: `${this.username} 的 Jithub 主页`,
                desc: `这是 ${this.username} 的 Jithub 主页`,
                imageUrl: '',
                path: `/pages/user-details/user-details?username=${this.username}`
            };
        },

        onShow () {
            const { username } = this.$root.$mp.query;
            wx.setNavigationBarTitle({
                title: `${username}` || 'Jithub'
            });
            this.username = username;
        },

        mounted () {
            this.getUserInfo();
            this.loading = true;
            this.getUserDefailtInfo(this.username).then(this.resetLoading).catch(this.resetLoading);
        }
    };
</script>