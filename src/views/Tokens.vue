<template>
  <div class="" :class="$store.state.themeCls">
    <div class="mainContainer">
      <div class="">
        <p class="primaryTitle">Tokens</p>
      </div>
      <div class="mainCon-sub">
        <el-row class="marTop24">
          <el-col :md="12" :sm="24" :xs="24">
            <p class="h3Color Text14"> — * Only list tokens with Holders > 0</p>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <p class="h3Color Text14 textRight">* The data on prices and price changes comes from Mento and Ubeswap.</p>
          </el-col>
        </el-row>
        <div class="flexDiv marTop24">
          <div class="flexDiv marTop12 tabGroup">
            <el-tabs v-model="TypeTabs" class="epochDetailChange " @tab-click="changeTypeTabs">
              <el-tab-pane label="tokens" name="0">
                <p slot="label" class="tabWid" style="width:96px;">Tokens</p>
              </el-tab-pane>
              <el-tab-pane label="Pools" name="1">
                <p slot="label" class="tabWid" style="width:96px;">UBE Pools</p>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div id="searchTop" style="width:100%;height: 2px;"></div>
        <div class="myTable myTable02" style="margin-top:0px;">
          <el-table class=" downLoadTable" :data="showTableData" stripe fit align="center" style="width: 100%;overflow-y:hidden;" 
            :default-sort = "{prop: 'accounts', order: 'descending'}" v-loading = "isloadListData" element-loading-background = "rgba(0, 0, 0, 0)" 
            element-loading-text = "loading..." element-loading-spinner = "el-icon-loading" v-sticky="{ top: 0 }">
            <template slot="empty">
              <div class="flexDiv columnFlex justifyCenter" style="height: 260px;" v-if="!isloadListData">
                <img src="../assets/images/notData2.png" class="normalImg">
                <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
              </div>
            </template>
            <!--   -->
            <el-table-column align="center" width="70" type="index" :index="indexMethod"></el-table-column>
            <!-- {"name":"Mutual Credit Resource System","decimals":"6"，"accounts":4,"tx":8,} -->
            <!-- sortable -->
            <el-table-column prop="address" align="left" min-width="210" label="Token" >
              <template slot-scope="scope">
                <div class="flexDiv">
                  <div v-show="scope.row.img || scope.row.img1 || scope.row.img2" class="bigImg">
                    <img v-show="scope.row.img" class="radius50per bigImg" :src="scope.row.img">
                    <img v-show="scope.row.img1" class="radius50per" :class="scope.row.img2 ? 'smallImgd' : 'bigImg'" :src="scope.row.img1">
                    <img v-show="scope.row.img2" class="radius50per"  :class="scope.row.img2 ? 'smallImgd' : 'bigImg'" :src="scope.row.img2">
                  </div>
                  <div v-show="!scope.row.img && !scope.row.img1 && !scope.row.img2" class="radius50per bigImg">
                    <img src="../assets/images/normalImg.png">
                  </div>
                  
                  <div style="width:calc(100% - 42px)">
                    <!-- greenColor -->
                    <p class="Text16  oneLine">{{scope.row.name}}</p>
                    <div class="flexDiv justifyStart">
                      <p class="h5Color Text16 oneLine cursorPointer blueColor" @click="jumpAddressDetails(scope.row.address)" 
                        style="max-width: 80%">{{scope.row.address | normalAddress}}</p>
                      <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom">
                        <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(scope.row.address)">
                        </span>
                      </el-tooltip>
                      <el-tooltip class="item marLeft4" placement="bottom">
                        <div slot="content" class="Text14">
                          Copy Address: {{scope.row.address}}
                        </div>
                        <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="scope.row.address" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                        </span>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="showSymbol" align="center" width="130" label="Symbol">
              <template slot-scope="scope">
                <!-- greenColor -->
                <p class="Text16 ">{{scope.row.showSymbol}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="totalSupply" align="center" min-width="160" label="Total Supply">
              <template slot-scope="scope">
                <p class="Text16">{{scope.row.totalSupply | numFilterThreeCut}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="price" align="center" width="110" label="Price">
              <template slot-scope="scope">
                <!-- token.price > token.price_24 -->
                <!--  :class="scope.row.price < scope.row.price_24 ? 'redColor' : 'blueColor'" -->
                <p class="Text16" v-if="scope.row.price">${{scope.row.price | formatNum4}}</p>
                <p class="Text16" v-if="!scope.row.price">—</p>
              </template>
            </el-table-column>
            <el-table-column prop="pricePer" align="center" width="170" label="Price Change（24h）">
              <template slot-scope="scope">
                <p class="Text16 greenColor" :class="scope.row.price < scope.row.price_24 ? 'redColor' : 'greenColor'" 
                  v-if="scope.row.pricePer">
                  {{Number(scope.row.pricePer) > 0 ? '+' : ''}}
                  {{scope.row.pricePer}}%
                </p>
                <p class="Text16" v-if="!scope.row.pricePer">—</p>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="accounts" align="center" width="110" sortable label="Holders"> -->
            <el-table-column prop="accounts" align="center" width="110" label="Holders">
              <template slot="header" slot-scope="scope">
                Holders<i class="el-icon-caret-bottom h1Color Text20" style="margin-top:-8px;"></i>
              </template>
              <template slot-scope="scope">
                <p class="Text16">{{scope.row.accounts | numFilterThreeCut}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="tx" align="center" width="110" label="Transfers">
              <template slot-scope="scope">
                <p class="Text16">{{scope.row.tx | numFilterThreeCut}}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- TypeTabs == '0'    tokens -->
        <div class="myTable-pagination" v-if="TypeTabs == '0'">
          <el-pagination background v-show="showTableData.length > 0" @current-change="handleCurrentChange" 
            :current-page="tokensPaginateData.pageNo" :page-size="tokensPaginateData.pageSize"
            layout="total, prev, pager, next,jumper" :total="tokensPaginateData.total">
          </el-pagination>
        </div>
        <div class="myTable-pagination" v-if="TypeTabs == '1'">
          <el-pagination background v-show="showTableData.length > 0" @current-change="ubePoolsPaginatePagChange" 
            :current-page="ubePoolsPaginateData.pageNo" :page-size="ubePoolsPaginateData.pageSize"
            layout="total, prev, pager, next,jumper" :total="ubePoolsPaginateData.total">
          </el-pagination>
        </div>
      </div>
      <div id="searchBar" style="width:100%;height:2px;"></div>
    </div>
  </div>
</template>

<script>
import { account } from "@/assets/api/requset.js";
export default {
  name: "tokens",
  components: {},
  data() {
    return {
      TypeTabs: '0',
      isloadListData: false,
      tokensPaginateData: {
        pageSize: 40,
        pageNo: 1,
        total: 0
      },
      AllTradingRecords: [],
      AllUBEPoolsList: [],
      showTableData: [],
      ubePoolsPaginateData: {
        pageSize: 40,
        pageNo: 1,
        total: 0
      },
      token_pngs: [
        '0xba58308d1784e06615eddeb7c7a2340d64acaaf3',
        '0xd90bbdf5904cb7d275c41f897495109b9a5ada58',
        '0x00400fcbf0816bebb94654259de7273f4a05c762',
        '0x1a8dbe5958c597a744ba51763abebd3355996c3e',
        '0x452ef5a4bd00796e62e5e5758548e0da6e8ccdf3',
        '0x00be915b9dcf56a3cbe739d9b9c202ca692409ec',
        '0x32a9fe697a32135bfd313a6ac28792dae4d9979d',
        '0x64defa3544c695db8c535d289d843a189aa26b98',
        '0x471ece3750da237f93b8e339c536989b8978a438',
        '0x765de816845861e75a25fca122bb6898b8b1282a',
        '0x2879bfd5e7c4ef331384e908aaa3bd3014b703fa',
        '0x7037f7296b2fc7908de7b57a89efaa8319f0c500',
        '0xa8d0e6799ff3fd19c6459bf02689ae09c4d78ba7',
        '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73',
        '0x832f03bcee999a577cb592948983e35c048b5aa4',
        '0xd629eb00deced2a080b7ec630ef6ac117e614f1b',
        '0x22401536505dd5d85f7d57f8b37172feda8f499d']
      };
  },
  computed: {
  },
  mounted() {
    // 表格数据
    this.getListData();
  },
  methods: {
    indexMethod(index) {
      if(this.TypeTabs == '0'){
        var addPage = this.tokensPaginateData.pageSize * (this.tokensPaginateData.pageNo - 1);
      } else {
        var addPage = this.ubePoolsPaginateData.pageSize * (this.ubePoolsPaginateData.pageNo - 1);
      }
      return index + addPage + 1;
    },
    jumpAddressDetails(url) {
      if(this.showAddress == url) {return;}
      this.$store.commit('updateheadTabClsId', '3');
      this.$router.push({
        path: `/acountdetail/${url}`
      })
    },
    // 表格
    getListData() {
      if (this.isloadListData) { return; }
      this.isloadListData = true;
      var parmas = {
        method: 'redis_key_value',
        key: 'contract_addresses_erc20_1',
        page: 0,
        sort_flg: 0  //0:celo 1:cusd 2:ceur
      };
      // https://thecelo.com/api/?method=redis_key_value&key=contract_addresses_erc20_1&page=0&sort_flg=0
      // https://thecelo.com/api/?method=redis_key_value&key=contract_addresses_erc20_1&page=0&sort_flg=0
      var that = this;
      account(parmas).then((response) => {
        this.isloadListData = false;
        var records = response;
        var tokensRecordsList = [];
        var UBEPoolsList = [];
        for (var address in records) {
          var obj = records[address];
          // 图片
          obj.img = that.token_pngs.includes(address) ? `https://thecelo.com/logos/${address}_token.png` : '';
          obj.img1 = (!that.token_pngs.includes(address) && that.token_pngs.includes(obj.tokenA) ) 
            ? `https://thecelo.com/logos/${obj.tokenA}_token.png` : '';
          obj.img2 = (!that.token_pngs.includes(address) && that.token_pngs.includes(obj.tokenB) )? `https://thecelo.com/logos/${obj.tokenB}_token.png` : '';
          // 
          // 地址
          obj.address = address;
          // 
          if(obj.price_24){
            let change24 = (obj.price - obj.price_24)/obj.price_24;
            let changePer =  (change24*100).toFixed(2);
            obj.pricePer = changePer;
          } else {
            obj.pricePer = '';
          }
          // 处理 showSymbol
          // (obj.ubelp_symbol) ? obj.ubelp_symbol.replace('cGLD','CELO') : obj.symbol.replace('cGLD','CELO')
          obj.showSymbol = (obj.ubelp_symbol) ? obj.ubelp_symbol.replace('cGLD','CELO') : ( obj.symbol ?  obj.symbol.replace('cGLD','CELO') : '');
          // 处理 totalSupply
          obj.totalSupply = obj.decimals ? Number(obj.totalSupply/Math.pow(10,obj.decimals)).toFixed(0) : '';
          if(obj.img1 && obj.img2){
            UBEPoolsList.push(obj);
          } else {
            tokensRecordsList.push(obj);
          }
        }
        // console.log(JSON.stringify(tokensRecordsList)+"====tokensRecordsList")
        tokensRecordsList = tokensRecordsList.sort(function(x,y){ return y.accounts-x.accounts;});
        this.AllTradingRecords = tokensRecordsList;
        this.tokensPaginateData.total = tokensRecordsList.length;
        // 
        UBEPoolsList = UBEPoolsList.sort(function(x,y){ return y.epoch-x.epoch;});
        this.AllUBEPoolsList = UBEPoolsList;
        this.ubePoolsPaginateData.total = UBEPoolsList.length;
        this.pageDataFn();
      });
    },
    //分页数据处理函数
    pageDataFn(){
      // 0：tokns   1：ubePools 
      //pageSize 每页条数
      var pageSize = (this.TypeTabs == '0') ? this.tokensPaginateData.pageSize : this.ubePoolsPaginateData.pageSize;
      var pageNo = (this.TypeTabs == '0') ? this.tokensPaginateData.pageNo : this.ubePoolsPaginateData.pageNo;
      var pagedata = [];
      //设置开始
      let start = (pageSize * pageNo) - pageSize;
      // 设置结束长度
      let end = pageSize * pageNo;　　
      if(this.TypeTabs == '0'){
        end = end > this.AllTradingRecords.length ? this.AllTradingRecords.length : end;
        for(let i = start; i < end; i++){
          pagedata.push(this.AllTradingRecords[i]) 
        }
      } else {
        end = end > this.AllUBEPoolsList.length ? this.AllUBEPoolsList.length : end;
        for(let i = start; i < end; i++){
          pagedata.push(this.AllUBEPoolsList[i]) 
        }
      }
      this.showTableData = pagedata;
    },
    changeTypeTabs() {
      this.pageDataFn();
    },
    //分页 
    handleCurrentChange: function (pageNo) {
      this.tokensPaginateData.pageNo = pageNo;
      this.pageDataFn();
    },
    // ubePoolsPaginatePagChange   
    ubePoolsPaginatePagChange: function (pageNo) {
      this.ubePoolsPaginateData.pageNo = pageNo;
      this.pageDataFn();
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
.bigImg {
  width: 32px;
  height: 32px;
}
.smallImgd{
  width: 16px;
  height: 16px;
}
</style>
