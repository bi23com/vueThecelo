<template>
  <div class="">
    <div class="mainContainer NetworkData">
      <div class="flexDiv">
        <p class="primaryTitle">Network Data</p>
        <div class="mapAdver-swiperDiv">
          <van-swipe vertical :autoplay="3600" class="mapAdver-swiper" style="width: 100%;">
            <van-swipe-item>
              <p class="Text16 h2Color cursorPointer" @click="jumpNotice('1')">
                <i class="iconfont icon-xingzhuang Text18 marRight4" style="color:#e4e4e4;"></i> Unlocking the Eurozone with cEUR Stablecoins
              </p>
            </van-swipe-item>
            <van-swipe-item>
              <p class="Text16 h2Color cursorPointer" @click="jumpNotice('2')">
                <i class="iconfont icon-xingzhuang Text18 marRight4" style="color:#e4e4e4;"></i> Announcing the Grand Prize Winners of Celo Camp Batch 3!
              </p>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="mainCon-sub">
        <!--  -->
        <el-row class="flexDiv flexWrap marBtm42">
          <el-col :md="14" :sm="24" :xs="24">
            <div style="overflow:hidden;" class="NetworkNameDiv">
              <div v-if="isskeleton" class="flexDiv NetworkName justifyStart">
                <div class="textCenter NetworkNameImg">
                  <i class="iconfont icondefault-header greenColor" style="font-size:80px;"></i>
                </div>
                <div class="NetworkNameText">
                  <p class="marBtm6 radius6 goverSkeleton" style="width: 120px;max-width:100%;height: 22px;"></p>
                  <p class="marTop8 radius6 goverSkeleton" style="width: 320px;max-width:100%;height: 24px;"></p>
                </div>
              </div>
              <transition name="showAddress" v-if="!isskeleton">
                <!-- dashboard[18] -->
                <div v-if="networkDataAddress" class="flexDiv NetworkName justifyStart">
                  <div class="textCenter NetworkNameImg">
                    <div @click="jumpAddress(networkData.address)" class="radius50per dasLogo">
                      <img v-if="networkData.name" :src="networkData.logoImg" @error="imgError">
                      <!-- zhanweiImg -->
                      <img v-if="!networkData.name" src="https://thecelo.com/staticNew/NormalLogo.png">
                    </div>
                  </div>
                  <div class="NetworkNameText">
                    <p class="marBtm6 Text20">{{networkData.name}}</p>
                    <p class="Text16 h4Color breakWord twoLine">
                      {{networkData.address}}  
                      <!-- 17:   name      18: title -->
                    </p>
                  </div>
                </div>
              </transition>
            </div>
            <el-row class="BlockData marBtm18">
              <el-col :lg="6" :md="12" :sm="7" :xs="12" class="textCenter borderRight marBtm18">
                <!-- {{networkData.TotalBlocks | thousands}} -->
                <p class="Text30 weightText flexDiv justifyCenter greenColor">
                  <numCount :num="networkData.TotalBlocks"></numCount>
                </p>
                <p class="Text16 h4Color">Block Height</p>
              </el-col>
              <el-col :lg="4" :md="12" :sm="4" :xs="12" class="textCenter borderRight marBtm18 hideBorderRightxs">
                <div class="Text32 weightText flexDiv justifyCenter greenColor">
                  <!-- <span v-if="!Block_Time">0</span> -->
                  <numCount class="" :num="Block_Time"></numCount>
                  <span class="marFuTop">s</span>
                </div>
                <p class="Text16 h4Color">Block Time</p>
              </el-col>
              <el-col :lg="14" :md="24" :sm="13" :xs="24" class="textCenter marBtm18">
                <div class="">
                  <el-row class="flexDiv" style="flex-wrap:nowrap">
                    <el-col :lg="8" :span="8" :xs="8" class="marBtm18">
                      <p class="Text16 h4Color textRight " style="height:40px;line-height:40px;">
                        <countTo :startVal='startepocNo' :endVal='endepocNo' :duration='3000' class="netDataNumText h1Color weightText"></countTo>
                        Th Epoch
                      </p>
                      <p class="h4Color Text18 textRight " v-html="networkData.EpocEndTime"></p>
                    </el-col>
                    <el-col :lg="9" :span="10" :xs="10" class="marBtm18">
                      <el-progress class="network-press" color="#5CCD53" :stroke-width="10" :percentage="epochRate"></el-progress>
                    </el-col>
                    <el-col :lg="7" :span="6" :xs="6" class="marBtm18">
                      <p class="Text18 textLeft">
                        {{epochMin}}<span class="Text18">/</span>{{endEpochSize}}
                        <!-- <countTo :startVal='startepochMin' :endVal='epochMin' :duration='3000' class="Text18 h1Color"></countTo>/ -->
                      </p>
                      <!-- <p class="h4Color Text16">Epoch</p> -->
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :md="10" :sm="24" :xs="24">
            <div class="justifyEnd flexDiv">
              <div class="advertising radius8">
                <div class="adverte-item borderBottom flexDiv justifyStart cursorPointer" @click="jumpUrl('http://celo.dance/')">
                  <img src="../../assets/images/homeAdver/celoDanceLogo.png" class="homeAdverImg marRight8 radius50per">
                  <div style="width:calc(100% - 40px)">
                    <p class="Text18 cursorPointer">CeloDance</p>
                    <p class="h5Color Text16 oneLine">Lightweight Celo mobile wallet</p>
                  </div>
                </div>
                <div class="adverte-item borderBottom flexDiv justifyStart cursorPointer" @click="jumpUrl('https://valoraapp.com/')">
                  <img src="../../assets/images/homeAdver/ValoraLogo.png" class="homeAdverImg marRight8 radius50per">
                  <div style="width:calc(100% - 40px)">
                    <p class="Text18 cursorPointer">Valora</p>
                    <p class="h5Color Text16 oneLine">Celo Moblie wallet powered by CeloOrg</p>
                  </div>
                </div>
                <div class="adverte-item flexDiv justifyStart cursorPointer" @click="jumpUrl('https://weteam.io/')">
                  <img src="../../assets/images/homeAdver/weteamLogo2.png" class="homeAdverImg marRight8 radius50per">
                  <div style="width:calc(100% - 40px)">
                    <p class="Text18">WeTeam</p>
                    <p class="h5Color Text16 oneLine">Team Incentive and management tool</p>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- el-tabs__item -->
        <div class="tabGroup  marTop20">
          <el-tabs v-model="circulateSupplyTabs" class="epochDetailChange" @tab-click="handleClick">
            <el-tab-pane label="30D" name="30">
              <p slot="label" class="tabWid" style="width:80px;">30D</p>
            </el-tab-pane>
            <el-tab-pane label="60D" name="60">
              <p slot="label" class="tabWid" style="width:80px;">60D</p>
            </el-tab-pane>
            <el-tab-pane label="1/2Y" name="180">
              <p slot="label" class="tabWid" style="width:80px;">1/2Y</p>
            </el-tab-pane>
            <el-tab-pane label="1Y" name="365">
              <p slot="label" class="tabWid" style="width:80px;">1Y</p>
            </el-tab-pane>
            <el-tab-pane label="All" name="All">
              <p slot="label" class="tabWid" style="width:80px;">All</p>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div style="width: 100%;" class="marTop12">
          <el-row>
            <el-col :md="12" :span="24" class="marBtm12">
              <div class="NetworkEcharts padRight20">
                <div class="flexDiv">
                  <p>Daily Transactions</p>
                  <p class="h3Color Text16">Total Transactions</p>
                </div>
                <p class="textRight Text18 greenColor weightText marBtm6">{{total_txs | thousands}}</p>
                <div class="barLinearBg" style="width: 100%;height: 200px">
                  <div class="barLinearBar">
                    <vab-chart style="width: 100%;height: 200px" class="echartsCon" :autoresize="true" :options="DailyTransactionsEcharts"
                    :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')" />
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :md="12" :span="24" class="marBtm12">
              <!--  style="padding: 0 16px" -->
              <div class="padLeft20 NetworkEcharts">
                <!--  -->
                <div class="flexDiv">
                  <p>Addresses</p>
                  <p class="h3Color Text16">
                    <span>Total Addresses</span>
                    <span style="width:70px;display:inline-block;" class="greenColor weightText textRight">{{total_addresses | thousands}}</span></p>
                </div>
                <p class="textRight h3Color Text16 marBtm6">
                  <span>Contract Addresses</span>
                  <span class="greenColor weightText" style="width:70px;display:inline-block;">{{contract_addresses | thousands}}</span>
                </p>
                <vab-chart style="width: 100%;height: 200px" class="echartsCon" :autoresize="true" :options="AddresseEcharts" 
                  :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')"/>
              </div>
            </el-col>
            <el-col :md="24">
              <div class="NetworkEcharts padRight20 marTop24">
                <div class="flexDiv justifyBetwwen" style="width:100%;">
                  <p>Daily Transfers</p>
                  <p class="h3Color Text16 textRight">Total CELO transfers
                    <span class="h3Color Text18 greenColor weightText numW80" style="width:80px;display:inline-block;textLeft">{{total_celo_transfers | thousands}}</span>
                  </p>
                </div>
                <p class="textRight h3Color Text16 marBtm6">Total cUSD transfers
                  <span class="greenColor Text18 weightText numW80" style="width:80px;display:inline-block;textLeft">{{total_cusd_transfers | thousands}}</span></p>
                <vab-chart style="width: 100%;height: 300px" class="echartsCon" :autoresize="true" :options="DailyTransfersEcharts"
                  :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')" />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>  
import { Swipe, SwipeItem } from 'vant';
import * as echarts from "echarts";
// import VabChart from "vue-echarts";
import VabChart from "@/plugins/echarts";
import { account } from "@/assets/api/requset.js";
import countTo from 'vue-count-to'

import numCount from '@/views/homeModel/numCount.vue'
var that;
export default {
  name: "networlData",
  props: ['networkData', 'changeNetworkData'],
  data() {
    return {
      isskeleton: true,
      networkDataAddress: '',
      startepocNo: 0,
      startEpochSize: 0,
      block_timer: '',
      total_txs: 0,
      Block_Time: 0,
      startVal: 0,
      total_addresses: 0, 
      contract_addresses: 0,
      total_celo_transfers: 0,
      total_cusd_transfers: 0,
      circulateSupplyTabs: 'All',
      // Daily Transactions   日常事务，柱状图
      DailyTransactionsEcharts: {
        tooltip: {
          trigger: "axis",
          formatter: (res) => {
            var i= res[0].dataIndex;
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            var str = `<div class="${cls}">
              <span class="Text16 textColor">${this.epochData[i]}</span><br><p class="tooltipHint Text16 flexDiv">
              <span style="width: 100px;display:inline-block;" class="textColor">Txs</span>${this.$format.thousands(res[0].value)}</p></div>`
            return str;
          }
        },
        grid: {
          top: "0%",
          right: "0",
          bottom: "20",
          left: "0",
          containLabel: true
        },
        legend: {
          top: "20",
          right: "0",
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
          axisLabel: { 
            showMaxLabel: true,
            interval: 130,
          },
        },
        yAxis: {
          type: "value",
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        series: [
          {
            name: "",
            type: "bar",
            data: [],
            barMinHeight: 2,
            barMinWidth: 2,
            barMaxWidth: 7,
            itemStyle: {
              normal: {
                barBorderRadius: 8,
                color: '#63CF59'
                // color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
                //   { offset: 0, color: "#5F9CFB" },
                //   { offset: 1, color: "#3163F6" },
                // ]),
              },
            },
          },
        ],
      },
      // Contract Addresse  地址，折线图，
      AddresseEcharts: {
        tooltip: {
          trigger: "axis",
          formatter: (res) => {
            var i= res[0].dataIndex;
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            var str = `<div class="${cls}">
              <span class="Text16 textColor">${this.epochData[i]}</span><br><p class="tooltipHint Text16 flexDiv">
              <span style="width: 100px;display:inline-block;" class="textColor">Addresses</span>${this.$format.thousands(res[0].value)}</p></div>`
            return str;
          }
        },
        grid: {
          top: "0%",
          right: "0",
          bottom: "20",
          left: "0",
          containLabel: true
        },
        legend: {
          top: "20",
          right: "0",
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
          axisLabel: {  
            showMaxLabel: true,
            interval: 130,
            // textStyle: { color: "#999999", fontSize: "12" } 
          },
        },
        yAxis: {
          type: "value",
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        series: [
          {
            name: "",
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
      // Daily Transfers  每日账单
      cusdDatafirstThree: [],
      cusdDataLastThree: [],
      celoDatafirstThree: [],
      celoDataLastThree: [],
      DailyTransfersEcharts: {
        tooltip: {
          trigger: "axis",
          formatter: (res) => {
            var i= res[0].dataIndex;
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            var str = `<div class="${cls}">
              <span class="textColor Text16">${this.epochData[i]}</span>`;
            for(var i =0; i<res.length; i++){
              str+= `<p class="tooltipHint Text16 marTop4 marBtm6 flexDiv">
              <span style="width: 100px;display:inline-block;" class="textColor">${res[i].seriesName}</span>${this.$format.thousands(res[i].value)}</p>`
            }
            str+= `</div>`
            return str;
          }
        },
        grid: {
          top: "26",
          right: "0",
          bottom: "40",
          left: "0",
          containLabel: true
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
          axisLabel: { 
            showMaxLabel: true,
            interval: 130,
            // textStyle: { color: "#999999", fontSize: "12" } 
          },
        },
        yAxis: {
          type: "value",
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        series: [
          {
            name: "cUSD",
            smooth: 0.6,
            symbol: 'none',   // 不显示拐点
            type: "line",
            markPoint: {
              symbol: 'none',
              symbol: 'image://https://thecelo.com/staticNew/markBgEmpty.png',
              // symbolSize: [54, 28], //容器大小s
              symbolOffset: ['0', '-4'],  // 位置偏移
              animation: false,
              itemStyle: {
                normal:{
                  label:{
                    // color: "#0091ff",//气泡中字体颜色
                    color: (res) => { },//气泡中字体颜色
                    fontSize: 12,
                    fontWeight: 'normal',
                    formatter:  (res) => {
                      if(this.$store.state.themeCls == 'whiteTheme'){
                        if(this.cusdDatafirstThree.indexOf(res.value) != -1){
                          return `{a|              ${this.$format.thousands(res.value)}}`
                        }
                        if(this.cusdDataLastThree.indexOf(res.value) != -1){
                          return `{a| ${this.$format.thousands(res.value)}}              `
                        }
                        return `{a| ${this.$format.thousands(res.value)}}`
                      }
                      if(this.cusdDatafirstThree.indexOf(res.value) != -1){
                        return `{b|              ${this.$format.thousands(res.value)}}`
                      }
                      if(this.cusdDataLastThree.indexOf(res.value) != -1){
                        return `{b| ${this.$format.thousands(res.value)}}              `
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
              ],
            },
            data: [],
            itemStyle: {
              normal: {
                color: '#0091FF',
              },
            },
          },
          {
            name: "CELO",
            smooth: 0.6,
            symbol: 'none',   // 不显示拐点
            type: "line",
            data: [],
            markPoint: {
              symbol: 'image://https://thecelo.com/staticNew/markBgEmpty.png',
              // symbolSize: [54, 28], //容器大小
              symbolOffset: ['0', '-16'],  // 位置偏移
              animation: false,
              itemStyle: {
                normal:{
                  label:{
                    color: (res) => {},//气泡中字体颜色
                    fontSize: 12,
                    fontWeight: 'normal',
                    formatter:  (res) => {
                      if(this.$store.state.themeCls == 'whiteTheme'){
                        if(this.celoDatafirstThree.indexOf(res.value) != -1){
                          return `{a|              ${this.$format.thousands(res.value)}}`
                        }
                        if(this.celoDataLastThree.indexOf(res.value) != -1){
                          return `{a| ${this.$format.thousands(res.value)}}              `
                        }
                        return `{a| ${this.$format.thousands(res.value)}}`
                      }
                      if(this.celoDatafirstThree.indexOf(res.value) != -1){
                        return `{b|              ${this.$format.thousands(res.value)}}`
                      }
                      if(this.celoDataLastThree.indexOf(res.value) != -1){
                        return `{b| ${this.$format.thousands(res.value)}}              `
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
            itemStyle: {
              normal: {
                color: '#63CF59',
              },
            },
          },
        ],
      },
      epochData: [],
      epoch_address_txs: [],
    };
  },
  created(){
    that = this;
  },
  watch: {
    themeCls(val) {
      var type = ( this.circulateSupplyTabs == 'All') ? '' : this.circulateSupplyTabs;
      this.reload_chart(type);
    },
    'networkData.address': {
      handler: function() {
        this.networkDataAddress = '';
        setTimeout(()=>{
          if(this.isskeleton){
            this.isskeleton = false;
          }
          this.networkDataAddress = this.networkData.address;
        }, 100);
      }
    },
    // 'networkData.name': {
    //   handler: function() {
    //     clearInterval(that.block_timer);
    //     this.startVal = 0;
    //     that.Block_Time = 0;
    //     that.countBlockTime();
    //   },
    // },
    changeNetworkData(newVal, oldVal) {
      if(newVal == 'changeNetworkData') {
        clearInterval(that.block_timer);
        this.startVal = 0;
        that.Block_Time = 0;
        that.countBlockTime();
      }
    },
    endepocNo(newVal, oldVal){
      this.startepocNo = oldVal;
    },
    endEpochSize(newVal, oldVal){
      this.startEpochSize = oldVal;
    },
  },
  components: {
    numCount,
    VabChart,countTo,
    vanSwipe: Swipe,
    vanSwipeItem: SwipeItem
  },
  computed: {
    themeCls(){
      return this.$store.state.themeCls;
    },
    endepocNo(){
      return Number(this.networkData.epocNo);
    },
    endEpochSize(){
      return Number(this.networkData.EpochSize);
    },
    startepochMin(){
      return (this.epochMin - 50 > 0) ? this.epochMin - 50 : 0;
    },
    epochMin(){
      return Number(this.networkData.TotalBlocks % this.networkData.EpochSize);
    },
    epochRate(){
      return parseInt((this.epochMin / this.networkData.EpochSize)*100) || 0
    }
  },
  mounted() {
    this.getInit();
    this.countBlockTime();
  },
  methods: {
    imgError(){
      this.networkData.logoImg = 'https://thecelo.com/staticNew/NormalLogo.png';
    　　//如果需要重新设置图片地址可以在此处写其他逻辑，重新赋值URL
    },
    jumpUrl(url){
      window.open(url);
    },
    jumpNotice(num){
      var url = (num == '1') ? 'https://medium.com/celoorg/unlocking-the-eurozone-with-ceur-stablecoins-966705dd0007' : 'https://medium.com/celoorg/announcing-the-grand-prize-winners-of-celo-camp-batch-3-58dd0eef19fc';
      window.location.href = url;
    },
    countBlockTime(){
      if(this.changeNetworkData != ''){
        this.$emit('clearChangeNewData');
      }
      this.block_timer = setInterval(()=>{
        this.Block_Time ++;
      }, 1200);
    },
    jumpAddress(address) {
      if(address){
        this.$router.push({
          path: `/groupDetail/${address}`
        })
      }
    },
    getInit() {
      var parmas = {
        method: 'redis_key_value',
        key: 'epoch_address_txs'
      };
      // https://thecelo.com/api/?method=redis_key_value&key=epoch_address_txs
      account(parmas).then((response) => {
        // let obj = JSON.parse(response)
        this.epoch_address_txs = response.epoch_address_txs;
        this.reload_chart();
      })
    },
    handleClick(){
      var type = ( this.circulateSupplyTabs == 'All') ? '' : this.circulateSupplyTabs;
      this.reload_chart(type);
    },
    reload_chart(d){
      var that= this;
      let total_celo_transfers = 0
      let total_cusd_transfers = 0
      let total_txs = 0
      let contract_addresses = 0
      let total_addresses = 0

      // epochAddressesTable.removeRows(0,epochAddressesTable.getNumberOfRows())
      let keys = Object.keys(that.epoch_address_txs);
      if(!d || keys.length-d < 0) {d = keys.length;}
      keys = keys.splice(keys.length-d);
      var epoch_dateData = [];
      var txsData = [];
      var addressData = [];
      var celoData = [];
      var cusdData = [];
      var epochData = [];
      keys.forEach((epoch, i) => {
        // Object.keys
        let epoch_date = that.$format.getEpochDate(epoch)
        let txs = that.epoch_address_txs[epoch][0]
        total_txs += txs
        contract_addresses += that.epoch_address_txs[epoch][4]
        total_addresses = that.epoch_address_txs[epoch][1]
        let celo_transfers = that.epoch_address_txs[epoch][2]
        total_celo_transfers += celo_transfers
        let cusd_transfers = that.epoch_address_txs[epoch][3]
        total_cusd_transfers += cusd_transfers

        epoch_dateData.push(epoch_date.substr(5,6));
        txsData.push(txs);
        addressData.push(total_addresses);
        celoData.push(celo_transfers);
        cusdData.push(cusd_transfers);
        var name = `${this.$format.chartTipTitle(epoch)}`;
        epochData.push(name);
      })
      this.epochData = epochData;
      // 数据
      this.total_txs = total_txs;
      this.total_addresses = total_addresses;
      this.contract_addresses = contract_addresses;
      this.total_celo_transfers = total_celo_transfers;
      this.total_cusd_transfers = total_cusd_transfers;
      // 图标
        // 修改  x 轴  起始数据内容
      epoch_dateData[0] = `           ${epoch_dateData[0]}`
      var lasii = epoch_dateData.length - 1;
      epoch_dateData[lasii] = `${epoch_dateData[lasii]}           `
      // 设置
      // Daily Transactions  >>> txs
      // 
      // console.log(epoch_dateData.length+"==="+epoch_dateData)
      this.DailyTransactionsEcharts.xAxis.data = epoch_dateData;
      this.DailyTransactionsEcharts.series[0].data = txsData;
      // Total Addresses   >>> Addresse
      this.AddresseEcharts.xAxis.data = epoch_dateData;
      this.AddresseEcharts.series[0].data = addressData;
      // Daily Transfers  >>>  1:cUSD   2:celo
      // 取前三个为数组 cusdDatafirstThree
      this.cusdDatafirstThree = [
        cusdData[0], cusdData[1], cusdData[2]
      ];
      // 取后三个为数组 seriesDataLastThree
      var last1 = cusdData.length - 1;
      var last2 = cusdData.length - 2;
      var last3 = cusdData.length - 3;
      this.cusdDataLastThree = [
        cusdData[last1], cusdData[last2], cusdData[last3]
      ];
      // 取前三个为数组 celoDatafirstThree
      this.celoDatafirstThree = [
        celoData[0], celoData[1], celoData[2]
      ];
      // 取后三个为数组 seriesDataLastThree
      var last1 = celoData.length - 1;
      var last2 = celoData.length - 2;
      var last3 = celoData.length - 3;
      this.celoDataLastThree = [
        celoData[last1], celoData[last2], celoData[last3]
      ];
      if (this.$store.state.themeCls == 'whiteTheme') {
        this.setWhiteDailyTransfers();
      } else {
        this.setBlackDailyTransfers();
      }
      this.DailyTransfersEcharts.xAxis.data = epoch_dateData;
      this.DailyTransfersEcharts.series[0].data = cusdData;
      this.DailyTransfersEcharts.series[1].data = celoData;
    },
    setWhiteDailyTransfers(){
      // 蓝色
      this.DailyTransfersEcharts.series[0].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#0091FF' },
            { offset: 0, color: '#ffffff' },
          ])
      }
      // 绿色
      this.DailyTransfersEcharts.series[1].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#d3f8d0' },
            { offset: 0, color: '#ffffff' },
          ])
      }
    },
    setBlackDailyTransfers(){
      // 蓝色
      this.DailyTransfersEcharts.series[0].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#0091FF' },
            { offset: 0, color: '#242424' },
          ])
      }
      // 绿色
      this.DailyTransfersEcharts.series[1].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#143C12' },
            { offset: 0, color: '#1E2621' },
          ])
      }
    }
  },
};
</script>
<style  lang="scss">
.netDataNumText {
  font-size: 1.5rem;
}
@media only screen and (max-width: 1300px) {
  .netDataNumText {
    font-size: 1.2rem;
  }
}
.marFuTop{
  height: 40px;
  line-height: 1;
}
.marFuTop{
  margin-top: -1px;
}
@media only screen and (min-width: 600px) {
  .marFuTop{
    margin-top: 3px;
  }
}
.advertising {
  width: 360px;
  max-width: 100%;
  background: #F6F9FA;
  padding: 0 20px;
  .adverte-item {
    width: 100%;
    padding: 20px 0;
  }
  .homeAdverImg {
    width: 32px;
  }
}

@media only screen and (max-width: 992px) {
.advertising {
  width: 100%;
}

}
@keyframes show {
  0% {
    opacity: 0;
    margin-top: 90px;
  }
  100% {
    opacity: 1;
    margin-top: 0;
  }
}
@keyframes hide {
  0% {
    opacity: 1;
    margin-top: 0;
  }
  70% {
    opacity: 1;
    margin-top: 0;
  }
  100% {
    opacity: 0;
    margin-top: 0;
  }
}
.showAddress-enter-active {
  animation: show 0.5s;
}
.showAddress-leave-active {
  animation: hide 0.1s;
}
.showAddress-enter,
.showAddress-leave-to {
  opacity: 1;
}
.mapAdver-swiperDiv {
  width: 390px;
  max-width: 100%;
  margin-top: 12px;
}
.mapAdver-swiper {
  width: 100%;
  height: 40px !important;
  overflow: hidden;
  .van-swipe__track {
    height: 40px !important;
    line-height: 40px !important;
  }
}
</style>
