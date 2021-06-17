<template>
  <div class="search">
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-search
      v-model.trim="keyword"
      show-action
      action-text="搜索"
      placeholder="请输入搜索关键词"
      shape="round"
      @input="inputFn"
    />
    <!-- 推荐 -->
    <van-cell-group>
      <van-cell icon="search" v-for="(item, index) in sugList" :key="index">
        <template #title>
          <div v-html="highlight(item)"></div>
        </template>
      </van-cell>
    </van-cell-group>
     <!-- 历史记录 -->
    <van-cell-group>
      <van-cell title="历史记录"></van-cell>
      <van-cell title="单元格">
        <van-icon name="close" />
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
export default {
  name: 'Search',
  data () {
    return {
      keyword: '',
      sugList: [], // 搜索建议列表
      timer: ''
    }
  },
  methods: {
    inputFn () {
      // 防抖处理
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        if (!this.keyword) return
        const res = await getSuggestion(this.keyword)
        this.sugList = res.data.options
      }, 500)
    },
    // 关键词高亮
    highlight (str) {
      const reg = new RegExp(this.keyword, 'gi')
      return str.replace(reg, match => {
        return `<span style="color: red">${match}</span>`
      })
    }
  }
}
</script>

<style>

</style>
