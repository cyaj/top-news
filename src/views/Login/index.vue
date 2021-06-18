<template>
  <div>
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()" />
    <van-form @submit="login">
      <van-field
        required
        v-model="mobile"
        label="手机号"
        placeholder="请输入手机号"
        :rules="rules.mobile"
      />
      <van-field
        required
        v-model="code"
        type="number"
        label="验证码"
        placeholder="请输入验证码"
        :rules="rules.code"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :disabled="isLoading"
          :loading="isLoading"
          loading-text="登录中..."
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '15538708398',
      code: '246810',
      isLoading: false,
      rules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations('user', ['setToken']),
    async login () {
      this.isLoading = true
      try {
        const res = await login(this.mobile, this.code)
        this.setToken(res.data)
        this.$toast.success('登录成功')
        // 不越过登录页产生额外历史记录
        if (this.$route.query.goBack) return this.$router.back()
        // 正常回跳
        const back = this.$route.query.back || '/'
        this.$router.push(back)
      } catch (err) {
        this.$toast.fail('登录失败')
      }
      this.isLoading = false
    }
  }
}
</script>

<style></style>
