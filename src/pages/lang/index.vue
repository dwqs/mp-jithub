<template>
    <div class="trending-langs-page">
        <top-header title="Select Language" :back="true"></top-header>
        <div class="lang-filter">
            <input class="filter-text" type="text" 
                @input="valChange"
                :value="val"
                @focus="focused = true" 
                @blur="handleBlur" 
                confirm-type="search" 
                placeholder="Filter Languages"
             />
             <span class="cancel-filter" v-if="focused" @click="cancelFilter">Cancel</span>
        </div>
        <ul class="trending-langs-list">
            <li :class="{ 'lang-item': true, 'selected': lang === selectedLang }" 
                v-for="(lang, index) in langs" :key="index" @click="setCurLang(lang)">
                {{lang}}
                <i class="selected-icon" v-if="lang === selectedLang"></i>
            </li>
        </ul>
    </div>
</template>

<script>
    import './index.less';
    import langs from 'gitlang';
    import { mapActions, mapGetters } from 'vuex';

    import topHeader from '@src/components/top-header/index.vue';

    export default {
        data () {
            const allLangs = [].concat('All Languages', langs);
            return {
                allLangs: allLangs,
                langs: allLangs,
                selectedLang: '',
                focused: false,
                val: '',
                from: ''
            };
        },

        computed: {
            ...mapGetters({
                trending: 'getTrendingState',
                ranking: 'getRankingState'
            })
        },

        components: {
            topHeader
        },

        watch: {
            val (val) {
                if (val) {
                    this.langs = langs.filter(lang => lang.toLowerCase().includes(val.toLowerCase()));
                } else {
                    this.langs = [].concat(this.allLangs);
                }
            }
        },

        methods: {
            ...mapActions([
                'setLang',
                'setRankLang'
            ]),

            setCurLang (lang) {
                this.selectedLang = lang;
                if (this.from === 'trending') {
                    this.setLang(this.selectedLang === 'All Languages' ? '' : this.selectedLang);
                } else if (this.from === 'ranking') {
                    this.setRankLang(this.selectedLang === 'All Languages' ? '' : this.selectedLang);
                } else if (this.from === 'setting') {
                    try {
                        wx.setStorageSync('lang', lang);
                    } catch (e) {
                        wx.showModal({
                            title: '',
                            content: '设置默认语言出错了',
                            showCancel: false,
                            confirmText: '我知道了'
                        });
                    }
                }
                wx.navigateBack({
                    delta: 1
                });
            },

            valChange (e) {
                this.val = e.mp.detail.value;
            },

            cancelFilter () {
                this.val = '';
            },

            handleBlur () {
                // 避免闪烁现象
                setTimeout(() => {
                    this.focused = false;
                }, 300);
            }
        },

        created () {
            this.selectedLang = this.trending.lang ? this.trending.lang : 'All Languages';
        },

        onShow () {
            if (this.$root.$mp.query.from) {
                this.from = this.$root.$mp.query.from;
                if (this.from === 'trending' || this.from === 'ranking') {
                    this.selectedLang = this.from === 'trending' ? this.trending.lang : this.ranking.lang;
                } else if (this.from === 'setting') {
                    try {
                        this.selectedLang = wx.getStorageSync('lang');
                    } catch (e) {

                    }
                }
            }
        }
    };
</script>
