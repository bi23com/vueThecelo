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
                if (rawValue[2] < 3) { return 4; }
                if (rawValue[2] < 6) { return 6; }
                return rawValue[2]
                // if (rawValue[2] < 20) { return 4; }
                // if (rawValue[2] < 30) { return 6; }
                // if (rawValue[2] < 40) { return 8; }
                // if (rawValue[2] < 50) { return 10; }
                // if (rawValue[2] < 60) { return 12; }
                // if (rawValue[2] < 70) { return 14; }
                // if (rawValue[2] < 80) { return 16; }
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
              <span class="Text16 textColor">${this.epochData[i].tip}</span>`
            for(var j =0; j<res.length; j++){
              str+=`<p class="tooltipHint Text16 marTop8 flexDiv">
                <span style="width: 100px;display:inline-block;" class="textColor">${res[j].seriesName}</span>
                ${this.$format.thousands(res[j].value)}</p>`
              if(res[j].seriesName == 'Votes'){
                str+=`<p class="tooltipHint Text16 line2 flexDiv">
                  <span style="width: 100px;display:inline-block;" class="textColor">VoteRate</span>${this.epochData[i].voteRate}</p>
                  <p class="tooltipHint Text16 line2 flexDiv">
                  <span style="width: 100px;display:inline-block;" class="textColor"></span>${this.epochData[i].voteCha}</p></div>`
              }
              if(res[j].seriesName == 'Locked'){
                str+=`<p class="tooltipHint Text16 line2 flexDiv">
                  <span style="width: 100px;display:inline-block;" class="textColor">lockedRate</span>${this.epochData[i].lockedRate}</p>
                  <p class="tooltipHint Text16 line2 flexDiv">
                  <span style="width: 100px;display:inline-block;" class="textColor"></span>${this.epochData[i].lockedCha}</p></div>`
              }
            }
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
      account(parmas).then((obj, result) => {
        this.nodeLength = obj.length;
        // 处理地图 
        let latlong = {};
        var nodesTable = [];
        obj.forEach(function(node){
          let key = node[0]+'_'+node[1]
          let ips = []
          if(latlong[key]){
            ips = latlong[key][3]
          }
          ips.push([node[2],node[4],node[5]])
          latlong[key] = [node[0],node[1],node[3],ips]
        })
        var countriesList = [];
        var countriesList02 = [];
        Object.keys(latlong).forEach(function (key) {
          let marker = latlong[key];
          let count = marker[3].length;
          var latVal02 = []
          latVal02.push(marker[1],marker[0],count);
          nodesTable.push({
            value: latVal02,
            marker1: marker[1],
            city: marker[2],
            tip: marker[3],
            count: count
          })
          countriesList.push({
            countries: marker[2],
            name: marker[2],
            value: latVal02,
          });
          // nodesTable.addRow([marker[0],marker[1],count,tip])
        })
        this.countriesList = countriesList;
        this.mapEcharts.series[0].data = nodesTable;
        this.mapEchartsLoading = false;
        // this.setTooptip();
        // this.setLabel();
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
