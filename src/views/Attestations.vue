
<template>
  <div :class="$store.state.themeCls">
    <div class="mainContainer">
      <div class="">
        <p class="primaryTitle">Attestations</p>
      </div>
      <!-- 图表部分 -->
      <div class="mainCon-sub">
        <div class="tabGroup  marTop24">
          <el-tabs v-model="circulateSupplyTabs" class="epochDetailChange">
            <el-tab-pane label="30" name="30">
              <p slot="label" class="tabWid" style="width:86px;">30D</p>
            </el-tab-pane>
            <el-tab-pane label="60" name="60">
              <p slot="label" class="tabWid" style="width:86px;">60D</p>
            </el-tab-pane>
            <el-tab-pane label="180" name="180">
              <p slot="label" class="tabWid" style="width:86px;">1/2Y</p>
            </el-tab-pane>
            <el-tab-pane label="365" name="365">
              <p slot="label" class="tabWid" style="width:86px;">1Y</p>
            </el-tab-pane>
            <el-tab-pane label="all" name="all">
              <p slot="label" class="tabWid" style="width:86px;">All</p>
            </el-tab-pane>
          </el-tabs>
        </div>
        <vab-chart style="width: 100%;height: 360px" class="echartsCon marTop16" :autoresize="true" :options="lineEchartsOne" 
          :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartGreen' : 'blackThemeEchartGreen')"/>
        <!-- 列表部分 + 搜索行 -->
        <div style="height: 20px;"></div>
        <div class="marTop42">
          <div class="flexDiv justifyEnd">
            <div class="searchCon marTop12 marRight12 notpadRight">
              <el-select class="selectClass" style="width: 100%;" v-model="searchOption" placeholder="--select validator--" size="small" filterable clearable @change="changeOption">
                <el-option v-for="item in searchoptionsList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="searchCon flexDiv marTop12">
              <el-input placeholder="Type address 0x…" clearable v-model="searAddress" size="small"></el-input>
              <p class="cursorPointer" @click="searchListData()">Search</p>
            </div>
          </div>
          <div class="myTable myTableBorBtm" v-if="trading_records.length > 0">
            <el-table class=" downLoadTable" :data="trading_records" fit stripe  v-sticky="{ top: 0 }" 
              border align="center" style="width: 100%;overflow-y:hidden;"
              v-loading="isloadListData" element-loading-background="rgba(0, 0, 0, 0)" element-loading-text="loading..." 
              element-loading-spinner="el-icon-loading">
              <!-- <el-table-column type="index" width="70"></el-table-column> -->
              <template slot="empty">
                <div class="flexDiv columnFlex justifyCenter" style="height: 260px;" v-if="!isloadListData">
                  <img src="../assets/images/notData2.png" class="normalImg">
                  <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
                </div>
              </template>
              <el-table-column prop="Identifier" align="left" width="180" label="Identifier" sortable>
                <template slot-scope="scope">
                  <div class="flexDiv justifyStart">
                    <p class="Text16">{{scope.row.address | normalAddress}}</p>
                    <el-tooltip class="item marLeft4" placement="bottom">
                      <div slot="content" class="Text14">
                        Copy Address: {{scope.row.address}}
                      </div>
                      <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="scope.row.address" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                      </span>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
              <el-table-column min-width="350">
                <template slot="header">
                  <div class="flexDiv">
                    <p class="h3Color Text18" style="width: 160px;">Requested Accounts</p>
                    <p class="Text18 h3Color textCenter" style="width: 60px;">Count</p>
                    <p class="Text18 h3Color textCenter" style="width: 110px;">Time</p>
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="flexDiv marBtm12" v-for="(cr,index) in scope.row.childRequested" :key="index">
                    <div class="flexDiv justifyStart" style="width: 160px">
                      <p class="Text16 blueColor cursorPointer blueColor oneLine" @click="jumpAddressDetails(cr.address)"
                      style="max-width: 100px">{{cr.address | normalAddress}}</p>
                      <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom">
                        <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(cr.address)">
                        </span>
                      </el-tooltip>
                      <el-tooltip class="item marLeft4" placement="bottom">
                        <div slot="content" class="Text14">
                          Copy Address: {{cr.address}}
                        </div>
                        <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="cr.address" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                        </span>
                      </el-tooltip>
                    </div>
                    <p class="Text16 textCenter" style="width: 60px;">{{cr.count}}</p>
                    <p class="Text16 textCenter" style="width: 110px;">{{cr.time}}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column min-width="420">
                <template slot="header">
                  <div class="flexDiv">
                    <p class="h3Color Text18" style="width: 180px;">Selected Issuer(Validator)</p>
                    <p class="Text18 h3Color textCenter" style="width: 90px;">Completed</p>
                    <p class="Text18 h3Color textCenter" style="width: 120px;">Selected Time</p>
                  </div>
                </template>
                <template slot-scope="scope" width="300">
                  <div class="flexDiv marBtm12" v-for="(cr,index) in scope.row.childSelected" :key="index">
                    <div class="flexDiv justifyStart" style="width: 180px">
                      <p class="Text16 blueColor cursorPointer oneLine" style="width: 120px" v-if="!cr.name"
                        @click="jumpSiteDetail(cr.address)" >{{cr.address | normalAddress}}</p>
                      <p class="Text16 blueColor cursorPointer oneLine" style="width: 120px" v-if="cr.name"
                        @click="jumpSiteDetail(cr.address)">{{cr.name}}</p>
                      <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom">
                        <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(cr.address)">
                        </span>
                      </el-tooltip>
                      <el-tooltip class="item marLeft4" placement="bottom">
                        <div slot="content" class="Text14">
                          Copy Address: {{cr.address}}
                        </div>
                        <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="cr.address" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                        </span>
                      </el-tooltip>
                    </div>
                    <p class="Text16 textCenter" style="width: 90px;">{{cr.seconds}}</p>
                    <p class="Text16 textCenter" style="width: 120px;">{{cr.time}}</p>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-show=" !trading_records.length > 0 " class="flexDiv columnFlex justifyCenter" style="height:300px;">
            <img src="https://thecelo.com/staticNew/notData2.png" class="normalImg">
            <p class="notDataText">Nothing</p>
          </div>
          <div class="myTable-pagination">
            <el-pagination background v-show="trading_records.length > 0" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :current-page="listPageData.pageNo" layout="total, prev, pager, next,jumper" :total="listPageData.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
// import VabChart from "vue-echarts";
import VabChart from "@/plugins/echarts";
import { account } from "@/assets/api/requset.js";
export default {
  name: "Attestations",
  components: { VabChart },
  data() {
    return {
      // 图表
      circulateSupplyTabs: '180',
      lineEchartsOne: {
        tooltip: {
          trigger: "axis",
          formatter: (res) => {
            var i = res[0].dataIndex;
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            var str = `<div class="${cls}">
              <span style="display:inline-block;" class="marRight8 textColor Text16">${this.echartsOneData[i].title}</span>
              <span class="textColor Text16">${this.echartsOneData[i].shwDate}</span></br>
              <p class="tooltipHint Text14 marTop4"><span style="width: 100px;display:inline-block;" class="textColor">Requested</span>
              <span style="width: 120px;display:inline-block;text-align:right">${this.echartsOneData[i].requested1}/${this.echartsOneData[i].requested2}</span></p>
              <p class="tooltipHint Text14 marTop4"><span style="width: 100px;display:inline-block;" class="textColor">Completed</span>
              <span style="width: 120px;display:inline-block;text-align:right">${this.echartsOneData[i].completed1}/${this.echartsOneData[i].completed2}</span></p>
              <p class="tooltipHint Text14 marTop4"><span style="width: 100px;display:inline-block;" class="textColor">CompletedRate</span>
              <span style="width: 120px;display:inline-block;text-align:right">${this.echartsOneData[i].completedRate}% / ${this.echartsOneData[i].completedTotalRate}%</span></p>
              </div>`;
            return str;
          }
        },
        grid: {
          top: "30",
          right: "34",
          bottom: "60",
          left: "54",
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
        yAxis: [
          {
            type: "log",
            axisLabel: {
              formatter: function (value) {
                return value === 0.1 ? 0 : value;
              }
            },
            // type: "value",
            axisLine: { show: false },
            // axisLabel: { show: false },
            axisLabel: { textStyle: { color: "#999999", fontSize: "10" } },
            axisTick: { show: false },
            splitLine: {
              show: false,
              // 'solid'，实线。 'dotted'，点型虚线。 'dashed'，线性虚线。
              lineStyle: {
                type: "dashed",
                color: "#F2F2F2", //左边线的颜色
                width: "1" //坐标线的宽度
              }
            },
          },{
            // type: "log",
            axisLabel: {
              formatter: function (value) {
                return value === 0.1 ? 0 : value;
              }
            },
            // type: "value",
            axisLine: { show: false },
            // axisLabel: { show: false },
            axisLabel: { textStyle: { color: "#999999", fontSize: "10" } },
            axisTick: { show: false },
            splitLine: {
              show: false,
              // 'solid'，实线。 'dotted'，点型虚线。 'dashed'，线性虚线。
              lineStyle: {
                type: "dashed",
                color: "#F2F2F2", //左边线的颜色
                width: "1" //坐标线的宽度
              }
            },
          }
        ],
        series: [
          {
            name: "Total Requested",
            smooth: 0.8,
            symbol: 'none',   // 不显示拐点
            type: "line",
            yAxisIndex: 0,
            markPoint: {
              symbol: 'image://https://thecelo.com/staticNew/markBgEmpty.png',
              // symbolSize: [64, 28], //容器大小
              symbolOffset: ['0', '-15'],  // 位置偏移
              animation: false,
              itemStyle: {
                normal:{
                  label:{
                    color: (res) => { },//气泡中字体颜色
                    fontSize: 12,
                    fontWeight: 'normal',
                    formatter:  (res) => {
                      if(this.$store.state.themeCls == 'whiteTheme'){
                        return `{a| ${this.$format.thousands(res.value)}}`
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
            //  (%)
            name: "Completed Rate",
            smooth: 0.8,
            symbol: 'none',   // 不显示拐点
            type: "line",
            yAxisIndex: 1,
            markPoint: {
              symbol: 'image://https://thecelo.com/staticNew/markBgEmpty.png',
              // symbolSize: [64, 28], //容器大小
              symbolOffset: ['0', '-5'],  // 位置偏移
              animation: false,
              itemStyle: {
                normal:{
                  label:{
                    color: (res) => { },//气泡中字体颜色
                    fontSize: 12,
                    fontWeight: 'normal',
                    formatter:  (res) => {
                      if(this.$store.state.themeCls == 'whiteTheme'){
                        return `{a| ${this.$format.thousands(res.value)}%}`
                      }
                      return `{b| ${this.$format.thousands(res.value)}%}`
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
                color: '#FFCE47',
              },
            },
          },
        ],
      },
      attestationcount_epoch: [],
      echartsOneData: [],
      // 搜索
      searAddress: '',
      searchOption: "",
      searchoptionsList: [],
      // 列表部分
      isloadListData: false,
      listPageData: {
        pageSize: 30,
        pageNo: 1,
        total: 0
      },
      trading_records: [],
      validators: {},
      isLoad: false
    };
  },
  computed: {
    themeCls(){
      return this.$store.state.themeCls;
    }
  },
  watch: {
    themeCls(val) {
      this.setEcharts();
    },
    searAddress(val) {
      if (!this.searAddress) {
        this.searchOption = '';
      }
      this.searchOption = this.searAddress;
      // this.searchListData();
      if(!val){
        this.searchListData();
      }
    },
    circulateSupplyTabs(){
      if (!this.isLoad) { return; }
      this.setEcharts();
    }
  },
  mounted() {
    this.getInit();
    this.getEcharts();

  },
  methods: {
    jumpAddressDetails(url) {
      if(this.showAddress == url) {return;}
      this.$store.commit('updateheadTabClsId', '5');
      this.$router.push({
        path: `/acountdetail/${url}`
      })
    },
    jumpSiteDetail(url) {
      if(this.showAddress == url) {return;}
      this.$store.commit('updateheadTabClsId', '5');
      this.$router.push({
        path: `/siteDetail/${url}`
      })
    },
    changeOption() {
      this.searAddress = this.searchOption;
    },
    // 15229282260
    getEcharts() {
      var parmas = {
        method: 'attestationcount_epoch',
      };
      account(parmas).then((response) => {
        this.attestationcount_epoch = response.epochs;
        this.setEcharts();
      })
    },
    setEcharts() {
      // 处理 下拉项
      let requestedTotal = 0;
      let completedTotal = 0;
      var d = (this.circulateSupplyTabs == 'all') ? '' : this.circulateSupplyTabs;
      var attestationcount_epoch = this.attestationcount_epoch;
      let keys = Object.keys(attestationcount_epoch)
      if (!d || keys.length - d < 0) { d = keys.length }
      keys = keys.splice(keys.length - d);

      var data = [];
      var seriesData = [];
      var timeData = [];
      var rateData = [];
      keys.forEach((epoch, i) => {
        let item = attestationcount_epoch[epoch];
        let epoch_date = this.$format.getEpochDate(epoch)
        //
        requestedTotal += item[0];
        completedTotal += item[2];
        let completedTotalRate = (100 * (completedTotal / requestedTotal)).toFixed(2);
        let completedRate = (100 * (item[2] / item[0])).toFixed(2);

        data.push({
          requested1: this.$format.thousands(item[0]),
          requested2: this.$format.thousands(requestedTotal),
          completed1: this.$format.thousands(item[2]),
          completed2: this.$format.thousands(completedTotal),
          completedRate: completedRate,
          completedTotalRate: completedTotalRate,
          shwDate: epoch_date.substr(5, 11),
          title: this.$format.rankStr(epoch) + ' Epoch'
        })
        seriesData.push(item[0]);
        timeData.push(epoch_date.substr(5, 11));
        rateData.push(completedRate);
      })
      this.echartsOneData = data;
      if (this.$store.state.themeCls == 'whiteTheme') {
        this.setWhitelineOne();
      } else {
        this.setBlacklineOne();
      }
      this.lineEchartsOne.series[0].data = seriesData;
      this.lineEchartsOne.series[1].data = rateData;
      this.lineEchartsOne.xAxis.data = timeData;
    },
    setWhitelineOne(){
      // 绿色
      this.lineEchartsOne.series[0].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#63CF59' },
            { offset: 0, color: '#ffffff' },
          ])
      }
      // 黄色
      this.lineEchartsOne.series[1].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#FFEFC2' },
            { offset: 0, color: '#ffffff' },
          ])
      }
    },
    setBlacklineOne(){
      // 绿色
      this.lineEchartsOne.series[0].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#2E4E1A' },
            { offset: 0, color: '#ffffff' },
          ])
      }
      // 黄色
      this.lineEchartsOne.series[1].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#836533' },
            { offset: 0, color: '#1E2621' },
          ])
      }
    },
    getInit() {
      var parmas = {
        method: 'validators',
      };
      account(parmas).then((response) => {
        // 处理 下拉项
        var validators = response.validators;
        let options = [];
        Object.keys(validators).forEach((address, i) => {
          let name = validators[address][0];
          if (name.trim().length == 0) {
            name = this.$format.formatAddress(address, false, false, false)
          };
          options.push({
            value: address,
            label: name
          })
        });
        this.searchoptionsList = options;
        // 
        this.isLoad = true;
        this.validators = response.validators;
        this.getListData();
      })
    },
    getListData() {
      if (this.isloadListData) { return; }
      this.isloadListData = true;
      var parmas = {
        method: 'attestation_identifiers',
        address: this.searAddress,
        page: Number(this.listPageData.pageNo - 1),
      };
      account(parmas).then((response) => {
        this.listPageData.total = response.totalIdentifiers;
        var listData = [];
        let identifiers = response.result;
        var that = this;
        Object.keys(identifiers).forEach((identifier, i) => {
          let item = identifiers[identifier];
          let obj = {};
          obj.address = identifier;
          let requests = item[0];
          // 处理 Requested 循环部分
          var childRequested = [];
          requests.forEach((request, i) => {
            childRequested.push({
              address: request[2],
              time: that.$format.getUTCTime(request[1]),
              count: request[3]
            })
          });
          obj.childRequested = childRequested;
          // 处理 Selected 循环部分 Selected Issuer(Validator)
          let completeds = item[1];
          var childSelected = [];
          completeds.forEach((completed, i) => {
            let seconds = (parseInt(completed[4]) - parseInt(completed[1])) + 's';
            childSelected.push({
              name: that.validators[completed[2]][0],
              address: completed[2],
              time: that.$format.getUTCTime(completed[1]),
              seconds: (completed[4] == 0) ? '---' : seconds
            })
          });
          obj.childSelected = childSelected;
          listData.push(obj);
        })
        this.trading_records = listData;
        this.isloadListData = false;
      })
    },
    //搜索
    searchListData() {
      this.trading_records = [];
      this.listPageData.pageNo = 1;
      this.getListData();
    },
    //分页
    handleCurrentChange: function (pageNo) {
      this.listPageData.pageNo = pageNo;
      this.getListData();
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
