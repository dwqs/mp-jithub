<template>
    <div class="loading-wrapper">
        <div class="lds-hourglass"></div>
    </div>
</template>

<script>
    import './index.less';
    export default {
        props: {
            type: String,
            default: 'global',
            validator: val => ['global', 'partial'].includes(val)
        }
    };
</script>