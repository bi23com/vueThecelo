<template>
  <div class="marTop42" style="border-radius: 4px;">
    <el-tabs v-model="tabTableType" class="epochDetailChange">
      <!-- Transfer 表格 -->
      <el-tab-pane label="Transfer" name="Transfer">
        <span slot="label"><span style="margin: 0 16px">Transfer</span></span>
        <div class="myTable tabTable">
          <el-table height="270" class="downLoadTable" :data="TransferTable" fit align="center" stripe 
            style="width: 100%;overflow-y:hidden;" :default-sort="{prop: 'percentSort', order: 'descending'}">
            <template slot="empty">
              <div class="flexDiv columnFlex justifyCenter" style="height: 270px;">
                <img src="../../assets/images/notData2.png" class="normalImg">
                <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
              </div>
            </template>
            <el-table-column prop="fromAddress" label="From" min-width="190">
              <template slot-scope="scope">
                <div class="flexDiv justifyStart">
                  <!--  @click="jumpAddressDetails(scope.row.copyfromAddress)" blueColor -->
                  <p v-if="parmasAdd != scope.row.copyfromAddress" class="Text16 oneLine cursorPointer" style="max-width:75%">
                    {{scope.row.fromAddress}}
                  </p>
                  <p v-if="parmasAdd == scope.row.copyfromAddress" class="Text16 oneLine" style="max-width:75%">{{scope.row.fromAddress}}</p>
                  <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom" v-if="scope.row.copyfromAddress">
                    <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(scope.row.copyfromAddress)">
                    </span>
                  </el-tooltip>
                  <el-tooltip class="item marLeft4" placement="bottom" v-if="scope.row.copyfromAddress">
                    <div slot="content" class="Text14">
                      Copy Address: {{scope.row.copyfromAddress}}
                    </div>
                    <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="scope.row.copyfromAddress" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                    </span>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="toAddress" label="To" min-width="190">
              <template slot-scope="scope">
                <div class="flexDiv justifyStart">
                  <!-- @click="jumpAddressDetails(scope.row.copytoAddress)"   blueColor -->
                  <p v-if="parmasAdd != scope.row.copytoAddress" class="Text16 oneLine cursorPointer" style="max-width:75%">
                    {{scope.row.toAddress | normalAddress}}
                  </p>
                  <p v-if="parmasAdd == scope.row.copytoAddress" class="Text16 oneLine" style="max-width:75%">{{scope.row.toAddress | normalAddress}}</p>
                  <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom" v-if="scope.row.copytoAddress">
                    <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(scope.row.copytoAddress)">
                    </span>
                  </el-tooltip>
                  <el-tooltip class="item marLeft4" placement="bottom" v-if="scope.row.copytoAddress">
                    <div slot="content" class="Text14">
                      Copy Address: {{scope.row.copytoAddress}}
                    </div>
                    <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="scope.row.copytoAddress" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                    </span>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="type" width="130" label="Type" align="center">
              <template slot-scope="scope">
                <span class="">{{scope.row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="amount" width="150" label="Amount" align="center">
              <template slot-scope="scope">
                <span class="">{{scope.row.amount }}</span>
                <span class="Text14" :class="[
                  {'greenColor': scope.row.coin == 'CELO' },
                  {'yellowColor02': scope.row.coin == 'cUSD' }
                ]">{{scope.row.coin}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="height" width="120" label="Height" align="center">
              <template slot-scope="scope">
                <span class="">{{scope.row.height }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" width="130" label="Time" align="center">
              <template slot-scope="scope">
                <span class="">{{scope.row.time }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="hash" min-width="180" label="Tx Hash" align="center">
              <template slot-scope="scope">
                <div class="flexDiv justifyStart">
                  <!-- @click="jumpAddressDetails(scope.row.copyHash)"   blueColor -->
                  <p v-if="parmasAdd != scope.row.copyHash" class="Text16 oneLine cursorPointer" style="max-width:75%">
                    {{scope.row.hash}}
                  </p>
                  <p v-if="parmasAdd == scope.row.copyHash" class="Text16 oneLine" style="max-width:75%">{{scope.row.hash}}</p>
                  <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom" v-if="scope.row.copyHash">
                    <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(scope.row.copyHash)">
                    </span>
                  </el-tooltip>
                  <el-tooltip class="item marLeft4" placement="bottom" v-if="scope.row.copyHash">
                    <div slot="content" class="Text14">
                      Copy Address: {{scope.row.copyHash}}
                    </div>
                    <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="scope.row.copyHash" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                    </span>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="myTable-pagination">
            <el-pagination background v-show="TransferTable.length > 0" @current-change="TransferCurrentChange" 
              :page-sizes="[10, 20, 30, 40]" :current-page="TransferPage" layout="total, prev, pager, next,jumper" >
            </el-pagination>
          </div> -->
        </div>
      </el-tab-pane>
      <!-- Locked/Voted 表格 -->
      <el-tab-pane label="Locked/Voted" name="LockedVoted">
        <span slot="label"><span style="margin: 0 16px">Locked/Voted</span></span>
        <div class="myTable tabTable">
          <el-table height="270" stripe class="downLoadTable" :data="LockedVotedTable" fit align="center" style="width: 100%;overflow-y:hidden;" :default-sort="{prop: 'percentSort', order: 'descending'}">
            <template slot="empty">
              <div class="flexDiv columnFlex justifyCenter" style="height: 270px;">
                <img src="../../assets/images/notData2.png" class="normalImg">
                <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
              </div>
            </template>
            <el-table-column prop="fromAddress" label="From" min-width="190">
              <template slot-scope="scope">
                <div class="flexDiv justifyStart">
                  <!-- @click="jumpAddressDetails(scope.row.copyfromAddress)"  blueColor -->
                  <p v-if="parmasAdd != scope.row.copyfromAddress" class="Text16 oneLine cursorPointer" style="max-width:75%">
                    {{scope.row.fromAddress}}
                  </p>
                  <p v-if="parmasAdd == scope.row.copyfromAddress" class="Text16 oneLine" style="max-width:75%">{{scope.row.fromAddress}}</p>
                  <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom" v-if="scope.row.copyfromAddress">
                    <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(scope.row.copyfromAddress)">
                    </span>
                  </el-tooltip>
                  <el-tooltip class="item marLeft4" placement="bottom" v-if="scope.row.copyfromAddress">
                    <div slot="content" class="Text14">
                      Copy Address: {{scope.row.copyfromAddress}}
                    </div>
                    <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="scope.row.copyfromAddress" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                    </span>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="toAddress" label="To" min-width="190">
              <template slot-scope="scope">
                <div class="flexDiv justifyStart">
                  <!-- @click="jumpAddressDetails(scope.row.copytoAddress)" blueColor -->
                  <p v-if="parmasAdd != scope.row.copytoAddress" class="Text16 oneLine cursorPointer" style="max-width:75%">
                    {{scope.row.toAddress}}
                  </p>
                  <p v-if="parmasAdd == scope.row.copytoAddress" class="Text16 oneLine" style="max-width:75%">{{scope.row.toAddress}}</p>
                  <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom" v-if="scope.row.copytoAddress">
                    <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(scope.row.copytoAddress)">
                    </span>
                  </el-tooltip>
                  <el-tooltip class="item marLeft4" placement="bottom" v-if="scope.row.copytoAddress">
                    <div slot="content" class="Text14">
                      Copy Address: {{scope.row.copytoAddress}}
                    </div>
                    <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="scope.row.copytoAddress" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                    </span>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="type" width="130" label="Type" align="center">
              <template slot-scope="scope">
                <span class="">{{scope.row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="amount" width="150" label="Amount" align="center">
              <template slot-scope="scope">
                <span class="">{{scope.row.amount }}</span><span class="Text14" :class="[
                  {'greenColor': scope.row.coin == 'CELO' },
                  {'yellowColor02': scope.row.coin == 'cUSD' }
                ]">{{scope.row.coin}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="height" width="130" label="Height" align="center">
              <template slot-scope="scope">
                <span class="">{{scope.row.height }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" width="130" label="Time" align="center">
              <template slot-scope="scope">
                <span class="">{{scope.row.time }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="hash" width="180" label="Tx Hash" align="center">
              <template slot-scope="scope">
                <div class="flexDiv justifyStart">
                  <!-- @click="jumpAddressDetails(scope.row.copyHash)"  blueColor -->
                  <p v-if="parmasAdd != scope.row.copyHash" class="Text16 oneLine cursorPointer" style="max-width:75%">
                    {{scope.row.hash}}
                  </p>
                  <p v-if="parmasAdd == scope.row.copyHash" class="Text16 oneLine" style="max-width:75%">{{scope.row.hash}}</p>
                  <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom" v-if="scope.row.copyHash">
                    <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(scope.row.copyHash)">
                    </span>
                  </el-tooltip>
                  <el-tooltip class="item marLeft4" placement="bottom" v-if="scope.row.copyHash">
                    <div slot="content" class="Text14">
                      Copy Address: {{scope.row.copyHash}}
                    </div>
                    <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="scope.row.copyHash" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                    </span>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="myTable-pagination">
            <el-pagination background v-show="LockedVotedTable.length > 0" @current-change="validatorCurrentChange" 
              :page-sizes="[10, 20, 30, 40]" :current-page="validatorPage" layout="total, prev, pager, next,jumper" >
            </el-pagination>
          </div> -->
        </div>
      </el-tab-pane>
      <!-- Proposals 表格 -->
      <el-tab-pane label="Proposals" name="Proposals">
        <span slot="label"><span style="margin: 0 16px">Proposals</span></span>
        <div class="myTable tabTable">
          <el-table height="270" stripe class="downLoadTable" :data="ProposalsTable" fit align="center" style="width: 100%;overflow-y:hidden;" :default-sort="{prop: 'percentSort', order: 'descending'}">
            <template slot="empty">
              <div class="flexDiv columnFlex justifyCenter" style="height: 270px;">
                <img src="../../assets/images/notData2.png" class="normalImg">
                <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
              </div>
            </template>
            <el-table-column prop="id" label="ID" width="80">
              <template slot-scope="scope">
                <span class="Text16 ">{{scope.row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="Title" min-width="170" align="center">
              <template slot-scope="scope">
                <span class="Text16 ">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="type" width="130" label="Type" align="center">
              <template slot-scope="scope">
                <span class="">{{scope.row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="voted" width="140" label="Voted" align="center">
              <template slot-scope="scope">
                <span :class="scope.row.coin ? 'greenColor' : ''">{{scope.row.voted }}</span><span class="Text14">{{scope.row.coin}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" width="130" label="Time" align="center">
              <template slot-scope="scope">
                <span class="">{{scope.row.time }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="hash" width="180" label="Tx Hash" align="center">
              <template slot-scope="scope">
                <div class="flexDiv justifyStart">
                  <!-- @click="jumpAddressDetails(scope.row.copyHash)"  blueColor  -->
                  <p v-if="parmasAdd != scope.row.copyHash" class="Text16 oneLine cursorPointer" style="max-width:75%">
                    {{scope.row.hash}}
                  </p>
                  <p v-if="parmasAdd == scope.row.copyHash" class="Text16 oneLine" style="max-width:75%">{{scope.row.hash}}</p>
                  <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom" v-if="scope.row.copyHash">
                    <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(scope.row.copyHash)">
                    </span>
                  </el-tooltip>
                  <el-tooltip class="item marLeft4" placement="bottom" v-if="scope.row.copyHash">
                    <div slot="content" class="Text14">
                      Copy Address: {{scope.row.copyHash}}
                    </div>
                    <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="scope.row.copyHash" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                    </span>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="myTable-pagination">
            <el-pagination background v-show="ProposalsTable.length > 0" @current-change="ProposalsCurrentChange" 
              :page-sizes="[10, 20, 30, 40]" :current-page="ProposalsPage" layout="total, prev, pager, next,jumper" >
            </el-pagination>
          </div> -->
        </div>
      </el-tab-pane>
      <!-- Exchange 表格 -->
      <el-tab-pane label="Exchange" name="Exchange">
        <span slot="label"><span style="margin: 0 16px">Exchange</span></span>
        <div class="myTable tabTable">
          <el-table height="270" stripe class="downLoadTable" :data="ExchangeTable" fit align="center" style="width: 100%;overflow-y:hidden;" :default-sort="{prop: 'percentSort', order: 'descending'}">
            <template slot="empty">
              <div class="flexDiv columnFlex justifyCenter" style="height: 270px;">
                <img src="../../assets/images/notData2.png" class="normalImg">
                <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
              </div>
            </template>
            <el-table-column prop="exchanger" label="Exchanger" min-width="180">
              <template slot-scope="scope">
                <p class="Text16">{{scope.row.exchanger}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="type" width="130" label="Type" align="center">
              <template slot-scope="scope">
                <span class="">{{scope.row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="amount" width="150" label="Amount" align="center">
              <template slot-scope="scope">
                <span class="">{{scope.row.amount }}</span><span class="Text14" :class="[
                  {'greenColor': scope.row.coin == 'CELO' },
                  {'yellowColor02': scope.row.coin == 'cUSD' }
                ]">{{scope.row.coin}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="price" width="130" label="Price" align="center">
              <template slot-scope="scope">
                <span class="">{{scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="height" width="130" label="Height" align="center">
              <template slot-scope="scope">
                <span class="">{{scope.row.height }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" width="130" label="Time" align="center">
              <template slot-scope="scope">
                <span class="">{{scope.row.time }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="hash" min-width="180" label="Tx Hash" align="center">
              <template slot-scope="scope">
                <div class="flexDiv justifyStart">
                  <!-- @click="jumpAddressDetails(scope.row.copyHash)"   blueColor -->
                  <p v-if="parmasAdd != scope.row.copyHash" class="Text16 oneLine cursorPointer" style="max-width:75%">
                    {{scope.row.hash}}
                  </p>
                  <p v-if="parmasAdd == scope.row.copyHash" class="Text16 oneLine" style="max-width:75%">{{scope.row.hash}}</p>
                  <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom" v-if="scope.row.copyHash">
                    <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(scope.row.copyHash)">
                    </span>
                  </el-tooltip>
                  <el-tooltip class="item marLeft4" placement="bottom" v-if="scope.row.copyHash">
                    <div slot="content" class="Text14">
                      Copy Address: {{scope.row.copyHash}}
                    </div>
                    <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="scope.row.copyHash" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                    </span>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="myTable-pagination">
            <el-pagination background v-show="ExchangeTable.length > 0" @current-change="ExchangeCurrentChange" 
              :page-sizes="[10, 20, 30, 40]" :current-page="ExchangePage" layout="total, prev, pager, next,jumper" >
            </el-pagination>
          </div> -->
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { account } from "@/assets/api/requset.js";
export default {
  name: "tabTable",
  props: ['showAddress'],
  data() {
    return {
      parmasAdd: this.$route.params.id,
      tabTableType: 'Transfer',  // LockedVoted
      validatorPage: 1,
      validatorCount: 20,
      LockedVotedTable: [
        // { fromAddress: '', toAddress: '', type: '', amount: '', coin: '', height: '', time: '', hash: '' }
      ],
      // Proposals
      ProposalsTable: [
        // {id: '', title: '', type: '', voted: '', time: '', hash: ''}
      ],
      ProposalsPage: 1,
      ProposalsCount: 20,
      // Transfer
      TransferTable: [
        // {fromAddress: '', toAddress: '', type: '', amount: '', height: '', time: '', hash: ''}
      ],
      TransferPage: 1,
      TransferCount: 20,
      // Exchange
      ExchangeTable: [
        // {exchanger: '', type: '', amount: '', coin: '', price: '', height: '', time: '', hash: ''}
      ],
      ExchangePage: 1,
      ExchangeCount: 20
    };
  },
  components: {
  },
  computed: {
  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        this.parmasAdd = this.$route.params.id;
      }
    },
    showAddress() {
      this.getTabData();
    },
  },
  mounted() {
    this.getTabData();
  },
  methods: {
    jumpAddressDetails(url) {
      if(this.showAddress == url) {return;}
      this.$store.commit('updateheadTabClsId', this.$store.state.headTabClsId);
      this.$router.push({
        path: `/acountdetail/${url}`
      })
    },
    getTabData(){
      if(!this.showAddress){
        return;
      }
      this.getvalidatorTable();
      this.getProposalsTable();
      this.getTransferTable();
      this.getExchangeTable();
    },
    // LockedVotedTable
    getvalidatorTable(){
      var parmas = {
        method: 'get_logs',
        type: 'locked',
        page: Number(this.validatorPage - 1),
        count: this.validatorCount,
        address: this.showAddress
      };
      account(parmas).then((response) => {
        var table_html = [];
        if(!response.logs_records || response.logs_records.length < 1){
          return;
        }
        response.logs_records.forEach((item,index)=>{
          table_html.push({ 
            fromAddress: this.$format.formatAddress(item[4],true,false,true,false,true), 
            copyfromAddress: item[4][0], 
            toAddress: this.$format.formatAddress(item[5],true,false,true,false,true), 
            copytoAddress: item[5][0],
            type: item[0], 
            amount: this.$format.thousands(item[6].toFixed(2)), 
            coin: (item[0]=='Transfer') ? item[7] : 'CELO',
            height: parseInt(item[1]), 
            time: this.$format.timeSpan(item[2]*1000,'',''),  
            hash: this.$format.formatAddress(item[3],true,false,true,false,true), 
            copyHash: item[3]
          })
        });
        this.LockedVotedTable = table_html;
      })
    },
    validatorCurrentChange(pageNo){
      this.validatorPage = pageNo;
      this.getvalidatorTable();
    },
    // ProposalsTable
    getProposalsTable(){
      var parmas = {
        method: 'get_logs',
        type: 'governance',
        page: Number(this.ProposalsPage - 1),
        count: this.ProposalsCount,
        address: this.showAddress
      };
      account(parmas).then((response) => {
        var table_html = [];
        if(!response.logs_records || response.logs_records.length < 1){
          return;
        }
        response.logs_records.forEach((item,index)=>{
        // {id: '', title: '', type: '', voted: '', time: '', hash: ''}/
          table_html.push({ 
            id: item[4],
            title: item[5].title,
            descriptionUrl: item[5].descriptionUrl,
            type: item[0],
            voted: item[7],
            time: this.$format.timeSpan(item[2]*1000,'',''), 
            hash: this.$format.formatAddress(item[3],true,false,true,false,true), 
            copyHash: item[3]
          })
        });
        this.ProposalsTable = table_html;
      })
    },
    ProposalsCurrentChange(pageNo){
      this.ProposalsPage = pageNo;
      this.getProposalsTable();
    },
    // TransferTable
    getTransferTable(){
      var parmas = {
        method: 'get_logs',
        type: 'transfer',
        page: Number(this.TransferPage - 1),
        count: this.TransferCount,
        address: this.showAddress
      };
      account(parmas).then((response) => {
        var table_html = [];
        if(!response.logs_records || response.logs_records.length < 1){
          return;
        }
        response.logs_records.forEach((item,index)=>{
        // {fromAddress: '', toAddress: '', type: '', amount: '', height: '', time: '', hash: ''}
          table_html.push({
            fromAddress: this.$format.formatAddress(item[4],true,false,true,false,true), 
            copyfromAddress: item[4][0], 
            toAddress: this.$format.formatAddress(item[5],true,false,true,false,true), 
            copytoAddress: item[5][0], 
            type: item[0], 
            amount: this.$format.thousands(item[6].toFixed(2)), 
            coin: (item[0]=='Transfer') ? item[7] : 'CELO',
            height: parseInt(item[1]), 
            time: this.$format.timeSpan(item[2]*1000,'',''),  
            hash: this.$format.formatAddress(item[3],true,false,true,false,true), 
            copyHash: item[3]
          })
        });
        this.TransferTable = table_html;
      })
    },
    TransferCurrentChange(pageNo){
      this.TransferPage = pageNo;
      this.getTransferTable();
    },  
    // ExchangeTable
    getExchangeTable(){
      var parmas = {
        method: 'get_logs',
        type: 'exchange',
        page: Number(this.ExchangePage - 1),
        count: this.ExchangeCount,
        address: this.showAddress
      };
      account(parmas).then((response) => {
        var table_html = [];
        if(!response.logs_records || response.logs_records.length < 1){
          return;
        }
        response.logs_records.forEach((item,index)=>{
        // {exchanger: '', type: '', amount: '', coin: '', price: '', height: '', time: '', hash: ''}
          table_html.push({
            exchanger: this.$format.formatAddress(item[4],true,false,true,false,true), 
            type: (item[8]) ? 'Sold' : 'Bought', 
            amount: this.$format.thousands(item[6].toFixed(2)), 
            coin: (item[8])? 'CELO' : 'cUSD',
            amount01: this.$format.thousands(item[7].toFixed(2)), 
            coin01: (item[8])? 'cUSD' : 'CELO',
            price: (item[8]) ? (item[7]/item[6]).toFixed(2) : (item[6]/item[7]).toFixed(2),
            height: parseInt(item[1]), 
            time: this.$format.timeSpan(item[2]*1000,'',''),  
            hash: this.$format.formatAddress(item[3],true,false,true,false,true), 
            copyHash: item[3]
          })
        });
        this.ExchangeTable = table_html;
 
        
      })
    },
    ExchangeCurrentChange(pageNo){
      this.ExchangePage = pageNo;
      this.getExchangeTable();
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
