<template>
  <div>
    <div class="mainContainer ValidatorGroups">
      <div class="mainCon-sub marTop24">
        <el-row>
          <el-col :md="10" :sm="24">
            <div class="">
              <p class="primaryTitle">Validator Groups</p>
            </div>
            <div class="Validator-headCon marBtm20">
              <div class="flexDiv">
                <!-- yidongGroup -->
                <p class="textCenter Text22 h6Color weightText">Groups</p>
                <p class="Text20">
                  <span class="greenColor">{{groups.ele}}</span>/{{groups.reg}}
                </p>
              </div>
              <p class="Text18 textRight h5Color marTop4"> Elected/Registered </p>
            </div>
            <div class="Validator-headCon marBtm20">
              <div class="flexDiv">
                <p class="textCenter Text22 h6Color weightText">Validators</p>
                <p class="Text20 ">
                  <span class="greenColor">{{validators.ele}}</span>/{{validators.reg}}
                </p>
              </div>
              <p class="Text18 textRight h5Color marTop4"> Elected/Registered </p>
            </div>
            <div class="Validator-headCon marBtm20">
              <div class="flexDiv">
                <p class="textCenter Text22 h6Color weightText">Locked</p>
                <div>
                  <p class="Text20 greenColor textRight">{{locked_cGLD | thousands}}</p>
                  <!-- Elected -->
                  <p class="h5Color Text18 textRight">CELO</p>
                  <p class="Text20 greenColor marTop12 textRight">{{locked_rate}}%
                    <el-tooltip class="">
                      <div slot="content" class="Text14">* LockedCELO Rate = LockedCELO / TotalSupplyCELO;</div>
                      <span class="iconfont icon-zhushi h3Color cursorPointer">
                      </span>
                    </el-tooltip>
                  </p>
                  <!-- <p class="h5Color Text18 textRight">Registered</p> -->
                </div>
              </div>
            </div>
            <div class="Validator-headCon">
              <div class="flexDiv">
                <p class="textCenter Text22 h6Color weightText">Votes</p>
                <div>
                  <p class="Text20 greenColor textRight">{{votes | thousands}}</p>
                  <!-- Elected -->
                  <p class="h5Color Text18 textRight">CELO</p>
                  <p class="Text20 greenColor marTop12 textRight">{{votes_rate}}%
                    <el-tooltip class="">
                      <div slot="content" class="Text14">* Votes Rate = Votes / TotalSupplyCELO;</div>
                      <span class="iconfont icon-zhushi h3Color cursorPointer">
                      </span>
                    </el-tooltip>
                  </p>
                  <!-- <p class="h5Color Text18 textRight">Registered</p> -->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :md="14" :sm="24">
            <div class="SubTitle marBtm24" style="margin-top:0;">
              Total Nodes
              <!-- value="+1" -->
              <el-badge class="itemBadge weightNor marLeft8">
                <p class="Text30 greenColor">{{nodeLength}}</p>
              </el-badge>
            </div>
            <div class="marTop20" style="">
              <vab-chart style="width:100%;height: 530px" class="echartsCon" :autoresize="true" :options="mapEcharts" :loading="mapEchartsLoading"
                :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')" />
            </div>
          </el-col>
        </el-row>

        <div style="margin: 26px 0;" class="marTop50">
          <div class="flexDiv SubTitle">
            Daily Votes/Locked
            <p class="h3Color Text16">
              Vote Rewards APY
            </p>
          </div>
          <p class="textRight greenColor Text22 marBtm6">~{{vote_reward_apr | formatNum3}}%</p>
          <div class="tabGroup flexDiv">
            <el-tabs v-model="dailyType" class="epochDetailChange">
              <el-tab-pane label="Epoch" name="Epoch">
                <div class="DailyType" v-show="dailyType == 'Epoch'" style="height: 340px;">
                  <vab-chart style="width: 100%;height: 340px" :autoresize="true" :options="DailyEcharts" 
                    :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')" />
                </div>
              </el-tab-pane>
              <el-tab-pane label="Details" name="Details">
                <div class="myTable tabTable" style="margin-top:0;">
                  <!-- stripe -->
                  <el-table height="240" class="downLoadTable" :data="lockedgold_history" fit align="center" style="width: 100%;overflow-y:hidden;" :default-sort="{prop: 'EpochShow', order: 'descending'}">
                    <template slot="empty">
                      <div class="flexDiv columnFlex justifyCenter" style="height: 240px;">
                        <img src="../../assets/images/notData2.png" class="normalImg">
                        <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
                      </div>
                    </template>
                    <el-table-column prop="EpochShow" label="Epoch" width="110" sortable show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span class="">{{scope.row.Epoch}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="Votes" label="Votes" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span class="">{{scope.row.Votes | formatNum3 | numFilterThreeCut}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="LockedCELO" width="160" label="Locked CELO" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span class="">{{scope.row.LockedCELO | formatNum3 | numFilterThreeCut}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
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
  name: "Home",
  props: ['validators', 'groups'],
  data() {
    return {
      mapEchartsLoading: true,
      nodeLength: 0,
      locked_cGLD: 0,
      locked_rate: '',
      votes: 0,
      votes_rate: '',
      vote_reward_apr: '',
      lockedgold_history: [],
      epochData: [],
      countriesList: [],
      nowShowLabelIndex: 0,
      mapEcharts: {
        // backgroundColor: '#000',
        // 图表主标题
        grid: {
          top: "0%",
          right: "0",
          bottom: "60",
          left: "0",
        },
        // 提示框组件
        bmap: {
          zoom: 5,
        },
        //悬浮提示
        tooltip: {
          trigger: "item",
          // triggerOn : 'click',//提示框触发的条件                   
          transitionDuration :.8,//提示框浮层的移动动画过渡时间，单位是 s      
          // trigger: "axis",
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
          formatter: (params, ticket, callback) => {
            //根据业务自己拓展要显示的内容
            var res = `<div style="max-width:320px"><div class="marBtm8 Text17">E:${params.data.value[0]}<span class="marLeft8">N:${params.data.value[1]}</span></div>
              <div class="flexDiv flexWrap marBtm6"><p class="Text16">${params.data.city}</p>
              <p class="Text16 tooltipHint">[${params.data.count}]</p></div>`;
            for (var i in params.data.tip) {
              var name = params.data.tip[i][1].indexOf('.') ? params.data.tip[i][1].split('.')[0] : params.data.tip[i][1];
              name = name.indexOf(',') ? name.split(',')[0] : name;
              // 
              var showName = params.data.tip[i][1].substr(0, params.data.tip[i][1].indexOf(' ')).replace(',', '').replace('.com', '');
              var version = params.data.tip[i][2].split('-')[0]
              res += `<div class="flexDiv flexWrap marBtm6"><p class="Text14 tooltipHint" style="width: 130px">${params.data.tip[i][0]}</p>
              <p class="Text14 oneLine" style="max-width: 120px;padding: 0 16px 0 8px">${version}</p><p class="Text14 oneLine textRight" style="min-width: 50px">${showName}</p></div>`
            }
            return `${res}</div>`;
          }
        },
        visualMap: {
          type: 'continuous', // continuous 类型为连续型  piecewise 类型为分段型
          show: false, // 是否显示 visualMap-continuous 组件 如果设置为 false，不会显示，但是数据映射的功能还存在
          // 指定 visualMapContinuous 组件的允许的最小/大值。'min'/'max' 必须用户指定。
          // [visualMap.min, visualMax.max] 形成了视觉映射的『定义域』
          min: 0,
          max: 1000000,
          // 文本样式
          textStyle: {
            fontSize: 14,
            color: '#fff'
          },
          realtime: false, // 拖拽时，是否实时更新
          calculable: true, // 是否显示拖拽用的手柄
          // 定义 在选中范围中 的视觉元素
          inRange: {
            color: ['#54c04a', '#54c04a'] // 图元的颜色
          }
        },
        geo: {
          map: "world",
          regions: [],
          label: {
            emphasis: {
              show: true,
              textStyle: {
                color: '#ffffff'
              }
            }
          },
          aspectScale: 0.6, // geoBoundingRect.width / geoBoundingRect.height * aspectScale
          // roam: 'move', //是否允许缩放
          layoutCenter: ["50%", "50%"], //地图位置
          layoutSize: "130%",
        },
        series: [
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            symbol: "circle",
            symbolSize: (rawValue, params) => {
              if (rawValue[2]) {
                if (rawValue[2] < 10) { return 2; }
                if (rawValue[2] < 20) { return 4; }
                if (rawValue[2] < 30) { return 6; }
                if (rawValue[2] < 40) { return 8; }
                if (rawValue[2] < 50) { return 10; }
                if (rawValue[2] < 60) { return 12; }
                if (rawValue[2] < 70) { return 14; }
                if (rawValue[2] < 80) { return 16; }
              }
            },
            label: {
              normal: {
                color: 'red',
                show: true,
                position: "top", //显示位置
                offset: [5, 0], //偏移设置
                formatter: "{b}" //圆环显示文字
              },
              emphasis: {
                show: true
              }
            },
            data: []
          },
          // 上方悬浮框内容
          {
            zlevel: 10,
            name: "scatter",
            type: "effectScatter",
            coordinateSystem: "geo",
            rippleEffect: {
              //涟漪特效
              color: '#54C04A',
              period: 3, //动画时间，值越小速度越快
              brushType: "stroke", //波纹绘制方式 stroke, fill
              scale: 4
              //波纹圆环最大限制，值越大波纹越大
            },
            symbolSize: (rawValue, params) => {
              if (rawValue[2]) {
                if (rawValue[2] < 10) { return 2; }
                if (rawValue[2] < 20) { return 3.2; }
                if (rawValue[2] < 30) { return 5.4; }
                if (rawValue[2] < 40) { return 7.2; }
                if (rawValue[2] < 50) { return 10; }
                if (rawValue[2] < 60) { return 12; }
                if (rawValue[2] < 70) { return 14; }
                if (rawValue[2] < 80) { return 16; }
              }
            },
            // animation: true,
            // animationDuration: 1800,
            // animationDurationUpdate: 2000,
            // animationEasing: "cubicInOut",
            // animationEasingUpdate: "cubicInOut",
            // constantSpeed: 10,
            label: {
              show: true,
              padding: [14, 8],
              position: "bottom",
              formatter: (res) => {
                return ` ${res.data.name} `;
              },
            },
            data: [],
          },
        ]
      },
      //
      seriesDatafirstThree: [],
      seriesDataLastThree: [],
      seriesData02firstThree: [],
      seriesData02LastThree: [],
      DailyEcharts: {
        tooltip: {
          trigger: "axis",
          zIndex: 200,
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
              <span class="Text16 textColor">${this.epochData[i].tip}</span>
              <p class="tooltipHint Text16 marTop8 flexDiv">
              <span style="width: 100px;display:inline-block;" class="textColor">${res[0].seriesName}</span>${this.$format.thousands(res[0].value)}</p>
              <p class="tooltipHint Text16 line2 flexDiv">
              <span style="width: 100px;display:inline-block;" class="textColor">VoteRate</span>${this.epochData[i].voteRate}</p>
              <p class="tooltipHint Text16 line2 flexDiv">
              <span style="width: 100px;display:inline-block;" class="textColor"></span>${this.epochData[i].voteCha}</p>
              <p class="tooltipHint line2 Text16 flexDiv">
              <span style="width: 100px;display:inline-block;" class="textColor">${res[1].seriesName}</span>${this.$format.thousands(res[1].value)}</p>
              <p class="tooltipHint Text16 line2 flexDiv">
              <span style="width: 100px;display:inline-block;" class="textColor">lockedRate</span>${this.epochData[i].lockedRate}</p>
              <p class="tooltipHint Text16 line2 flexDiv">
              <span style="width: 100px;display:inline-block;" class="textColor"></span>${this.epochData[i].lockedCha}</p></div>`
            return str;
          }
        },
        grid: {
          top: "40",
          right: "0",
          bottom: "70",
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
            showMaxLabel: true,
            interval: 120,
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
            name: "Votes",
            smooth: 0.6,
            symbol: 'none',   // 不显示拐点
            type: "line",
            stack: '1',
            markPoint: {
              symbol: 'image://https://thecelo.com/staticNew/markBgEmpty.png',
              symbolOffset: ['0', '-5'],  // 位置偏移
              animation: false,
              itemStyle: {
                normal: {
                  label: {
                    color:  (res) => {
                    },
                    fontSize: 12,
                    fontWeight: 'normal',
                    formatter:  (res) => {
                      if(this.$store.state.themeCls == 'whiteTheme'){
                        if(this.seriesDatafirstThree.indexOf(res.value) != -1){
                          return `{a|              ${this.$format.thousands(res.value)}}`
                        }
                        if(this.seriesDataLastThree.indexOf(res.value) != -1){
                          return `{a| ${this.$format.thousands(res.value)}}              `
                        }
                        return `{a| ${this.$format.thousands(res.value)}}`
                      }
                      if(this.seriesDatafirstThree.indexOf(res.value) != -1){
                        return `{b|              ${this.$format.thousands(res.value)}}`
                      }
                      if(this.seriesDataLastThree.indexOf(res.value) != -1){
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
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
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
            name: "Locked",
            smooth: 0.6,
            symbol: 'none',   // 不显示拐点
            type: "line",
            stack: '12',
            markPoint: {
              symbol: 'image://https://thecelo.com/staticNew/markBgEmpty.png',
              symbolOffset: ['0', '-18'],  // 位置偏移
              animation: false,
              itemStyle: {
                normal:{
                  label:{
                    // color: "#4A4A4A",//气泡中字体颜色
                    color:  (res) => {
                    },
                    fontSize: 12,
                    fontWeight: 'normal',
                    formatter:  (res) => {
                      if(this.$store.state.themeCls == 'whiteTheme'){
                        if(this.seriesData02firstThree.indexOf(res.value) != -1){
                          return `{a|              ${this.$format.thousands(res.value)}}`
                        }
                        if(this.seriesData02LastThree.indexOf(res.value) != -1){
                          return `{a| ${this.$format.thousands(res.value)}}              `
                        }
                        return `{a| ${this.$format.thousands(res.value)}}`
                      }
                      if(this.seriesData02firstThree.indexOf(res.value) != -1){
                        return `{b|              ${this.$format.thousands(res.value)}}`
                      }
                      if(this.seriesData02LastThree.indexOf(res.value) != -1){
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
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            data: [],
            itemStyle: {
              normal: {
                color: '#63CF59',
              },
            },
          }
        ]
      },
      dailyType: 'Epoch',
    };
  },
  components: {
    VabChart,
  },
  computed: {
    themeCls() {
      return this.$store.state.themeCls;
    }
  },
  watch: {
    themeCls(val) {
      this.getLockedGoldData();
    }
  },
  mounted() {
    this.getLockedGoldData();
    this.getNodesData();
  },
  methods: {
    getLockedGoldData() {
      var parmas = {
        method: 'getlockedgold'
      };
      account(parmas).then((obj, result) => {
        // 直接赋值
        this.vote_reward_apr = obj.vote_reward_apr;
        // 处理数据
        var pre_lockedgold = 0;
        var locked_rate = 0
        var pre_votes = 0;
        var lockedgold = 0;
        var votes = 0;
        var lockedgold_history = [];
        var locked_gold = obj.locked_gold;
        var time = [];
        var seriesData = [];
        var seriesData02 = [];
        var epochData = [];
        var cgld_total_supply = obj.cgld_total_supply;

        Object.keys(locked_gold).forEach((epoch, i) => {
          let epoch_date = this.$format.getEpochDate(epoch)
          lockedgold = locked_gold[epoch].totalLockedGold;
          votes = locked_gold[epoch].totalVotes;

          // 计算差， 设置鼠标移上显示的 数据
          var add_votes = (votes - pre_votes).toFixed(2);  // 和上一个的差
          var add_lockedg = (lockedgold - pre_lockedgold).toFixed(2);
          epochData.push({
            tip: `${this.$format.chartTipTitle(epoch)}`,
            votes: votes,
            voteCha: add_votes >= 0 ? '+' + add_votes : add_votes,
            voteRate: ((votes * 100) / cgld_total_supply).toFixed(2) + '%',
            lockedCha: add_lockedg >= 0 ? '+' + add_lockedg : add_lockedg,
            lockedRate: ((lockedgold * 100) / cgld_total_supply).toFixed(2) + '%',
          });
          pre_votes = votes;
          add_lockedg = lockedgold;
          pre_lockedgold = lockedgold;
          // 计算差， 设置鼠标移上显示的 数据-------------------------------------- 完

          var cgldSupply = locked_gold[epoch].cgldSupply - locked_gold['1'].cgldSupply;
          var ceurSupply = locked_gold[epoch].ceurSupply - locked_gold['337'].ceurSupply
          ceurSupply = ceurSupply < 0 ? 0 : ceurSupply

          lockedgold_history.push({
            EpochShow: this.$format.getEpochDateSorate(epoch),
            Epoch: epoch_date.substr(5, 6),
            Votes: votes,
            LockedCELO: lockedgold
          });
          // lockedgold_history.push([epoch_date.substr(5,6),votes,tip1,lockedgold,tip2]);

          time.push(epoch_date.substr(5, 6));
          seriesData.push(parseInt(votes));
          seriesData02.push(parseInt(lockedgold));
        });

        this.locked_cGLD = pre_lockedgold.toFixed(0);
        this.locked_rate = ((lockedgold * 100) / obj.cgld_total_supply).toFixed(2);
        this.votes = votes.toFixed(0);
        this.votes_rate = ((votes * 100) / obj.cgld_total_supply).toFixed(2);

        // Daily Votes/Locked 折线图、列表数据
        // 修改  x 轴  起始数据内容
        time[0] = `           ${time[0]}`
        var lasii = time.length - 1;
        time[lasii] = `${time[lasii]}           `
        // 设置
        this.epochData = epochData;
        this.lockedgold_history = lockedgold_history;
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
        // 取前三个为数组 seriesData02firstThree
        this.seriesData02firstThree = [
          seriesData02[0], seriesData02[1], seriesData02[2]
        ];
        // 取后三个为数组 seriesData02LastThree
        var last1 = seriesData02.length - 1;
        var last2 = seriesData02.length - 2;
        var last3 = seriesData02.length - 3;
        this.seriesData02LastThree = [
          seriesData02[last1], seriesData02[last2], seriesData02[last3]
        ];
        if (this.$store.state.themeCls == 'whiteTheme') {
          this.setWhiteDailyEcharts();
        } else {
          this.setBlackDailyEcharts();
        }
        this.DailyEcharts.xAxis.data = time;
        this.DailyEcharts.series[0].data = seriesData;
        this.DailyEcharts.series[1].data = seriesData02;
      });
    },
    setWhiteDailyEcharts() {
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
    setBlackDailyEcharts() {
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
    getMaxMin(arr) {
      arr.sort(function (a, b) {
        return a - b;
      });
      var min = arr[0];  // 5
      var max = arr[arr.length - 1];  // 56
      return { min, max };
    },
    getNodesData() {
      var parmas = {
        method: 'redis_key_value',
        key: 'nodes'
      };
      var geoCoordMap = {
        // -----------美国
        'US': [-95.712891, 37.09024],
        'Ashburn': [-95.712891, 37.09024],  // 佐治亚州(Georgia，简称GA)中的，又译乔治亚州，美国东南部7个州之一
        'Tarrytown': [-95.712896, 37.09004],
        'Council Bluffs': [-95.712906, 37.09104],
        'Hilliard': [81.55, 27.41],     // 美国，	佛罗里达州，
        'Tampa': [82.38478, 27.60256],    // 北纬 27°58', 西经 82°38'  
        'Washington': [79.02366, 38.53698],     // 华盛顿  北纬 38°53', 西经 77°02' 
        'Palm Bay"': [81.498712, 24.36987],     // 佛罗里达州，
        'The Dalles': [80.3669, 32.36699],
        'San Jose': [121.53002, 37.201236],   // 北纬37°20′07″ 西经121°53′31″
        'Des Moines': [93.37000, 41.360125],   // 纬度 : 41°36'00.00"N 经度 : 93°37'00.00"W
        'Boardman': [80.3669, 34.36699],
        'North Charleston': [81.45698, 38.2368],  // 北纬 38°23', 西经 81°4' 
        'Quincy': [71.1125, 42.1056],
        'Los Angeles': [118.15236, 34.0698],    // 纬度 : 34°09'00.00"N   经度 : 118°15'00.00"W
        "San Antonio": [-95.68789, 25.50236],   // 纬度是25°50'N 到36°30'N 
        'Merced': [117.474090, 33.41221],   // 加利福尼亚州 北纬N33°41′2.21″ 西经W117°47′40.90
        'San Francisco': [112.26, , 37.46],  // 旧金山  北纬 37°46', 西经 122°26'   
        'Palm Beach Gardens': [118.09, 33.47],   // 长滩 北纬 33°47', 西经 118°09' 
        'Long Beach': [118.09, 33.47],   // 长滩 北纬 33°47', 西经 118°09' 
        'Sunnyvale': [112.0214, 37.025],  // 森尼韦尔
        'Austin': [97.4426, 30.1756],  // 奥斯丁 北纬 30°17', 西经 97°44' 
        // -----------罗马尼亚
        'Bucharest': [24.96676, 45.943161],       // 布加勒斯特，是罗马尼亚首都 北纬 44°23', 东经 26°1' 
        // -----------伦敦
        'London': [70, 40.43],    // 伦敦（London）  纽约西经74度，北纬40.43度，伦敦东经0.1度，北纬51.3度。
        'Hale': [70.366, 38.402263],
        // -----------韩国 KR
        'Seoul': [127.766922, 37.907757],    // 首尔 北纬 37°35', 东经 127°03'
        'Goyang-si': [126.456987, 37.401236],    // 高阳市 东经126度45分 北纬37度40分
        // -----------德国 DE
        'Mühlhausen': [10.451526, 51.165691],    // 米尔豪森是一座德国中部城市  北纬 52°31', 东经 13°2' 
        'Oberdorla': [12.451526, 52.165691],    // 米尔豪森是一座德国中部城市  北纬 52°31', 东经 13°2'
        'Nürnberg': [11.56234, 49.2687459],
        'Frankfurt am Main': [84.52, 38.12368],   // 北纬 38°12', 西经 84°52' 
        'Gunzenhausen': [11.32568, 48.06358],  // 巴伐利亚州 北纬48°08' ，东经 11°35' 
        'Karlsruhe': [9.43, 49.25],    // 卡尔斯鲁
        // -----------荷兰 NL
        'Amsterdam': [4.53698, 52.22369],   // “阿姆斯特丹的经纬度: 东经4度53分28秒 北纬52度22分41秒 阿姆斯特丹是荷兰首都,
        // '荷兰': [5.291265999999999, 52.132633],
        // -----------加拿大 CA
        'Montréal': [94.21569, 35.0789],   // 纬度 : 35°07'N   经度 : 94°21'W
        'Toronto': [79.22, 43.426], // 多伦多  北纬 43°4', 西经 79°22' 
        // [-106.346771, 56.130366]
        // -----------新加坡  SG
        'Singapore': [103.4569, 1.236987],    // 北纬 1°22', 东经 103°45' 
        // -----------香港 HK
        'Hong Kong': [114.0869, 22.15698],    // 北纬 22°17', 东经 114°08'
        // -----------
        'Angeles City': [11802369, 34.023698],   // 北纬 34°05', 西经 118°22'  
        // -----------日本 JP
        'Tokyo': [139.44369, 35.42368],   // 东京 北纬 35°41', 东经 139°44' 
        // -----------巴西 BR
        'Campinas': [-51.92528, -14.235004],  // 经度:-47.0626 纬度:-22.90713
        // -----------爱尔兰共和国IE
        'Dublin': [53.3472, 6.259],  // “经度: 6.2592° W 纬度: 53.3472° N”
        // -----------意大利 IT
        'Milan': [9.10236, 45.27896],   // 米兰  北纬 45°28', 东经 9°1' 
        // -----------台湾 TW
        'Taipei': [121.38457, 25.02369],   //北纬 25°02', 东经 121°38' 
        // -----------瑞典
        'Stockholm': [18.23011, 59.23514],  // 斯德哥尔摩 北纬 59°23', 东经 18'
        // -----------拉斯维加斯
        'Las Vegas': [115.1236, 36.1258],  // 北纬 36°1', 西经 115°1' 
        // -----------芬兰
        'Tuusula': [25.135, 60.2413],  // 图苏拉  北纬60°24′13″, 西经25°1′35″

        // '阿富汗': [67.709953, 33.93911],
        // '安哥拉': [17.873887, -11.202692],
        // '阿尔巴尼亚': [20.168331, 41.153332],
        // '阿联酋': [53.847818, 23.424076],
        // '阿根廷': [-63.61667199999999, -38.416097],
        // '亚美尼亚': [45.038189, 40.069099],
        // '法属南半球和南极领地': [69.348557, -49.280366],
        // '澳大利亚': [133.775136, -25.274398],
        // '奥地利': [14.550072, 47.516231],
        // '阿塞拜疆': [47.576927, 40.143105],
        // '布隆迪': [29.918886, -3.373056],
        // '比利时': [4.469936, 50.503887],
        // '贝宁': [2.315834, 9.30769],
        // '布基纳法索': [-1.561593, 12.238333],
        // '孟加拉国': [90.356331, 23.684994],
        // '保加利亚': [25.48583, 42.733883],
        // '巴哈马': [-77.39627999999999, 25.03428],
        // '波斯尼亚和黑塞哥维那': [17.679076, 43.915886],
        // '白俄罗斯': [27.953389, 53.709807],
        // '伯利兹': [-88.49765, 17.189877],
        // '百慕大': [-64.7505, 32.3078],
        // '玻利维亚': [-63.58865299999999, -16.290154],
        // '巴西': [-51.92528, -14.235004],
        // '文莱': [114.727669, 4.535277],
        // '不丹': [90.433601, 27.514162],
        // '博茨瓦纳': [24.684866, -22.328474],
        // '中非共和国': [20.939444, 6.611110999999999],
        // '加拿大': [-106.346771, 56.130366],
        // '瑞士': [8.227511999999999, 46.818188],
        // '智利': [-71.542969, -35.675147],
        // '中国': [104.195397, 35.86166],
        // '象牙海岸': [-5.547079999999999, 7.539988999999999],
        // '喀麦隆': [12.354722, 7.369721999999999],
        // '刚果民主共和国': [21.758664, -4.038333],
        // '刚果共和国': [15.827659, -0.228021],
        // '哥伦比亚': [-74.297333, 4.570868],
        // '哥斯达黎加': [-83.753428, 9.748916999999999],
        // '古巴': [-77.781167, 21.521757],
        // '北塞浦路斯': [33.429859, 35.126413],
        // '塞浦路斯': [33.429859, 35.126413],
        // '捷克共和国': [15.472962, 49.81749199999999],
        // '德国': [10.451526, 51.165691],
        // '吉布提': [42.590275, 11.825138],
        // '丹麦': [9.501785, 56.26392],
        // '多明尼加共和国': [-70.162651, 18.735693],
        // '阿尔及利亚': [1.659626, 28.033886],
        // '厄瓜多尔': [-78.18340599999999, -1.831239],
        // '埃及': [30.802498, 26.820553],
        // '厄立特里亚': [39.782334, 15.179384],
        // '西班牙': [-3.74922, 40.46366700000001],
        // '爱沙尼亚': [25.013607, 58.595272],
        // '埃塞俄比亚': [40.489673, 9.145000000000001],
        // '芬兰': [25.748151, 61.92410999999999],
        // '斐': [178.065032, -17.713371],
        // '福克兰群岛': [-59.523613, -51.796253],
        // '法国': [2.213749, 46.227638],
        // '加蓬': [11.609444, -0.803689],
        // '英国': [-3.435973, 55.378051],
        // '格鲁吉亚': [-82.9000751, 32.1656221],
        // '加纳': [-1.023194, 7.946527],
        // '几内亚': [-9.696645, 9.945587],
        // '冈比亚': [-15.310139, 13.443182],
        // '几内亚比绍': [-15.180413, 11.803749],
        // '赤道几内亚': [10.267895, 1.650801],
        // '希腊': [21.824312, 39.074208],
        // '格陵兰': [-42.604303, 71.706936],
        // '危地马拉': [-90.23075899999999, 15.783471],
        // '法属圭亚那': [-53.125782, 3.933889],
        // '圭亚那': [-58.93018, 4.860416],
        // '洪都拉斯': [-86.241905, 15.199999],
        // '克罗地亚': [15.2, 45.1],
        // '海地': [-72.285215, 18.971187],
        // '匈牙利': [19.503304, 47.162494],
        // '印尼': [113.921327, -0.789275],
        // '爱尔兰': [-8.24389, 53.41291],
        // '伊朗': [53.688046, 32.427908],
        // '伊拉克': [43.679291, 33.223191],
        // '冰岛': [-19.020835, 64.963051],
        // '以色列': [34.851612, 31.046051],
        // '意大利': [12.56738, 41.87194],
        // '牙买加': [-77.297508, 18.109581],
        // '约旦': [36.238414, 30.585164],
        // '日本': [138.252924, 36.204824],
        // '哈萨克斯坦': [66.923684, 48.019573],
        // '肯尼亚': [37.906193, -0.023559],
        // '吉尔吉斯斯坦': [74.766098, 41.20438],
        // '柬埔寨': [104.990963, 12.565679],
        // '韩国': [127.766922, 35.907757],
        // '科索沃': [20.902977, 42.6026359],
        // '科威特': [47.481766, 29.31166],
        // '老挝': [102.495496, 19.85627],
        // '黎巴嫩': [35.862285, 33.854721],
        // '利比里亚': [-9.429499000000002, 6.428055],
        // '利比亚': [17.228331, 26.3351],
        // '斯里兰卡': [80.77179699999999, 7.873053999999999],
        // '莱索托': [28.233608, -29.609988],
        // '立陶宛': [23.881275, 55.169438],
        // '卢森堡': [6.129582999999999, 49.815273],
        // '拉脱维亚': [24.603189, 56.879635],
        // '摩洛哥': [-7.092619999999999, 31.791702],
        // '摩尔多瓦': [28.369885, 47.411631],
        // '马达加斯加': [46.869107, -18.766947],
        // '墨西哥': [-102.552784, 23.634501],
        // '马其顿': [21.745275, 41.608635],
        // '马里': [-3.996166, 17.570692],
        // '缅甸': [95.956223, 21.913965],
        // '黑山': [19.37439, 42.708678],
        // '蒙古': [103.846656, 46.862496],
        // '莫桑比克': [35.529562, -18.665695],
        // '毛里塔尼亚': [-10.940835, 21.00789],
        // '马拉维': [34.301525, -13.254308],
        // '马来西亚': [101.975766, 4.210484],
        // '纳米比亚': [18.49041, -22.95764],
        // '新喀里多尼亚': [165.618042, -20.904305],
        // '尼日尔': [8.081666, 17.607789],
        // '尼日利亚': [8.675277, 9.081999],
        // '尼加拉瓜': [-85.207229, 12.865416],
        // '荷兰': [5.291265999999999, 52.132633],
        // '挪威': [8.468945999999999, 60.47202399999999],
        // '尼泊尔': [84.12400799999999, 28.394857],
        // '新西兰': [174.885971, -40.900557],
        // '阿曼': [55.923255, 21.512583],
        // '巴基斯坦': [69.34511599999999, 30.375321],
        // '巴拿马': [-80.782127, 8.537981],
        // '秘鲁': [-75.015152, -9.189967],
        // '菲律宾': [121.774017, 12.879721],
        // '巴布亚新几内亚': [143.95555, -6.314992999999999],
        // '波兰': [19.145136, 51.919438],
        // '波多黎各': [-66.590149, 18.220833],
        // '北朝鲜': [127.510093, 40.339852],
        // '葡萄牙': [-8.224454, 39.39987199999999],
        // '巴拉圭': [-58.443832, -23.442503],
        // '卡塔尔': [51.183884, 25.354826],
        // '罗马尼亚': [24.96676, 45.943161],
        // '俄罗斯': [105.318756, 61.52401],
        // '卢旺达': [29.873888, -1.940278],
        // '西撒哈拉': [-12.885834, 24.215527],
        // '沙特阿拉伯': [45.079162, 23.885942],
        // '苏丹': [30.217636, 12.862807],
        // '南苏丹': [31.3069788, 6.876991899999999],
        // '塞内加尔': [-14.452362, 14.497401],
        // '所罗门群岛': [160.156194, -9.64571],
        // '塞拉利昂': [-11.779889, 8.460555],
        // '萨尔瓦多': [-88.89653, 13.794185],
        // '索马里兰': [46.8252838, 9.411743399999999],
        // '索马里': [46.199616, 5.152149],
        // '塞尔维亚共和国': [21.005859, 44.016521],
        // '苏里南': [-56.027783, 3.919305],
        // '斯洛伐克': [19.699024, 48.669026],
        // '斯洛文尼亚': [14.995463, 46.151241],
        // '瑞典': [18.643501, 60.12816100000001],
        // '斯威士兰': [31.465866, -26.522503],
        // '叙利亚': [38.996815, 34.80207499999999],
        // '乍得': [18.732207, 15.454166],
        // '多哥': [0.824782, 8.619543],
        // '泰国': [100.992541, 15.870032],
        // '塔吉克斯坦': [71.276093, 38.861034],
        // '土库曼斯坦': [59.556278, 38.969719],
        // '东帝汶': [125.727539, -8.874217],
        // '特里尼达和多巴哥': [-61.222503, 10.691803],
        // '突尼斯': [9.537499, 33.886917],
        // '土耳其': [35.243322, 38.963745],
        // '坦桑尼亚联合共和国': [34.888822, -6.369028],
        // '乌干达': [32.290275, 1.373333],
        // '乌克兰': [31.16558, 48.379433],
        // '乌拉圭': [-55.765835, -32.522779],
        // '美国': [-95.712891, 37.09024],
        // '乌兹别克斯坦': [64.585262, 41.377491],
        // '委内瑞拉': [-66.58973, 6.42375],
        // '越南': [108.277199, 14.058324],
        // '瓦努阿图': [166.959158, -15.376706],
        // '西岸': [35.3027226, 31.9465703],
        // '也门': [48.516388, 15.552727],
        // '南非': [22.937506, -30.559482],
        // '赞比亚': [27.849332, -13.133897],
        //   '津巴布韦': [29.154857, -19.015438],
        // '科摩罗':[43.872219,-11.875001],
        // '印度尼西亚':[106.515414,-6.103040],
        // '印度': [78.96288, 20.593684],
      };
      account(parmas).then((obj, result) => {
        this.nodeLength = obj.length;
        // 处理地图 
        let latlong = {}
        var nodesTable = [];
        obj.forEach(function (node) {
          let key = node[0] + '_' + node[1]
          let ips = []
          if (latlong[key]) {
            ips = latlong[key][3]
          }
          ips.push([node[2], node[4], node[5]])
          latlong[key] = [node[0], node[1], node[3], ips]
        })
        var countriesList = [];
        Object.keys(latlong).forEach(function (key) {
          let marker = latlong[key];
          let count = marker[3].length;
          var latLng = '';
          var latVal = [];
          Object.keys(geoCoordMap).forEach(function (data) {
            if (data == marker[2].split(' - ')[1]) {
              latVal = JSON.parse(JSON.stringify(geoCoordMap[data]))
            } else if (data == marker[2].split(' - ')[0]) {
              latVal = JSON.parse(JSON.stringify(geoCoordMap[data]))
            }
          })
          var countries = marker[2].indexOf(' - ') != -1 ? marker[2].split(' - ')[0] : marker[2];
          if(countries == 'US') { countries = 'United States'}
          if(countries == 'IE') { countries = 'Ireland'}  // IE ------ Ireland
          if(countries == 'RO') { countries = 'Romania'}  // RO ------ Romania
          if(countries == 'DE') { countries = 'Germany'}  // DE ------ Germany
          if(countries == 'KR') { countries = 'Korea'}    // KR ------ Korea
          // if(countries == 'HK') { countries = 'China'}   // HK ------ China
          if(countries == 'BE') { countries = 'Belgium'}    // BE ------ Belgium
          if(countries == 'BR') { countries = 'Brazil'}     // BR ------ Brazil
          if(countries == 'AU') { countries = 'Australia'}  // AU ------ Australia
          if(countries == 'SG') { countries = 'Singapore'}  // SG ------ Singapore
          if(countries == 'CA') { countries = 'Canada'}     // CA ------ Canada
          if(countries == 'VN') { countries = 'Vietnam'}     // VN ------ Vietnam
          if(countries == 'NL') { countries = 'Netherlands'}     // NL ------ Netherlands
          if(countries == 'IT') { countries = 'Italy'}     // IT ------ Italy
          if(countries == 'JP') { countries = 'Japan'}     // JP ------ Japan
          if(countries == 'SE') { countries = 'Sweden'}     // SE ------ Sweden
          if(countries == 'CH') { countries = 'Switzerland'}     // CH ------ Switzerland
          // GB,
          // TW,
          // 
          if(countriesList.indexOf(countries) == -1){
            countriesList.push({
              countries: countries,
              name: marker[2],
              value: latVal,
            });
          }
          latVal.push(marker[0]);
          nodesTable.push({
            value: latVal,
            marker1: marker[1],
            city: marker[2],
            tip: marker[3],
            count: count
          })
          // nodesTable.addRow([marker[0],marker[1],count,tip])
        })
        this.countriesList = countriesList;
        this.mapEcharts.series[0].data = nodesTable;
        // this.mapEcharts.series[1].data = countriesList;
        this.mapEchartsLoading = false;
        // this.setTooptip();
        this.setLabel();
      })
    },
    // 地图出块 需要的是 国家名
    setLabel(){
      var countriesList = [];
      countriesList.push(this.countriesList[this.nowShowLabelIndex]);
      this.mapEcharts.series[1].data = countriesList;
      setTimeout(()=>{
        if(this.nowShowLabelIndex == this.countriesList.length - 1){
          this.nowShowLabelIndex = 0;
        } else {
          this.nowShowLabelIndex++;
        }
        this.setLabel();
      }, 4000);
    },
    setTooptip(){
      var regions = [];
      var BJData = this.countriesList;
      for (let i = 0; i < BJData.length; i++) {
        // GB,
        // TW,
        // 
        var regionsData = {
          name: BJData[i],
          itemStyle: {
            areaColor: "red",
            borderColor: "red",
            borderWidth: 1,
            emphasis: {
              areaColor: "green",
              borderColor: "green",
              borderWidth: 1,
            },
            selectedMode: {
              areaColor: "rgba(29, 123, 213, 0.3)",
              borderColor: "rgba(29, 123, 213, 0.3)",
              borderWidth: 1,
            },
          },
        };
        this.mapRegionsData = regionsData;
        regions.push(regionsData);
      }
      this.mapEcharts.geo.regions = regions;
    }
  },
};
</script>
<style scoped lang="scss">
</style>
