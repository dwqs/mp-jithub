<template>
    <div class="custom-top-header">
        <div class="icon-wrap" @click="pageNavigation">
            <img  class="back-icon" v-if="back" src="/static/images/back.png" />
            <img v-if="isIndex" src="/static/images/setting.png" />
        </div>
        <h3 class="page-title" v-text="title"></h3>
    </div>
</template>

<script>
    export default {
        props: {
            isIndex: {
                type: Boolean,
                default: false
            },

            back: {
                type: Boolean,
                default: false
            },

            title: {
                type: 'string',
                default: 'Trending'
            }
        },

        methods: {
            pageNavigation () {
                if (this.isIndex) {
                    // 跳到设置页
                    wx.navigateTo({
                        url: '../setting/setting'
                    });
                }

                if (this.back) {
                    // 返回
                    wx.navigateBack({
                        delta: 1
                    });
                }
            }
        }
    };
</script>

<style lang="less">
    .custom-top-header {
        position: fixed;
        z-index: 999;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding-top: 45rpx;
        top: 0;
        left: 0;
        right: 0;
        height: 125rpx;
        font-size: 36rpx;
        background: #fff;
    }
    .icon-wrap {
        position: absolute;
        width: 45rpx;
        height: 45rpx;
        margin-left: 25rpx;
        text-align: center;
        img {
            width: 32rpx;
            height: 32rpx;
            margin-top: 5rpx;
            &.back-icon {
                width: 35rpx;
                height: 35rpx;
            }
        }
    }
    .page-title {
        flex: 1;
        text-align: center;
        font-weight: bold;
        color: #000
    }
</style>
