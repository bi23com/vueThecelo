<template>
  <div :class="$store.state.themeCls">
    <NetworkData :networkData="networkData" :changeNetworkData="changeNetworkData" @clearChangeNewData="clearChangeNewData"></NetworkData>
    <!-- Validator Groups 验证器组 -->
    <ValidatorGroups :groups="groups" :validators="validators"></ValidatorGroups>
    <!-- Token Supply  令牌供应 -->
    <TokenSupply :totalSupply="totalSupply"></TokenSupply>
    <!-- CELO & additional cryptoassets  CELO和其他加密资产-->
    <cryptoassets></cryptoassets>

  </div>
</template>

<script>
// https://thecelo.com/api/?method=celo_release_schedule_year&_=1624947389676  Circulating Supply (including reserve) 流程图数据
//  
import * as echarts from "echarts";
// import VabChart from "vue-echarts";
import VabChart from "@/plugins/echarts";
import { account } from "@/assets/api/requset.js";

import NetworkData from "@/views/homeModel/NetworkData";
import ValidatorGroups from "@/views/homeModel/ValidatorGroups";
import TokenSupply from "@/views/homeModel/TokenSupply";
import cryptoassets from "@/views/homeModel/cryptoassets";
// import linksWallets from "@/views/homeModel/linksWallets";

export default {
  name: "Home",
  data() {
    return {
      // networkData 模块中
      changeNetworkData: '',
      networkData: {
        address: '',
        name: '',
        TotalBlocks: 0,
        epocNo: 0,
        EpochSize: '',
        EpocEndTime: '',
        logoImg: ''
      },
      
      // TokenSupply 模块中   
      totalSupply: {
        CELO: 0,
        cUSD: 0,
        cEUR: 0
      },
      // ValidatorGroups 模块中   
      groups: {
        ele: 0,
        reg: 0
      },
      validators: {
        ele: 0,
        reg: 0
      }
    };
  },
  components: {
    VabChart,
    NetworkData,
    ValidatorGroups,
    TokenSupply,
    cryptoassets
  },
  computed: {
  },
  mounted() {
    this.getBlockData();
  },
  methods: {
    clearChangeNewData(){
      this.changeNetworkData = '';
    },
    getBlockData(){
      var parmas = {
        method: 'dashboard'
      };
      account(parmas).then((obj) => { 
        this.changeNetworkData= 'changeNetworkData';
        // NetworkData 模块中
        var block_height = parseInt(obj.dashboard[0], 16);
        this.networkData.TotalBlocks = (block_height > 0) ? block_height : 0;
        this.networkData.address = obj.dashboard[17];
        this.networkData.name = obj.dashboard[18];
        var Epoch_Size = obj.dashboard[3];
        this.networkData.EpochSize = Epoch_Size;
        this.networkData.epocNo = parseInt(this.networkData.TotalBlocks/Epoch_Size)+1;
        this.networkData.logoImg = this.networkData.address ? `https://thecelo.com/logos/${this.networkData.address.toLowerCase()}.jpg` : '';
        var Blocks_until_Epoch = (block_height > 0) ? this.networkData.TotalBlocks % Epoch_Size : obj.dashboard[2];
        var epoc_end_seconds = (Epoch_Size-Blocks_until_Epoch) * 5;
        var hours = parseInt(epoc_end_seconds / 3600);
        var minutes = parseInt((epoc_end_seconds % 3600) / 60);
        var seconds = parseInt(epoc_end_seconds % 60);
        var Epoc_End_Time = `<span class="h1Color weightText Text18">${hours}</span>h
          <span class="h1Color weightText Text18 marLeft2">${minutes}</span>m
          <span class="h1Color weightText Text18 marLeft2">${seconds}</span>s`;
        this.networkData.EpocEndTime = Epoc_End_Time;
        // TokenSupply 模块中   totalSupply
        this.totalSupply.CELO = obj.dashboard[14].toFixed(0);
        this.totalSupply.cUSD = obj.dashboard[15].toFixed(0);
        this.totalSupply.cEUR = obj.dashboard[16].toFixed(0);
        // ValidatorGroups 模块中   groups
        this.groups.ele = obj.dashboard[10];
        this.groups.reg = obj.dashboard[11];
        // ValidatorGroups 模块中   validators
        this.validators.ele = obj.dashboard[12];
        this.validators.reg = obj.dashboard[13];
        setTimeout(() => {
          ///调取接口
          this.getBlockData();
        }, 6000)
      });
    }
  },
};
</script>
<style lang="scss">
@import "../assets/css/pages/home.scss";
</style>
