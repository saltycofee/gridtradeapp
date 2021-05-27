<template>
    <div style="padding-bottom: 60px">
      <van-form @submit="onSubmit">
        <van-field
          v-model="taskname"
          name="taskName"
          label="任务名称"
          placeholder="任务名称"
          :rules="[{ required: true, message: '请填写任务名称' }]"
        />
        <van-field
          readonly
          clickable
          name="PlantName"
          :value="plantname"
          label="交易所"
          placeholder="点击选择交易所"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
        <van-field
          clickable
          name="Symbol"
          v-model="symbol"
          label="货币对(大写)"
          placeholder="请填写货币对格式如(CHZ_USDT)"
        />
        <van-field
          v-model="highprice"
          name="HighPrice"
          label="最高价"
          placeholder="请设置最高价"
          :rules="[{ required: true, message: '请设置最高价' }]"
        />
        <van-field
          v-model="lowprice"
          name="LowPrice"
          label="最低价"
          placeholder="请设置最低价"
          :rules="[{ required: true, message: '请设置最低价' }]"
        />
        <van-field
          v-model="locknum"
          name="Locknum"
          label="锁定USDT"
          placeholder="请设置USDT数量"
          :rules="[{ required: true, message: '请设置USDT数量' }]"
        />
        <van-field name="GridNum" label="网格数量">
          <template #input>
            <van-stepper v-model="gridnum" />
          </template>
        </van-field>
        <van-field name="ProfitRate" label="每单套利">
          <template #input>
            <van-radio-group v-model="profitrate" direction="horizontal">
              <van-radio name="1">1%</van-radio>
              <van-radio name="2">2%</van-radio>
              <van-radio name="3">3%</van-radio>
              <van-radio name="4">4%</van-radio>
              <van-radio name="5">5%</van-radio>
              <van-radio name="6">6%</van-radio>
              <van-radio name="7">7%</van-radio>
              <van-radio name="8">8%</van-radio>

            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">保存</van-button>
        </div>
      </van-form>
      <div>
        <van-divider dashed>
          <van-button round color="linear-gradient(to right, #ff6034, #ee0a24)" @click="Getuserinfo()">
            查询当前账户信息
          </van-button>
<!--          <span style="color: coral">当前账户信息</span>-->
        </van-divider>
        <van-field
          v-model="message"
          rows="6"
          autosize
          type="textarea"
          placeholder="账户信息"
          readonly
        />
      </div>
    </div>

</template>

<script>
  import {getuserinfo,CreatTask} from '@/api/mxc'
  import { Notify } from 'vant';
    export default {
      methods: {
        Getuserinfo(){
          getuserinfo({"uid":sessionStorage.getItem('uid'),"plant":"抹茶"}).then(response => {
            if (response.data.code === '0000' && response.data.message==='请求成功!') {
              console.log(response)
               this.message = response.data.data
            } else {
              this.$message({
                message: response.data.message,
                type: 'error'
              })
            }
          },)

        },
        onSubmit(values) {
          console.log('submit', values);
          // let dicarry = new Array();
          var rate = values["ProfitRate"]
          var newrate =parseFloat(rate)/100
          values["ProfitRate"] =newrate
          let postdata={}
          if(this.profitrate===''){
            Notify("请选择每单利润")
          }else{
            postdata['uid'] = sessionStorage.getItem('uid')
            postdata['data'] = values
            // console.log(postdata)
            CreatTask(postdata).then(response => {
              console.log(response)
              if (response.data.code === '0000') {
                console.log(response)
                Notify({ type: 'success', message: response.data.message });
              } else {
                this.$message({
                  message: response.data.message,
                  type: 'error'
                })
              }
            },)
          }
        },
        onConfirm(value) {
          this.plantname = value;
          this.showPicker = false;
        },
      },
        data(){
          return{
            message:'',
            symbol:'',
            taskname: '',
            highprice:'',
            lowprice:'',
            locknum:'',
            gridnum:'10',
            plantname: '',
            profitrate: '1',
            columns: ['抹茶', '火币', '币安', 'OKex'],
            showPicker: false,
          };

        }
    }
</script>

<style scoped>

</style>
