<template>
  <div>
    <p>Store counter：{{ count }}</p>
    <ul class="container log-list">
      <li v-for="(log, index) in logs" :class="{ red: aa }" :key="index" class="log-item">
        <card :text="(index + 1) + ' . ' + log"></card>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatTime } from '@src/utils/index'
import card from '@components/card'

import { mapGetters } from 'vuex';

export default {
    components: {
        card
    },

    data () {
        return {
            logs: []
        }
    },
    computed: {
         ...mapGetters({
            count: 'getCount'
        })
    },

    created () {
        const logs = (wx.getStorageSync('logs') || [])
        this.logs = logs.map(log => formatTime(new Date(log)))
    }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
