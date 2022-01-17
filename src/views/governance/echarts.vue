<template>
  <div>
    <vab-chart class="twoColum-echartHeight" style="width: 100%; height: 120px" :autoresize="true" :options="yxqdEcharts" :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')" />
  </div>
</template>
<script>
import * as echarts from "echarts";
import VabChart from "@/plugins/echarts";
export default {
  name: 'givernanceEcharts',
  props: ['echartsValue'],
  components: {
    VabChart
  },
  computed:{
    themeCls(){
      return this.$store.state.themeCls
    }
  },
  data() {
    return {
      yxqdEchartsData: [],
      isData: true,
      yxqdEcharts: {
        tooltip: {
          trigger: "item",
          formatter: (res) => {
            var str = '';
            var name = res.data.name;
            var color = '#FC7E54';
            if (name == 'Yes') { color = '#63CF59'; }
            if (name == 'No') { color = '#FFD058'; }
            str = `<span style="display:inline-block;margin-right:3px;border-radius:50%;width:8px;height:8px;background-color:${color}"></span>`;
            str = str + `<span style="font-size:13px;color:${color}">${name}</span>
              <p class="tooltipHint Text16 flexDiv line2">
              <span style="display:inline-block;" class="whiteColor marRight8">$${res.data.value}</span>${res.data.rate}%</p>`
            return str;
          }
        },
        avoidLabelOverlap: true,
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: 94,  //图例距离左的距离
          y: 'center',  //图例上下居中
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            fontSize: '12'
          },
          // 回调函数 实现标志图形字体后边加上百分比
          formatter: name => {
            let data = this.yxqdEchartsData;
            let total = 0;
            let tarValue;
            for (let i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value;
              }
            }
            let p = total > 0 ? ((tarValue / total) * 100).toFixed(2) : 0;
            return name + " " + p + "%";
          }
        },
        grid: {
          top: "0%",
          right: "0",
          bottom: "0",
          left: "0"
        },
        series: [
          {
            hoverAnimation: false, // 取消掉环形图鼠标移上去时自动放大
            name: "",
            type: "pie",
            startAngle: 180,
            minAngle: 2,
            radius:'44',
            center: [44, "50%"], // 这个属性调整图像的位置
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              show: false,//数据标签引导线
            },
            emphasis: {
              show: false,//数据标签引导线
            },
            itemStyle: {
              borderRadius: 4,
              borderColor: 'transparent',
              // borderWidth: 2,
              normal: {
                color:  (params)=> {
                  if(this.isData){
                    var colorList = ["#63CF59", "#FFD058", "#FC7E54"];
                    if(this.themeCls == 'blackTheme'){
                      colorList = ["#63CF59", "#FFD058", "#FC7E54"];
                    }
                    return colorList[params.dataIndex];
                  } else {
                    var colorList = ["#d5d3d3", "#d5d3d3", "#d5d3d3"];
                    if(this.themeCls == 'blackTheme'){
                      colorList = ["#343434", "#343434", "#343434"];
                    }
                    return colorList[params.dataIndex];
                  }
                },
              },
              emphasis:{
              }
            },
            data: [],
          },
        ],
      },
    }
  },
  mounted() {
    var totalSum = Number(this.echartsValue.yesVal) + Number(this.echartsValue.noVal) + Number(this.echartsValue.abstainVal);
    if(totalSum == 0){
      this.isData = false;
    }
    let yesRate = totalSum > 0 ? ((Number(this.echartsValue.yesVal) / totalSum) * 100).toFixed(2) : 0;
    let noRate = totalSum > 0 ? ((Number(this.echartsValue.noVal) / totalSum) * 100).toFixed(2) : 0;
    let abstainRate = totalSum > 0 ? ((Number(this.echartsValue.abstainVal) / totalSum) * 100).toFixed(2) : 0;
    let yesVal = Number(this.echartsValue.yesVal);
    let noVal = Number(this.echartsValue.noVal);
    // totalSum != 0 && this.echartsValue.abstainVal == 0 ? null : 
    let abstainVal = Number(this.echartsValue.abstainVal);
    var EchartsData = [
      { value: yesVal, name: 'Yes', rate: yesRate },
      { value: noVal, name: 'No', rate: noRate },
      { value: abstainVal, name: 'Obtain', rate: abstainRate },
    ];
    this.yxqdEchartsData = EchartsData;
    this.yxqdEcharts.series[0].data = EchartsData;
  }
}
</script>
<style lang="scss" scoped>
.noData {
  width: 120px;
  height: 120px;
  background: #dddddd;
  border-radius: 50%;
}
</style>