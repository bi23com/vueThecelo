import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMobile: (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)),
    themeCls: window.localStorage.getItem('themeClsLocal') || "blackTheme",
    // themeCls: "blackTheme",
    headTabClsId: 0,
    moreText: '',
    validatorTypeTabs: '',   // 0: group    1:validators
    menuId: '',
    // 0x34….8392
    showAddressDetail: window.localStorage.getItem('setAddress') || '',
    // connectAddressDetail: window.localStorage.getItem('use-contractkit/last-used-address') || '',
    connectAddressDetail: window.localStorage.getItem('setAllAddress') || '',
    web3Num: JSON.parse(window.localStorage.getItem('web3Num')) || {
      cELO: '',
      cUSD: '',
      cEUR: '',
    }
  },
  getters: {
  },
  mutations: {
    updateConnetAdd(state, getters, data){
      state.connectAddressDetail = localStorage.getItem('use-contractkit/last-used-address') || '';
      // state.connectAddressDetail = localStorage.getItem('setAllAddress') || '';
      state.showAddressDetail = localStorage.getItem('setAddress') || '';
      state.web3Num = JSON.parse(localStorage.getItem('web3Num')) || {cELO: '',
      cUSD: '',
      cEUR: ''};
    },
    updateheadTabClsId(state, data){
      state.headTabClsId = data;
    },
    updateMoreText(state, data){
      state.moreText = data;
    },
    updatevalidatorTypeTabs(state, data){
      state.validatorTypeTabs = data;
    },
    updatemenuId(state, data){
      state.menuId = data;
    },
    updateThemeCls(state, data){
      window.localStorage.setItem('themeClsLocal', data);
      state.themeCls = data;
    },
  },
  actions: {
    /**
     * @description 跳转链接
     * @author ZHANG_YU
     * @date 2021-07-12
     * @param {*} context
     * @param {*} { link, }
     */
    jumpAddress({ dispatch, commit, state }, address) {
      var network = 'rc1';
      var blockscoutlink ='https://explorer.celo.org/';
      if(window.location.host.indexOf('baklava')!=-1){
        network = 'baklava';
        blockscoutlink ='https://baklava-blockscout.celo-testnet.org/';
      }
      //btc
      if(address=='38EPdP4SPshc5CiUCzKcLP9v7Vqo5u1HBL'){
        window.open('https://www.blockchain.com/btc/address/'+address);
      }
      //eth
      else if(address=='0xe1955eA2D14e60414eBF5D649699356D8baE98eE'){
        window.open('https://etherscan.io/address/'+address);
      }
      //dai
      else if(address=='0x16B34Ce9A6a6F7FC2DD25Ba59bf7308E7B38E186'){
        window.open('https://etherscan.io/address/'+address);
      } else{
        if(address.length>43) window.open(blockscoutlink+'tx/'+address);
        else  window.open(blockscoutlink+'address/'+address);
      }
    },
    jumpUrl({ dispatch, commit, state }, Url) {
      if(Url){
        window.open(Url);
      }
    },
  },
  modules: {},
});
