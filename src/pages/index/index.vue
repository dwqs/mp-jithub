<template>
    <div>
        用户信息：{{userInfo.nickName}}
        <loading></loading>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    import loading from '@src/components/loading/index';

    export default {
        data () {
            return {
                userInfo: {}
            };
        },

        components: {
            loading
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

        created () {
            this.getUserInfo();
            this.getTrendingRepos();
            console.log('ssss', typeof Promise);
        }
    };
</script>