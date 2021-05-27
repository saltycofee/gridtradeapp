<template>
    <div style="padding-bottom: 60px">
      <div id="myChart" ref="myChart" :style="{width:'450px',height:'280px'}"></div>
      <van-divider></van-divider>
      <div id="profitChart" ref="profitChart" :style="{width:'450px',height:'280px'}"></div>
      <div>
        <van-field
          style="color: #42b983"
          v-model="sumary"
          rows="3"
          autosize
          type="textarea"
          placeholder="汇总详情"
          readonly
        />
      </div>
    </div>
</template>

<script>
  import {searchprofit} from '@/api/mxc'
    export default {
        data(){
          return{
            barxdata:[],
            barydata:[],
            linexdata:[],
            lineydata:[],
            bartextname:'下单量统计',
            linetextname:'收益统计',
            sumary:"",
          }
        },
      created() {
        // this.queryrecord();
      },
      mounted(){
        this.$refs.myChart.style.width = window.screen.width + 'px';
        this.$refs.profitChart.style.width = window.screen.width + 'px';
        this.drawLine();
        //this.drawLine2();
      },
      methods:{
        suming(arryy){
          return eval(arryy.join("+"));
        },
        sleep(n) {
        var start = new Date().getTime();
        //  console.log('休眠前：' + start);
        while (true) {
          if (new Date().getTime() - start > n) {
            break;
          }
        }
    // console.log('休眠后：' + new Date().getTime());
  },
        drawLine(){
          // 基于准备好的dom，初始化echarts实例
          this.queryrecord(() => {
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
              title: { text: this.bartextname },
              tooltip: {},
              xAxis: {
                data: this.barxdata
              },
              yAxis: {},
              series: [{
                name: '成交单数',
                type: 'bar',
                color: '#009966',
                itemStyle:{barBorderRadius: [10,10,0,0]},
                data: this.barydata
              }]
            });
            let profitChart = this.$echarts.init(document.getElementById('profitChart'))
            profitChart.setOption({
              title: { text: this.linetextname },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.linexdata
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                name:'收益(USDT)',
                data: this.lineydata,
                type: 'line',
                color: '#FF8C69',
                areaStyle: {color: '#FF8C69'}
              }]
            })
          })

        },
        queryrecord(cb){
          this.barxdata=[]
          this.barydata=[]
          this.linexdata=[]
          this.lineydata=[]
          searchprofit({"uid":sessionStorage.getItem('uid')}).then(response => {
            if (response.data.code === '0000' && response.data.message==='请求成功!') {
              //console.log(response)
              let list = response.data.data
              //console.log(list)
              this.barxdata = list[0].barxdata
              this.barydata = list[0].barydata
              this.linexdata = list[0].linexdata
              this.lineydata = list[0].lineydata
              console.log(this.barxdata)
              console.log(this.barydata)
              this.bartextname = this.bartextname+'（今日已套利'+this.barydata[29]+'单）'
              //console.log(this.bartextname)
              console.log(this.linexdata)
              console.log(this.lineydata)
              this.linetextname = this.linetextname+'（今日已套利'+this.lineydata[29].toFixed(2)+'usdt）'
              this.sumary = '汇总展示：总计完成'+this.suming(this.barydata)+'单\n总计套利 '+this.suming(this.lineydata).toFixed(4)+'USDT'
              cb && cb()
            } else {
              this.$message({
                message: response.data.message,
                type: 'error'
              })
            }
          },)
        }
      }

    }
</script>

<style scoped>

</style>
