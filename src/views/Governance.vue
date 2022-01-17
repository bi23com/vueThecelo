
<template>
  <div :class="$store.state.themeCls">
    <div class="mainContainer">
      <div class="marBtm12">
        <p class="primaryTitle">Governance</p>
      </div>

      <div class="mainCon-sub">
        <div class=" marTop24">
          <div class="marTop12 tabGroup">
            <el-tabs v-model="TypeTabs" class="epochDetailChange " @tab-click="changeTypeTabs">
              <el-tab-pane label="ALL" name="0">
                <span slot="label"><i style="margin-left: 26px"></i>ALL<i style="margin-left: 26px"></i></span>
              </el-tab-pane>
              <el-tab-pane label="Voting" name="1">
                <span slot="label"><i style="margin-left: 26px"></i>Voting<i style="margin-left: 26px"></i></span>
              </el-tab-pane>
              <el-tab-pane label="Passed" name="2">
                <span slot="label"><i style="margin-left: 26px"></i>Passed<i style="margin-left: 26px"></i></span>
              </el-tab-pane>
              <el-tab-pane label="Rejected" name="3">
                <span slot="label"><i style="margin-left: 26px"></i>Rejected<i style="margin-left: 26px"></i></span>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="myTable myTable02" style="margin-top:0px;">
        </div>
        <!-- skeleton 骨架图 -->
        <el-row type='flex' style="flex-wrap:wrap;" v-if="isskeleton">
          <el-col :md="8" :sm="12" :xs="24" v-for="(num,nindex) in [1,2,3,4,5,6,7,8,9]" :key="nindex">
            <el-card class="governaceDiv contour01">
              <div class="flexDiv marBtm6">
                <p class="Text22 radius8 goverSkeleton" style="height: 22px;width: calc(100% - 106px);"></p>
                <p class="governaceDiv-status Text18 textCenter goverSkeleton"></p>
              </div>
              <div class="flexDiv cursorPointer marTop24 radius8 goverSkeleton" style="height: 22px;width: 100%;"></div>
              <div class="flexDiv marBtm6 marTop24 radius8 goverSkeleton" style="height: 22px;width: 100%;"></div>
            </el-card>
          </el-col>
        </el-row>
        <!-- 实际内容 -->
        <waterfall class="goveranceModFat" :data="showgovernanceList" :col="Waterfallcol">
          <template>
            <el-card class="governaceDiv goveranceMod" v-for="(gcl,index) in showgovernanceList" :key="index">
              <div class="governaceDivStatus">
                <div class="c"></div>
                <span class="Text16" :class="gcl.status | statusBg">{{(gcl.status == 'Vote' ? 'Voting' : gcl.status)}}</span>
              </div>
              <div class="flexDiv marBtm6">
                <p class="Text22">#{{gcl.id}}</p>
              </div>
              <div class="flexDiv cursorPointer marTop8" style="height: 44px;" @click="jumpUrl(gcl.address)">
                <p class="marBtm6 Text20 twoLine" style="width:90%">
                  {{gcl.title}}
                </p>
                <i class="el-icon-arrow-right" v-if="gcl.title"></i>
              </div>
              <el-row class="marTop12 flexDiv">
                <el-col :lg="17" :sm="17" :xs="18">
                  <governanceecharts :echartsValue="gcl.echartsValue"></governanceecharts>
                </el-col>
                <el-col :lg="7" :sm="7" :xs="6" class="textCenter flexDiv justifyCenter" >
                  <!-- <p class="connectBtm cursorPointer Text16">Connect</p> -->
                  <div v-if="gcl.status == 'Vote'" style="width:100%" class="textCenter flexDiv justifyCenter" >
                    <!-- governanceConnect -->
                    <connectDiv class="VoteCls cursorPointer" :fromData="'VoteConnect'" v-if="!connectAddressDetail"></connectDiv>
                    <button class="VoteCls cursorPointer" v-if="connectAddressDetail" @click="OpenInfoModel(gcl)">vote</button>
                  </div>
                </el-col>
              </el-row>
              <!-- <div class="flexDiv marBtm6 marTop24" style="height: 40px;">
                <div style="width: calc(100% - 114px)">
                  <div class="Text16 marBtm4 h5Color marTop8" v-if="gcl.time">
                    <span class="textRight Text18 marLeft4 blueColor" v-html="gcl.time"></span>
                    until<span class="marLeft4 marRight4">{{gcl.status}}</span>end
                  </div>
                </div>
              </div>   -->
              <!-- 展开详情 -->
              <!-- <div class="marTop18">
                <el-collapse class="governanceCollapse">
                  <el-collapse-item title="" name="1">
                    <el-steps class="mySteps" direction="vertical" :active="1">
                      <el-step>
                        <template slot="title">
                          <div class="flexDiv marBtm6">
                            <p class="Text18 h1Color fontweight">Proposer</p>
                            <div class="Text16">
                              <span class="cursorPointer blueColor" @click="jumpAddressDetails(gcl.proposerAddress)">{{gcl.proposerAddress | normalAddress }}</span>
                              <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom">
                                <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(gcl.proposerAddress)">
                                </span>
                              </el-tooltip>
                              <el-tooltip class="item marLeft4" placement="bottom">
                                <div slot="content" class="Text14">
                                  Copy Address: {{gcl.proposerAddress}}
                                </div>
                                <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="gcl.proposerAddress" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                                </span>
                              </el-tooltip>
                            </div>
                          </div>
                        </template>
                        <template slot="description">
                          <div class="flexDiv marBtm16">
                            <p class="Text18 h3Color">Deposit</p>
                            <p class="Text18 greenColor textRight">{{gcl.proposerDeposit}}</p>
                          </div>
                          <div class="flexDiv marBtm16">
                            <p class="Text18 h3Color">Date</p>
                            <p class="Text18 h3Color textRight">{{gcl.proposerTime}}</p>
                          </div>
                        </template>
                      </el-step>
                      <el-step>
                        <template slot="title">
                          <div class="marBtm6 Text18 h1Color">
                            Upvoters
                          </div>
                        </template>
                        <template slot="description">
                          <div class="flexDiv marBtm16">
                            <p class="Text18 h3Color">Addresses</p>
                            <p class="Text18 greenColor textRight">{{gcl.UpvotersPeoples | thousands}}</p>
                          </div>
                          <div class="flexDiv marBtm16">
                            <p class="Text18 h3Color">Upvote</p>
                            <p class="Text18 greenColor textRight">{{gcl.UpvotersUpvotes | thousands}}</p>
                          </div>
                        </template>
                      </el-step>
                      <el-step>
                        <template slot="title">
                          <div class="flexDiv marBtm6">
                            <p class="Text18 h1Color fontweight">Dequeue</p>
                            <div class="Text16 blueColor">
                              <span class="cursorPointer blueColor" @click="jumpAddressDetails(gcl.dequeueAddress)">{{gcl.dequeueAddress | normalAddress }}</span>
                              <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom">
                                <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(gcl.dequeueAddress)">
                                </span>
                              </el-tooltip>
                              <el-tooltip class="item marLeft4" placement="bottom">
                                <div slot="content" class="Text14">
                                  Copy Address: {{gcl.dequeueAddress}}
                                </div>
                                <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="gcl.dequeueAddress" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                                </span>
                              </el-tooltip>
                            </div>
                          </div>
                        </template>
                        <template slot="description">
                          <div class="flexDiv marBtm16">
                            <p class="Text18 h3Color">Date</p>
                            <p class="Text18 h3Color textRight">{{gcl.dequeueTime}}</p>
                          </div>
                        </template>
                      </el-step>
                      <el-step>
                        <template slot="title">
                          <div class="flexDiv marBtm6">
                            <p class="Text18 h1Color fontweight">Approval</p>
                            <div class="Text16 blueColor">
                              <span class="cursorPointer blueColor" @click="jumpAddressDetails(gcl.approvalAddress)">{{gcl.approvalAddress | normalAddress }}</span>
                              <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom">
                                <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(gcl.approvalAddress)">
                                </span>
                              </el-tooltip>
                              <el-tooltip class="item marLeft4" placement="bottom">
                                <div slot="content" class="Text14">
                                  Copy Address: {{gcl.approvalAddress}}
                                </div>
                                <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="gcl.approvalAddress" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                                </span>
                              </el-tooltip>
                            </div>
                          </div>
                        </template>
                        <template slot="description">
                          <div class="flexDiv marBtm16">
                            <p class="Text18 h3Color">Date</p>
                            <p class="Text18 h3Color textRight">{{gcl.approvalTime}}</p>
                          </div>
                        </template>
                      </el-step>
                      <el-step>
                        <template slot="title">
                          <div class="marBtm6 Text18 h1Color fontweight">
                            Voters
                          </div>
                        </template>
                        <template slot="description">
                          <div class="flexDiv marBtm16">
                            <p class="Text18 h3Color">Addresses</p>
                            <p class="Text18 greenColor textRight">{{gcl.votedPeoples | thousands}}</p>
                          </div>
                          <div class="flexDiv marBtm16">
                            <p class="Text18 h3Color">Votes</p>
                            <p class="Text18 greenColor textRight">{{gcl.votedWeight | thousands}}</p>
                          </div>
                        </template>
                      </el-step>
                      <el-step>
                        <template slot="title">
                          <div class="flexDiv marBtm6">
                            <p class="Text18 h1Color fontweight">Executor</p>
                            <div class="Text16 blueColor">
                              <span class="cursorPointer blueColor" @click="jumpAddressDetails(gcl.executorFrom)">{{gcl.executorFrom | normalAddress }}</span>
                              <el-tooltip v-if="gcl.executorFrom" class="item marLeft4" content="Go Explorer" placement="bottom">
                                <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(gcl.executorFrom)">
                                </span>
                              </el-tooltip>
                              <el-tooltip v-if="gcl.executorFrom" class="item marLeft4" placement="bottom">
                                <div slot="content" class="Text14">
                                  Copy Address: {{gcl.executorFrom}}
                                </div>
                                <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="gcl.executorFrom" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                                </span>
                              </el-tooltip>
                            </div>
                          </div>
                        </template>
                        <template slot="description">
                          <div class="flexDiv marBtm16">
                            <p class="Text18 h3Color">Date</p>
                            <p class="Text18 h3Color textRight">{{gcl.executorTime}}</p>
                          </div>
                        </template>
                      </el-step>
                    </el-steps>
                  </el-collapse-item>
                </el-collapse>
              </div> -->
              
            </el-card>
          </template>
        </waterfall>
        <div class="flexDiv columnFlex justifyCenter" style="height: 360px;" v-if="!(showgovernanceList.length > 0) && !isskeleton">
          <img src="../assets/images/notData2.png" class="normalImg">
          <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
        </div>
      </div>
    </div>
    <!-- 投票 -->
    <el-dialog class="my-ModelDialog calenderExportModel" :visible.sync="showVoteModel" :width="$store.state.isMobile?'90%':'42%'" 
      style="background:rgba(0,0,0,0.6);" :before-close="CloseInfoModel" :modal="false">
      <div slot="title" class="Text24">
        <p class="weightText Text28" style="color:#4a4a4a;">Proposal #{{voteNum}}</p>
        <p class="h3Color Text22">{{voteTitle}}</p>
      </div>
      <div v-loading="loadVoteNum" element-loading-text = "loading..." element-loading-spinner = "el-icon-loading">
        <p class="Text24">Amount</p>
        <div class="amountInp marTop12 flexDiv">
          <div class="amountInpCon">
            <!-- @input @change -->
            <el-input placeholder="input" v-model="amountNum" @input="inputAccountLock()"></el-input>
          </div>
          <p>CELO</p>
          <p class="borderLeft blueColor cursorPointer" @click="setMaxNum()">Max</p>
        </div>
        <p class="marTop8">Locked <span class="greenColor">{{lockNum}}</span> CELO,
          Available <span class="greenColor">{{sumVoteNum}}</span> CELO</p>
        <p class="voteHint redColor Text16 marTop6" v-if="isvoteHint">
          {{voteHint}}
        </p>
        <div class="marTop28">
          <p class="Text24">Vote for</p>
          <div class="marTop12 voteRadio">
            <!-- 0 None, 1 Abstain, 2 No , 3 Yes -->
            <el-radio-group v-model="voteType" @change="changeVoteType()">
              <el-radio label="3">Yes</el-radio>
              <el-radio label="2">NO</el-radio>
              <el-radio label="1">Abstain</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="modelBtm marTop28">
          <!-- <p @click="toVote()">toVote</p> -->
          <div v-if="toLockShow && voteHint"><div class="actConnect isHintShow">lock</div></div>
          <div v-if="toLockShow && !voteHint"><contractkitNew @updateLockData="updateLockData" :fromData="'lock'" :lockChaNum="lockChaNum">lock</contractkitNew></div>
          <div v-if="!toLockShow && voteHint"><div class="actConnect isHintShow">continue</div></div>
          <div v-if="!toLockShow && !voteHint"><contractkitNew :fromData="'toVote'" @cerateAccountSuccess="cerateAccountSuccess" :proposalId="voteNum" :lockNum="lockNum" :voteType="voteType">continue</contractkitNew></div>
        </div>
        <!-- <p class="Text16 marTop12 greenColor">支付一定的gas费，vote\lock成功！</p> -->
      </div>
    </el-dialog>

    <!-- 去创建账户提示框 -->
    <el-dialog class="my-ModelDialog calenderExportModel" :visible.sync="showCreateModel" :width="$store.state.isMobile?'90%':'42%'" style="background:rgba(0,0,0,0.6);" :before-close="CloseCreateModel" :modal="false">
      <div class="Text24 marTop24">
        <p class="h3Color Text22 textCenter">A voting account will be created for you on the smart contract to continue voting, please authorize.</p>
      </div>
      <div class="modelBtm marTop28">
        <contractkitNew :fromData="'toCreate'" @cerateAccountSuccess="cerateAccountSuccess">continue</contractkitNew>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import connectDiv from '@/views/celo/contractkit.vue'
import contractkitNew from '@/views/celo/contractkitNew.vue'
import governanceecharts from '@/views/governance/echarts.vue'
import { account } from "@/assets/api/requset.js";
import voteFun from "../utils/vote.js";
import balanceFun from "../utils/balance.js";

export default {
  name: "Governance",
  data() {
    return {
      loadVoteNum: false,
      showCreateModel: false,
      showVoteModel: false,
      Waterfallcol: 3,
      screenWidth: 800,
      isskeleton: true,
      governanceList: [],
      showgovernanceList: [],
      VotingList: [],
      PassedList: [],
      RejectedList: [],
      cr: {
        address: 'addressaddressaddress'
      },
      timer: '',
      TypeTabs: '0',  //ALL:0  Voting:1    Passed:2   Rejected:3
      // 投票部分
      voteNum: '42',
      voteTitle: 'Reduce Exchange Spreads for cUSD and cEUR',
      amountNum: 0,
      lockNum: 0,
      sumVoteNum: 0,
      isvoteHint: false,
      voteHint: '',
      voteType: '3',
      fromData: '',
      createData: '',
      toLockShow: false,
      lockChaNum: '',
    };
  },
  components: {
    governanceecharts, connectDiv, contractkitNew
  },
  filters: {
    statusBg(val) {
      if (val == 'Vote') {
        return 'voteBg'
      }
      if (val == 'Rejected') {
        return 'rejectedBg'
      }
      if (val == 'Passed') {
        return 'PassedBg'
      }
      return 'huiBg'
    },
  },
  computed: {
    connectAddressDetail() {
      return this.$store.state.connectAddressDetail;
    },
  },
  mounted() {
    this.getGasPrice();

    this.getListData();
    window.screenWidth = document.body.clientWidth || document.body.offsetWidth;
    if (window.screenWidth < 768) {
      this.Waterfallcol = 1;
    } else if (window.screenWidth < 996) {
      this.Waterfallcol = 2;
    }

    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth || document.body.offsetWidth;
        that.screenWidth = window.screenWidth;
      })()
    }

    var activityDate = [];
    for (var i = "1"; i < "32"; i++) {
      activityDate.push({ name: i, id: i + "" });
    }


    var activityDate02 = [];
    for (var i = 1; i < 32; i++) {
      activityDate02.push({ name: i, id: i + "" });
    }

  },
  watch: {
    screenWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        if (val < 768) {
          this.Waterfallcol = 1;
        } else if (val < 996) {
          this.Waterfallcol = 2;
        } else {
          this.Waterfallcol = 3;
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
  methods: {
    async getGasPrice(){
      var GasPrice = await voteFun.getGasPrice();
      window.localStorage.setItem('GasPrice', GasPrice);
      console.log(GasPrice+"===GasPrice")
    },
    async changeVoteType() {
    },
    async toVote() {
      var comvote = await voteFun.vote(this.connectAddressDetail, this.voteNum, this.voteType);
      console.log(JSON.stringify(comvote)+"======comvote")
    },
    removeFromData() {
      alert('能进吗');
    },
    // 设置投最大数值
    setMaxNum() {
      var lockSUnNum = (Number(this.sumVoteNum) + Number(this.lockNum)).toFixed(4);
      // this.amountNum = this.sumVoteNum;
      this.amountNum = lockSUnNum;
      this.inputAccountLock();
    },
    async stringToHex(str) {
      var val = "";
      for (var i = 0; i < str.length; i++) {
        if (val == "")
          val = str.charCodeAt(i).toString(16);
        else
          val += str.charCodeAt(i).toString(16);
      }
      val += "0a"
      return val
    },
    async OpenInfoModel(data) {
      var that = this;
      // 判断账号
      var isSAcount = await voteFun.isAccount(that.connectAddressDetail);
      if (!isSAcount) {
        console.log('准备创建')
        // 创建账户
        var areateAccount = await voteFun.createAccount(that.connectAddressDetail);
        that.showCreateModel = true;
        return;
      }

      this.voteNum = data.id;
      this.voteTitle = data.title;

      // 获取锁定数、总票数
      this.showVoteModel = true;
      this.loadVoteNum = true;
      await this.getLockTotalVote();
      this.loadVoteNum = false;
    },
    async inputAccountLock() {
      var that = this;
      if(!this.amountNum){
        this.voteHint = '';
        this.isvoteHint = false;
        return;
      }
      // 最大4位小数；
      if(this.amountNum.toString().indexOf('.') != -1){
        var xiaoshu = this.amountNum.toString().split('.')[1];
        if(xiaoshu.toString().length > 4){
          this.voteHint = 'The maximum number of decimal places is four';
          this.isvoteHint = true;
          return;
        } 
        this.voteHint = '';
        this.isvoteHint = false;
      }
      var lockSUnNum = (Number(that.sumVoteNum) + Number(that.lockNum)).toFixed(4);
      console.log(lockSUnNum+"====lockSUnNum")
      // 小于锁定数
      if (Number(that.amountNum) < Number(that.lockNum)) {
        this.voteHint = 'Votes cannot be less than the locked celo';
        return that.isvoteHint = true;
      }
      // 大于总数
      if (Number(that.amountNum) > lockSUnNum) {
        this.voteHint = 'Votes can’t be greater than the account balance';
        return that.isvoteHint = true;
      }
      this.voteHint = '';
      that.isvoteHint = false;
      // 手动输入小于locked数量的投票，直接跳转至钱包进行 投票签名；
      // 输入金额大于locked金额，且小于available金额，跳转钱包并锁定签名。锁定金额为 输入 - locked
      if (that.amountNum > that.lockNum && (that.amountNum < lockSUnNum || that.amountNum == lockSUnNum) ) {
        console.log(that.amountNum+"===that.amountNum")
        console.log(that.lockNum+"===that.lockNum")
        var lockAgainNum = Math.round(Number(that.amountNum * 10000) - Number(that.lockNum *10000));
        var changeLock = lockAgainNum / 10000;
        console.log(changeLock+"=======changeLock")
        that.lockChaNum = changeLock;

        // that.voteHint = 'please lock first';
        // that.isvoteHint = true;
        that.toLockShow = true;
        return;
      }
      that.toLockShow = false;
      that.voteHint = '';
      that.isvoteHint = false;
    },
    // lock 索票成功回调
    async updateLockData(){
      await this.getLockTotalVote();
      this.toLockShow = false;
      this.voteHint = '';
      this.isvoteHint = false;
    },
    // 创建账户成功回调
    async cerateAccountSuccess(){
      this.showCreateModel = false;
      this.showVoteModel = false;
      this.loadVoteNum = false;
    },
    CloseCreateModel() {
      this.showCreateModel = false;
    },
    async getLockTotalVote() {
      var that = this;
      // 获取账户锁定的数量
      var getAccountTotal = await voteFun.getAccountTotalLockedGold(that.connectAddressDetail);
      // 
      that.amountNum = Number(getAccountTotal).toFixed(4);
      that.lockNum = Number(getAccountTotal).toFixed(4);
      // 获取锁定未投票数量
      var getAccountNonvoting = await voteFun.getAccountNonvotingLockedGold(that.connectAddressDetail);
      // // 获取总的投票 getTotalVotesByAccount
      var getTotalVotes = await balanceFun.getBlances(that.connectAddressDetail);
      that.sumVoteNum = Number(getTotalVotes).toFixed(4);
      console.log(that.sumVoteNum+"===that.sumVoteNum")
    },
    CloseInfoModel() {
      this.toLockShow = false;
      this.voteHint = '';
      this.isvoteHint = false;
      this.showVoteModel = false;
      this.loadVoteNum = false;
    },
    jumpUrl(url) {
      window.location.href = url;
    },
    jumpAddressDetails(url) {
      if (this.showAddress == url) { return; }
      this.$store.commit('updateheadTabClsId', '6');
      this.$router.push({
        path: `/siteDetail/${url}`
      })
    },
    getListData() {
      var parmas = {
        method: 'proposalList',
      };
      var that = this;
      account(parmas).then((response) => {
        var items = response.items;
        var items_vote = response.items_vote;
        var governanceList = [];
        var VotingList = [];
        var PassedList = [];
        var RejectedList = [];
        var keys = Object.keys(items).reverse();
        keys.forEach((id, i) => {
          var item = items[id];
          var time = '';
          var Rejected = false;
          if (['Upvote', 'Dequeue', 'Approval', 'Vote', 'Execute'].indexOf(item.status) >= 0) {
            var d = parseInt(item.timespan / (24 * 3600));
            var h = parseInt((item.timespan % (24 * 3600)) / 3600);
            var m = parseInt((item.timespan % 3600) / 60);
            time = `${d}d${h}h${m}m`;
          } else if (['Rejected'].indexOf(item.status) >= 0) {
            Rejected = true;
          }
          // 处理占比
          var yesVal = 0;
          var noVal = 0;
          var abstainVal = 0;
          var perSum = 0;
          // [["id", "1"], ["Yes", 12639595], ["No", 0], ["Abstain", 0]]
          if (items_vote[id - 1][0][1] == id) {
            yesVal = items_vote[id - 1][1][1];
            noVal = items_vote[id - 1][2][1];
            abstainVal = items_vote[id - 1][3][1];
            perSum = Number(yesVal) + Number(noVal) + Number(abstainVal);
          }
          var obj = {
            id: id,
            address: item.descriptionUrl,
            status: item.status,
            title: item.title,
            time: time,
            Rejected: Rejected,
            // Proposer
            proposerAddress: item.proposer.address,
            proposerDeposit: item.proposer.deposit,
            proposerTime: this.$format.timeSpan(item.proposer.timestamp * 1000, '', ''),
            // Upvoters
            UpvotersPeoples: item.upvoted.peoples,
            UpvotersUpvotes: item.upvoted.upvotes,
            //Dequeue
            dequeueAddress: item.dequeue.address,
            dequeueTime: this.$format.timeSpan(item.dequeue.timestamp * 1000, '', ''),
            //approval
            approvalAddress: item.approval.address,
            approvalTime: this.$format.timeSpan(item.approval.timestamp * 1000, '', ''),
            //Voters
            votedPeoples: item.voted.peoples,
            votedWeight: item.voted.weight,
            //executor   
            executorFrom: item.executed.from,
            executorTime: this.$format.timeSpan(item.executed.timestamp * 1000, '', ''),
            echartsValue: {
              yesVal: yesVal || 0,
              noVal: noVal || 0,
              abstainVal: abstainVal || 0,
            }
          };
          governanceList.push(obj);
          if (obj.status == 'Vote') {
            VotingList.push(obj);
          }
          if (obj.status == 'Passed') {
            PassedList.push(obj);
          }
          if (obj.status == 'Rejected') {
            RejectedList.push(obj);
          }
        })
        this.governanceList = governanceList;
        this.VotingList = VotingList;
        this.PassedList = PassedList;
        this.RejectedList = RejectedList;
        this.changeTypeTabs();
      })
    },
    changeTypeTabs() {
      this.isskeleton = true;
      // all:0    Voting:1    Passed:2   Rejected:3
      if (this.TypeTabs == 0) {
        this.showgovernanceList = this.governanceList;
      }
      if (this.TypeTabs == 1) {
        this.showgovernanceList = this.VotingList;
      }
      if (this.TypeTabs == 2) {
        this.showgovernanceList = this.PassedList;
      }
      if (this.TypeTabs == 3) {
        this.showgovernanceList = this.RejectedList;
      }
      setTimeout(() => {
        this.isskeleton = false;
      }, 600)
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
<style  lang="scss">
.isHintShow {
  background: #eeeded !important;
  color: #838383 !important;
}
.whiteTheme .VoteCls {
  background: #edfaf0;
  border-radius: 23px;
  color: #37cc6e;
}
.VoteCls {
  border: none;
  width: 100%;
  font-size: 12px;
  height: 32px;
  line-height: 32px;
}
.blackTheme .VoteCls {
  background: #39493d;
  border-radius: 23px;
  color: #37cc6e;
}
.goverSkeleton {
  background: #f6f6f6;
}
.governanceCollapse {
  border: none !important;
  .el-collapse-item__header {
    border-bottom: none;
    height: auto;
    line-height: 1;
    justify-content: center !important;
    color: #a6a6a6;
    .el-collapse-item__arrow {
      margin: 0 0 0 4px !important;
      color: #a6a6a6;
    }
  }
  .el-collapse-item__wrap {
    margin-top: 20px;
  }
  .el-collapse-item__arrow {
    transform: rotate(90deg);
    font-size: 16px;
  }
  .el-collapse-item__arrow.is-active {
    transform: rotate(-90deg);
  }
}
.governaceDiv {
  width: 98%;
  margin: 12px auto;
  height: auto;
  background: #ffffff;
  border-radius: 10px;
  position: relative;
  .governaceDiv-status {
    width: 96px;
    height: 34px;
    line-height: 34px;
    background: #edfaf0;
    border-radius: 23px;
    color: #37cc6e;
  }
  .governaceDivStatus {
    width: 98px;
    height: 98px;
    position: absolute;
    top: -50px;
    right: -50px;
    transform: rotate(45deg);
  }
  .governaceDivStatus span {
    position: absolute;
    bottom: 0;
    display: block;
    width: 96px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    color: #ffffff;
    background: linear-gradient(137deg, #ffdc55 0%, #01ddad 100%);
  }
  .voteBg {
    background: linear-gradient(105deg, #ffeeaa 0%, #ffe07a 100%) !important;
    color: #c39a4d !important;
  }
  .huiBg {
    background: #f2f2f2 !important;
    color: #3a3a3a !important;
  }
  .rejectedBg {
    color: #ffffff;
    background: linear-gradient(90deg, #ffa180 0%, #ff556b 100%) !important;
  }
  .PassedBg {
    color: #ffffff;
    background: linear-gradient(137deg, #FFDC55 0%, #01DDAD 100%) !important;
  }
  .governace-process {
    width: 100%;
    height: 12px;
    overflow: hidden;
    background: #e8e8e8;
    border-radius: 8px;
    padding-right: 1px;
    .rightBor {
      border-radius: 0 4px 4px 0;
    }
    .leftBor {
      border-radius: 4px 0 0 4px;
    }
    .radius4 {
      border-radius: 4px !important;
    }
    .processYes {
      width: 50%;
      height: 12px;
      background: #5ccd53;
    }
    .processAbstain {
      height: 12px;
      background: #ffcb3b;
    }
    .processNo {
      height: 12px;
      background: #959595;
    }
  }
  .governace-processVal {
    width: 104px;
  }
}
.connectBtm {
  width: 96px;
  height: 34px;
  text-align: center;
  line-height: 34px;
  background: #edfaf0;
  border-radius: 23px;
  color: #37cc6e;
}
.amountInp {
  width: 100%;
  border: 4px solid #f6f6f6;
  border-radius: 8px;
  background: #f6f6f6;
  .amountInpCon {
    width: calc(100% - 140px);
    height: auto;
    padding: 12px;
    background: white;
    border-radius: 6px;
    .el-input__inner,
    .el-input__inner:focus {
      width: 100%;
      border: none;
      outline: 0;
      height: auto;
      line-height: 1;
      text-align: left;
      padding: 0;
    }
    input,
    input:focus {
      width: 100%;
      border: none;
      outline: 0;
    }
  }
  p {
    width: 70px;
    text-align: center;
  }
}
.voteHint {
  width: auto;
  height: auto;
  padding: 4px 8px;
  border-radius: 16px;
  border: 1px solid #ffc5c5;
  display: inline-block;
  max-width: 100%;
}
.voteBtn {
  background: #2dc478;
  color: white;
}
.voteRadio {
  .el-radio__inner {
    width: 22px;
    height: 22px;
  }
  .el-radio__input.is-checked .el-radio__inner::after {
    display: none;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: transparent;
    background: url("https://thecelo.com/staticNew/radioSel.png") center center
      no-repeat;
    background-size: 100% 100% !important;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #2dc478;
  }
}
</style>
