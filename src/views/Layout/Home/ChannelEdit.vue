<template>
  <div class="channel-edit">
    <!-- 当前用户已经订阅的频道 -->
    <div class="channel">
      <van-cell center title="我的频道" :border="false">
        <!-- 利用插槽使标题和右边按钮居中 -->
        <template #right-icon>
          <van-button plain size="mini" type="danger" @click="editing = !editing">{{ editing ? '取消' : '编辑' }}</van-button>
        </template>
      </van-cell>
      <!-- 频道九宫格 -->
      <van-grid>
        <van-grid-item
          :class="{ current: value === index }"
          v-for="(item, index) in channelList"
          :key="item.id"
          @click="changeActive(index)"
        >
          <span>{{ item.name }}</span>
          <van-icon v-show="editing && index !== 0" name="cross" class="btn" @click.stop="delChannel(item, index)"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 当前用户没有订阅的频道 -->
    <div class="channel">
      <van-cell center title="可选频道" :border="false" />
      <van-grid>
        <van-grid-item v-for="item in optionalChannelList" :key="item.id" @click="addChannel(item)">
          <span>{{ item.name }}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      editing: false
    }
  },
  props: {
    value: Number,
    isShowChannels: Boolean
  },
  computed: {
    ...mapState('channel', ['channelList']),
    ...mapGetters('channel', ['optionalChannelList'])
  },
  methods: {
    changeActive (index) {
      if (this.editing) return this.$toast('编辑状态不允许切换')
      this.$emit('input', index)
      this.$emit('close')
    },
    addChannel (item) {
      this.$store.commit('channel/addChannel', item)
    },
    delChannel (item, index) {
      if (this.channelList.length <= 4) return this.$toast('至少保留4个频道')
      // 处理删除之后高亮问题
      if (index < this.value) this.$emit('input', this.value - 1)
      if (index === this.value) this.$emit('input', 0)
      this.$store.commit('channel/delChannel', item)
    }
  },
  watch: {
    isShowChannels (value) {
      if (!value) {
        this.editing = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  padding: 15px;
  font-size: 14px;
  ::v-deep .van-button--mini {
    height: 22px;
    min-width: 50px;
  }
  .btn {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 14px;
  }
}
// 当前选中频道高亮样式
.current {
  color: #e5615b;
  font-weight: bold;
}
</style>
