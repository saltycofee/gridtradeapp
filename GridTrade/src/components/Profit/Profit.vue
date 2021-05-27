<template>
  <div>
    <div>
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="计价货币"
        placeholder="点击选择"
        @click="showPicker = true"
        style="width: 100%">
      </van-field>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm1"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-cell title="开始日期" :value="startsearchdate" @click="showstartdatepicker = true" />
      <div v-if="showstartdatepicker">
        <van-popup v-model="showstartdatepicker" position="bottom">
          <van-datetime-picker
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="onConfirmsearchdate"
            @cancel="showstartdatepicker = false"
          />
        </van-popup>
      </div>
      <van-cell title="结束日期" :value="endsearchdate" @click="showenddatepicker = true" />
      <div v-if="showenddatepicker">
        <van-popup v-model="showenddatepicker" position="bottom">
          <van-datetime-picker
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="onConfirmenddate"
            @cancel="showenddatepicker = false"
          />
        </van-popup>
      </div>
      <van-divider></van-divider>
      <van-button type="primary" round size="small" @click="periodsearch('今天')">今天</van-button>
      <van-button type="primary" round size="small" @click="periodsearch('昨天')">昨天</van-button>
      <van-button type="primary" round size="small" @click="periodsearch('本周')">本周</van-button>
      <van-button type="primary" round size="small" @click="periodsearch('本月')">本月</van-button>
      <van-button size="small" @click="periodsearch('按所选日期查询')" round color="linear-gradient(to right, #7232dd, #ee0a24)">
        按所选日期查询
      </van-button>
      <van-divider></van-divider>
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          max-height="350">
          <el-table-column
            fixed
            prop="symbol"
            label="货币对"
            width="100">
          </el-table-column>
          <el-table-column
            prop="time"
            label="结单时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="num"
            label="结单数量"
            width="100">
          </el-table-column>
          <el-table-column
            prop="profit"
            label="结单收益"
            width="100">
          </el-table-column>
          <el-table-column
            prop="coin"
            label="币"
            width="80">
          </el-table-column>
          <el-table-column
            prop="profitrate"
            label="%"
            width="80"
            style="color: #42b983">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="dialogFormVisible">
          <van-dialog v-model="dialogFormVisible" title="标题" show-cancel-button>
            <span style="color: coral">这是一个测试的电视剧啊点撒</span>
          </van-dialog>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import { searchorder } from '@/api/mxc';
    export default {
      created() {
        this.periodsearch('今天');
      },
      methods: {
        handleClick(row) {
          console.log(row);
          this.dialogFormVisible=true;
        },
        onConfirm1(value) {
          this.value = value;
          this.showPicker = false;
        },
        onConfirmsearchdate(startsearchdate){
          console.log(startsearchdate)
          let year = startsearchdate.getFullYear()
          let month = startsearchdate.getMonth() + 1
          let day = startsearchdate.getDate()
          this.startsearchdate = year + "-" + month + "-" + day
          this.showstartdatepicker = false;
        },
        onConfirmenddate(endsearchdate){
          console.log(endsearchdate)
          let year = endsearchdate.getFullYear()
          let month = endsearchdate.getMonth() + 1
          let day = endsearchdate.getDate()
          this.endsearchdate = year+"-"+month+"-"+day
          this.showenddatepicker = false
        },
        periodsearch(timeday){
          searchorder({"uid":sessionStorage.getItem('uid'),"period":timeday,"start_time":this.startsearchdate,"end_time":this.endsearchdate}).then(response => {
            if (response.data.code === '0000' && response.data.message==='查询成功!') {
              console.log(response)
              let list = response.data.data
              console.log(list)
              this.tableData = list
            } else {
              this.$message({
                message: response.data.message,
                type: 'error'
              })
            }
          },)
        }
      },
        data(){
          return{
            tableData: [],
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 10, 1),
            showstartdatepicker:false,
            startsearchdate:'',
            endsearchdate:'',
            showenddatepicker: false,
            dialogFormVisible:false,
            value: '',
            columns: ['USDT'],
            showPicker: false,
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            formLabelWidth: '120px'
          }
        }
    }
</script>

<style scoped>

</style>
