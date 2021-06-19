<template>
  <div class="article-comments">
    <!-- 当前评论 -->
    <van-cell title="当前评论" :border="false">
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px;"
        :src="comment.aut_photo"
      />
      <span style="color: #466b9d;" slot="title">{{ comment.aut_name }}</span>
      <div slot="label">
        <p style="color: #363636;">{{ comment.content }}</p>
        <p>
          <span style="margin-right: 10px;">{{
            comment.pubdate | fromNow
          }}</span>
        </p>
      </div>
      <van-icon slot="right-icon" />
    </van-cell>
    <!-- /当前评论 -->
    <!-- 分隔线 -->
    <van-divider>全部回复</van-divider>
    <!-- 对当前评论 回复列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in replyList" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636;">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px;">{{
              item.pubdate | fromNow
            }}</span>
          </p>
        </div>
      </van-cell>
    </van-list>
    <!-- 回复列表 -->

    <!-- 发布回复 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入回复内容" v-model.trim="content">
        <van-button slot="button" size="mini" type="info" @click="addReply"
          >发布</van-button
        >
      </van-field>
    </van-cell-group>
    <!-- /发布回复 -->
  </div>
</template>
<script>
import { getReplyList, addReply } from '@/api/article'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      replyList: [], // 回复列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 获取下一页参数
      content: '' // 回复的内容
    }
  },
  methods: {
    async onLoad () {
      const res = await getReplyList(
        this.comment.com_id.toString(),
        this.offset
      )
      this.replyList = [...this.replyList, ...res.data.results]
      this.offset = res.data.last_id
      this.loading = false
      if (res.data.results.length === 0) this.finished = true
    },
    async addReply () {
      if (!this.content) return this.$toast('请输入回复内容')
      const res = await addReply(
        this.comment.com_id.toString(),
        this.content,
        this.$route.params.id
      )
      // console.log(res)
      this.replyList.unshift(res.data.new_obj)
      this.$toast.success('回复成功')
      this.content = ''
      // 父组件中回复数量需要同步增加
      this.$emit('addCount')
    }
  }
}
</script>
<style lang="less" scoped>
// 发表评论的区域是固定在下端的
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
// 给发表评论区空出地方
.van-list {
  margin-bottom: 45px;
}
</style>
