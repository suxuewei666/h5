<template>
  <div class="content">
    <div class="header-div">
      <div class="header">
        <img class="img" src="@/assets/img/wish/left.png" alt="" />
        <div class="title">智能填报</div>
        <span></span>
      </div>
    </div>

    <!-- <van-button type="primary">主要按钮</van-button>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in 20" :key="item" :title="item" />
      </van-list>
    </van-pull-refresh> -->
  </div>
</template>
<script setup lang="ts">
// import { ref } from "vue";
// const list = ref([]);
// const loading = ref(false);
// const finished = ref(false);
// const refreshing = ref(false);
// function onRefresh() {
//   finished.value = false;
//   loading.value = true;
//   onLoad();
// }
// function onLoad() {
//   setTimeout(() => {
//     if (refreshing.value) {
//       list.value = [];
//       refreshing.value = false;
//     }

//     for (let i = 0; i < 10; i++) {
//       list.value.push(list.value.length + 1);
//     }
//     loading.value = false;

//     if (list.value.length >= 40) {
//       finished.value = true;
//     }
//   }, 1000);
// }
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
  line-height: 88px;
  font-size: 34px;
  padding: 0 32px;
  box-sizing: border-box;
  .img {
    width: 16px;
    height: 29px;
  }
  .title {
    color: #fff;
    text-align: center;
  }
}
.content {
  background-color: #fff;
  .header-div {
    height: 565px;
    background: linear-gradient(
      180deg,
      #68be12 0%,
      rgba(108, 195, 21, 0.7559) 53%,
      rgba(119, 209, 30, 0) 100%
    );
  }
}
</style>
