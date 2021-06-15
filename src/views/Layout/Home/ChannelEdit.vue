<template>
  <div class="channel-edit">
    <!-- 当前用户已经订阅的频道 -->
    <div class="channel">
      <van-cell center title="我的频道" :border="false">
        <!-- 利用插槽使标题和右边按钮居中 -->
        <template #right-icon>
          <van-button plain size="mini" type="danger">编辑</van-button>
        </template>
      </van-cell>
      <!-- 频道九宫格 -->
      <van-grid>
        <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字">
          <span>频道{{ value }}</span>
          <!-- <van-icon name="cross" class="btn"></van-icon> -->
        </van-grid-item>
      </van-grid>
    </div>
     <!-- 当前用户没有订阅的频道 -->
    <div class="channel">
      <van-cell center title="可选频道" :border="false" />
      <van-grid>
        <van-grid-item v-for="index in 8" :key="index">
          <span>频道{{ index }}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.channel {
  padding:15px;
  font-size:14px;
  ::v-deep .van-button--mini {
    height: 22px;
    min-width: 50px;
  }
}
</style>
