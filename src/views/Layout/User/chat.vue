<template>
  <div class="container">
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="小智同学"
    ></van-nav-bar>
    <div class="chat-list" ref="list">
      <div v-for="(item, index) in list" :key="index">
        <!-- 左侧是机器人小智 -->
        <div class="chat-item left" v-if="item.type === 1">
          <van-image fit="cover" round :src="require('@/assets/avatar.png')" />
          <div class="chat-pao">{{ item.msg }}</div>
        </div>
        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-else>
          <div class="chat-pao my">{{ item.msg }}</div>
          <van-image fit="cover" round :src="$store.state.user.userInfo.photo" />
        </div>
      </div>
    </div>
    <!-- 输消息 -->
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="word" placeholder="说点什么..." @keyup.enter="send">
        <span @click="send" slot="button" style="font-size:12px;color:#999">
          发送
        </span>
      </van-field>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'UserChat',
  data () {
    return {
      word: '',
      // type: 1 小智的消息
      // type: 2 用户发的消息
      list: [],
      socket: null
    }
  },
  created () {
    // 进来先获取用户信息
    this.$store.dispatch('user/getUserInfo')
    // 连接服务器
    const socket = io('http://www.hucongcong.com:8888')
    this.socket = socket
    // 连接上服务器时触发
    socket.on('connect', () => {
      this.$toast.success('连接服务器成功')
    })
    // 当服务器给我们发消息时会触发
    socket.on('message', data => {
      console.log(data)
      this.list.push({
        type: 1,
        msg: data.msg,
        timestamp: data.timestamp
      })
    })
  },
  methods: {
    send () {
      if (!this.word) return this.$toast('请输入聊天内容')
      // 先渲染自己的消息
      this.list.push({
        type: 2,
        msg: this.word,
        timestamp: Date.now()
      })
      // 发请求等待回答
      this.socket.emit('message', {
        msg: this.word,
        timestamp: Date.now()
      })
      this.word = ''
    }
  },
  beforeDestroy () {
    this.socket.close()
  },
  watch: {
    list: {
      deep: true,
      async handler () {
        await this.$nextTick()
        // 保持滚动条在最下面
        // console.log(this.$refs.list.scrollHeight)
        // console.log(this.$refs.list.scrollTop)
        this.$refs.list.scrollTop = this.$refs.list.scrollHeight
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
      .chat-pao.my {
        background-color: #9eea6a;
        &::before {
          content: "";
          background: #9eea6a;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
