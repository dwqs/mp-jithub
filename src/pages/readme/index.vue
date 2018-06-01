<template>
    <div class="repo-readme-wrap">
        <img @click="preview" class="readme-img" v-show="loaded" :style="{height: size.height + 'rpx'}" 
            :src="pic.url" @error="loadError" @load="loadImg">
        <empty :shown="!loading && !!pic.error" :desc="pic.error"></empty>
        <empty :shown="error" desc="内容加载失败"></empty>   
    </div>
</template>

<script>
    import './index.less';
    import { mapActions, mapGetters } from 'vuex';

    import empty from '@src/components/empty/index.vue';

    export default {
        data () {
            return {
                // image
                size: {
                    
                },
                error: false,
                loaded: false
            };
        },

        components: {
            empty
        },

        computed: {
            ...mapGetters({
                pic: 'getReadmePic',
                loading: 'getLoadingStatus'
            })
        },

        watch: {
            loading (val) {
                if (!val) {
                    wx.hideLoading();
                }
            }
        },

        methods: {
            ...mapActions([
                'resetContent',
                'getRepoReadmePic',
                'setLoadingStatus'
            ]),

            resetLoading () {
                this.loading = false;
            },

            loadImg (e) {
                this.size = {
                    width: e.target.width,
                    height: e.target.height
                };
                this.loaded = true;
            },

            loadError () {
                this.loaded = false;
                this.error = true;
            },

            preview () {
                if (this.loaded) {
                    wx.previewImage({
                        current: this.pic.url, // 当前显示图片的http链接
                        urls: [this.pic.url] // 需要预览的图片http链接列表
                    });
                }
            }
        },

        onShow () {
            const { username, reponame } = this.$root.$mp.query;
            wx.showLoading({
                title: '正在截图...',
                mask: true
            });
            if (!this.loading) {
                this.setLoadingStatus(true);
                this.getRepoReadmePic({
                    username,
                    reponame
                });
            }
        },

        onUnload () {
            this.resetContent(1);
        }
    };
</script>