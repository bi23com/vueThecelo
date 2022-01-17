<template>
  <div>
    <div class="mainContainer TokenSupply">
      <div class="marBtm12">
        <p class="primaryTitle">Token Supply</p>
      </div>
      <div class="mainCon-sub marTop32">
        <el-row class="marBtm32">
          <el-col :md="9">
            <div class="tokenLeft marBtm16">
              <p class="Text22 marBtm28 weightText h6Color">CELO</p>
              <div class="flexDiv">
                <div class="wid50 textCenter">
                  <p class="greenColor Text20">{{celoNum.max}}</p>
                  <p class="h5Color Text16">Max CELO</p>
                </div>
                <div class="wid50 textCenter">
                  <p class="greenColor Text20">{{celo_circulating_supply}}</p>
                  <p class="h5Color Text16">Circulating CELO</p>
                </div>
              </div>
              <p class="Text22 marTop42 marBtm22 weightText h6Color">Allocated</p>
              <div class="flexDiv marBtm28">
                <div class="wid30 textLeft Text16 h5Color">CELO</div>
                <div class="wid70 textRight Text18 greenColor">{{totalSupply.CELO | thousands}}</div>
              </div>
              <div class="flexDiv marBtm28">
                <div class="wid30 textLeft Text16 h5Color">cUSD</div>
                <div class="wid70 textRight Text18 greenColor">{{totalSupply.cUSD | thousands}}</div>
              </div>
              <div class="flexDiv">
                <div class="wid30 textLeft Text16 h5Color">cEUR</div>
                <div class="wid70 textRight Text18 greenColor">{{totalSupply.cEUR | thousands}}</div>
              </div>
            </div>
          </el-col>
          <el-col :md="15">
            <div style="margin-top: 26px;">
              <p class="Text22 weightText h6Color">Circulating Supply (including reserve)</p>
              <div class="flexDiv">
                <el-tabs v-model="circulateSupplyTabs" class="epochDetailChange">
                  <el-tab-pane label="Epoch" name="Epoch">
                    <vab-chart style="width: 100%;height: 210px" class="echartsCon" :autoresize="true" :options="CirculatingEcharts"
                     :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartGreen' : 'blackThemeEchartGreen')" />
                        
                  </el-tab-pane>
                  <el-tab-pane label="Details" name="Details">
                    <div class="myTable tabTable" style="margin-top:0;">
                      <el-table height="210" class="downLoadTable"
                        :data="yearCirculatingSupply" fit align="center" style="width: 100%;overflow-y:hidden;"
                        :default-sort = "{prop: 'showTime', order: 'descending'}" >
                        <template slot="empty">
                          <div class="flexDiv columnFlex justifyCenter" style="height: 200px;">
                            <img src="../../assets/images/notData2.png" class="normalImg">
                            <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
                          </div>
                        </template>
                        <el-table-column prop="showTime" sortable label="Date">
                          <template slot-scope="scope">
                            <span class="time">{{scope.row[0]}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="time" label="CELO">
                          <template slot-scope="scope">
                            <span class="time">{{scope.row[1]}}</span>
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
        <el-row class="marTop42">
          <el-col :md="9">
            <div class="tokenLeft marBtm16 ">
              <p class="Text22 marBtm22 weightText h6Color">Incremental Supply</p>
              <div class="flexDiv marBtm28">
                <div class="wid50 textLeft Text16 h5Color">
                  CELO<span class="greenColor marLeft4 Text18">{{IncrementalSupply.cgldRate}}%</span>
                  <el-tooltip class="marLeft4" content="* Incremental Supply CELO = ((Current Epoch TotalSupply CELO) - (1st Epoch TotalSupply CELO)) / (1st Epoch TotalSupply CELO)">
                    <span class="iconfont icon-zhushi h3Color cursorPointer">
                    </span>
                  </el-tooltip>
                </div>
                <div class="wid50 textRight">
                  <p class="greenColor Text18">{{IncrementalSupply.cgld | thousands}}</p>
                </div>
              </div>
              <div class="flexDiv marBtm28">
                <div class="wid50 textLeft Text16 h5Color">
                  cUSD<span class="greenColor marLeft4 Text18">{{IncrementalSupply.cusdRate}}%</span>
                  <el-tooltip class="marLeft4" content="* Incremental Supply cUSD = ((Current Epoch TotalSupply cUSD) - (1st Epoch TotalSupply cUSD)) / (1st Epoch TotalSupply cUSD)">
                    <span class="iconfont icon-zhushi h3Color cursorPointer">
                    </span>
                  </el-tooltip>
                </div>
                <div class="wid50 textRight">
                  <p class="greenColor Text18">{{IncrementalSupply.cusd | thousands}}</p>
                </div>
              </div>
              <div class="flexDiv marBtm28">
                <div class="wid50 textLeft Text16 h5Color">
                  cEUR<span class="greenColor marLeft4 Text18">{{IncrementalSupply.ceurRate}}%</span>
                  <el-tooltip class="marLeft4" content="* Incremental Supply cEUR = ((Current Epoch TotalSupply cEUR) - (1st Epoch TotalSupply cEUR)) / (1st Epoch TotalSupply cEUR)">
                    <span class="iconfont icon-zhushi h3Color cursorPointer">
                    </span>
                  </el-tooltip>
                </div>
                <div class="wid50 textRight">
                  <p class="greenColor Text18">{{IncrementalSupply.ceur | thousands}}</p>
                </div>
              </div>
              <p class="Text22 marTop42 marBtm22 weightText h6Color">Inflation (Year)</p>
              <div class="flexDiv marBtm28">
                <div class="wid30 textLeft Text16 h5Color">CELO</div>
                <div class="wid70 textRight Text18 greenColor">~{{InflationYear.celo | formatNum}}%</div>
              </div>
              <div class="flexDiv marBtm28">
                <div class="wid30 textLeft Text16 h5Color">cUSD</div>
                <div class="wid70 textRight Text18 greenColor">~{{InflationYear.cusd | formatNum}}%</div>
              </div>
              <div class="flexDiv">
                <div class="wid30 textLeft Text16 h5Color">cEUR</div>
                <div class="wid70 textRight Text18 greenColor">~{{InflationYear.ceur | formatNum}}%</div>
              </div>
            </div>
          </el-col>
          <el-col :md="15">
            <div style="margin-top: 26px;">
              <p class="Text22 weightText h6Color">Daily Incremental Supply</p>
              <div class="flexDiv">
                <el-tabs v-model="IncreSupplyTabs" class="epochDetailChange">
                  <el-tab-pane label="Epoch" name="Epoch">
                    <vab-chart style="width: 100%;height: 286px" class="echartsCon" :autoresize="true" :options="DailyEcharts" 
                     :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')"/>
                  </el-tab-pane>
                  <el-tab-pane label="Details" name="Details">
                    <div class="myTable tabTable" style="margin-top:0;">
                      <el-table height="286px" class="downLoadTable" :data="detailsData" fit align="center" 
                        style="width: 100%;overflow-y:hidden;"  :default-sort="{prop: 'EpochShow', order: 'descending'}">
                        <template slot="empty">
                          <div class="flexDiv columnFlex justifyCenter" style="height: 290px;">
                            <img src="../../assets/images/notData2.png" class="normalImg">
                            <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
                          </div>
                        </template>
                        <el-table-column prop="EpochShow" width="110" label="Epoch" sortable>
                          <template slot-scope="scope">
                            <span class="">{{scope.row.epoch}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="celoTotal" label="CELO">
                          <template slot-scope="scope">
                            <span class="">{{scope.row.celoTotal | formatNum3 | numFilterThreeCut}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="cusdTotal" label="cUSD">
                          <template slot-scope="scope">
                            <span class="">{{scope.row.cusdTotal | formatNum3 | numFilterThreeCut}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="ceurTotal" label="cEUR">
                          <template slot-scope="scope">
                            <span class="">{{scope.row.ceurTotal | formatNum3 | numFilterThreeCut}}</span>
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
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import VabChart from "@/plugins/echarts";
import { account } from "@/assets/api/requset.js";

export default {
  name: "Home",
  props: ['totalSupply'],
  data() {
    return {
      IncrementalSupply: {
        cgld: 0,
        cgldRate: '',
        cusd: 0,
        cusdRate: '',
        ceur: 0,
        ceurRate: '',
      },
      InflationYear: {
        celo: '',
        cusd: '',
        ceur: ''
      },
      detailsData: [],
      celoNum: {
        max: 0,
        min: 0
      },
      yearCirculatingSupply: [
        ["1 Apr, 2020", "89,520,987"]
      ],
      celo_circulating_supply: 0,
      circulateSupplyTabs: 'Epoch',
      IncreSupplyTabs: 'Epoch',
      // Circulating Supply (including reserve)，折线图，
      seriesDatafirstThree: [],
      seriesDataLastThree: [],
      CirculatingEcharts: {
        tooltip: {
          trigger: "axis",
          formatter: (res) => {
            var str = '';
            var name = res[0].name;
            var value = res[0].value == '' ? 0 : res[0].value;
            var color = '#C8D9FD;';
            var num = this.$format.thousands(value);
            // tooltipHint
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            str = `<div class="${cls}">
              <span class="Text16 textColor">${name}</span></br><p class="tooltipHint Text16 line2 flexDiv">
              <span style="display:inline-block;margin-right:3px;border-radius:50%;width:6px;height:6px;
              background-color:${color}"></span>&nbsp;&nbsp;
              <span style="width: 130px;display:inline-block;" class="textColor">circulating Supply：</span>${num}</p></div>`
            return str;
          }
        },
        grid: {
          top: "28",
          right: "0",
          bottom: "20",
          left: "0",
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
          axisLabel: {  },
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
            markPoint: {
              symbol: 'image://https://thecelo.com/staticNew/markBgEmpty.png',
              // symbolSize: [84, 28], //容器大小
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
                        if(this.seriesDatafirstThree.indexOf(JSON.stringify(res.value)) != -1){
                          return `{a|                ${this.$format.thousands(res.value)}}`
                        }
                        if(this.seriesDataLastThree.indexOf(JSON.stringify(res.value)) != -1){
                          return `{a| ${this.$format.thousands(res.value)}}                `
                        }
                        return `{a| ${this.$format.thousands(res.value)}}`
                      }
                      if(this.seriesDatafirstThree.indexOf(JSON.stringify(res.value)) != -1){
                        return `{b|                ${this.$format.thousands(res.value)}}`
                      }
                      if(this.seriesDataLastThree.indexOf(JSON.stringify(res.value)) != -1){
                        return `{b| ${this.$format.thousands(res.value)}}                `
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
        ],
      },
      // 
      celoLinefirstThree: [],
      celoLineLastThree: [],
      cusdLinefirstThree: [],
      cusdLineLastThree: [],
      ceurLinefirstThree: [],
      ceurLineLastThree: [],
      DailyEcharts: {
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
            var i = res[0].dataIndex;
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            var str = `<div class="${cls}">
              <span class="Text16 textColor">${this.detailsData[i].tip}</span>
              <p class="tooltipHint Text16 marTop4 flexDiv">
              <span style="width: 100px;display:inline-block;" class="textColor">celoTotal</span>${this.$format.IntNumFilterThreeCut(this.detailsData[i].celoTotal)}</p>
              <p class="tooltipHint Text16 flexDiv line2">
              <span style="width: 100px;display:inline-block;" class="textColor"></span>${this.detailsData[i].celolineShow}</p>
              <p class="tooltipHint Text16 flexDiv line2">
              <span style="width: 100px;display:inline-block;" class="textColor">cusdTotal</span>${this.$format.IntNumFilterThreeCut(this.detailsData[i].cusdTotal)}</p>
              <p class="tooltipHint Text16 flexDiv line2">
              <span style="width: 100px;display:inline-block;" class="textColor"></span>${this.detailsData[i].cusdlineShow}</p>
              <p class="tooltipHint Text16 line2 flexDiv">
              <span style="width: 100px;display:inline-block;" class="textColor">ceurTotal</span>${this.$format.IntNumFilterThreeCut(this.detailsData[i].ceurTotal)}</p>
              <p class="tooltipHint Text16 flexDiv line2">
              <span style="width: 100px;display:inline-block;" class="textColor"></span>${this.detailsData[i].ceurlineShow}</p></div>`
            return str;
          }
        },
        grid: {
          top: "40",
          right: "0",
          bottom: "60",
          left: "0",
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
            showMaxLabel: true,},
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
            name: "CELO",
            smooth: 0.6,
            symbol: 'none',   // 不显示拐点
            type: "line",
            markPoint: {
              symbol: 'image://https://thecelo.com/staticNew/markBgEmpty.png',
              // symbolSize: [84, 28], //容器大小
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
                        if(this.celoLinefirstThree.indexOf(JSON.stringify(res.value)) != -1){
                          return `{a|              ${this.$format.thousands(res.value)}}`
                        }
                        if(this.celoLineLastThree.indexOf(JSON.stringify(res.value)) != -1){
                          return `{a| ${this.$format.thousands(res.value)}}                      `
                        }
                        return `{a| ${this.$format.thousands(res.value)}}`
                      }
                      if(this.celoLinefirstThree.indexOf(JSON.stringify(res.value)) != -1){
                        return `{b|              ${this.$format.thousands(res.value)}}`
                      }
                      if(this.celoLineLastThree.indexOf(JSON.stringify(res.value)) != -1){
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
          {
            name: "cUSD",
            smooth: 0.6,
            symbol: 'none',   // 不显示拐点
            type: "line",
            markPoint: {
              symbol: 'image://https://thecelo.com/staticNew/markBgEmpty.png',
              // symbolSize: [84, 28], //容器大小
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
                        if(this.cusdLinefirstThree.indexOf(JSON.stringify(res.value)) != -1){
                          return `{a|              ${this.$format.thousands(res.value)}}`
                        }
                        if(this.cusdLineLastThree.indexOf(JSON.stringify(res.value)) != -1){
                          return `{a| ${this.$format.thousands(res.value)}}                      `
                        }
                        return `{a| ${this.$format.thousands(res.value)}}`
                      }
                      if(this.cusdLinefirstThree.indexOf(JSON.stringify(res.value)) != -1){
                        return `{b|              ${this.$format.thousands(res.value)}}`
                      }
                      if(this.cusdLineLastThree.indexOf(JSON.stringify(res.value)) != -1){
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
            name: "cEUR",
            smooth: 0.6,
            symbol: 'none',   // 不显示拐点
            type: "line",
            markPoint: {
              symbol: 'image://https://thecelo.com/staticNew/markBgEmpty.png',
              // symbolSize: [84, 28], //容器大小
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
                        if(this.ceurLinefirstThree.indexOf(JSON.stringify(res.value)) != -1){
                          return `{a|              ${this.$format.thousands(res.value)}}`
                        }
                        if(this.ceurLineLastThree.indexOf(JSON.stringify(res.value)) != -1){
                          return `{a| ${this.$format.thousands(res.value)}}                      `
                        }
                        return `{a| ${this.$format.thousands(res.value)}}`
                      }
                      if(this.ceurLinefirstThree.indexOf(JSON.stringify(res.value)) != -1){
                        return `{b|              ${this.$format.thousands(res.value)}}`
                      }
                      if(this.ceurLineLastThree.indexOf(JSON.stringify(res.value)) != -1){
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
                color: '#FACC57',
              },
            },
          },
        ],
      },
    };
  },
  components: {
    VabChart,
  },
  computed: {
    themeCls(){
      return this.$store.state.themeCls;
    }
  },
  watch: {
    themeCls(val) {
      this.getCirculatingSupplyData();
      this.getLockedGoldData();
    }
  },
  mounted() {
    this.getCirculatingSupplyData();
    this.getLockedGoldData();
  },
  methods: {
    getCirculatingSupplyData() {
      var parmas = {
        method: 'celo_release_schedule_year'
      };
      account(parmas).then((obj) => {
        this.celoNum.max = obj.max_supply
        this.celo_circulating_supply = obj.currentCirculatingSupply;
        this.yearCirculatingSupply = obj.yearCirculatingSupply;
        for(var i in this.yearCirculatingSupply){
          var showTime = this.$format.getEpochDateSorate(this.yearCirculatingSupply[i][0]);
          this.yearCirculatingSupply[i].push(showTime);
        }
        let time = [];
        let seriesData = [];
        for (var i in this.yearCirculatingSupply) {
          time.push(this.yearCirculatingSupply[i][0]);
          seriesData.push(this.yearCirculatingSupply[i][1].replace(/[,]/g, ''));
        }
        // 修改  x 轴  起始数据内容
        time[0] = `           ${time[0]}`;
        var lasii = time.length - 1;
        time[lasii] = `${time[lasii]}           `;
        
        // 设置
        this.CirculatingEcharts.xAxis.data = time;
        // 取前三个为数组 seriesDatafirstThree
        this.seriesDatafirstThree = [
          seriesData[0], seriesData[1], seriesData[2]
        ];
        // 取后三个为数组 seriesDataLastThree
        var last1 = seriesData.length - 1;
        var last2 = seriesData.length - 2;
        var last3 = seriesData.length - 3;
        this.seriesDataLastThree = [
          seriesData[last1], seriesData[last2], seriesData[last3]
        ];
        this.CirculatingEcharts.series[0].data = seriesData;
      });
    },
    getLockedGoldData() {
      var parmas = {
        method: 'getlockedgold'
      };
      account(parmas).then((obj, result) => {
        var pre_cgld = 0;
        var pre_cusd = 0;
        var pre_ceur = 0;
        var epochNum = 0;
        var locked_gold = obj.locked_gold;
        var supply_history = [];
        var supply_history02 = [];
        var time = [];
        var celoLineData = [];
        var cusdLineData = [];
        var ceurLineData = [];
        Object.keys(locked_gold).forEach((epoch, i) => {
          epochNum = epoch;
          let epoch_date = this.$format.getEpochDate(epoch)
          var cgldSupply = locked_gold[epoch].cgldSupply - locked_gold['1'].cgldSupply;
          var cusdSupply = locked_gold[epoch].cusdSupply - locked_gold['1'].cusdSupply;
          var ceurSupply = locked_gold[epoch].ceurSupply - locked_gold['337'].ceurSupply
          ceurSupply = ceurSupply < 0 ? 0 : ceurSupply
          pre_cgld = cgldSupply;
          pre_cusd = cusdSupply;
          pre_ceur = ceurSupply;
          // Daily Incremental Supply 》》》 details 表格 + 图标显示所需数据
          if(parseInt(epoch) > 1){
            let add_celo_supply = locked_gold[epoch].cgldSupply-locked_gold[(parseInt(epoch)-1).toString()].cgldSupply;
            let add_celo_supply_str = add_celo_supply >=0 ? '+ ' + add_celo_supply.toFixed(0) : add_celo_supply.toFixed(0);
            // 
            let add_cusd_supply = locked_gold[epoch].cusdSupply-locked_gold[(parseInt(epoch)-1).toString()].cusdSupply;
            let add_cusd_supply_str = add_cusd_supply >=0 ? '+ ' + add_cusd_supply.toFixed(0) : add_cusd_supply.toFixed(0);
            // 
            let add_ceur_supply = locked_gold[epoch].ceurSupply-locked_gold[(parseInt(epoch)-1).toString()].ceurSupply;
            let add_ceur_supply_str = add_ceur_supply >=0 ? '+ ' + add_ceur_supply.toFixed(0) : add_ceur_supply.toFixed(0);
            supply_history.push({
              tip: `${this.$format.chartTipTitle(epoch)}`,
              EpochShow: this.$format.getEpochDateSorate(epoch),
              epoch: epoch_date.substr(5, 6),
              celoTotal: cgldSupply,
              celolineShow: add_celo_supply_str + ' CELO',
              cusdTotal: cusdSupply,
              cusdlineShow: add_cusd_supply_str + ' cUSD',
              ceurTotal: ceurSupply,
              ceurlineShow: add_ceur_supply_str + ' cEUR'
            });
          }
          // Daily Incremental Supply 折线图数据
          time.push(epoch_date.substr(5, 12));
          celoLineData.push(parseInt(cgldSupply));
          cusdLineData.push(parseInt(cusdSupply));
          ceurLineData.push(parseInt(ceurSupply));
        });

        var release_cgld_rate = ((pre_cgld * 100) / locked_gold['1'].cgldSupply).toFixed(4);
        var release_cusd_rate = ((pre_cusd * 100) / locked_gold['1'].cusdSupply).toFixed(4);
        var release_ceur_rate = ((pre_ceur * 100) / locked_gold['337'].ceurSupply).toFixed(4);
        this.IncrementalSupply = {
          cgld: pre_cgld.toFixed(0),
          cgldRate: release_cgld_rate,
          cusd: pre_cusd.toFixed(0),
          cusdRate: release_cusd_rate,
          ceur: pre_ceur.toFixed(0),
          ceurRate: release_ceur_rate,
        };
        this.InflationYear = {
          celo: release_cgld_rate * (365 / (epochNum - 27)).toFixed(2),
          cusd: release_cusd_rate * (365 / (epochNum - 11)).toFixed(2),
          ceur: release_ceur_rate * (365 / (epochNum - 327)).toFixed(2)
        }
        // Daily Incremental Supply 折线图数据 + 详情列表 
        // 修改  x 轴  起始数据内容
        time[0] = `                      ${time[0]}`;
        var lasii = time.length - 1;
        time[lasii] = `${time[lasii]}                      `;

        // 取前三个为数组 、 后三个为数组   celoLinefirstThree    celoLineLastThree
        this.celoLinefirstThree = [
          JSON.stringify(celoLineData[0]), JSON.stringify(celoLineData[1]), JSON.stringify(celoLineData[2])
        ];
        var last1 = celoLineData.length - 1;
        var last2 = celoLineData.length - 2;
        var last3 = celoLineData.length - 3;
        this.celoLineLastThree = [
          JSON.stringify(celoLineData[last1]), JSON.stringify(celoLineData[last2]), JSON.stringify(celoLineData[last3])
        ];
        // 取前三个为数组 、 后三个为数组   cusdLinefirstThree    cusdLineLastThree
        this.cusdLinefirstThree = [
          JSON.stringify(cusdLineData[0]), JSON.stringify(cusdLineData[1]), JSON.stringify(cusdLineData[2])
        ];
        var last1cusd = cusdLineData.length - 1;
        var last2cusd = cusdLineData.length - 2;
        var last3cusd = cusdLineData.length - 3;
        this.cusdLineLastThree = [
          JSON.stringify(cusdLineData[last1cusd]), JSON.stringify(cusdLineData[last2cusd]), JSON.stringify(cusdLineData[last3cusd])
        ];
        // 取前三个为数组 、 后三个为数组   ceurLinefirstThree    ceurLineLastThree
        this.ceurLinefirstThree = [
          JSON.stringify(ceurLineData[0]), JSON.stringify(ceurLineData[1]), JSON.stringify(ceurLineData[2])
        ];
        var last1ceur = ceurLineData.length - 1;
        var last2ceur = ceurLineData.length - 2;
        var last3ceur = ceurLineData.length - 3;
        this.ceurLineLastThree = [
          JSON.stringify(ceurLineData[last1ceur]), JSON.stringify(ceurLineData[last2ceur]), JSON.stringify(ceurLineData[last3ceur])
        ];
        // 设置
        if (this.$store.state.themeCls == 'whiteTheme') {
          this.setWhiteDailyEcharts();
        } else {
          this.setBlackDailyEcharts();
        }
        this.DailyEcharts.xAxis.data = time;
        this.DailyEcharts.series[0].data = celoLineData;
        this.DailyEcharts.series[1].data = cusdLineData;
        this.DailyEcharts.series[2].data = ceurLineData;
        this.detailsData = supply_history;
      });
    },
    setWhiteDailyEcharts(){
      // 蓝色
      this.DailyEcharts.series[0].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#0091FF' },
            { offset: 0, color: '#ffffff' },
          ])
      }
      // 绿色
      this.DailyEcharts.series[1].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#EBFFEA' },
            { offset: 0, color: '#ffffff' },
          ])
      }
    },
    setBlackDailyEcharts(){
      // 蓝色
      this.DailyEcharts.series[0].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#0091FF' },
            { offset: 0, color: '#242424' },
          ])
      }
      // 绿色
      this.DailyEcharts.series[1].areaStyle = {
        color: new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            { offset: 1, color: '#143C12' },
            { offset: 0, color: '#1E2621' },
          ])
      }
    },
  },
};
</script>
<style scoped lang="scss">
</style>
