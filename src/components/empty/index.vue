<template>
    <div class="jithub-list empty-data" v-if="shown">
            <h3 class="empty-title">
               {{title}}
            </h3>
            <p class="empty-desc" v-html="desc"></p>
        </div>
</template>

<script>
    export default {
        props: {
            shown: Boolean,
            title: {
                type: String,
                default: 'No Data'
            },
            desc: {
                type: String,
                default: 'Maybe some error thing was happened.<br/>You can sumbit a issue at https://github.com/dwqs/mp-jithub/issues'
            }
        }
    };
</script>