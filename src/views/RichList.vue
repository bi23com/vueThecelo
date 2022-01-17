<template>
  <div :class="$store.state.themeCls">
    <div class="mainContainer">
      <div class="">
        <p class="primaryTitle">RichList</p>
      </div>
      <div class="mainCon-sub">
        <el-row class="marTop42">
          <el-col :md="6" :sm="12" :xs="24" class="marBtm16 borderRight hideBorderRightxs">
            <div style="padding: 0 20px">
              <p class="marBtm16 Text22 fontweight">Supply</p>
              <div class="flexDiv marBtm16">
                <p class="wid30 h5Color Text16">CELO</p>
                <p class="wid70 greenColor Text18 textRight">
                  {{dataBack.cGLD_totalSupply | formatNum | numFilterThreeCut}}
                </p>
              </div>
              <div class="flexDiv marBtm16">
                <p class="wid30 h5Color Text16">cUSD</p>
                <p class="wid70 greenColor Text18 textRight">{{dataBack.cUSD_totalSupply | formatNum | numFilterThreeCut}}</p>
              </div>
            </div>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24" class="marBtm16 borderRight hideBorderRightxs smBorderTop">
            <div style="padding: 0 20px">
              <p class="marBtm16 Text22 fontweight">Network</p>
              <div class="flexDiv marBtm16">
                <p class="wid30 h5Color Text16">Addresses</p>
                <p class="wid70 greenColor Text18 textRight">{{dataBack.total_addresses | formatNum | numFilterThreeCut}}</p>
              </div>
              <div class="flexDiv marBtm16">
                <p class="wid30 h5Color Text16">Transactions</p>
                <p class="wid70 greenColor Text18 textRight">{{dataBack.total_txs | formatNum | numFilterThreeCut}}</p>
              </div>
            </div>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24" class="marBtm16 borderRight hideBorderRightxs smBorderTop">
            <div style="padding: 0 20px">
              <p class="marBtm16 Text22 fontweight">Transfers</p>
              <div class="flexDiv marBtm16">
                <p class="wid30 h5Color Text16">CELO</p>
                <p class="wid70 greenColor Text18 textRight">{{dataBack.cgld_total_transfers | formatNum | numFilterThreeCut}}</p>
              </div>
              <div class="flexDiv marBtm16">
                <p class="wid30 h5Color Text16">cUSD</p>
                <p class="wid70 greenColor Text18 textRight">{{dataBack.cusd_total_transfers | formatNum | numFilterThreeCut}}</p>
              </div>
            </div>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24" class="marBtm16 smBorderTop">
            <div style="padding: 0 20px">
              <p class="marBtm16 Text22 fontweight">Locked CELO</p>
              <p class="greenColor Text18 textRight marBtm16">{{lockedgold.num | formatNum | numFilterThreeCut}}{{LockedCELO_str}}</p>
              <div class="flexDiv justifyEnd">
                <p class="h5Color Text18 textRight">{{lockedgold.address}}</p>
                <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom">
                  <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(lockedgold.alladdress)">
                  </span>
                </el-tooltip>
                <el-tooltip class="item marLeft4" placement="bottom">
                  <div slot="content" class="Text14">
                    Copy Address: {{lockedgold.alladdress}}
                  </div>
                  <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="lockedgold.alladdress" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                  </span>
                </el-tooltip>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="flexDiv marTop24">
          <div class="flexDiv marTop12 tabGroup">
            <el-tabs v-model="TypeTabs" class="epochDetailChange " @tab-click="changeTypeTabs">
              <el-tab-pane label="CELO" name="0">
                <p slot="label" class="tabWid" style="width:90px;">CELO</p>
              </el-tab-pane>
              <el-tab-pane label="cUSD" name="1">
                <p slot="label" class="tabWid" style="width:90px;">cUSD</p>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="myTable myTable02" style="margin-top:0px;">
          <el-table class=" downLoadTable" :data="listData" fit stripe align="center" style="width: 100%;overflow-y:hidden;" 
            v-loading="isloadListData" element-loading-background="rgba(0, 0, 0, 0)" element-loading-text="loading..." 
            element-loading-spinner="el-icon-loading" v-sticky="{ top: 0 }">
            <template slot="empty">
              <div class="flexDiv columnFlex justifyCenter" style="height: 260px;" v-if="!isloadListData">
                <img src="../assets/images/notData2.png" class="normalImg">
                <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
              </div>
            </template>
            <el-table-column type="index" align="center" width="70" :index="indexMethod"></el-table-column>
            <el-table-column prop="address" label="Address" width="210">
              <template slot-scope="scope">
                <div class="flexDiv justifyStart" style="width:100%;">
                  <p class="Text16 cursorPointer blueColor" @click="jumpAddressDetails(scope.row.address)" style="max-width:calc(100% - 50px)">{{scope.row.address | normalAddress}}</p>
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
              </template>
            </el-table-column>
            <el-table-column prop="type" align="center" width="150" label="Type">
              <template slot-scope="scope">
                <!-- greenColor -->
                <span class="">{{scope.row.type}}</span>
              </template>
            </el-table-column>
            <!-- sortable -->
            <el-table-column v-if="TypeTabs == '0'" prop="celonum" align="center" width="170" label="CELO">
              <template slot="header" slot-scope="scope">
                * CELO<span style="color: transparent;">{{TypeTabs}}</span>
                <el-tooltip class="item" effect="dark" content="* CELO = balance + LockedCELO + pendingWithdrawals.">
                  <i class="el-icon-info h7Color"></i>
                </el-tooltip>
                <i class="el-icon-caret-bottom h1Color Text20" style="margin-top:-8px;"></i>
              </template>
              <template slot-scope="scope">
                <span class="greenColor" v-if="scope.row.celonum">{{scope.row.celonum | formatNum | numFilterThreeCut}}</span>
              </template>
            </el-table-column>
            <!-- sortable -->
            <el-table-column v-if="TypeTabs == '1'" prop="cusdnum" align="center" width="160" label="cUSD">
              <template slot-scope="scope">
                <!-- yellowColor -->
                <span class="greenColor" v-if="scope.row.cusdnum">{{scope.row.cusdnum | formatNum | numFilterThreeCut}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="cumulative_share_2" min-width="150" align="center" label="Cumulative Share">
              <template slot-scope="scope">
                <div class="flexDiv justifyCenter">
                  <div class="myProceDiv flexDiv justifyStart marRight8">
                    <p class="preProce" :style="{ 'width': scope.row.perProcessVal+'%' }"></p>
                    <p class="nowProce" :style="{ 'width': scope.row.nowProcessVal+'%' }"></p>
                  </div>
                  <span class="">{{scope.row.cumulative_share_2}}%</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="Percentage" width="130" align="center" label="Percentage">
              <template slot-scope="scope">
                <span class="">{{scope.row.Percentage}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="Txs" align="center" label="Txs ">
              <template slot="header" slot-scope="{}">
                <div class="Text18 textCenter" @click="changeSort('Votes')">
                  Txs
                  <!-- <p class="Text18" style="line-height:1">Share</p> -->
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="myTable-pagination">
          <el-pagination background v-show="listData.length > 0" @current-change="changePaginationPage" 
            :current-page="listPaginationData.pageNo" :page-size="listPaginationData.pageSize"
            layout="total, prev, pager, next,jumper" :total="listPaginationData.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { account } from "@/assets/api/requset.js";
export default {
  name: "RichList",
  data() {
    return {
      SearchText: '',
      isloadListData: false,
      listPaginationData: {
        pageSize: 40,
        pageNo: 1,
        total: 0
      },
      AlllistData: [],
      listData: [],
      dataBack: {
        accounts: {},
        cGLD_totalSupply: 626299968.397755,
        cUSD_totalSupply: 51674855.35375409,
        cgld_total_transfers: 3746397,
        cusd_total_transfers: 567709,
        lockedgold: [],
        total_addresses: 1050135,
        total_txs: 8944674,
      },
      lockedgold: {
        num: 0,
        address: '',
      },
      LockedCELO_str: 0,
      TypeTabs: '0'
    };
  },
  components: {},
  computed: {
  },
  mounted() {
    this.getListData();
  },
  methods: {
    jumpAddressDetails(url) {
      if (this.showAddress == url) { return; }
      this.$store.commit('updateheadTabClsId', '4');
      this.$router.push({
        path: `/acountdetail/${url}`
      })
    },
    searchRecordsList() {
      this.getListData();
    },
    changeTypeTabs() {
      this.getListData();
    },
    // https://thecelo.com/api/?method=accounts&page=0&aa=ddd&sort_flg=0
    getListData() {
      if (this.isloadListData) { return; }
      this.isloadListData = true;
      var parmas = {
        method: 'accounts',
        aa: 'ddd',
        sort_flg: this.TypeTabs,
        page: Number(this.listPaginationData.pageNo - 1)
      };
      account(parmas).then((response) => {
        var that = this;
        this.isloadListData = false;
        this.dataBack = response;
        if (response.lockedgold[1]) {
          var lockedgold = response.lockedgold
          var obg = response.lockedgold[1];
          this.lockedgold = {
            num: obg[2],
            address: this.$format.formatAddress([lockedgold[0], 'LockedGold Proxy'], true, false, true, false, true),
            alladdress: lockedgold[0]
          }
          var num = response.lockedgold[1][2];
          this.LockedCELO_str = ' (' + ((num * 100) / response.cGLD_totalSupply).toFixed(1) + '%)';
        }

        var recordsList = []
        var accounts = response.accounts;

        Object.keys(accounts).forEach(function (key, i, v) {
          var obj = {};
          obj.address = key;
          obj.type = accounts[key][13];
          obj.Txs = accounts[key][0];
          var account = accounts[key];
          var totalCELO = account[2] + account[5] + account[7];
          obj.celonum = totalCELO;
          obj.cusdnum = account[3];
          var cumulative_share_0 = 0;
          var cumulative_share_1 = 0;
          if (that.TypeTabs == 0 || that.TypeTabs == 1) {
            cumulative_share_0 = account[account.length - 4];
            cumulative_share_1 = parseFloat(account[account.length - 3]);
          }
          obj.perProcessVal = parseFloat(cumulative_share_0).toFixed(4);
          obj.nowProcessVal = parseFloat(cumulative_share_1).toFixed(4);
          obj.cumulative_share_2 = (Number(obj.perProcessVal) + Number(obj.nowProcessVal)).toFixed(2);
          obj.Percentage = parseFloat((totalCELO / response.cGLD_totalSupply) * 100).toFixed(4);
          recordsList.push(obj);
        })
        this.listPaginationData.total = recordsList.length;
        this.AlllistData = recordsList;
        this.pageDataFn();
      });
    },
    indexMethod(index) {
      var addPage = this.listPaginationData.pageSize * (this.listPaginationData.pageNo - 1);
      return index + addPage + 1;
    },
    //分页数据处理函数
    pageDataFn(){
      // 0：tokns   1：ubePools 
      //pageSize 每页条数
      var pageSize = this.listPaginationData.pageSize;
      var pageNo = this.listPaginationData.pageNo;
      var pagedata = [];
      //设置开始
      let start = (pageSize * pageNo) - pageSize;
      // 设置结束长度
      let end = pageSize * pageNo;　　
      end = end > this.AlllistData.length ? this.AlllistData.length : end;
      for(let i = start; i < end; i++){
        pagedata.push(this.AlllistData[i]) 
      }
      this.listData = pagedata;
    },
    //分页    
    changePaginationPage: function (pageNo) {
      this.listPaginationData.pageNo = pageNo;
      this.pageDataFn();
    },
    jumpAddress(address) {
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
</style>
