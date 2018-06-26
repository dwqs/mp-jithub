<template>
    <div class="repo-readme-wrap">
        <rich-text v-if="!error" :nodes="nodes"></rich-text>   
        <empty :shown="error" :desc="msg"></empty>   
    </div>
</template>

<script>
    import './index.less';
    import { mapActions, mapGetters } from 'vuex';
    import 'prismjs/themes/prism.css';
    import MpvueMarkdownParser from 'mpvue-markdown-parser';
    import 'mpvue-markdown-parser/dist/index.css';

    import { Base64 } from 'js-base64';

    import empty from '@src/components/empty/index.vue';

    export default {
        data () {
            return {
                error: false,
                loading: false,
                nodes: [],
                msg: '内容加载失败'
            };
        },

        components: {
            empty
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
                'getRepoReadme'
            ]),

            resetLoading () {
                this.loading = false;
            }
        },

        mounted () {
            const { username, reponame } = this.$root.$mp.query;
            wx.showLoading({
                title: '正在加载...',
                mask: true
            });

            this.loading = true;
            this.getRepoReadme({
                username,
                reponame
            }).then((res) => {
                if (res.statusCode === 404) {
                    this.error = true;
                    this.loading = false;
                    this.msg = 'There is no README.md file in this repository';
                    return;
                }
                const md = Base64.decode(res.data.content);
                this.nodes = MpvueMarkdownParser(md);
                this.loading = false;
            }).catch(e => {
                this.error = true;
                this.loading = false;
            });
        },

        onUnload () {
            this.nodes = [];
            this.error = false;
            this.loading = false;
        }
    };
</script>