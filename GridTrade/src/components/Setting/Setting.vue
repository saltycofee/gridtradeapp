<template>
    <div>
      <van-cell-group>
        <van-field label="API_KEY" :value="API_KEY" disabled />
        <van-field label="SECRET_KEY" :value="SECRET_KEY" disabled />
      </van-cell-group>
      <div>
        <el-divider></el-divider>
        <mt-cell title="创建任务" label="任务创建" to="/task" is-link></mt-cell>
      </div>
      <!--任务列表展示-->
      <div>
        <el-divider></el-divider>
        <el-divider content-position="right">
          <span style="color: #42b983">任务列表(绿色执行中｜红色未执行)</span>
        </el-divider>
      </div>
      <div>
        <template>
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            max-height="350">
            <el-table-column
              fixed
              prop="date"
              label="日期"
              width="110">
            </el-table-column>
            <el-table-column
              prop="symbol"
              label="货币对"
              width="100">
            </el-table-column>
            <el-table-column
              prop="highprice"
              label="最高价"
              width="100">
            </el-table-column>
            <el-table-column
              prop="lowprice"
              label="最低价"
              width="100">
            </el-table-column>
            <el-table-column
              prop="gridnum"
              label="网格数量"
              width="100">
            </el-table-column>
            <el-table-column
              prop="taskname"
              label="任务名称"
              width="100">
            </el-table-column>
            <el-table-column
              prop="plant"
              label="交易所"
              width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <div>
                  <div class="point" :style="scope.row.pointbackground"></div>
                <el-button
                  @click="Delete(scope.row)"
                  type="text"
                  :disabled="scope.row.disable"
                  size="mini">
                    移除
                </el-button>
                <el-button
                  @click="Action(scope.row)"
                  type="text"
                  size="mini">
                  {{scope.row.excuteword}}
                </el-button>

                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!--创建任务-->

    </div>
</template>

<script>
  import {getapikey,gettasks,action} from '@/api/mxc';
    export default {
      data(){
        return{
          // disable:true,
          // excuteword:'开始',
          API_KEY:'',
          SECRET_KEY:'',
          popupVisible:false,
          value:'',
          // pointbackground:'background:green',
          qiyeVisible: false,
          plantValue: '点击选择',
          tableData: [],
        }
      },
      created() {
        this.GetApiKey();
      },
      mounted() {
        this.GetTasks();
      },
      methods: {
        // 获取apikey
        GetApiKey(){
          getapikey({"uid":sessionStorage.getItem('uid')}).then(response => {
            if (response.data.code === '0000' && response.data.message==='请求成功!') {
              console.log(response)
              let list = response.data.data
              console.log(list)
              this.API_KEY = list[0].ak
              this.SECRET_KEY = list[0].sk
            } else {
              this.$message({
                message: response.data.message,
                type: 'error'
              })
            }
          },)
        },
        //获取任务列表
        GetTasks(){
          gettasks({"uid":sessionStorage.getItem('uid')}).then(response => {
            if (response.data.code === '0000' && response.data.message==='请求成功!') {
              console.log(response)
              let list = response.data.data
              console.log(list)
              if(list.length<1){  //为空。
                this.tableData=list;
              }else{ //不为空,需要遍历以及操作各项数据
                var result =[]
                for(let i=0;i<list.length;i++){
                  let tempdic={}
                  tempdic["date"]=list[i].create_date
                  tempdic["taskname"]=list[i].taskname
                  tempdic["plant"]=list[i].plantname
                  tempdic["symbol"]=list[i].symbol
                  tempdic["highprice"]=list[i].highprice
                  tempdic["lowprice"]=list[i].lowprice
                  tempdic["gridnum"]=list[i].gridnum
                  if (list[i].taskstatus==='0'){//未运行，红色
                    tempdic["disable"]=false
                    tempdic["excuteword"]='开始'
                    tempdic["pointbackground"]='background:red'
                  }else{
                    tempdic["disable"]=true
                    tempdic["excuteword"]='停止'
                    tempdic["pointbackground"]='background:green'
                  }
                  result.push(tempdic)
                }
                this.tableData = result
              }
            } else {
              this.$message({
                message: response.data.message,
                type: 'error'
              })
            }
          },)
        },

        //移除任务
        Delete(row){
          console.log(row)
          let requestdata={}
          requestdata['uid']=sessionStorage.getItem('uid')
          requestdata['taskname'] =row['taskname']
          requestdata['symbol'] =row['symbol']
          requestdata['plant'] =row['plant']
          requestdata['excuteword'] ='移除'
          requestdata['highprice'] =row['highprice']
          requestdata['lowprice'] =row['lowprice']
          requestdata['gridnum'] =row['gridnum']
          console.log(requestdata)
          action(requestdata).then(response => {
            if (response.data.code === '0000') {
              console.log(response)
              this.$message({
                message: response.data.message,
                type: 'success'
              })
            } else {
              this.$message({
                message: response.data.message,
                type: 'error'
              })
            }
          },)
          //刷新列表
          this.GetTasks()
        },
        //控制任务
        Action(row){
          console.log(row)
          let requestdata={}
          requestdata['uid']=sessionStorage.getItem('uid')
          requestdata['taskname'] =row['taskname']
          requestdata['symbol'] =row['symbol']
          requestdata['plant'] =row['plant']
          requestdata['excuteword'] =row['excuteword']
          requestdata['highprice'] =row['highprice']
          requestdata['lowprice'] =row['lowprice']
          requestdata['gridnum'] =row['gridnum']
          console.log(requestdata)
          action(requestdata).then(response => {
            if (response.data.code === '0000') {
              console.log(response)
              this.$message({
                message: response.data.message,
                type: 'success'
              })
            } else {
              this.$message({
                message: response.data.message,
                type: 'error'
              })
            }
          },)
          //刷新列表
          this.GetTasks()
        },
        handleClick(row) {
          console.log(row);
        },
        onValuesChange(picker, values) {
          console.log(picker)
          console.log(values)
        },
        qiyeSelectOk () {
          this.qiyeVisible = false
          console.log(this.$refs.refQIYE.getValues()[0])
          //取消 隐藏
          this.popupVisible=false
          this.plantValue = this.$refs.refQIYE.getValues()[0]
          // this.qiye = this.$refs.refQIYE.getValues()[0].id
        },
      },
    }
</script>

<style scoped>
   /*picker的样式*/
  .picker {
    width: 100vw;
    line-height: 17vh;
    margin-top: -5vh;
    margin-bottom: 10px;
  }
  /*//按钮的样式*/
    .btn {
      margin-left: 80vw;
      margin-top: 1vh;
      margin-bottom: -9vh;
      z-index: 2001;
    }
   .point{
     width:12px;
     height:12px;
     display: inline-block;
     margin-right: 3px;
     border-radius: 50%;
   }
</style>
