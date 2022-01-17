<template>
  <div class="marTop12">
    <el-row :gutter="20">
      <el-col :lg="7" :md="8" :sm="12" :xs="24" class="marBtm20">
        <div class="myCard leftSpecialBg" style="padding-bottom: 40px;height:430px;">
          <p class="Text22 oneLine">
            <i class="iconfont greenColor" :class="groupPart.fasIcon"></i>
            {{groupPart.title}}</p>
          <!-- address -->
          <div class="flexDiv justifyStart marTop16">
            <p class="Text18 h2Color">{{groupPart.address | normalAddress}}</p>
            <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom">
              <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(groupPart.copyAddress)">
              </span>
            </el-tooltip>
            <el-tooltip class="item marLeft4" placement="bottom">
              <div slot="content" class="Text14">
                Copy Address: {{groupPart.copyAddress}}
              </div>
              <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="groupPart.copyAddress" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
              </span>
            </el-tooltip>
          </div>
          <div class="">
            <div class="flexDiv marTop16 h3Color Text16">
              <p style="max-width: 70%;" class="oneLine Text16">Attestations fulfilled/requested</p>
              <p class="Text16 greenColor">{{groupPart.fulfilled}}/{{groupPart.requested}}</p>
            </div>
            <div class="flexDiv marTop16 h3Color Text16">Score<p class="Text16 greenColor">{{groupPart.Score}}%</p></div>
            <div class="flexDiv marTop16 h3Color Text16">Available CELO<p class="Text16 greenColor">{{groupPart.availableCelo | thousands}}</p></div>
            <div class="flexDiv marTop16 h3Color Text16">Locked CELO<p class="Text16 greenColor">{{groupPart.lockedCelo | thousands}}</p></div>
            <div class="flexDiv marTop16 h3Color Text16">Available cUSD<p class="Text16 greenColor">{{groupPart.availableCuse}}</p></div>
            <div class="flexDiv marTop16 h3Color Text16">Pending CELO<p class="Text16 greenColor">{{groupPart.pendingCelo}}</p></div>
            <div class="flexDiv marTop16 h3Color Text16">Total CELO<p class="Text16 greenColor">{{groupPart.totalCelo}}</p></div>
            <div class="flexDiv marTop16 h3Color Text16">Elected
              <p class="Text16 greenColor">
                <i v-if="groupPart.elected" class="iconfont icon-duigou greenColor Text14"></i>
                <span v-if="!groupPart.elected" class="greenColor Text14">—</span>
              </p>
            </div>
            <div class="flexDiv marTop16 h3Color Text16">Frontrunner
              <p class="Text16 greenColor">
                <i v-if="groupPart.frontrunner" class="iconfont icon-duigou greenColor Text14"></i>
                <span v-if="!groupPart.frontrunner" class="greenColor Text14">—</span>
              </p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :lg="17" :md="16" :sm="12" :xs="24" class="marBtm20">
        <div class="myCard" style="height:430px;">
          <div class="flexDiv">
            <p class="Text22">Daily Validator Payment Distributed</p>
            <download-excel class = "export-excel-wrapper" :data="DownVoteRevokeRecordsList" :fields="downRevokefields"
              header="" name = "Daily Validator Payment Distributed.xls">
              <span class="iconfont icon-downLoaddoc Text22 h3Color cursorPointer hoverGreen"></span>
            </download-excel>
          </div>
          <div class="tabGroup flexDiv smallTab marTop12">
            <el-tabs v-model="RecordsType" class="epochDetailChange">
              <el-tab-pane label="Epoch" name="echarts">
                <p slot="label" class="tabWid" style="width:86px;">Epoch</p>
                <div class="DailyType">
                  <vab-chart style="width: 100%;height: 310px" class="echartsCon" :autoresize="true" :options="VoteRevokeRecordEcharts" 
                   :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')"/>
                </div>
              </el-tab-pane>
              <el-tab-pane label="Details" name="Details">
                <p slot="label" class="tabWid" style="width:86px;">Details</p>
                <div class="myTable tabTable" style="margin-top:0;">
                  <el-table height="310" class="downLoadTable" :data="VoteRevokeRecordsList" fit stripe 
                    align="center" style="width: 100%;overflow-y:hidden;" :default-sort="{prop: 'EpochShow', order: 'descending'}">
                    <template slot="empty">
                      <div class="flexDiv columnFlex justifyCenter" style="height: 310px;">
                        <img src="../../assets/images/notData2.png" class="normalImg">
                        <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
                      </div>
                    </template>
                    <el-table-column prop="EpochShow" label="Epoch" min-width="100"  show-overflow-tooltip>
                      <template slot-scope="scope">
                      {{scope.row.epoch}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="validator" min-width="200" label="Validator Payment" align="center" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <p class="textCenter">{{scope.row.validator | formatNum3 | thousands}}<span class="Text14">cUSD</span></p>
                      </template>
                    </el-table-column>
                    <el-table-column prop="group" width="180" label="Group Payment" align="center" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span class="">{{scope.row.group | formatNum3 | thousands}}<span class="Text14">cUSD</span></span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
// import VabChart from "vue-echarts";
import VabChart from "@/plugins/echarts";
import { account } from "@/assets/api/requset.js";
export default {
  name: "groupPart",
  props: ['groupPart'],
  data() {
    return {
      RecordsType: 'echarts',  // echarts
      // groupPart: {
      //   address: 'dfefdd26v9d59v5f9dv9df59v5f9dv',
      //   fulfilled: '53699',
      //   requested: '133699',
      //   Score: 36,
      //   availableCelo: 23666,
      //   lockedCelo: '33669',
      //   availableCuse: '0.00',
      //   pendingCelo: '2.36',
      //   totalCelo: '23',
      //   elected: true,
      //   frontrunner: false,
      //   validator  // 请求参数
      // },
      ValidatorListfirstThree: [],
      ValidatorListLastThree: [],
      groupListfirstThree: [],
      groupListLastThree: [],
      VoteRevokeRecordEcharts: {
        tooltip: {
          trigger: "axis",
          formatter: (res) => {
            var i= res[0].dataIndex;
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            var str = `<div class="${cls}">
                <span class="textColor Text16">${this.VoteRevokeRecordsList[i].epochTitle}</span>
                <p class="tooltipHint Text16 marTop4 marBtm6 flexDiv">
                <span style="width:8px;height:8px;border-radius:50%;background:#63CF59;display:inline-block;" class="marRight4"></span>
                <span style="width: 150px;display:inline-block;" class="textColor textLeft">Validator Payment</span>
                ${this.$format.thousands(this.VoteRevokeRecordsList[i].validator.toFixed(2))} cUSD</p>
              <p class="tooltipHint Text16 flexDiv textRight">
                <span style="width:8px;height:8px;border-radius:50%;background:#0091FF;display:inline-block;" class="marRight4"></span>
                <span style="width: 150px;display:inline-block;" class="textColor textLeft">Group Payment</span>
                ${this.$format.thousands(this.VoteRevokeRecordsList[i].group.toFixed(2))} cUSD</p></div
              `
            return str;
          }
        },
        grid: {
          top: "0",
          right: "0",
          bottom: "60",
          // left: "100",
          left: '0'
        },
        legend: {
          bottom: "0",
          textStyle: {
            color: "#999999", //图例文字
          },
          itemWidth: 14,
          itemHeight: 8,
        },
        xAxis: {
          type: "category",
          data: [],
          axisTick: { show: false },
          splitLine: { show: false },
          axisLine: { show: false },
          axisLabel: { textStyle: { color: "#999999", fontSize: "12" } },
        },
        yAxis: {
          type: "value",
          axisLine: { show: false },
          axisLabel: { show: false },
          // axisLabel: { textStyle: { color: "#999999", fontSize: "12" } },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        series: [
          {
            name: "Validator Payment",
            smooth: 0.6,
            symbol: 'none',   // 不显示拐点
            type: "line",
            markPoint: {
              symbol: 'image://https://thecelo.com/staticNew/markBgEmpty.png',
              // symbolSize: [70, 30], //容器大小
              symbolOffset: ['0', '-5'],  // 位置偏移
              animation: false,
              itemStyle: {
                normal:{
                  label:{
                    color: (res) => {},//气泡中字体颜色
                    fontSize: 12,
                    fontWeight: 'normal',
                    formatter:  (res) => {
                      if(this.$store.state.themeCls == 'whiteTheme'){
                        if(this.ValidatorListfirstThree.indexOf(JSON.stringify(res.value)) != -1){
                          return `{a|              ${this.$format.thousands(res.value)}}`
                        }
                        if(this.ValidatorListLastThree.indexOf(JSON.stringify(res.value)) != -1){
                          return `{a| ${this.$format.thousands(res.value)}}                      `
                        }
                        return `{a| ${this.$format.thousands(res.value)}}`
                      }
                      if(this.ValidatorListfirstThree.indexOf(JSON.stringify(res.value)) != -1){
                        return `{b|              ${this.$format.thousands(res.value)}}`
                      }
                      if(this.ValidatorListLastThree.indexOf(JSON.stringify(res.value)) != -1){
                        return `{b| ${this.$format.thousands(res.value)}}                      `
                      }
                      return `{b| ${this.$format.thousands(res.value)}}`
                    },
                    rich: {
                      a: {
                        color: '#4a4a4a'
                      },
                      b: {
                        color: '#ffffff',
                      }
                    }
                  }
                }
              },
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            data: [],
            itemStyle: {
              normal: {
                color: '#63CF59',
              },
            },
          },
          {
            name: "Group Payment",
            smooth: 0.6,
            symbol: 'none',   // 不显示拐点
            type: "line",
            markPoint: {
              symbol: 'image://https://thecelo.com/staticNew/markBgEmpty.png',
              // symbolSize: [70, 30], //容器大小
              symbolOffset: ['0', '-5'],  // 位置偏移
              animation: false,
              itemStyle: {
                normal:{
                  label:{
                    color: (res) => {},//气泡中字体颜色
                    fontSize: 12,
                    fontWeight: 'normal',
                    formatter:  (res) => {
                      if(this.$store.state.themeCls == 'whiteTheme'){
                        if(this.groupListfirstThree.indexOf(JSON.stringify(res.value)) != -1){
                          return `{a|              ${this.$format.thousands(res.value)}}`
                        }
                        if(this.groupListLastThree.indexOf(JSON.stringify(res.value)) != -1){
                          return `{a| ${this.$format.thousands(res.value)}}                      `
                        }
                        return `{a| ${this.$format.thousands(res.value)}}`
                      }
                      if(this.groupListfirstThree.indexOf(JSON.stringify(res.value)) != -1){
                        return `{b|              ${this.$format.thousands(res.value)}}`
                      }
                      if(this.groupListLastThree.indexOf(JSON.stringify(res.value)) != -1){
                        return `{b| ${this.$format.thousands(res.value)}}                      `
                      }
                      return `{b| ${this.$format.thousands(res.value)}}`
                    },
                    rich: {
                      a: {
                        color: '#4a4a4a'
                      },
                      b: {
                        color: '#ffffff',
                      }
                    }
                  }
                }
              },
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            data: [],
            itemStyle: {
              normal: {
                color: '#0091FF',
              },
            },
          },
        ],
      },
      VoteRevokeRecordsList: [
        {epoch: '27 Jul', validator: '23699', group: '3669'}
      ],
      DownVoteRevokeRecordsList: [],
      downRevokefields: {
        Epoch: 'epoch',
        'Validator Payment': 'svalidator',
        'Group Payment': 'sgroup'
      }
    };
  },
  components: {VabChart},
  computed: {
    themeCls(){
      return this.$store.state.themeCls;
    }
  },
  watch: {
    themeCls(val) {
      this.redis_key_value();
    }
  },
  mounted() {
    this.redis_key_value();
  },
  methods: {
    redis_key_value(){
			var key = 'epoch_payment_distributed_' + this.groupPart.validator.toLowerCase()
      var parmas = {
        method: 'redis_key_value',
        key: key
      };
      account(parmas).then((response) => {
        var dataTable = [];
        var epochDate = [];
        var ValidatorList = [];
        var groupList = [];
        for(var i=11;i<=response.epoch;i++){
          let epoch_date = this.$format.getEpochDate(i);
          let val = response.payments[i] ? response.payments[i][0] : 0;
          let groupD = response.payments[i] ? response.payments[i][1] : 0;
          // svalidator
          let svalidator = Number(val).toFixed(3);
          svalidator = this.$format.thousands(svalidator);
          // sgroup
          let sgroup = Number(groupD).toFixed(3);
          sgroup = this.$format.thousands(sgroup);

          dataTable.push({
            epoch: epoch_date.substr(5,6),
            EpochShow: this.$format.getEpochDateSorate(i),
            epochTitle: this.$format.chartTipTitle(i),
            validator: val,
            group: groupD,
            svalidator: svalidator+'cUSD',
            sgroup: sgroup+'cUSD'
          })
          // 图形数据
          epochDate.push(epoch_date.substr(5,6));
          ValidatorList.push(val.toFixed(2));
          groupList.push(groupD.toFixed(2));
        }
        this.VoteRevokeRecordsList = dataTable;
        var neTable = dataTable;
        this.DownVoteRevokeRecordsList = dataTable;
        // 图表
        // 修改  x 轴  起始数据内容
        epochDate[0] = `           ${epochDate[0]}`;
        var lasii = epochDate.length - 1;
        epochDate[lasii] = `${epochDate[lasii]}           `;
        this.VoteRevokeRecordEcharts.xAxis.data = epochDate;
        // 取前三个为数组， 取后三个为数组 ValidatorListfirstThree  ValidatorListLastThree
        this.ValidatorListfirstThree = [
          ValidatorList[0], ValidatorList[1], ValidatorList[2]
        ];
        var last1 = ValidatorList.length - 1;
        var last2 = ValidatorList.length - 2;
        var last3 = ValidatorList.length - 3;
        this.ValidatorListLastThree = [
          ValidatorList[last1], ValidatorList[last2], ValidatorList[last3]
        ];
        // 取前三个为数组， 取后三个为数组 groupListfirstThree  groupListLastThree
        this.groupListfirstThree = [
          groupList[0], groupList[1], groupList[2]
        ];
        var last1group = groupList.length - 1;
        var last2group = groupList.length - 2;
        var last3group = groupList.length - 3;
        this.groupListLastThree = [
          groupList[last1group], groupList[last2group], groupList[last3group]
        ];
        if (this.$store.state.themeCls == 'whiteTheme') {
          this.setWhiteVoteRevokeRecord();
        } else {
          this.setBlackVoteRevokeRecord();
        }
        this.VoteRevokeRecordEcharts.series[0].data = ValidatorList;
        this.VoteRevokeRecordEcharts.series[1].data = groupList;
      })
    },
    setWhiteVoteRevokeRecord() {
      // 绿色
      this.VoteRevokeRecordEcharts.series[0].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#EBFFEA' },
            { offset: 0, color: '#ffffff' },
          ])
      }
      // 蓝色
      this.VoteRevokeRecordEcharts.series[1].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#C1E2FC' },
            { offset: 0, color: '#ffffff' },
          ])
      }
    },
    setBlackVoteRevokeRecord() {
      // 绿色
      this.VoteRevokeRecordEcharts.series[0].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#143C12' },
            { offset: 0, color: '#1E2621' },
          ])
      }
      // 蓝色
      this.VoteRevokeRecordEcharts.series[1].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#224056' },
            { offset: 0, color: '#242424' },
          ])
      }
    },
    jumpAddress(address) {
      this.$store.dispatch('jumpAddress', address);
    },
    // 复制成功时的回调函数
    onCopySuc(e) {
      this.copyIng = true;
      this.$notify({
        message: 'copied！',
        type: 'success',
        duration: 2600
      });
      setTimeout(() => {
        this.copyIng = false;
      }, 2600);
    },
    onCopyError(e) {
      this.$notify({
        message: "Copy failure！",
        type: "error",
      });
    },
  },
};
</script>
<style scoped lang="scss">
</style>
