<template>
  <div :class="$store.state.themeCls">
    <div class="mainContainer">
      <p class="primaryTitle">{{pageTitle}}</p>
      <div class="mainCon-sub">
        <el-card class="marTop24">
          <el-row :gutter="20">
            <el-col :lg="7" :md="7" :sm="9" :xs="24" class="borderRight" style="padding-right: 20px;">
              <p class="Text22 " style="color: #5F5F5F;">{{account_name}}</p>
              <!-- account_address -->
              <div class="flexDiv justifyStart marTop8">
                <p class="Text16">{{account_address | normalAddress}}</p>
                <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom" v-if="account_address">
                  <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(account_address)">
                  </span>
                </el-tooltip>
                <el-tooltip class="item marLeft4" placement="bottom" v-if="account_address">
                  <div slot="content" class="Text14">
                    Copy Address: {{account_address}}
                  </div>
                  <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="account_address" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                  </span>
                </el-tooltip>
              </div>
              <div class="">
                <div class="flexDiv marTop22 h4Color Text16">Available CELO<p class="Text16 greenColor">{{AvailableNum | thousands}}</p></div>
                <div class="flexDiv marTop22 h4Color Text16">Locked CELO<p class="Text16 greenColor">{{LockedNum | thousands}}</p></div>
                <div class="flexDiv marTop22 h4Color Text16">NonVoting Locked CELO<p class="Text16 greenColor">{{nonVotingLockedNum | thousands}}</p></div>
                <div class="flexDiv marTop22 h4Color Text16">Pending Withdrawals CELO<p class="Text16 greenColor">{{Pending | thousands}}</p></div>
                <div class="flexDiv marTop22 h4Color Text16">Available cUSD<p class="Text16 greenColor">{{AvailableUsd | thousands}}</p></div>
                <div class="flexDiv marTop22 h4Color Text16">Total CELO<p class="Text16 greenColor">{{TotalNum | formatNum | thousands}}</p></div>
              </div>
            </el-col>
            <el-col :lg="17" :md="17" :sm="15" :xs="24">
              <div class="flexDiv">
                <p class="Text22">Epoch Balance</p>
                <p class="">
                  <span @click="changeBalanceType('echarts')" class="iconfont Text22 cursorPointer icon-tubiaozoushitu" :class="BalanceType == 'echarts' ? 'greenColor' : ''"></span>
                  <span @click="changeBalanceType('Details')" class="marLeft8 Text22 cursorPointer iconfont icon-liebiao" :class="BalanceType == 'Details' ? 'greenColor' : ''"></span>
                </p>
              </div>
              <div class="DailyType" v-show="BalanceType == 'echarts'">
                <div v-if="!isBalanceCeloCusd" class="flexDiv loadCon" style="width: 100%;height: 270px">
                  <p><i class="el-icon-loading"></i></p>
                  <p class="loading-text">Loading</p>
                </div>
                <vab-chart v-if="isBalanceCeloCusd" style="width: 100%;height: 270px" class="echartsCon" :autoresize="true" :options="BalanceCeloCusdEcharts" 
                 :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')"/>
              </div>
              <!-- Details -->
              <div v-show="BalanceType == 'Details'">
                <div class="myTable tabTable" style="margin-top: 6px;">
                  <el-table height="270" class="downLoadTable" :data="BalanceList" fit align="center" stripe  
                    style="width: 100%;overflow-y:hidden;" :default-sort="{prop: 'EpochShow', order: 'descending'}">
                    <template slot="empty">
                      <div class="flexDiv columnFlex justifyCenter" style="height: 270px;">
                        <img src="../../assets/images/notData2.png" class="normalImg">
                        <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
                      </div>
                    </template>
                    <el-table-column prop="EpochShow" label="Epoch" align="center" width="120" >
                      <template slot-scope="scope">
                        <span class="greenColor">{{scope.row.Epoch}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="CELO" label="CELO" align="center" min-width="100">
                      <template slot-scope="scope">
                        <span class="greenColor">{{scope.row.cELO | formatNum3 | thousands}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="cUSD" label="cUSD" align="center" min-width="100">
                      <template slot-scope="scope">
                        <span class="greenColor">{{scope.row.cUSD | formatNum3 | thousands}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col> 
          </el-row>
        </el-card>
        <el-card class="marTop32" v-if="isreleasegold == 'releasegold'">
          <p class="Text22">Release Gold contracts</p>
          <el-row class="marTop12" :gutter="24">
            <el-col :lg="12" :md="12" :sm="24" :xs="24" style="padding-right: 4%">
              <p class="Text16">Contract Information</p>
              <div class="flexDiv marTop20 h4Color">
                <p style="width: 150px" class="h4Color Text16">Beneficiary Address</p>
                <div class="flexDiv justifyStart marTop4 textRight" style="width:calc(100% -150px)">
                  <p class="Text16 h4Color oneLine">{{beneficiary | normalAddress}}</p>
                  <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom" v-if="beneficiary">
                    <span class="iconfont Text22 icon-lianjie h3Color cursorPointer" @click="jumpAddress(beneficiary)">
                    </span>
                  </el-tooltip>
                  <el-tooltip class="item marLeft4" placement="bottom" v-if="beneficiary">
                    <div slot="content" class="Text14">
                      Copy Address: {{beneficiary}}
                    </div>
                    <span class="iconfont Text22 icon-fuzhi h3Color cursorPointer" v-clipboard:copy="beneficiary" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                    </span>
                  </el-tooltip>
                </div>
              </div>
              <div class="flexDiv marTop20 h4Color">
                <p style="width: 150px" class="h4Color Text16">Release Owner</p>
                <div class="flexDiv justifyStart marTop4 textRight" style="width:calc(100% -150px)">
                  <p class="Text16 h4Color oneLine">{{releaseOwner | normalAddress}}</p>
                  <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom" v-if="releaseOwner">
                    <span class="iconfont Text22 icon-lianjie h3Color cursorPointer" @click="jumpAddress(releaseOwner)">
                    </span>
                  </el-tooltip>
                  <el-tooltip class="item marLeft4" placement="bottom" v-if="releaseOwner">
                    <div slot="content" class="Text14">
                      Copy Address: {{releaseOwner}}
                    </div>
                    <span class="iconfont Text22 icon-fuzhi h3Color cursorPointer" v-clipboard:copy="releaseOwner" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                    </span>
                  </el-tooltip>
                </div>
              </div>
              <div class="flexDiv marTop20 h4Color">
                <p style="width: 150px" class="h4Color Text16">Refund Address</p>
                <div class="flexDiv justifyStart marTop4 textRight" style="width:calc(100% -150px)">
                  <p class="Text16 h4Color oneLine">{{refundAddress | normalAddress}}</p>
                  <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom" v-if="refundAddress">
                    <span class="iconfont Text22 icon-lianjie h3Color cursorPointer" @click="jumpAddress(refundAddress)">
                    </span>
                  </el-tooltip>
                  <el-tooltip class="item marLeft4" placement="bottom" v-if="refundAddress">
                    <div slot="content" class="Text14">
                      Copy Address: {{refundAddress}}
                    </div>
                    <span class="iconfont Text22 icon-fuzhi h3Color cursorPointer" v-clipboard:copy="refundAddress" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                    </span>
                  </el-tooltip>
                </div>
              </div>
              <div class="flexDiv marTop20 h4Color">
                <p style="width: 150px" class="h4Color Text16">can Validate</p>
                <div class="flexDiv justifyStart marTop4 textRight" style="width:calc(100% -150px)">
                  <i v-if="canValidate" class="iconfont icon-duigou greenColor Text14"></i>
                  <span v-if="!canValidate" class="greenColor Text14">—</span>
                </div>
              </div>
              <div class="flexDiv marTop20 h4Color">
                <p style="width: 150px" class="h4Color Text16">can Vote</p>
                <div class="flexDiv justifyStart marTop4 textRight" style="width:calc(100% -150px)">
                  <i v-if="canVote" class="iconfont icon-duigou greenColor Text14"></i>
                  <span v-if="!canVote" class="greenColor Text14">—</span>
                </div>
              </div>
              <div class="flexDiv marTop20 h4Color">
                <p style="width: 150px" class="h4Color Text16">Liquidity Provision Met</p>
                <div class="flexDiv justifyStart marTop4 textRight" style="width:calc(100% -150px)">
                  <i v-if="liquidityProvisionMet" class="iconfont icon-duigou greenColor Text14"></i>
                  <span v-if="!liquidityProvisionMet" class="greenColor Text14">—</span>
                </div>
              </div>
            </el-col>
            <!--  -->
            <el-col :lg="12" :md="12" :sm="24" :xs="24">
              <p class="Text16">Release Schedule</p>
              <div class="flexDiv marTop20 h5Color">
                <p style="width: 170px" class="h4Color Text16">Release Start</p>
                <div class="flexDiv justifyStart marTop4 textRight Text16" style="width:calc(100% -170px)">
                  {{releaseStartTime}}
                </div>
              </div>
              <div class="flexDiv marTop20 h5Color">
                <p style="width: 170px" class="h4Color Text16">Release Cliff</p>
                <div class="flexDiv justifyStart marTop4 textRight Text16" style="width:calc(100% -170px)">
                  {{releaseCliff}}
                </div>
              </div>
              <div class="flexDiv marTop20 h5Color">
                <p style="width: 170px" class="h4Color Text16">Number of release periods</p>
                <div class="flexDiv justifyStart marTop4 textRight Text16" style="width:calc(100% -170px)">
                  {{numReleasePeriods}}
                </div>
              </div>
              <div class="flexDiv marTop20 h5Color">
                <p style="width: 170px" class="h4Color Text16">Release Period</p>
                <div class="flexDiv justifyStart marTop4 textRight Text16" style="width:calc(100% -170px)">
                  {{releasePeriod}}
                </div>
              </div>
              <div class="flexDiv marTop20 h5Color">
                <p style="width: 170px" class="h4Color Text16">Amount released per period</p>
                <div class="flexDiv justifyStart marTop4 textRight Text16 " style="width:calc(100% -170px)">
                  {{amountReleasedPerPeriod}}
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <!--  -->
        <div class="myCard marTop32" style="width: 100%;height: 320px">
          <div class="flexDiv">
            <p class="Text24">
              Total Votes
              <span class="greenColor marLeft6 ">
                {{totalvotesNum | thousands}}
              </span>
            </p>
            <p>
              <span @click="changeVotesType('Votes')" class="iconfont Text22 cursorPointer icon-tubiaozoushitu" :class="VotesType == 'Votes' ? 'greenColor' : ''"></span>
              <span @click="changeVotesType('Details')" class="marLeft8 Text22 cursorPointer iconfont icon-liebiao" :class="VotesType == 'Details' ? 'greenColor' : ''"></span>
            </p>
          </div>
          <div class="DailyType" v-show="VotesType == 'Votes'">
            <vab-chart v-show="totalVotesList.length > 0" style="width: 100%;height: 270px" class="echartsCon" :autoresize="true" 
              :options="totalVotesEcharts" :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')"/>
            <div v-show="!totalVotesList.length > 0"  class="flexDiv columnFlex justifyCenter" style="height: 260px;">
              <img src="../../assets/images/notData2.png" class="normalImg">
              <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
            </div>
          </div>
          <!-- Details -->
          <div v-show="VotesType == 'Details'" class="myTable tabTable" style="margin-top: 10px;">
            <el-table height="260" class="downLoadTable" :data="totalVotesList" fit  stripe 
              align="center" style="width: 100%;overflow-y:hidden;" :default-sort="{prop: 'percentSort', order: 'descending'}">
              <template slot="empty">
                <div class="flexDiv columnFlex justifyCenter" style="height: 260px;">
                  <img src="../../assets/images/notData2.png" class="normalImg">
                  <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
                </div>
              </template>
              <el-table-column prop="EpochShow" label="Name/Address" min-width="260">
                <template slot-scope="scope">
                  <div class="flexDiv justifyStart">
                    <p class="Text16">{{scope.row.nameAddress | normalAddress}}</p>
                    <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom">
                      <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(scope.row.address)">
                      </span>
                    </el-tooltip>
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
              <el-table-column prop="weight" label="Weight" width="160">
                <template slot-scope="scope">
                  <span class="">{{scope.row.weight | formatNum3 | thousands}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="percentSort" width="160" label="Percent">
                <template slot-scope="scope">
                  <span class="">{{scope.row.percent }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="marTop32">
          <addresstabTable :showAddress="showAddress"></addresstabTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addresstabTable from "@/views/addressDetail/addresstabTable.vue";
import * as echarts from "echarts";
// import VabChart from "vue-echarts";
import VabChart from "@/plugins/echarts";
import { account } from "@/assets/api/requset.js";
export default {
  name: "addresstab",
  data() {
    return {
      pageTitle: 'Validator Details',
      isreleasegold: '',
      showAddress: this.$route.params.id,
      account_name: '',
      account_address: '',
      // Balance 数据
      AvailableNum:'',
      LockedNum:'',
      nonVotingLockedNum: '',
      Pending:'',
      AvailableUsd:'',
      TotalNum:'',
      BalanceType: 'echarts',
      BalanceList: [],
      isBalanceCeloCusd: false,
      BalanceCeloCusdEcharts: {
        tooltip: {
          trigger: "axis",
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置
            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];
            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];
            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }
            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }
            return [x, y];
          },
          formatter: (res) => {
            var i= res[0].dataIndex;
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            var str = `<div class="${cls}">
              <span class="Text16 textColor">${this.BalanceList[i].epochTitle}</span>
              <p class="tooltipHint Text16 marTop4 marBtm6 flexDiv">
                <span style="width: 150px;display:inline-block;" class="textColor textLeft">Total CELO</span>${this.BalanceList[i].totalCelo}</p>
              <p class="tooltipHint Text16 marTop4 marBtm6 flexDiv">
                <span style="width: 150px;display:inline-block;" class="textColor textLeft">Total Locked CELO</span>${this.BalanceList[i].lockedCelo}</p>
              <p class="tooltipHint Text16 marTop4 marBtm6 flexDiv">
                <span style="width: 150px;display:inline-block;" class="textColor textLeft">NonVoting Locked CELO</span>${this.BalanceList[i].nonVotingCelo}</p>
              <p class="tooltipHint Text16 marTop4 marBtm6 flexDiv">
                <span style="width: 150px;display:inline-block;" class="textColor textLeft">Pending Withdrawals CELO</span>${this.BalanceList[i].pendingCelo}</p>
              <p class="tooltipHint Text16 marTop4 marBtm6 flexDiv">
                <span style="width: 150px;display:inline-block;" class="textColor textLeft">Available CELO</span>${this.BalanceList[i].availableCelo}</p>
              <p class="tooltipHint Text16 marTop4 marBtm6 flexDiv">
                <span style="width: 150px;display:inline-block;" class="textColor textLeft">Available cUSD</span>
                  ${this.BalanceList[i].availableCusd}</p>
              </div>
              `
            return str;
          }
        },
        grid: {
          top: "34",
          right: "34",
          bottom: "60",
          // left: "100",
          left: '30'
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
            name: "CELO",
            smooth: 0.6,
            symbol: 'none',   // 不显示拐点
            type: "line",
            data: [],
            itemStyle: {
              normal: {
                color: '#63CF59',
              },
            },
          },
          {
            name: "cUSD",
            smooth: 0.6,
            symbol: 'none',   // 不显示拐点
            type: "line",
            data: [],
            itemStyle: {
              normal: {
                color: '#0091FF',
              },
            },
          },
        ],
      },
      // Release Gold contracts >>>>> Contract Information 
      beneficiary: '',
      releaseOwner: '',
      refundAddress: '',
      canValidate: true,
      canVote: false,
      liquidityProvisionMet: true,
      // Release Gold contracts >>>>> Release Schedule -->
      releaseStartTime:'',
      releaseCliff: '',
      numReleasePeriods: '',
      releasePeriod: '',
      amountReleasedPerPeriod: '',
      
      // Total Votes
      VotesType: 'Votes', // Details
      totalvotesNum: '',
      totalVotesList: [],
      totalVotesEcharts: {
        tooltip: {
          trigger: "item",
          formatter: (res) => {
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            var str = `
            <div class="${cls}">
              <p class="tooltipHint Text14"><span class="Text16 textColor marRight8" style="display:inline-block;">${res.data.name}</span>
              ${res.data.weight}(${res.data.percent})</p></div>`;
            return str;
          }
        },
        grid: {
          top: "0",
          right: "10",
          bottom: "26",
          left: "10"
        },
        legend: {
          type: 'scroll',  // 数据过多时，分页显示
          // orient: 'vertical',
          right: '30%',
          top: 'middle',
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            color: "#999999", //图例文字
            fontSize: '12'
          },
          // formatter: function (name) {
          //   return (name.length > 21 ? (name.slice(0, 21) + "...") : name);
          // }
        },
        series: [
          {
            name: '',
            type: 'pie',
            minAngle: 2,
            radius: ['39%', '58%'],
            startAngle: 100,
            center: ['30%', '44%'],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                formatter: '{d}%',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
                textStyle: {
                  align: 'center',
                  baseline: 'middle',
                  fontSize: 12,
                }
              },
            },
            labelLine: {
              show: true,//数据标签引导线
              length: 23,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            data: [],
            itemStyle: {
              color: function (params) {
                var colorList = ["#6356FD", "#B356FD", "#F3657C", "#FFCB3D", "#5BCB74", "#4FCCCB", "#49A1FF"];
                return colorList[params.dataIndex];
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      group_epoch_votes: {},
    };
  },
  components: {VabChart, addresstabTable, },
  computed: {
    themeCls(){
      return this.$store.state.themeCls;
    }
  },
  watch: {
    '$route' (to, from) {
      if(to.params.id !== from.params.id){
        this.showAddress = to.params.id;
      }
      if(to.path.indexOf('siteDetail') != -1){
        this.pageTitle = 'Validator Details';
      } else {
        this.pageTitle = 'Account Details';
      }
    },
    showAddress() {
      this.getData();
      this.getBalanceList();
      this.getVotesEcharts();
    },
    themeCls(val) {
      this.getBalanceList();
    }
  },
  mounted() {
    if(this.$route.path.indexOf('acountdetail') != -1){
      this.pageTitle = 'Account Details'
    } else {
      this.pageTitle = 'Validator Details';
    }
    this.getData();
    this.getBalanceList();
    this.getVotesEcharts();
  },
  methods: {
    changeVotesType(data){
      if(this.VotesType != data){
        this.VotesType = data;
      }
    },
    changeBalanceType(data){
      if(this.BalanceType != data){
        this.BalanceType = data;
      }
    },
    getVotesEcharts(){
      var parmas = {
        method: 'voters',
        address: this.showAddress
      };
      account(parmas).then((response) => {
        //
        var total_votes = 0
        Object.keys(response).forEach((key, i) => {
          total_votes += response[key].weight
        })
        this.totalvotesNum = (total_votes/1e+18).toFixed(2);
        //
        var voteAccounts = [];
        Object.keys(response).forEach((key, i) => {
          if(response[key].weight>0){
            let weight = parseFloat((response[key].weight/1e+18).toFixed(2))
            let percent = (weight*100/(total_votes/1e+18)).toFixed(2)+'%'
            let name = response[key].name.length>0?response[key].name:key;
            voteAccounts.push({
              nameAddress: name,
              value: weight,
              weight: weight,
              percent: percent,
              address: key,
              name: response[key].name || key
            })
          }
        });
        voteAccounts = voteAccounts.sort(function(x,y){ return y[1]-x[1];});
        this.totalVotesList = voteAccounts;
        this.totalVotesEcharts.series[0].data = voteAccounts;
      });
    },
    getData(){
      var parmas = {
        method: 'account',
        address: this.showAddress
      };
      account(parmas).then((response) => {
        this.account_name = response.name;
        this.account_address = this.$format.formatAddress(this.showAddress,true,true,true);
        this.AvailableNum = response.celo ? response.celo.toFixed(2) : 0.00;
        this.LockedNum = response.totalLockedGold ? response.totalLockedGold.toFixed(2) : 0.00;
        this.nonVotingLockedNum = response.nonvotingLockedGold ? response.nonvotingLockedGold.toFixed(2) : 0.00;
        this.Pending = 	response.pendingWithdrawals ? response.pendingWithdrawals.toFixed(2) : 0.00;
        this.AvailableUsd = response.cusd ? response.cusd.toFixed(2) : 0.00;
        this.TotalNum = parseFloat(this.AvailableNum)+parseFloat(this.LockedNum)+parseFloat(this.Pending);
        // Release Gold contracts >>>>> Contract Information 
        var type = response.type ? response.type.toLowerCase().replace(/\s*/g,"") : '';
        if(type== 'releasegold'){
          this.isreleasegold = 'releasegold'
          let releasegold = response.releaseGold;
          // Contract Information
          this.beneficiary = releasegold.beneficiary;
          this.releaseOwner = releasegold.releaseOwner;
          this.refundAddress = releasegold.refundAddress;
          this.canValidate = releasegold.canValidate=='true';
          this.canVote = releasegold.canVote=='true';
          this.liquidityProvisionMet = releasegold.liquidityProvisionMet=='true';
          // Release Schedule
          var date = new Date(releasegold.releaseStartTime)
          let YMDhms = this.$format.formatDateShen(date.getTime());
          this.releaseStartTime = `${YMDhms[0]}-${YMDhms[1]}-${YMDhms[2]}  ${YMDhms[3]}:${YMDhms[4]}`
					let	enddate = new Date(releasegold.releaseCliff)
			    let endYMDhms = this.$format.formatDateShen(enddate.getTime());
          this.releaseCliff = `${endYMDhms[0]}-${endYMDhms[1]}-${endYMDhms[2]}  ${endYMDhms[3]}:${endYMDhms[4]}`
          this.numReleasePeriods =  releasegold.numReleasePeriods;
          this.releasePeriod = releasegold.releasePeriod;
          let amountReleasedPerPeriod = releasegold.amountReleasedPerPeriod.split(/\s+/);//blank or blanks
          amountReleasedPerPeriod = (amountReleasedPerPeriod[0]/1e+18).toFixed(2)
          this.amountReleasedPerPeriod = this.$format.thousands(amountReleasedPerPeriod)+' CELO';
        }
      })
    },
    getBalanceList(){
      this.isBalanceCeloCusd = false;
      var parmas = {
        method: 'account_epoch_balance',
        address: this.showAddress
      };
      account(parmas).then((response) => {
        // BalanceList  EpochShow   Epoch  cELO  cUSD
        let history = [];
        var balanceCeloList = [];
        var balanceCusdList = [];
        var epochDate = [];
        Object.keys(response).forEach((epoch, i) => {
          let balance = response[epoch];
          let totalLockedGold = balance[0];
          let nonvotingLockedGold = balance[1];
          let pendingWithdrawals = balance[2];
          let totalCelo = balance[0] + balance[1] + balance[2] + balance[3];
          let celo = balance[3];
          let cusd = balance[4];
          let epoch_date = this.$format.getEpochDate(epoch);
          history.push({
            epochTitle: this.$format.chartTipTitle(epoch),
            totalCelo: this.$format.thousands(totalCelo.toFixed(2)),   // Total CELO
            lockedCelo: this.$format.thousands(totalLockedGold.toFixed(2)),// Total Locked CELO
            nonVotingCelo: this.$format.thousands(nonvotingLockedGold.toFixed(2)), // NonVoting Locked CELO
            pendingCelo: this.$format.thousands(pendingWithdrawals.toFixed(2)), // Pending Withdrawals CELO
            availableCelo: this.$format.thousands(celo.toFixed(2)),// Available CELO
            availableCusd: this.$format.thousands(cusd.toFixed(2)),// Available cUSD
            Epoch: this.$format.rankStr(epoch),
            cELO: totalCelo,
            cUSD: cusd
          })

          epochDate.push(epoch_date.substr(5,6));
          balanceCeloList.push(totalCelo);
          balanceCusdList.push(cusd);
          // tip += '<li class="'+list_li_class+'"><strong>'+rankStr(epoch)+' Epoch</strong><strong>'+epoch_date.substr(5,11)+'</strong></li>'
        })
        this.BalanceList = history;
        // BalanceCeloCusdEcharts
        if (this.$store.state.themeCls == 'whiteTheme') {
          this.setWhiteBalanceCeloCusd();
        } else {
          this.setBlackBalanceCeloCusd();
        }
        this.BalanceCeloCusdEcharts.xAxis.data = epochDate;
        this.BalanceCeloCusdEcharts.series[0].data = balanceCeloList;
        this.BalanceCeloCusdEcharts.series[1].data = balanceCusdList;
        this.isBalanceCeloCusd = true;
      })
    },
    setWhiteBalanceCeloCusd(){
      // 绿色
      this.BalanceCeloCusdEcharts.series[0].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#EBFFEA' },
            { offset: 0, color: '#ffffff' },
          ])
      }
      // 蓝色
      this.BalanceCeloCusdEcharts.series[1].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#0091FF' },
            { offset: 0, color: '#ffffff' },
          ])
      }
    },
    setBlackBalanceCeloCusd(){
      // 绿色
      this.BalanceCeloCusdEcharts.series[0].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#143C12' },
            { offset: 0, color: '#1E2621' },
          ])
      }
      // 蓝色
      this.BalanceCeloCusdEcharts.series[1].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#0091FF' },
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
