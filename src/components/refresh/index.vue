<template>
    <div class="pull-refresh">
        <img src="/static/images/refresh.png" alt="refresh">
    </div>
</template>

<style lang="less">
    @keyframes refresh {
        100% {
            transform: rotate(360deg)
        }
    }

    .pull-refresh {
        position: absolute;
        top: -100rpx;
        right: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100rpx;
        font-size: 24rpx;
        color: #586069;
        img {
            margin-right: 12rpx;
            width: 30rpx;
            height: 30rpx;
            vertical-align: middle;
            animation: refresh 1.5s linear forwards infinite;
        }
    }
</style>
