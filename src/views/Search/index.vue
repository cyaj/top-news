<template>
  <div class="search">
    <van-nav-bar
      title="搜索中心"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <van-search
      autofocus
      v-model.trim="keyword"
      show-action
      placeholder="请输入搜索关键词"
      shape="round"
      @input="inputFn"
      @search="search(keyword)"
    >
      <!-- 右侧搜索按钮 -->
      <template #action>
        <span @click="search(keyword)">搜索</span>
      </template>
    </van-search>
    <!-- 推荐 -->
    <van-cell-group v-if="keyword">
      <van-cell
        icon="search"
        v-for="(item, index) in sugList"
        :key="index"
        @click="search(item)"
      >
        <template #title>
          <div v-html="highlight(item)"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录"></van-cell>
      <van-cell
        :title="item"
        v-for="item in searchList"
        :key="item"
        @click="search(item)"
      >
        <van-icon name="close" @click="del(item)" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { getHistory, setHistory } from '@/utils/storage'
export default {
  name: 'Search',
  data () {
    return {
      keyword: '',
      sugList: [], // 搜索建议列表
      timer: '',
      searchList: getHistory() // 搜索历史
    }
  },
  methods: {
    inputFn () {
      // 防抖处理
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        if (!this.keyword) {
          this.sugList = []
          return
        }
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
    },
    // 搜索
    search (keyword) {
      if (!keyword) return this.$toast.fail('请输入关键字')
      // 添加历史记录
      this.searchList = this.searchList.filter(item => item !== keyword)
      this.searchList.unshift(keyword)
      // 本地存储
      setHistory(this.searchList)
      this.$router.push({
        path: '/search/result',
        query: {
          keyword
        }
      })
    },
    // 删除搜索历史
    del (keyword) {
      this.searchList = this.searchList.filter(item => item !== keyword)
      // 本地存储
      setHistory(this.searchList)
    }
  }
}
</script>

<style></style>
