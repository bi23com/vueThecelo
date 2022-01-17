<template>
  <div class="" :class="$store.state.themeCls">
    <div class="mainContainer">
      <div class="">
        <p class="primaryTitle">Markets Volume 24H</p>
      </div>
      <div class="mainCon-sub">
        <el-row class="marTop12">
          <el-col :md="8">
            <div class="mainCon-sub">
              <p class="h3Color Text16 marTop24">Total Volume</p>
              <p class="Text24 marTop8">{{title_usd_volume | thousands}}<span class="Text18"> USD</span></p>
            </div>
            <vab-chart style="width: 100%;height: 220px" class="echartsCon" :autoresize="true" :options="exchangePieEcharts"
              :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')" />
          </el-col>
          <el-col :md="8">
            <div class="mainCon-sub">
              <p class="h3Color Text16 marTop24">CELO Volume</p>
              <p class="Text24 marTop8">{{title_celo_volume | thousands}}<span class="Text18"> CELO</span></p>
            </div>
            <vab-chart style="width: 100%;height: 220px" class="echartsCon" :autoresize="true" :options="CeloieEcharts" 
              :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')"/>
          </el-col>
          <el-col :md="8">
            <div class="mainCon-sub">
              <p class="h3Color Text16 marTop24">CUSD Volume</p>
              <p class="Text24 marTop8">{{title_cusd_volume | thousands}}<span class="Text18"> cUSD</span></p>
            </div>
            <vab-chart style="width: 100%;height: 220px" class="echartsCon" :autoresize="true" :options="CusdieEcharts" 
             :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')"/>
          </el-col>
        </el-row>

        <div class="flexDiv marTop42">
          <el-tabs v-model="TypeTabs" class="epochDetailChange" @tab-click="handleClick">
            <el-tab-pane label="CELO/cUSD" name="1"></el-tab-pane>
            <el-tab-pane label="CELO/cEUR" name="2"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="marTop24">
          <div class="flexDiv">
            <p class="Text24 marBtm12">
              {{(TypeTabs == '1') ? '$' : '€'}}{{celo_lastest_price}}
              <span :class="lasetest_change_rate>0 ? 'greenColor' : (lasetest_change_rate< 0 ? 'redColor' : '')">
                ( {{lasetest_change_rate>0 ? '+' : ''}}
                {{lasetest_change_rate}} % 24H)
              </span>
            </p>
            <el-radio-group v-model="kTime" size="mini" class="exchageRadiogroup marBtm12" @change="changeTimeTabs">
              <el-radio-button label="5">5M</el-radio-button>
              <el-radio-button label="10">10M</el-radio-button>
              <el-radio-button label="30">30M</el-radio-button>
              <el-radio-button label="60">1H</el-radio-button>
              <el-radio-button label="1440">1D</el-radio-button>
            </el-radio-group>
          </div>
          <div style="width:100%;" >
            <vab-chart style="width: 100%;height: 480px" class="echartsCon" :autoresize="true" :options="kEcharts" 
             :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')"/>
          </div>
        </div>

        <div class="flexDiv marTop50">
          <div class="flexDiv justifyStart marTop8">
            <el-radio-group v-model="tabPosition" size="mini" class="exchageRadiogroup marTop8" @change="changeLisetype">
              <el-radio-button label="0">All</el-radio-button>
              <el-radio-button label="1">Bought</el-radio-button>
              <el-radio-button label="2">Sold</el-radio-button>
            </el-radio-group>
            <p class="Text16 h3Color marLeft12 marTop8">*Tip: sellAmount < 0.0001 & buyAmount < 0.0001 isn't listed!</p>
          </div>
          <div class="searchCon flexDiv marTop16">
            <el-input placeholder="Type address 0x…" clearable v-model="SearchText" size="small"></el-input>
            <p @click="searchRecordsList()">Search</p>
          </div>
        </div>
        <div class="myTable">
          <el-table max-height="800" v-if="isLoad" class=" downLoadTable" :data="trading_records" stripe fit align="center" 
            style="width: 100%;overflow-y:hidden;" v-sticky="{ top: 0 }"
            v-loading="isloadListData" element-loading-background="rgba(0, 0, 0, 0)" element-loading-text="loading..." 
            element-loading-spinner="el-icon-loading">
            <template slot="empty">
              <div class="flexDiv columnFlex justifyCenter" style="height: 260px;" v-if="!isloadListData">
                <img src="../assets/images/notData2.png" class="normalImg">
                <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
              </div>
            </template>
            <el-table-column prop="time" label="Time" width="130">
              <template slot-scope="scope">
                <span class="">{{scope.row.time | timeToMDHM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="Exchanger" align="center" min-width="170" label="Exchanger">
              <template slot-scope="scope">
                <div class="Text16 flexDiv justifyCenter">
                  <p class="Text16 cursorPointer blueColor" @click="jumpAddressDetails(scope.row.Exchanger)">{{scope.row.Exchanger | normalAddress}}</p>
                  <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom">
                    <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(scope.row.Exchanger)">
                    </span>
                  </el-tooltip>
                  <el-tooltip class="item marLeft4" placement="bottom">
                    <div slot="content" class="Text14">
                      Copy Address: {{scope.row.Exchanger}}
                    </div>
                    <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="scope.row.Exchanger" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                    </span>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="status" min-width="90" align="center" label="Action">
              <template slot-scope="scope">
                <span class="redColor" v-if="scope.row.status">Sell</span>
                <span class="greenColor" v-if="!scope.row.status">Buy</span>
              </template>
            </el-table-column>
            <el-table-column prop="OutAmount" align="center" width="150" label="Amount (Out)">
              <template slot-scope="scope">
                {{scope.row.OutAmount | formatNum}}
                <span class="greenColor" v-if="scope.row.status">CELO</span>
                <span class="yellowColor" v-if="!scope.row.status">{{TypeTabs == '1' ? 'cUSD' : 'cEUR'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="InAmount" align="center" width="150" label="Amount (In)">
              <template slot-scope="scope">
                {{scope.row.InAmount | formatNum}}
                <span class="yellowColor" v-if="scope.row.status">{{TypeTabs == '1' ? 'cUSD' : 'cEUR'}}</span>
                <span class="greenColor" v-if="!scope.row.status">CELO</span>
              </template>
            </el-table-column>
            <el-table-column prop="Rate" align="center" width="140" label="Swapped Rate">
              <template slot-scope="scope">
                {{scope.row.Rate}}
              </template>
            </el-table-column>
            <el-table-column prop="TxHash" width="150" align="right" label="TxHash">
              <template slot-scope="scope">
                <p class="textRight Text16">{{scope.row.TxHash | normalAddress}}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="myTable-pagination">
          <el-pagination background v-show="trading_records.length > 0" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :current-page="listPageData.pageNo" layout="total, prev, pager, next,jumper" :total="listPageData.total">
          </el-pagination>
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
  name: "Exchange",
  data() {
    return {
      isLoad: false,
      isloadListData: false,
      tabPosition: '0',
      SearchText: '',
      // Total Volume  饼状图
      title_usd_volume: 0,
      exchangePieEcharts: {
        tooltip: {
          trigger: "item",
          formatter: (res) => {
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            var str = `<div class="${cls}">
              <span class="Text16 H1Color textColor">${res.data.name}</span>
              <p class="tooltipHint Text16 marTop4 flexDiv">
                <span style="width:120px;display:inline-block;text-align:left" class="textColor">Total</span>
                ${this.$format.IntNumFilterThreeCut(res.data.value)} USD</p></div>`;
            for (var i in res.data.tip_list) {
              str += `<div class="${cls}"><p class="tooltipHint Text16 marTop4 flexDiv">
                <span style="width:120px;display:inline-block;text-align:left" class="textColor Text14">
                ${res.data.tip_list[i][0]}</span>${this.$format.IntNumFilterThreeCut(res.data.tip_list[i][1])} USD</p></div>`
            }
            return str;
          }
        },
        // title: {
        //   subtext: "Total Volume", //副标题文本
        //   left: "27%",
        //   top: "40%",
        //   subtextStyle: {
        //     fontFamily: "微软雅黑",
        //     fontSize: 12,
        //     color: "#4a4a4a",
        //     align: "center"
        //   }
        // },
        grid: {
          top: "2%",
          right: "10",
          bottom: "26",
          left: "10"
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 0,
          top: 20,
          bottom: 20,
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            color: "#999999", //图例文字
            fontSize: '12'
          },
        },
        series: [
          {
            name: 'Total Volume',
            type: 'pie',
            minAngle: 2,
            radius: ['39%', '58%'],
            startAngle: 90,
            center: ['40%', '50%'],
            avoidLabelOverlap: true,//对，就是这里avoidLabelOverlap
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
              length: 3,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            data: [],
            itemStyle: {
              color: function (params) {
                var colorList = ["#5BCB74", "#49A1FF", "#FFCB3D", "#7B72E6", "#4FCCCB", "#F3657C", "#E076F0", "#B6E481", "#F99C47", "#79EAD6"];
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
      // 第二个饼状图 CELO Volume
      title_celo_volume: 0,
      CeloieEcharts: {
        tooltip: {
          trigger: "item",
          formatter: (res) => {
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            var str = `<div class="${cls}"><span class="Text16 H1Color textColor">${res.data.name}</span>
              <p class="tooltipHint Text16 marTop4 flexDiv">
              <span style="width:120px;display:inline-block;text-align:left" class="textColor">Total</span>
                ${this.$format.IntNumFilterThreeCut(res.data.value)} USD</p></div>`;
            for (var i in res.data.tip_list) {
              str += `<div class="${cls}"><p class="tooltipHint Text16 marTop4 flexDiv">
              <span style="width:120px;display:inline-block;text-align:left" class="textColor Text14">
                ${res.data.tip_list[i][0]}</span>${this.$format.IntNumFilterThreeCut(res.data.tip_list[i][1])} USD</p></div>`
            }
            return str;
          }
        },
        // title: {
        //   subtext: "Total Volume", //副标题文本
        //   left: "27%",
        //   top: "40%",
        //   subtextStyle: {
        //     fontFamily: "微软雅黑",
        //     fontSize: 12,
        //     color: "#4a4a4a",
        //     align: "center"
        //   }
        // },
        grid: {
          top: "2%",
          right: "10",
          bottom: "26",
          left: "10"
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 0,
          top: 20,
          bottom: 20,
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            color: "#999999", //图例文字
            fontSize: '12'
          },
        },
        series: [
          {
            name: 'Total Volume',
            type: 'pie',
            minAngle: 2,
            radius: ['39%', '58%'],
            startAngle: 90,
            center: ['40%', '50%'],
            avoidLabelOverlap: true,//对，就是这里avoidLabelOverlap
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
              length: 3,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            data: [],
            itemStyle: {
              color: function (params) {
                var colorList = ["#5BCB74", "#49A1FF", "#FFCB3D", "#7B72E6", "#4FCCCB", "#F3657C", "#E076F0", "#B6E481", "#F99C47", "#79EAD6"];
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
      // 第三个饼状图  CUSD Volume
      title_cusd_volume: 0,
      CusdieEcharts: {
        tooltip: {
          trigger: "item",
          formatter: (res) => {
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            var str = `<div class="${cls}">
              <span class="Text16 H1Color textColor">${res.data.name}</span>
              <p class="tooltipHint Text16 marTop4 flexDiv"><span style="width:120px;display:inline-block;text-align:left" class="textColor">Total</span>
                ${this.$format.IntNumFilterThreeCut(res.data.value)} USD</p></div>`;
            for (var i in res.data.tip_list) {
              str += `<div class="${cls}"><p class="tooltipHint Text16 marTop4 flexDiv"><span style="width:120px;display:inline-block;text-align:left" class="textColor Text14">
                ${res.data.tip_list[i][0]}</span>${this.$format.IntNumFilterThreeCut(res.data.tip_list[i][1])} USD</p></div>`
            }
            return str;
          }
        },
        // title: {
        //   subtext: "Total Volume", //副标题文本
        //   left: "27%",
        //   top: "40%",
        //   subtextStyle: {
        //     fontFamily: "微软雅黑",
        //     fontSize: 12,
        //     color: "#4a4a4a",
        //     align: "center"
        //   }
        // },
        grid: {
          top: "2%",
          right: "10",
          bottom: "26",
          left: "10"
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 0,
          top: 20,
          bottom: 20,
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            color: "#999999", //图例文字
            fontSize: '12'
          },
        },
        series: [
          {
            name: 'Total Volume',
            type: 'pie',
            minAngle: 4,
            radius: ['39%', '58%'],
            startAngle: 90,
            center: ['40%', '50%'],
            avoidLabelOverlap: true,//对，就是这里avoidLabelOverlap
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
              length: 4,
              smooth: 0.2,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            data: [],
            itemStyle: {
              color: function (params) {
                var colorList = ["#5BCB74", "#49A1FF", "#FFCB3D", "#7B72E6", "#4FCCCB", "#F3657C", "#E076F0", "#B6E481", "#F99C47", "#79EAD6"];
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
      // ---------------------------------------------------------------
      TypeTabs: '1',     // 1：CELO/cUSD， 2：CELO/cEUR
      cusdKechartList: [],
      celo_lastest_price: 0,
      lasetest_change_rate: 0,
      kEcharts: {
        animation: false,
        tooltip: {
          padding: [4],
          trigger: "axis",
          axisPointer: {
            type: 'cross'
          },
          formatter: (res) => {
            var i = res[0].dataIndex
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            var str = `<div class="${cls}">
              <span class="Text16 H1Color">${this.cusdKechartList[i].epoch_date}</span>
              <p class="tooltipHint Text16 marTop4"><span style="width:100px;display:inline-block;" class="textColor textLeft">open</span>${this.cusdKechartList[i].open}</p>
              <p class="tooltipHint Text16 marTop4"><span style="width:100px;display:inline-block;" class="textColor textLeft">close</span>${this.cusdKechartList[i].close}</p>
              <p class="tooltipHint Text16 marTop4"><span style="width:100px;display:inline-block;" class="textColor textLeft">low</span>${this.cusdKechartList[i].low}</p>
              <p class="tooltipHint Text16 marTop4"><span style="width:100px;display:inline-block;" class="textColor textLeft">high</span>${this.cusdKechartList[i].high}</p>
              <p class="tooltipHint Text16 marTop4"><span style="width:100px;display:inline-block;" class="textColor textLeft">volume(cUSD)</span>
                ${this.$format.thousands(this.cusdKechartList[i].volume)}</p></div>
            `;
            return str;
          }
        },
        axisPointer: {
          link: { xAxisIndex: 'all' },
          label: {
            backgroundColor: "rgba(53, 53, 53, 0.8)",
          }
        },
        roam: false,
        xAxis: [
          {
            type: 'category',
            scale: true,
            boundaryGap: false,//刻度分割线
            splitLine: { show: false },//是否显示坐标轴
            splitNumber: 20,//坐标轴的分割段数
            axisTick: { show: false },
            axisLabel: { show: false },
            splitLine: { show: false },
            data: []
          }, 
          {
            type: 'category',
            gridIndex: 1,
            data: [],
            scale: true,
            boundaryGap: false,
            splitLine: { show: false },
            axisTick: { show: false },
            splitNumber: 20,
          }
        ],
        // 1: bar    2: k
        yAxis: [{
          scale: true,
          splitNumber: 2,
          splitLine: { show: false },
          // axisLine: {lineStyle: { color: '#EDEDED' },},
        }, {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          splitLine: { show: false }
        }],
        grid: [{
          top: 30,
          right: 30,
          left: 70,
          height: 210
        }, {
          left: 70,
          right: 30,
          height: 130,
          top: 260
        }],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 50,
            end: 130,
            zoomLock: false,
            zoomOnMouseWheel : false
          },
          {
            show: true,
            xAxisIndex: [0, 1],
            type: 'slider',
            y: '90%',
            start: 50,
            end: 130,
            zoomLock: false,
            zoomOnMouseWheel : false      // 如何触发缩放。可选值为：
              // true：表示不按任何功能键，鼠标滚轮能触发缩放。
              // false：表示鼠标滚轮不能触发缩放。
              // 'shift'：表示按住 shift 和鼠标滚轮能触发缩放。
              // 'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。
              // 'alt'：表示按住 alt 和鼠标滚轮能触发缩放。


          }
        ],
        series: [{
          name: '',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: [],
          itemStyle: {
            barBorderRadius: 2,
            color: '#FFCE47'
          }
        }, {
          type: 'candlestick',
          name: '',
          data: [],
          itemStyle: {
            color: "#E84141",
            color0: "#35D080", // 绿色 涨
            borderColor: "#E84141",
            borderColor0: "#35D080"
          }
        }]
      },
      kTime: '1440',
      listPageData: {
        pageSize: 10,
        pageNo: 1,
        total: 0
      },
      trading_records: []

    };
  },
  components: {
    VabChart,
  },
  computed: {
  },
  mounted() {
    setTimeout(()=>{
      this.isLoad = true;
    }, 1500)
    this.getprices();
    // 柱状图 + K线图
    this.getLineEcharts();
    // 表格数据
    this.getListData();
  },
  watch: {
    SearchText(val) {
      if(!val){
        this.getListData(this.tabPosition, this.SearchText);
      }
    }
  },
  methods: {
    jumpAddressDetails(url) {
      this.$store.commit('updateheadTabClsId', '2');
      this.$router.push({
        path: `/acountdetail/${url}`
      })
    },
    searchRecordsList() {
      this.getListData(this.tabPosition, this.SearchText);
    },
    changeLisetype() {
      this.getListData(this.tabPosition, this.SearchText);
    },
    handleClick() {
      this.getListData(this.tabPosition, this.SearchText);
      this.getLineEcharts();
    },
    // 切换改变 echarts
    changeTimeTabs() {
      this.getLineEcharts();
    },
    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      }
    },
    // 顶部饼状图
    getprices() {
      var parmas = {
        method: 'getprices'
      };
      account(parmas).then((data) => {
        let exchange_prices = data;
        var totalVolumeUSD = 0
        var totalVolumeCELO = 0
        var totalVolumeCUSD = 0
        // 设置 饼状图第一个  Total Volume
        var exchange_pie_data = [];
        let exchangers = ['Binance', 'Coinbase', 'Coinlist', 'OKEx', 'Bittrex', 'KuCoin', 'Mento']
        for (let exchange of exchangers) {
          exchange = exchange.slice(0, 1).toUpperCase() + exchange.slice(1).toLowerCase();
          let volume = 0
          let tip_list = []
          for (let symbol of Object.keys(exchange_prices)) {
            for (let item of Object.keys(exchange_prices[symbol])) {
              if (item == exchange.toLowerCase()) {
                let volume1 = exchange_prices[symbol][item].volume
                if (symbol.indexOf('CELO') == 0 && exchange_prices['CELO-USD']) {
                  volume1 = volume1 * exchange_prices['CELO-USD']['coinbase'].price
                }
                volume += volume1
                totalVolumeUSD += volume1
                tip_list.push([symbol, volume1])
              }
            }
          }
          exchange_pie_data.push({
            value: volume,
            tip_list: tip_list,
            name: exchange
          })
        }
        exchange_pie_data.sort(this.compare('value'));
        if (exchange_pie_data.length > 6) {
          exchange_pie_data = exchange_pie_data.slice(0, 6);
          exchange_pie_data.push({
            value: '', name: 'others'
          })
        }
        this.title_usd_volume = totalVolumeUSD.toFixed(0);
        this.exchangePieEcharts.series[0].data = exchange_pie_data;
        // 设置 饼状图 后两个
        var celo_pie_data = [];
        var cusd_pie_data = [];
        for (let symbol of Object.keys(exchange_prices)) {
          let volume = 0
          let tip_list = []
          for (let exchanger of Object.keys(exchange_prices[symbol])) {
            let volume1 = exchange_prices[symbol][exchanger].volume
            volume += volume1
            if (symbol.indexOf('CELO-') == 0) { totalVolumeCELO += volume1; }
            if (symbol.indexOf('CUSD-') == 0) { totalVolumeCUSD += volume1; }
            exchanger = exchanger.slice(0, 1).toUpperCase() + exchanger.slice(1).toLowerCase()
            tip_list.push([exchanger, volume1])
          }
          if (symbol.indexOf('CELO-') == 0) {
            celo_pie_data.push({
              value: volume,
              tip_list: tip_list,
              name: symbol
            })
          }
          if (symbol.indexOf('CUSD-') == 0) {
            cusd_pie_data.push({
              value: volume,
              tip_list: tip_list,
              name: symbol
            })
          }
        }
        // ?celo
        celo_pie_data.sort(this.compare('value'));
        if (celo_pie_data.length > 6) {
          celo_pie_data = celo_pie_data.slice(0, 6);
          celo_pie_data.push({
            value: '', name: 'others'
          })
        }
        // cusd
        cusd_pie_data.sort(this.compare('value'));
        if (cusd_pie_data.length > 6) {
          cusd_pie_data = cusd_pie_data.slice(0, 6);
          cusd_pie_data.push({
            value: '', name: 'others'
          })
        }
        //     
        this.CeloieEcharts.series[0].data = celo_pie_data;
        this.CusdieEcharts.series[0].data = cusd_pie_data;
        this.title_celo_volume = totalVolumeCELO.toFixed(0);
        this.title_cusd_volume = totalVolumeCUSD.toFixed(0);
      })
    },
    // 数据图
    getLineEcharts() {
      var parmas = {
        method: 'get_k_line',
        symbol: this.TypeTabs == '1' ? 'cUSD' : 'cEUR',
        k_time: this.kTime
      };
      var cha = 0.006;
      if (this.kTime == '10') { cha = 0.008; }
      if (this.kTime == '30') { cha = 0.02; }
      if (this.kTime == '60') { cha = 0.02; }
      if (this.kTime == '1440') { cha = 0.08; }
     
      account(parmas).then((kline_data) => {
        let keys = Object.keys(kline_data).sort();
        var timeData = [];
        var seriesData = [];
        var volumeData = [];
        var cusdKechartList = [];
        keys.forEach((key, i) => {
          let epoch_date = (new Date(key)).toDateString();
          epoch_date = epoch_date.split(" ")[2] + ' ' + epoch_date.split(" ")[1] + ' ' + epoch_date.split(" ")[3];
          // timeData.push(key);
          // 2021-02-30 转成英文格式
          timeData.push(epoch_date);
          volumeData.push(kline_data[key].volume);
          seriesData.push([
            kline_data[key].close,
            kline_data[key].open,
            Number(kline_data[key].low - cha),
            Number(kline_data[key].high + cha)
          ]);
          cusdKechartList.push({
            time: key,
            open: kline_data[key].open,
            close: kline_data[key].close,
            low: kline_data[key].low,
            high: kline_data[key].high,
            volume: kline_data[key].volume.toFixed(2),
            epoch_date: epoch_date
          })

          if (i == (keys.length - 1)) {
            var lastest_close = kline_data[key].close;
            var lastest_open = kline_data[key].open;
            var lasetest_change_rate = ((lastest_close - lastest_open) * 100) / lastest_open;
            this.celo_lastest_price = lastest_close;
            this.lasetest_change_rate = lasetest_change_rate.toFixed(2);
          }
        });
        this.cusdKechartList = cusdKechartList;
        // ----------------
        this.kEcharts.series[0].data = volumeData;
        this.kEcharts.series[1].data = seriesData;
        this.kEcharts.xAxis[0].data = timeData;
        this.kEcharts.xAxis[1].data = timeData;
      })
    },
    // 下方表格   
    getListData(type, searchtext) {
      if (this.isloadListData) { return; }
      this.trading_records = [];
      this.isloadListData = true;
      var parmas = {
        method: 'trading_records',
        symbol: this.TypeTabs == '1' ? 'cUSD' : 'cEUR',
        type: this.tabPosition,
        page: Number(this.listPageData.pageNo - 1),
        address: this.SearchText
      };
      account(parmas).then((response) => {
        if (type) {
          this.tabPosition = type;
        }
        if (searchtext) {
          this.SearchText = searchtext;
        }
        this.isloadListData = false;
        var records = response.trading_records;
        var recordsList = []
        for (var i in records) {
          var item = records[i];
          let sellAmount = item[3];
          let buyAmount = item[4];
          let soldGold = item[5];
          var celo_price = 0;
          if (soldGold) {
            celo_price = parseFloat((buyAmount / sellAmount).toFixed(4));
          }
          else {
            celo_price = parseFloat((sellAmount / buyAmount).toFixed(4));
          }
          recordsList.push({
            time: item[1],
            Exchanger: item[2],
            status: item[5],
            OutAmount: item[3],
            InAmount: item[4],
            Rate: celo_price,
            TxHash: item[6],
          })
        }
        this.trading_records = recordsList;
        this.listPageData.total = response.totalCount;
      });
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
