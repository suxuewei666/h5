<script lang="ts" setup></script>
<template>
  <router-view v-slot="{ Component }" class="router-view">
    <transition name="fade">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>
<style lang="scss">
html,
body,
#app,
.router-view {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>
