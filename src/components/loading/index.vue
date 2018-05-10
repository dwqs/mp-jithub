<template>
    <div id="loader">
        <div></div>
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