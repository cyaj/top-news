<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 每条评论 -->
      <!-- 大数处理 -->
      <van-cell v-for="item in commentList" :key="item.com_id.toString()">
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
            <span style="margin-right: 10px;">
              {{ item.pubdate | fromNow }}
            </span>
            <van-button size="mini" type="default" @click="showReply(item)">
              回复 ({{ item.reply_count }})
            </van-button>
          </p>
        </div>
        <van-icon
          slot="right-icon"
          :name="item.is_liking ? 'like' : 'like-o'"
          @click="zan(item)"
        />
      </van-cell>
    </van-list>
    <!-- /评论列表 -->
    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容" v-model.trim="content">
        <van-button slot="button" size="mini" type="info" @click="addComment">
          发布
        </van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
    <!-- 回复评论 -->
    <van-action-sheet
      v-model="isShowReply"
      title="评论回复"
      style="height: 66%"
    >
      <!-- 组件不会重新创建，里面内容不会变，用v-if解决 -->
      <CommentReply
        :comment="currentComment"
        v-if="isShowReply"
        @addCount="addCount"
      ></CommentReply>
    </van-action-sheet>
  </div>
</template>

<script>
import {
  getCommentList,
  addComment,
  addCommentZan,
  cancelCommentZan
} from '@/api/article'
import CommentReply from './CommentReply'
export default {
  components: {
    CommentReply
  },
  data () {
    return {
      commentList: [], // 评论列表
      loading: false, // 上拉加载更多，false时才可以触发加载
      finished: false, // 是否加载结束
      offset: null, // 获取评论列表的分页参数
      content: '', // 评论内容
      isShowReply: false,
      currentComment: {} // 当前回复的评论
    }
  },
  computed: {
    artId () {
      return this.$route.params.id
    }
  },
  methods: {
    async onLoad () {
      const res = await getCommentList(this.artId, this.offset)
      // console.log(res)
      this.commentList = [...this.commentList, ...res.data.results]
      // 分页参数，用于获取下一页
      this.offset = res.data.last_id
      this.loading = false
      if (res.data.results.length === 0) {
        this.finished = true
      }
    },
    async addComment () {
      if (!this.content) return this.$toast('请输入评论内容')
      const res = await addComment(this.artId, this.content)
      // console.log(res)
      this.$toast.success('添加评论成功')
      this.content = ''
      this.commentList.unshift(res.data.new_obj)
    },
    async zan (item) {
      if (item.is_liking) {
        await cancelCommentZan(item.com_id.toString()) // 大数处理
      } else {
        await addCommentZan(item.com_id.toString())
      }
      this.$toast.success('操作成功')
      item.is_liking = !item.is_liking
    },
    showReply (item) {
      this.isShowReply = true
      this.currentComment = item
    },
    addCount () {
      this.currentComment.reply_count++
    }
  }
}
</script>

<style scoped lang="less">
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
