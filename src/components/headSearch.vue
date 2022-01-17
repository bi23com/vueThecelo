<template>
  <div class="" :class="$store.state.themeCls">
    <div class="logo-search flexDiv ">
      <div class="logoImg">
        <img src="../assets/images/logo.png" class="marTop12" />
      </div>
      <div class="flexDiv justifyEnd ydHeadCon">
        <!-- 输入框 -->
        <div class="showxshiddenMenu home-head-search marTop12">
          <div class="flexDiv justifyStart" style="width: 100%;">
            <p style="width: auto;max-width: 26px;margin-right: 4px;"><i class="iconfont icon-juxing" style="color: #808080;"></i></p>
            <el-input placeholder="Type address 0x…" v-model="Search" size="small" clearable 
              @keyup.enter.native="jumpAddressDetails"></el-input>
            <!-- <p class="cursorPointer" @click="jumpAddressDetails">Search</p> -->
          </div>
        </div>
        <!-- 选择 -->
        <el-select class="selectClass marLeft12 marTop12 showxshiddenMenu" v-model="value" placeholder="please select" size="small" 
          style="width:130px;"
          :popper-class="$store.state.themeCls == 'whiteTheme' ? 'whiteMore headSearchDown' : 'blackMore headSearchDown'">
          <el-option v-for="item in logoList" :key="item.name" :label="item.name" :value="item.name">
            <img v-if="item.img" :src="item.img" />
            <span>{{ item.name }}</span>
          </el-option>
        </el-select>
        <!-- 链接 -->
        <div class="showxshiddenMenu">
          <div class="flexDiv connectAddress cursorPointer marTop12 marLeft12">
            <div class="addressSum Text14 textCenter whiteColor" v-if="web3Num.cELO && showAddressDetail" @click="OpenInfoModel()">
              {{web3Num.cELO | formatNum4}}CELO
            </div>
            <div class="addressDetail connectAddressDetail textCenter whiteColor flexDiv justifyCenter cursorPointer connectEdBg" @click="OpenInfoModel()" v-if="showAddressDetail">
              <p class="Text16">{{showAddressDetail}}</p>
              <!-- 0x34….8392 -->
              <p class="smallCid marLeft4"></p>
            </div>
            <div class="addressDetail Text14 cursorPointer textCenter whiteColor" v-if="!showAddressDetail">
              <!-- Connect -->
              <connectDiv></connectDiv>
            </div>
          </div>
        </div>
        <!-- 切换模式 -->
        <div class="changeModel flexDiv marTop12 cursorPointer marLeft12">
          <p class="cursorPointer" :class="$store.state.themeCls== 'whiteTheme' ? 'activeNow': ''" @click="changeTheme('whiteTheme')">
            <i class="iconfont icon-dayIcon"></i>
          </p>
          <p :class="$store.state.themeCls== 'blackTheme' ? 'activeNow': ''" @click="changeTheme('blackTheme')">
            <i class="iconfont icon-nightIcon"></i>
          </p>
        </div>
        <!-- 移动端菜单栏 -->
        <i class="noxshiddenMenu iconfont icon-menu Text28 marTop12 marLeft12" @click="changeistabClsModelBg()"></i>
      </div>
      <!-- 移动端下再显示 搜索 -->
      <div class="noxshiddenMenu">
        <div class="flexDiv">
          <div class="home-head-search marTop12" style="width:55%;max-width:55%;">
            <div class="flexDiv justifyStart">
              <p style="width: auto;max-width: 26px;margin-right: 4px;"><i class="iconfont icon-juxing" style="color: #808080;"></i></p>
              <el-input placeholder="Type address 0x… " v-model="Search" size="small" clearable 
                @keyup.enter.native="jumpAddressDetails"></el-input>
              <!-- <p class="cursorPointer" @click="jumpAddressDetails">Search</p> -->
            </div>
          </div>
          <!-- 移动端下再显示 选择 -->
          <el-select class="selectClass marLeft12 marTop12" v-model="value" placeholder="please select" size="small" 
            style="width:calc(45% - 16px);"
            :popper-class="$store.state.themeCls == 'whiteTheme' ? 'whiteMore headSearchDown' : 'blackMore headSearchDown'">
            <el-option v-for="item in logoList" :key="item.name" :label="item.name" :value="item.name">
              <img v-if="item.img" :src="item.img" />
              <span>{{ item.name }}</span>
            </el-option>
          </el-select>
        </div>
        <div class="flexDiv connectAddress cursorPointer marTop12 marLeft12" :class=" !showAddressDetail ? 'toConnectOnly' : ''">
          <div class="addressSum Text14 textCenter whiteColor" v-if="web3Num.cELO && showAddressDetail" @click="OpenInfoModel()">
            {{web3Num.cELO | formatNum4 }}CELO
          </div>
          <!--  -->
          <div class="addressDetail connectAddressDetail textCenter whiteColor flexDiv justifyCenter cursorPointer connectEdBg" @click="OpenInfoModel()" v-if="showAddressDetail">
            <p class="Text16">{{showAddressDetail}}</p>
            <!-- 0x34….8392 -->
            <p class="smallCid marLeft4"></p>
          </div>
          <div class="addressDetail Text14 cursorPointer textCenter whiteColor" v-if="!showAddressDetail">
            <!-- Connect -->
            <connectDiv></connectDiv>
          </div>
        </div>
      </div>
    </div>
    <!-- <p @click="test()">test</p> -->
    <div class="tabClsModelBg" v-if="istabClsModelBg" @click="changeistabClsModelBg()"></div>
    <transition name="show">
      <div class="tabCls flexDiv" v-if="istabClsModelBg">
        <div class="tab-itemDiv" v-for="(tcl, index) in showClaList" :key="index" @click="changeTabClsId(index, tcl.url)">
          <p class="tab-item" :class="index == headTabClsId ? 'ativeTab' : ''">
            {{ tcl.text }}<span></span>
          </p>
        </div>
        <el-menu :default-active="moreText" v-if="!showXs" class="headerMore" mode="horizontal">
          <el-submenu :popper-class="$store.state.themeCls == 'whiteTheme' ? 'headerMore whiteMore' : 'headerMore blackMore'" index="2">
            <template slot="title" :class="moreText ? 'moreTextCls' : ''">More
              <!-- <i class="el-icon-caret-bottom marLeft4"></i> -->
            </template>
            <el-menu-item v-for="(ml,mindex) in moreList" :key="mindex" :index="ml.hint" @click="handleRoute(ml)">{{ml.text}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </transition>
    
    <el-dialog class="my-ModelDialog calenderExportModel" :visible.sync="showDownloadModel" 
      :width="$store.state.isMobile?'90%':'42%'" 
      style="background:rgba(0,0,0,0.6);" :before-close="CloseInfoModel" :modal="false">
      <span slot="title" class="Text24 addTitle">
        <p class="weightText Text22 twoLine" style="color:#4a4a4a;">
          <!-- {{connectAddressDetail}} -->
          {{showAddressDetail}}
          <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="connectAddressDetail" 
            v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
          </span>
        </p>
      </span>
      <div class="modelSum">
        <p class="marBtm18 Text22"><span class="smallCir greenBg"></span><span class="modelSum-num">{{web3Num.cELO | formatNum4}}</span>CELO</p>
        <p class="marBtm18 Text22"><span class="smallCir yellowBg"></span><span class="modelSum-num">{{web3Num.cUSD | formatNum4}}</span>cUSD</p>
        <p class="Text22"><span class="smallCir redBg"></span><span class="modelSum-num">{{web3Num.cEUR | formatNum4}}</span>cEUR</p>
      </div>
      <div class="modelBtm" v-if="connectAddressDetail" @click="removeAddress()">
        <connectDiv :showDownloadModel= 'iscloseText'></connectDiv>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import connectDiv from '@/views/celo/contractkit.vue'
export default {
  name: "headSearch",
  data() {
    return {
      iscloseText: 'isdisConnect',
      istabClsModelBg: false,
      showDownloadModel: false,
      showXs: false,
      screenWidth: '',
      activeIndex: 'more2',
      Search: "",
      value: "Celo Mainnet",
      logoList: [{ img: "", name: "Celo Mainnet" }],
      // tabs
      tabClsList: [
        { text: "Dashboard", url: 'dashboard' },
        { text: "Validators", url: 'validators' },
        { text: "Exchange", url: 'exchange' },
        { text: "Tokens", url: 'tokens' },
        { text: "RichList", url: 'richList' },
        { text: "Attestations", url: 'attestations' },
        { text: "Governance", url: 'governance' },
        { text: "APIs", url: 'apis' },
      ],
      showClaList: [],
      moreList: [
        { text: 'Parameters', hint: 'more1', url: 'parameters' },
        { text: 'CELO Token Release Schedule', hint: 'more2', url: 'celotokenreleaseschedule' },
        { text: 'Validator Rewards Calculator', hint: 'more3', url: 'validatorrewardscalculator' },
      ],
      timer: '',
    };
  },
  watch: {
    screenWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        if (val < 768) {
          this.showXs = true;
          this.istabClsModelBg = false;
          this.showClaList = this.tabClsList.concat(this.moreList);
        } else {
          this.showXs = false;
          this.istabClsModelBg = true;
          this.showClaList = this.tabClsList;
        }
        this.timer = true;
        let that = this;
        setTimeout(function () {
          // 打印screenWidth变化的值
          that.timer = false;
        }, 400)
      }
    }
  },
  components: {
    connectDiv
  },
  computed: {
    connectAddressDetail() {
      return this.$store.state.connectAddressDetail;
    },
    showAddressDetail() {
      return this.$store.state.showAddressDetail;
    },
    web3Num() {
      return this.$store.state.web3Num;
    },
    headTabClsId() {
      return this.$store.state.headTabClsId;
    },
    moreText() {
      return this.$store.state.moreText;
    }
  },
  mounted() {
    const that = this
    window.screenWidth = document.body.clientWidth || document.body.offsetWidth;
    that.screenWidth = window.screenWidth;
    if (that.screenWidth < 768) {
      this.showXs = true;
      this.showClaList = this.tabClsList.concat(this.moreList);
      this.istabClsModelBg = false;
    } else {
      this.showXs = false;
      this.istabClsModelBg = true;
      this.showClaList = this.tabClsList;
    }
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth || document.body.offsetWidth;
        that.screenWidth = window.screenWidth;
      })()
    }
  },
  methods: {
    test(){
      // 判断没有装 metaMask 插件
      if (!window.ethereum || !window.ethereum.isMetaMask || typeof window.ethereum.isMetaMask === 'undefined') {
        return window.open('https://metamask.app.link/');
      } 
      // 
      ethereum.request({ method: 'eth_requestAccounts' }).catch(function (reason) {
        alert('哦！NO, 好像发生了点意外。别着急, 我们很快修复它');
      }).then(function (accounts, datd) {
        console.log('account',accounts);
        console.log('datd',datd);
      })
    },
    removeAddress(){
      localStorage.removeItem('setAllAddress');
      localStorage.removeItem('setAddress');
      localStorage.removeItem('walletType');
      localStorage.removeItem('summaryAddress');
      localStorage.removeItem('web3Num');
      this.$store.commit('updateConnetAdd')
      this.showDownloadModel = false;
    },
    OpenInfoModel(){
      this.showDownloadModel = true;
    },
    CloseInfoModel() {
      this.showDownloadModel = false;
    },
    changeTheme(theme){
      if(this.$store.state.themeCls == theme){
        return;
      }
      this.$store.commit('updateThemeCls', theme)
      // this.$router.go(0);

    },
    changeistabClsModelBg() {
      this.istabClsModelBg = !this.istabClsModelBg;
    },
    jumpAddressDetails() {
      // 路由路径可以用 this.$route.path
      // 路由路径参数 this.$route.params
      if (this.$route.params && this.$route.params.id && this.$route.params.id == this.Search) {
        return;
      }
      if (!this.Search.length || (this.Search.length > 0 && this.Search.toLowerCase().indexOf('0x') != 0)) {
        this.$notify({
          message: 'Nothing was found, please use the address to search.',
          type: 'error',
          duration: 2000
        });
        // this.$message({
        //   message: "Nothing was found, please use the address to search.",
        //   type: "error",
        //   duration: 2000
        // });
        return;
      }
      //   
      this.$store.commit('updateheadTabClsId', '4');
      var search = this.Search;
      this.Search = '';
      this.$router.push({
        path: `/acountdetail/${search}`
      })
    },
    changeTabClsId(num, text) {
      if (this.$route.path == '/' + text) {
        return;
      }
      this.$store.commit('updateheadTabClsId', num)
      this.$store.commit('updateMoreText', '');
      if(this.istabClsModelBg && this.screenWidth < 768){
        this.changeistabClsModelBg();
      }
      this.$router.push({
        name: text.toLowerCase()
      })
    },
    handleRoute(obj) {
      if (this.moreText == obj.hint) {
        return;
      }
      this.$store.commit('updateMoreText', obj.hint);
      if (obj.url) {
        if(this.istabClsModelBg && this.screenWidth < 768){
          this.changeistabClsModelBg();
        }
        this.$router.push({
          name: obj.url.toLowerCase()
        })
      }
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
.addTitle {
  display: block;
  width: 100%;
}
.addTitle p {
  width: 90%;
}
.smallCir {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 4px;
  margin-top: -2px;
  display: inline-block;
}
.connectEdBg {
  background: #5CCD53;
  border: 1px solid #5CCD53;
}
.modelSum {
  // background: rgba($color: #ededed, $alpha: 0.53);
  border-radius: 10px;
  width: 100%;
  margin-bottom: 36px;
  padding: 0 18px 30px 18px;
  .modelSum-num {
    width: 120px;
    display: inline-block;
  }
}
.connectAddressDetail {
  min-width: 130px;
  padding: 0 12px;
}
.toConnectOnly{
  width: 110px;
}
.connectAddress {
  // width: 210px;
  height: 32px;
  line-height: 32px;
  background: rgba(216, 216, 216, 0.18);
  border-radius: 20px;
  overflow: hidden;
  .addressSum {
    width: 106px;
  }
  .addressDetail {
    width: 110px;
    height: 32px;
    line-height: 32px;
    // background: #5CCD53;
    border-radius: 20px;
    overflow: hidden;
  }
  .smallCid {
    width: 8px;
    height: 8px;
    background: #FFFFFF;
    border-radius: 10px;
  }
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
@keyframes show {
  0% {
    opacity: 0;
    left: -100%;
  }
  100% {
    opacity: 1;
    left: 0;
  }
}
@keyframes hide {
  0% {
    opacity: 1;
    left: 0;
  }
  100% {
    opacity: 0;
    left: -100%;
  }
}
.show-enter-active {
  animation: show 0.4s;
}
.show-leave-active {
  animation: hide 0.4s;
}
.show-enter,
.show-leave-to {
  opacity: 0;
}
// 顶行，搜索，下拉，切换
.logoImg {
  width: 140px;
}
.logo-search {
  padding: 0px 0 30px 0;
  .selectClass {
    // margin-right: 20px;
    .el-input__inner {
      width: 160px;
      border: none;
      border-radius: 24px;
      color: white;
      background: rgba(216, 216, 216, 0.18);
    }
  }

  .home-head-search {
    width: 240px;
    max-width: calc(100% - 98px);
    height: 32px;
    border: none;
    border-radius: 24px;
    color: #bfbfbf;
    background: rgba(216, 216, 216, 0.18);
    padding: 0 12px;
    .el-input {
      // width: calc(100% - 80px);
      width: calc(100% - 30px);
      .el-input__inner {
        padding: 0 30px 0 0;
        border: none;
        background: transparent;
      }
    }
    p {
      width: 60px;
      font-size: 0.9rem;
      text-align: center;
    }
  }

  .changeModel {
    width: 74px;
    height: 24px;
    border-radius: 16px;
    background: rgba(216, 216, 216, 0.18);
    p {
      height: 24px;
      line-height: 24px;
      text-align: center;
      width: 44%;
      color: #6A6A6A;
      &.activeNow {
        height: 23px;
        width: 56%;
        background: white;
        border-radius: 16px;
        color: #F7B500;
      }
      i{
        font-size: 12px;
      }
    }
  }
}
.searchFat {
  width: calc(100% - 150px);
}
.noxshiddenMenu {
  display: none;
}
.showxshiddenMenu {
  display: block;
}
@media screen and (min-width: 768px) and (max-width: 996px) {
  .searchFat {
    .marLeft12 {
      margin-left: 8px;
    }
  }
  .logo-search .home-head-search {
    width: 200px;
  }
  .connectAddress .actConnect,
  .connectAddress .addressDetail {
    width: 100px;
  }
  .toConnectOnly{
    width: 100px;
  }
}
@media only screen and (max-width: 768px) {
  .searchFat {
    width: 100%;
  }
  .noxshiddenMenu {
    display: block;
  }
  .showxshiddenMenu {
    display: none;
  }
  .logo-search {
    padding: 0 6px 24px 6px;
    justify-content: space-between;
    .home-head-search {
      width: calc(100% - 150px);
      margin-right: 0;
    }
    .logoImg {
      width: 100px;
    }
  }
  .ydHeadCon {
    width: calc(100% - 110px);
  }
}
.tabCls .tab-item:nth-child(8) {
  margin-right: 26px;
}
// 第二行， tabs切换
.tabCls {
  width: 100%;
  // height: 50px;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 26px auto;
  .tab-itemDiv{
    width: auto;
    margin-right: 42px;
    margin-bottom: 14px;
    cursor: pointer;
  }
  .tab-item {
    width: auto;
    text-align: center;
    font-size: 1.1rem;
  }
  .ativeTab {
    color: #5ccd53;
    font-size: 1.3rem;
    line-height: 1.13;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      bottom: -18px;
      left: 50%;
      transform: translate(-50%, 0);
      display: block;
      margin: 0 auto;
      width: 10px;
      height: 20px;
      border-radius: 20px;
      display: block;
      background: url("../assets/images/tabActiveIcon.png") center center
        no-repeat;
      background-size: 10px auto !important;
    }
  }
}
@media only screen and (max-width: 768px) {
  .tabClsModelBg {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    top: 0;
    left: 0;
    background: rgba($color: #000000, $alpha: 0.5);
  }
  .tabCls {
    position: fixed;
    width: 70vw;
    height: 100vh;
    z-index: 2400;
    top: 0;
    left: 0;
    padding: 0 12px;
    margin: 12px auto;
    background: #353535;
    margin: 0;
    flex-direction: column;
    align-items: flex-start;
    align-content: flex-start;
    // box-shadow: 0px 2px 6px 0px rgba(234, 234, 234, 0.5);
    overflow-y: auto;
    flex-wrap: nowrap;
    .tab-itemDiv {
      width: 100%;
      margin: 16px 0;
      background: transparent;
      &.is-active
      &:link,
      &:hover,
      &:active,
      &:visited {
        background: transparent !important;
      }
    }
    .tab-item {
      display: inline-block;
      text-align: left;
      // margin-right: 30px;
    }
  }
  
  .blackTheme .tabCls {
    background: #4a4a4a;
    box-shadow: none;
  }
  .tabCls .tab-item:nth-child(8) {
    margin-right: 0px;
  }
}

</style>
