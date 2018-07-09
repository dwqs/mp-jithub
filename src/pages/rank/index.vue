<template>
    <div class="github-rank-wrap">
        <top-header title="Ranking in China"></top-header>
        <div class="show-query-info">
            <span class="picker lang" @click="setLanguages">{{ranking.lang ? ranking.lang : 'All languages'}}</span>
            <span class="picker picker-icon large-margin"></span>
        </div>
        <div class="jithub-list rank-list" v-if="ranking.items.length">
            <scroll-view class="rank-scroll-view" scroll-y @scrolltolower="lower" enable-back-to-top :lower-threshold="150">
                <li class="rank-item" v-for="(item, index) in ranking.items" :key="index" @click="enterUserDetail(item)">
                    <div class="user-avatar">
                        <img :src="item.avatar_url" alt="avatar">
                    </div>
                    <div class="user-meta-data">
                        <div class="user-name">
                            <span class="login-name">{{item.login}}</span>
                            <span class="nick-name">{{item.meta_data.name}}</span>
                        </div>
                        <div class="user-location-email">
                            <span class="user-location">{{item.meta_data.location}}</span>
                            <span class="user-email">{{item.meta_data.email}}</span>
                        </div>
                        <div class="user-meta-info">
                            <span class="user-rank">
                                <img src="/static/images/ranking.png" alt="ranking">
                                {{index + 1}}
                            </span>
                            <span class="user-followers" v-if="item.meta_data.followers >= 0">
                                <img src="/static/images/follower.png" alt="followers">
                                {{item.meta_data.followers}}
                            </span>
                            <span class="user-public-repos" v-if="item.meta_data.repos >= 0">
                                <img src="/static/images/repo.png" alt="repos">
                                {{item.meta_data.repos}}
                            </span>
                        </div>
                    </div>
                </li>
            </scroll-view>
            <div class="loading-next-page" v-if="next">
                <img src="/static/images/refresh.png" alt="refresh">正在加载...
            </div>
        </div>
        <empty :shown="!ranking.items.length && !ranking.loading" ></empty>
        <loading v-if="ranking.loading"></loading>
    </div>
</template>

<script>
    import './index.less';
    import { mapActions, mapGetters } from 'vuex';

    import loading from '@src/components/loading/index.vue';
    import empty from '@src/components/empty/index.vue';
    import topHeader from '@src/components/top-header/index.vue';

    export default {
        data () {
            return {
                userInfo: {},
                next: false,
                lang: ''
            };
        },

        components: {
            loading,
            empty,
            topHeader
        },

        computed: {
            ...mapGetters({
                ranking: 'getRankingState'
            })
        },

        watch: {
            'ranking.lang' (val) {
                this.getRankingData();
            }
        },

        methods: {
            ...mapActions([
                'getRankingData'
            ]),

            lower () {
                if (!this.next) {
                    this.next = true;
                    const page = this.ranking.page + 1;
                    this.getRankingData({
                        page
                    }).then(() => {
                        this.next = false;
                    }).catch(() => {
                        this.next = false;
                    });
                }
            },

            setLanguages () {
                if (!this.next) {
                    wx.navigateTo({
                        url: '../lang/lang?from=ranking'
                    });
                }
            },

            enterUserDetail (user) {
                wx.navigateTo({
                    url: `../user-details/user-details?username=${user.login}`
                });
            }
        },

        onShareAppMessage () {
            return {
                title: 'Jithub Ranking in China',
                desc: 'Jithub Ranking - Github Ranking in China',
                imageUrl: '',
                path: '/pages/rank/rank'
            };
        },

        created () {
            this.getRankingData();
        }
    };
</script>