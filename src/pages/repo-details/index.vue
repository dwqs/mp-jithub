<template>
    <div class="repo-details-page">
        <div class="common-flex repo-summary">
            <div class="summary-item repo-owner-avatar">
                <img v-show="loaded && repoInfo['avatar_url']" :src="repoInfo['avatar_url']" @load="load">
                <img v-if="!loaded" src="/static/images/avatar-default.png">
            </div>
            <div class="summary-item repo-name">
                {{repoInfo.name ? repoInfo.name: 'N/A'}}
            </div>
            <div class="summary-item repo-description">
                {{repoInfo.description ? repoInfo.description : 'N/A'}}
            </div>
        </div>
        <div class="common-flex repo-meta-data">
            <div class="repo-meta">
                <span class="repo-stars">{{repoInfo['stargazers_count'] ? repoInfo['stargazers_count'] : 0}}</span>
                <span>Stargazers</span>
            </div>
            <div class="repo-meta">
                <span class="repo-watchers">{{repoInfo['subscribers_count'] ? repoInfo['subscribers_count'] : 0}}</span>
                <span>Watchers</span>
            </div>
            <div class="repo-meta">
                <span class="repo-forks">{{repoInfo['forks'] ? repoInfo['forks'] : 0}}</span>
                <span>Forks</span>
            </div>
        </div>
        <div class="repo-basic-info">
            <div class="common-flex">
                <span class="flex-item">
                    <img src="/static/images/public.png">
                    {{repoInfo.private ? 'Private': 'Public'}}
                </span>
                <span class="flex-item">
                    <img src="/static/images/lang.png">
                    {{repoInfo.language ? repoInfo.language: 'N/A'}}
                </span>
            </div>
            <div class="common-flex">
                 <span class="flex-item">
                    <img src="/static/images/issue.png">
                    {{repoInfo['open_issues'] ? repoInfo['open_issues']: 0}} Issues
                </span>
                <span class="flex-item">
                    <img src="/static/images/fork.png">
                    {{branches.length}} {{branches.length > 1 ? 'Branches' : 'Branch'}}
                </span>
            </div>
            <div class="common-flex">
                <span class="flex-item">
                    <img src="/static/images/date.png">
                    {{repoInfo['created_date'] ? repoInfo['created_date'] : 'N/A'}}
                </span>
                <span class="flex-item">
                    <img src="/static/images/tool.png">
                    {{repoInfo['format_size'] ? repoInfo['format_size'] : 'N/A'}}
                </span>
            </div>
            <div class="common-flex owner" v-if="from !== 'owner'" @click="enterUserDetail">
                <span class="flex-item">
                    <img src="/static/images/owner.png">
                    Owner
                    <span class="more-info">
                        {{repoInfo['owner'] ? repoInfo['owner'].login: 'N/A'}}
                        <i class="right-arrow"></i>
                    </span>
                </span>
            </div>
        </div>
        <div class="repo-basic-info">
            <div class="common-flex">
                <span class="flex-item with-padding" @click="viewReadme">
                    README
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
    import './index.less';
    import { mapActions, mapGetters } from 'vuex';

    import loading from '@src/components/loading/index.vue';
    // #365
    // import rightArrow from '@src/components/right-arrow/index.vue';

    export default {
        data () {
            return {
                userInfo: {},
                loaded: false,
                loading: false,
                repo: {},
                from: '' // 从 user repos list 进来则不显示 owner
            };
        },

        components: {
            loading
        },

        computed: {
            ...mapGetters({
                repoInfo: 'getRepoDetailState',
                branches: 'getBranches'
            })
        },

        methods: {
            ...mapActions([
                'getRepoDetailInfo',
                'getRepoBranches',
                'resetData',
                'getRepoReadmePic',
                'setLoadingStatus',
                'resetContent'
            ]),

            load () {
                this.loaded = true;
            },

            resetLoading () {
                this.loading = false;
            },  

            enterUserDetail () {
                // 从首页列表进来
                if (this.from === 'list') {
                    wx.redirectTo({
                        url: `../user-details/user-details?username=${this.repoInfo['owner'].login}`
                    });
                } else {
                    wx.navigateTo({
                        url: `../user-details/user-details?username=${this.repoInfo['owner'].login}`
                    });
                }
            },

            viewReadme () {
                const { username, reponame } = this.repo;
                wx.navigateTo({
                    url: `../readme/readme?username=${username}&reponame=${reponame}`
                });
            }
        },

        onShareAppMessage () {
            const { username, reponame } = this.repo;
            return {
                title: `${username} / ${reponame}`,
                desc: `${this.repoInfo.description}`,
                imageUrl: '',
                path: `/pages/repo-details/repo-details?from=${this.from}&username=${username}&reponame=${reponame}`
            };
        },

        onShow () {
            const { username, reponame, from } = this.$root.$mp.query;

            /* eslint-disable no-unneeded-ternary */
            this.from = from ? from : '';
            this.repo = {
                username,
                reponame
            };
            
            wx.setNavigationBarTitle({
                title: `${username} / ${reponame}` || 'Jithub'
            });
        },

        mounted () {
            this.loading = true;
            this.getRepoDetailInfo(this.repo).then(this.resetLoading).catch(this.resetLoading);
            this.getRepoBranches(this.repo).then(this.resetLoading).catch(this.resetLoading);
            this.setLoadingStatus(true);
            this.getRepoReadmePic(this.repo);
        },

        onUnload () {
            this.resetData(2);
            this.resetContent(1);
        }
    };
</script>