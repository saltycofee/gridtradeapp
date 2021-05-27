<template>
  <div class="allcontent">
    <div class="allprotety">
      <br/>
      <span style="color:#C63300;font-weight: bold" >Ltrade 网格交易工具</span>
    </div>
    <el-divider></el-divider>
    <div class="content">
<!--      <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="" class="loginimg">-->
      <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimages.ofweek.com%2FUpload%2FNews%2F2016-9%2Fsummary%2F2016921424094.jpg&refer=http%3A%2F%2Fimages.ofweek.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623308321&t=b334c057c55d131ccc5cc198df88ccdf" alt="" class="loginimg">
      <el-divider></el-divider>
      <div>
        <el-input size="small" style="width: 150px;" v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <el-button type="primary" round @click="Login" class="identify">验证</el-button>
      </div>
      <div style="height: 220px"></div>
    </div>
  </div>
</template>
<script>
  import {login} from '@/api/mxc';
    export default {
        name: "Lgoin",
      data(){
          return {
            input:""
          }
      },
      created() {
      },
      methods:{
          Login(){
            login({"uid":this.input}).then(response => {
              if (response.data.code === '0000' && response.data.message==='登录成功!') {
                sessionStorage.setItem('isLogin','true')
                sessionStorage.setItem('uid',this.input)
                console.log(response)
                this.$router.push({
                   name:'setting'
                })
              } else {
                this.$message({
                  message: response.data.message,
                  type: 'error'
                })
              }
            },1000)
          }
      }
    }
</script>

<style scoped>
  html,body,.allcontent{
    height: 100%;
    width: 100%;
    position: absolute;
  }
  .allcontent{
    background-image: linear-gradient(#42b983,#004A80,#9198e5);
  }
  .allprotety{
    text-align: center;
  }
  .content{
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
    .loginimg{
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
  .identify{
    margin-top: 10px;
  }


</style>
