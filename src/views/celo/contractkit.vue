<template>
  <MyReactComponent @onMyEvent="parentClickHandle" @GetWalletData="GetWalletData" :isclose="showDownloadModel" :fromData="fromData"></MyReactComponent>
</template>
<script>
import Modal from 'react-modal';
import React from 'react';

import MyReactComponent from './MyReactComponent.js'
// import { Alfajores, Baklava, Mainnet, useContractKit, } from '@celo-tools/use-contractkit';
export default {
  components: { MyReactComponent },
  props: ["showDownloadModel", "fromData"],
  data() {
    return {
    }
  },
  mounted(){
    if (typeof(window) !== 'undefined') {
      Modal.setAppElement('body')
    }
    this.GetWalletData();
  },
  computed: {
    connectAddressDetail() {
      return this.$store.state.connectAddressDetail;
    },
  },
  methods:{
    parentClickHandle(data, type){
      this.$notify({
        message: `${data}`,
        type: `${type}`
      });
    },
    GetWalletData(data){
      if(data == '有address了'){
        this.$store.commit('updateConnetAdd')
      }
    }
  }
}
</script>
<style lang="scss">
// .use-ck .tw-flex.tw-items-stretch {
//   background: red;;
// }
.use-ck .tw-flex.tw-items-stretch > .tw-flex-row:nth-child(2),
.use-ck .tw-flex.tw-items-stretch > .tw-flex-row:nth-child(3),
.use-ck .tw-flex.tw-items-stretch > .tw-flex-row:nth-child(4),
.use-ck .tw-flex.tw-items-stretch > .tw-flex-row:nth-child(5),
.use-ck .tw-flex.tw-items-stretch > .tw-flex-row:nth-child(7),
.use-ck .tw-flex.tw-items-stretch > .tw-flex-row:nth-child(8),
.use-ck .tw-flex.tw-items-stretch > .tw-flex-row:nth-child(9),
.use-ck .tw-flex.tw-items-stretch > .tw-text-md {
  // display: none !important;
}
.wsvg {
  width: 22px;
  height: 22px;
}
.bluBtmD {
  background: #7c3aed;
  width: 200px;
  height: 36px;
  line-height: 34px;
  text-align: center;
  border-radius: 8px;
  font-size: 16px;
  color: white;
}
.disactConnect, .actConnect {
  width: 100%;
  font-size: 12px;
  height: 32px;
  line-height: 32px;
  border-radius: 20px;
  cursor: pointer;
}
.disactConnect {
  background: #FFEAE4;
  border: 1px solid #FFEAE4;
  color: #FC5454;
  // background: #EDFAF0;
  // border: 1px solid #EDFAF0;
  // color: #37CC6E;
}

.actConnect,
.actConnect:focus {
  background: #EDFAF0;
  color: #37CC6E;
  border: 1px solid #EDFAF0;
  text-align: center;
  outline: 0;
}
.lockBtnSign {
  width: auto;
  color: #37CC6E;
  margin: 0 4px;
}
.blackTheme .governanceConnect {
  .actConnect,.actConnect:focus {
    background: #343434;
    color: #A6A6A6;
    border: 1px solid #343434;
    outline: 0;
    &:hover {
      color: #37CC6E;
    }
  }
  // 已链接
  .disactConnect {
    background: #39493D;
    border: 1px solid #39493D;
    color: #37CC6E;
  }
}

.whiteTheme .governanceConnect {
  .actConnect,
  .actConnect:focus {
    background: #f4f4f4;
    color: #949191;
    border: 1px solid #f4f4f4;
    outline: 0;
    &:hover {
      color: #37CC6E;
    }
  }
  .disactConnect {
    background: #FFEAE4;
    border: 1px solid #FFEAE4;
    color: #FC5454;
    // background: #EDFAF0;
    // border: 1px solid #EDFAF0;
    // color: #37CC6E;
  }
}
.modelBtm {
  .disactConnect, .actConnect { 
    width: 150px;
    height: 42px;
    line-height: 42px;
    margin: 0 auto;
    display: block;
    font-size: 14px;
  }
}
.connectAddress .addressDetail {
  .actConnect, .disactConnect {
    margin: 0;
    color: white;
    width: 110px;
  }
  .actConnect,
  .actConnect:focus { 
    background: #2B4D32 !important;
    border: 1px solid #2B4D32;
    color: #37CC6E;
    outline: 0;
  }
  .disactConnect {
    background: #5CCD53;
    border: 1px solid #5CCD53;
  }
}
.governanceConnect, .governanceConnect > div, .governanceConnect .App {
  width: 100%;
}
// .disactConnect {
//   width: 152px;
//   margin: 12px auto;
//   border-radius: 32px;
//   border: 1px solid #63CF59;
//   color: #63CF59;
//   display: block;
// }
.connectSeletct {
  width: 120px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: white;
  border-radius: 8px;
  padding: 0 16px;
}
.ReactModal__Overlay {
  z-index: 2020;
}
.tw-pb-1,
.tw-text-lg { 
  color: #4a4a4a;
}
.tw-text-gray-600 {
  color: #a6a6a6 !important;
}
.tw-text-blue-800 {
  color: #63CF59 !important;
  &:hover {
    color: #63CF59 !important;
    text-decoration: underline;
  }
}
.tw-bg-gray-100 {
  background: rgba($color: #000000, $alpha: 0.6) !important;
}
.tw-flex-row {
  border-bottom: 1px solid #E8E8E8;
}
</style>