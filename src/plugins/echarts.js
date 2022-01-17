// import 'echarts-wordcloud'

import VabChart from "vue-echarts";
// 蓝
import blackThemeBlue from "./blackThemeBlue.json";
import whiteThemeBlue from "./whiteThemeBlue.json";
// 绿
import blackThemeGreen from "./blackThemeGreen.json";
import whiteThemeGreen from "./whiteThemeGreen.json";

import  'echarts/theme/dark.js'

VabChart.registerTheme("blackThemeEchartBlue", blackThemeBlue);
VabChart.registerTheme("whiteThemeEchartBlue", whiteThemeBlue);
// 绿色
VabChart.registerTheme("blackThemeEchartGreen", blackThemeGreen);
VabChart.registerTheme("whiteThemeEchartGreen", whiteThemeGreen);
 
// blackThemeEchartGreen   whiteThemeEchartGreen
export default VabChart;
