<template>
    <div>
        用户信息：{{userInfo.nickName}}
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    export default {
        data () {
            return {
                userInfo: {}
            };
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