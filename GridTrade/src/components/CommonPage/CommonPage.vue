<template>
  <div>
  <mt-header  title="网格交易"></mt-header>
  <router-view></router-view>
  <mt-tabbar v-model="selected" style="position: fixed;">
    <mt-tab-item id="setting">
      <img slot="icon" src="@/assets/Jump_Start.png">
      API设置
    </mt-tab-item>
    <mt-tab-item id="profit">
      <img slot="icon" src="@/assets/Bitcoin.png">
      收益统计
    </mt-tab-item>
    <mt-tab-item id="record">
      <img slot="icon" src="@/assets/record.png">
      买入记录
    </mt-tab-item>
    <mt-tab-item id="log">
      <img slot="icon" src="@/assets/log.png">
      操作日志
    </mt-tab-item>
  </mt-tabbar>
  </div>
</template>

<script>
    export default {
      name: "CommonPage",
      data() {
        return {
          selected: ''
        }
      },
      watch: {
        selected(newV, oleV) {
          this.$router.push({
            name: newV
          })
        },
      }
    }
</script>

<style scoped>

</style>
