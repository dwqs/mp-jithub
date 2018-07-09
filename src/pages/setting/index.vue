<template>
    <div class="setting-page">
        <top-header title="Setting" :back="true"></top-header>
        <div class="setting-wrap">
            setting
        </div>
    </div>
</template>

<script>
    import topHeader from '@src/components/top-header/index.vue';

    export default {
        components: {
            topHeader
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
    }
</style>
