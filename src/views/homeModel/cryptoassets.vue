<template>
  <div>
    <div class="mainContainer cryptoassetsModel">
      <div class="">
        <p class="primaryTitle">CELO & additional cryptoassets</p>
      </div>
      <div class="mainCon-sub">
        <el-row class="cryptoassets-echarts flexDiv">
          <el-col :md="8">
            <vab-chart v-if="echartData" class="twoColum-echartHeight" style="width: 100%; height: 240px" 
            :autoresize="true" :options="yxqdEcharts" :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')"/>
          </el-col>
          <el-col :md="16" class="myTable cryptoassetsTable">
            <el-table class="cryptoassetsList" :data="cryptoassetsList" fit align="center" style="width: 100%;overflow-y:hidden;">
              <el-table-column prop="text" align="left" width="160" label="Assets">
                <template slot-scope="scope">
                  <span class="cryDiss" :class="scope.row.cls"></span><span class="fontweight">{{ scope.row.text }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="num" align="left" width="110" label="Amount">
                <template slot-scope="scope">
                  <span class="greenColor">{{ scope.row.num | thousands }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="text" align="center" width="140" label="Percentage">
                <template slot-scope="scope">
                  <div class="textCenter">
                    <span class="marRight8">{{scope.row.per}}%</span>
                    <el-tooltip class="item marRight8" placement="bottom">
                      <div slot="content" class="Text14" v-html="scope.row.tooltip"></div>
                      <span class="iconfont icon-zhushi h3Color cursorPointer">
                      </span>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="perother" align="center" width="120" label="% Of Reserve">
                <template slot-scope="scope">
                  <span class="marRight8">{{scope.row.perother}}%</span>
                </template>
              </el-table-column>
              <el-table-column prop="text" align="center" width="170" label="Address">
                <template slot-scope="scope">
                  <!-- blueColor cursorPointer   @click="jumpAddressDetails(scope.row.allAddress)" -->
                  <span v-if="scope.row.address" class="Text16 marRight4  ">
                    {{ scope.row.address}}
                  </span>
                  <span v-if="!scope.row.address" class="Text16 marRight4">——</span>
                  <el-tooltip class="item marRight4" content="Go Explorer" placement="bottom" v-if="scope.row.address">
                    <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(scope.row.allAddress)">
                    </span>
                  </el-tooltip>
                  <el-tooltip class="item" placement="bottom" v-if="scope.row.address">
                    <div slot="content" class="Text14">
                      Copy Address: {{scope.row.allAddress}}
                    </div>
                    <span class="iconfont icon-fuzhi h3Color cursorPointer" 
                      v-clipboard:copy="scope.row.allAddress" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                    </span>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- unfrozen_celo -->
        <el-row type="flex" class="cryptoassets justifyBetwwen flexWrap marTop50" v-match-heights="{ el: ['.contour01', '.cryptoassetsdiv'] }">
          <el-col :md="8" :sm="24" class="contour01 marBtm12">
            <div style="width: 96%" class="cryptoassetsdiv">
              <p class="marBtm18">Community Fund</p>
              <div class="cryptoassetsValue flexDiv">
                <p class="h2Color Text16 cy-Name">CELO</p>
                <p class="greenColor cy-Value">{{CommunityData.celo | formatNum | thousands}}</p>
              </div>
              <div class="cryptoassetsValue flexDiv">
                <p class="h2Color Text16 cy-Name">cUSD</p>
                <p class="greenColor cy-Value">{{CommunityData.cusd | formatNum | thousands}}</p>
              </div>
              <div class="cryptoassetsValue blueColor Text16 flexDiv justifyEnd">
                <span class="cursorPointer" @click="jumpAddressDetails(CommunityName)">{{CommunityData.name}}</span>
                <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom">
                  <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(CommunityName)">
                  </span>
                </el-tooltip>
                <el-tooltip class="item marLeft4" placement="bottom">
                  <div slot="content" class="Text14">
                    Copy Address: {{CommunityName}}
                  </div>
                  <span class="iconfont icon-fuzhi h3Color cursorPointer" 
                    v-clipboard:copy="CommunityName" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                  </span>
                </el-tooltip>
              </div>
            </div>
          </el-col>
          <el-col :md="8" :sm="24" class="contour01 marBtm12">
            <div style="width: 96%" class="cryptoassetsdiv">
              <p class="marBtm18">Reserve Infomation FAQs</p>
              <div class="cryptoassetsValue flexDiv">
                <p class="h2Color Text16 cy-Name">In Custody CELO</p>
                <p class="greenColor cy-Value">{{custody_celo | thousands}}</p>
              </div>
              <div class="cryptoassetsValue blueColor Text16 flexDiv justifyEnd">
                <span class="cursorPointer" @click="jumpAddressDetails(custodyAllceloName)">{{ custody_celoName }}</span>
                <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom" transition="el-fade-in">
                  <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(custodyAllceloName)">
                  </span>
                </el-tooltip>
                <el-tooltip class="item marLeft4" placement="bottom">
                  <div slot="content" class="Text14">
                    Copy Address: {{custodyAllceloName}}
                  </div>
                  <span class="iconfont icon-fuzhi h3Color cursorPointer" 
                    v-clipboard:copy="custodyAllceloName" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                  </span>
                </el-tooltip>
              </div>
            </div>
          </el-col>
          <el-col :md="8" :sm="24" class="contour01 marBtm12">
            <div style="width: 96%" class="cryptoassetsdiv">
              <p class="marBtm18">Current Reserve Holdings</p>
              <div class="cryptoassetsValue flexDiv">
                <p class="h2Color Text16 cy-Name">Frozen CELO</p>
                <p class="greenColor cy-Value">{{frozen_celo | thousands}}</p>
              </div>
              <div class="cryptoassetsValue flexDiv">
                <p class="h2Color Text16 cy-Name">Unfrozen CELO</p>
                <p class="greenColor cy-Value">{{unfrozen_celo | thousands}}</p>
              </div>
              <div class="cryptoassetsValue blueColor Text16 flexDiv justifyEnd">
                <span class="cursorPointer" @click="jumpAddressDetails(allFrozenName)">{{frozenName}}</span>
                <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom">
                  <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(allFrozenName)">
                  </span>
                </el-tooltip>
                <el-tooltip class="item marLeft4" placement="bottom">
                  <div slot="content" class="Text14">
                    Copy Address: {{allFrozenName}}
                  </div>
                  <span class="iconfont icon-fuzhi h3Color cursorPointer" 
                    v-clipboard:copy="allFrozenName" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                  </span>
                </el-tooltip>
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
// import VabChart from "vue-echarts";
import VabChart from "@/plugins/echarts";
import { account } from "@/assets/api/requset.js";

export default {
  name: "Home",
  data() {
    return {
      CommunityName: '',
      copyIng: false,
      echartData: false,
      CommunityData: {},
      custody_celo: 0,
      custody_celoName: '',
      custodyAllceloName: '',
      frozen_celo: 0,
      frozenName: '',
      allFrozenName: '',
      unfrozen_celo: 0,
      cryptoassetsList: [
        {
          text: "Unfrozen CELO",
          num: 0,
          per: "",
          perother: "",
          address: "",
          tooltip: ""
        },
        {
          text: "BTC",
          num: 0,
          per: "",
          perother: "",
          address: "",
          tooltip: ""
        },
        {
          text: "ETH",
          num: 0,
          per: "",
          perother: "",
          address: "",
          tooltip: ""
        },
        {
          text: "DAI",
          num: 0,
          per: "",
          perother: "",
          address: "",
          tooltip: ""
        },
      ],
      yxqdEcharts: {
        tooltip: {
          trigger: "item",
          formatter:(res)=>{
            // "data":{"value":"58528124","name":"BTC","rate":"14.46"},
            var str = '';
            var name = res.data.name;
            var color = '#EBEBEB';
            if(name == 'CELO'){color = '#FF8B65';}
            if(name == 'BTC'){color = '#FFCE53';}
            if(name == 'ETH'){color = '#63CF59';}
            // tooltipHint
            str = `<span style="display:inline-block;margin-right:3px;border-radius:50%;width:8px;height:8px;background-color:${color}"></span>`;
            str =  str + `<span style="font-size:13px;">${name}</span>
              <p class="tooltipHint Text16 flexDiv line2">
              <span style="width: 100px;display:inline-block;" class="whiteColor">$${res.data.value}</span>${res.data.rate}%</p>`
            return str;
          }
        },
        avoidLabelOverlap: true,
        series: [
          {
            name: "",
            type: "pie",
            startAngle: 180,
            minAngle: 2,
            radius: ["0%", "80%"],
            center: ["48%", "48%"], //这个属性调整图像的位置
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                // formatter: '{a}',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
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
            emphasis: {
            },
            itemStyle: {
              borderRadius: 4,
              borderColor: 'transparent',
              // borderWidth: 2,
              color: function (params) {
                var colorList = ["#63CF59","#FFD058", "#FC7E54", '#D6D6D6'];
                return colorList[params.dataIndex];
              },
            },
            data: this.yxqdEchartsData,
          },
        ],
      },
    };
  },
  components: {
    VabChart,
  },
  computed: {
  },
  mounted() {
    this.getAccount();
    this.getReserveInformation();
  },
  methods: {
    jumpAddressDetails(url) {
      this.$store.commit('updateheadTabClsId', '0');
      this.$router.push({
        path: `/acountdetail/${url}`
      })
    },
    jumpgroupDetails(url) {
      this.$store.commit('updateheadTabClsId', '0');
      this.$router.push({
        path: `/groupDetail/${url}`
      })
    },
    getAccount() {
      var parmas = {
        method: 'account',
        address: '0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972'
      };
      let address = '0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972';
      account(parmas).then((response) => {
        this.CommunityData = response;
        this.CommunityName = address;
        this.CommunityData.name = this.$format.formatAddress([address,'Governance Proxy'],true,false,true,false,true);
      });
    },
    getReserveInformation(){
      var parmas = {
        method: 'get_reserve_info',
      };
      account(parmas).then((obj) => {
          var celo_usdt = obj.unfrozenReserveGoldBalance * obj['celo2'][3];
          var btc_usdt = obj['btc'][1]*obj['btc'][2];
          var eth_usdt = obj['eth'][1]*obj['eth'][2];
          var dai_usdt = obj['dai'][1]*obj['dai'][2];
          var total_usdt = celo_usdt+btc_usdt+eth_usdt+dai_usdt;
          // Reserve Infomation FAQs
          this.custody_celo = obj['celo2'][1].toFixed(0);
          this.custodyAllceloName = obj['celo2'][0];
          this.custody_celoName = this.$format.formatAddress(obj['celo2'][0],true,false,true,false,true);
          // Current Reserve Holdings
          this.frozen_celo = obj.frozenReserveGoldBalance.toFixed(0);
          this.unfrozen_celo = obj.unfrozenReserveGoldBalance.toFixed(0);
          this.frozenName = this.$format.formatAddress(obj['celo1'][0],true,false,true,false,true);
          this.allFrozenName = obj['celo1'][0];

          // CELO & additional cryptoassets >>> Unfrozen CELO
          var celo_rate = ((celo_usdt/total_usdt)*100).toFixed(2);
          this.cryptoassetsList[0].num = obj.unfrozenReserveGoldBalance.toFixed(0);
          this.cryptoassetsList[0].per = celo_rate;
          this.cryptoassetsList[0].perother = '50';
          this.cryptoassetsList[0].tooltip = '1CELO = '+obj['celo2'][3]+'USDT';
          
          // CELO & additional cryptoassets >>> BTC
          this.cryptoassetsList[1].num = obj['btc'][1].toFixed(0);
          var btc_rate = ((btc_usdt/total_usdt)*100).toFixed(2);
          this.cryptoassetsList[1].per = btc_rate;
          this.cryptoassetsList[1].perother = '30';
          this.cryptoassetsList[1].address = this.$format.formatAddress(obj['btc'][0],true,false,true,false,true);
          this.cryptoassetsList[1].allAddress = obj['btc'][0];
          this.cryptoassetsList[1].tooltip = '1BTC = '+parseFloat(obj['btc'][2]).toFixed(3)+'USDT';

          // CELO & additional cryptoassets >>> ETH
          this.cryptoassetsList[2].num = obj['eth'][1].toFixed(0);
          var eth_rate = ((eth_usdt/total_usdt)*100).toFixed(2);
          this.cryptoassetsList[2].per = eth_rate;
          this.cryptoassetsList[2].perother = '15';
          this.cryptoassetsList[2].address = this.$format.formatAddress(obj['eth'][0],true,false,true,false,true);
          this.cryptoassetsList[2].allAddress = obj['eth'][0];
          this.cryptoassetsList[2].tooltip = '1ETH = '+obj['eth'][2]+'USDT';

          // CELO & additional cryptoassets >>> DAI
          this.cryptoassetsList[3].num = obj['dai'][1].toFixed(0);
          var dai_rate = ((dai_usdt/total_usdt)*100).toFixed(2);
          this.cryptoassetsList[3].per = dai_rate;
          this.cryptoassetsList[3].perother = '5';
          this.cryptoassetsList[3].address = this.$format.formatAddress(obj['dai'][0],true,false,true,false,true);
          this.cryptoassetsList[3].allAddress = obj['dai'][0];
          this.cryptoassetsList[3].tooltip = '1DAI = '+obj['dai'][2]+'USDT';

          // 饼状图设置
          this.echartData = true;
          var EchartsData = [
            { value: celo_usdt.toFixed(0), name: 'Unfrozen CELO', rate: celo_rate },
            { value: btc_usdt.toFixed(0), name: 'BTC', rate: btc_rate },
            { value: eth_usdt.toFixed(0), name: 'ETH', rate: eth_rate },
            { value: dai_usdt.toFixed(0), name: 'DAI', rate: dai_rate },
          ];
          EchartsData = EchartsData.sort(function(x,y){ return y.value-x.value;});
          for(var i in EchartsData){
            if(EchartsData[i].value == celo_usdt.toFixed(0)){
              this.cryptoassetsList[0].cls = `circleBg${i}`
            }
            if(EchartsData[i].value == btc_usdt.toFixed(0)){
              this.cryptoassetsList[1].cls = `circleBg${i}`
            }
            if(EchartsData[i].value == eth_usdt.toFixed(0)){
              this.cryptoassetsList[2].cls = `circleBg${i}`
            }
            if(EchartsData[i].value == dai_usdt.toFixed(0)){
              this.cryptoassetsList[3].cls = `circleBg${i}`
            }
          }
          this.yxqdEcharts.series[0].data = EchartsData;
      });
    },
    jumpAddress(address){
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
      setTimeout(()=>{
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
.myTable.cryptoassetsTable {
  margin-top: 0;
  .el-table {
    background: transparent;
    th, tr {
      background: transparent !important;
    }
  }
  .el-table th {
    padding: 0 0 12px 0;
  }
  .el-table__body tr:hover>td {
    background-color: transparent;
  }
}
.cryptoassetsModel .cryptoassetsList .cryDiss.circleBg0 {
  background: #63CF59;
}
.cryptoassetsModel .cryptoassetsList .cryDiss.circleBg1 {
  background: #FFD058;
}
.cryptoassetsModel .cryptoassetsList .cryDiss.circleBg2 {
  background: #FC7E54;
}
.cryptoassetsModel .cryptoassetsList .cryDiss.circleBg3 {
  background: #D6D6D6;
}
</style>
