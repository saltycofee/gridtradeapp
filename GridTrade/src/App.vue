<template>
  <router-view></router-view>
</template>
<script>
export default {
  data(){
    return{
      selected:''
    }
  },
  watch:{
    selected(newV,oleV){
      this.$router.push({
        name:newV
      })
    },
  }
}
</script>
<style>

</style>
