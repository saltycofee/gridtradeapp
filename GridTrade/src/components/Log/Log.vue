<template>
    <div >
      <ul style="border: 1px solid red;height: 200px " class="autolist">
        <li v-for="item in lists" :key="item.index">
          {{item.value}}
        </li>
      </ul>
<!--      操作日志页面-->
    </div>
</template>

<script>
    export default {
        data(){
          return{
              lists:[

                {value:1,index:1},
                {value:2,index:2},
                {value:3,index:3}
              ]
          }
        }
    }
</script>

<style scoped>
  .autolist{
    overflow: auto;
    background-color: #000;
    color: #fff;
  }
</style>
