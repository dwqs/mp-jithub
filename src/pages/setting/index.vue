<template>
    <div class="setting-page">
        <top-header title="Setting" :back="true"></top-header>
        <div class="setting-wrap">
            <div class="setting-info">
                <p class="setting-tip">选择默认语言</p>
                <div class="setting-flex" @click="setDefLang">
                    {{lang ? lang : 'All Languages'}}
                    <span class="more-info">
                        <i class="right-arrow"></i>
                    </span>
                </div>
            </div>
            <div class="setting-info">
                <p class="setting-tip">选择默认周期</p>
                <picker :range="dates" @change="dateChange" :value="val">
                    <div class="setting-flex">
                        {{since ? since : 'daily'}}
                        <span class="more-info">
                            <i class="right-arrow"></i>
                        </span>
                    </div>
                </picker>
            </div>
            <p class="setting-empty"></p>
            <div class="setting-info">
                <p class="setting-tip">关于</p>
                <div class="setting-flex">
                    源代码
                    <span class="more-info">
                        https://github.com/dwqs/mp-jithub
                    </span>
                </div>
                <div class="setting-flex no-margin">
                    问题反馈
                    <span class="more-info">
                        https://github.com/dwqs/mp-jithub/issues
                    </span>
                </div>
                <div class="setting-flex no-margin">
                    当前版本
                    <span class="more-info">
                        v1.1.6
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { setStorageSync, getStorageSync } from '@src/utils/index';
    import topHeader from '@src/components/top-header/index.vue';

    export default {
        data () {
            return {
                dates: ['daily', 'weekly', 'monthly'],
                lang: '',
                val: 0,
                since: 'daily'
            };
        },

        methods: {
            dateChange (e) {
                this.val = e.mp.detail.value;
                this.since = this.dates[this.val];
                setStorageSync('since', this.since);
            },

            setDefLang () {
                wx.navigateTo({
                    url: '../lang/lang?from=setting'
                });
            }
        },

        components: {
            topHeader
        },

        onShow () {
            if (getStorageSync('lang')) {
                const l = getStorageSync('lang');
                this.lang = l === 'All Languages' ? '' : l;
            }

            if (getStorageSync('since')) {
                this.since = getStorageSync('since');
            }

            const index = this.dates.indexOf(this.since);
            this.val = index > -1 ? index : 0;
        }
    };
</script>

<style lang="less">
    .setting-wrap {
        position: absolute;
        top: 115rpx;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f6f8f8;
        padding-top: 25rpx;
    }

    .setting-info {
        font-size: 24rpx;
        margin-top: 25rpx;
        .setting-tip {
            color: rgb(121, 117, 117);
            margin-left: 15rpx;
        }
    }

    .setting-flex {
        position: relative;
        display: flex;
        align-items: center;
        height: 75rpx;
        background: #fff;
        margin-top: 15rpx;
        padding-left: 15rpx;
        &.no-margin {
            margin: 0;
            border-top: 1rpx solid #e1e4e8;
        }
    }

    .setting-empty {
        margin: 25rpx 0;
        overflow: hidden;
    }
</style>
