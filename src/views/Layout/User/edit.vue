<template>
  <div class="user-edit">
    <!-- 导航条 -->
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      title="编辑资料"
    ></van-nav-bar>
    <!-- 头像部分 -->
    <div class="avatar">
      <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>
    <van-cell-group>
      <van-cell title="昵称" :value="userInfo.name" is-link @click="showEditNickname" />
      <van-cell title="性别" :value="userInfo.gender ? '女' : '男'" is-link />
      <van-cell title="生日" :value="userInfo.birthday" is-link />
    </van-cell-group>
    <van-dialog v-model="isShowNickname" title="修改昵称" @confirm="updateNickname" show-cancel-button>
      <van-field ref="nickname" v-model="nickname" input-align="center" placeholder="请输入用户名" />
    </van-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { updateUserInfo } from '@/api/user'
export default {
  name: 'UserEdit',
  data () {
    return {
      isShowNickname: false,
      nickname: ''
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  created () {
    this.$store.dispatch('user/getUserInfo')
  },
  methods: {
    async showEditNickname () {
      this.isShowNickname = true
      this.nickname = this.userInfo.name
      await this.$nextTick()
      this.$refs.nickname.focus()
    },
    async updateNickname () {
      if (this.nickname.length < 1 || this.nickname.length > 7) {
        return this.$toast.fail('昵称长度为1-7位')
      }
      await updateUserInfo({ name: this.nickname })
      this.$store.dispatch('user/getUserInfo')
      this.$toast.success('修改昵称成功')
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  padding: 20px 0;
  text-align: center;
  .van-image {
    width: 120px;
    height: 120px;
  }
}
::v-deep {
  .van-field__body {
    padding: 6px 0;
    border: 1px solid #50b0f9;
  }
}

</style>
