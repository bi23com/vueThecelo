
<template>
  <div :class="$store.state.themeCls">
    <div class="mainContainer">
      <div class="marBtm12">
        <p class="primaryTitle">Governance</p>
      </div>
      <div class="mainCon-sub">
        <!-- skeleton 骨架图 -->
        <el-row type='flex' style="flex-wrap:wrap;" v-if="isskeleton">
          <el-col :md="8" :sm="12" :xs="24" v-for="(num,nindex) in [1,2,3,4,5,6,7,8,9]" :key="nindex">
            <el-card class="governaceDiv contour01">
              <div class="flexDiv marBtm6">
                <p class="Text22 radius8 goverSkeleton" style="height: 22px;width: calc(100% - 106px);"></p>
                <p class="governaceDiv-status Text18 textCenter goverSkeleton"></p>
              </div>
              <div class="flexDiv cursorPointer marTop24 radius8 goverSkeleton"  style="height: 22px;width: 100%;"></div>
              <div class="flexDiv marBtm6 marTop24 radius8 goverSkeleton" style="height: 22px;width: 100%;"></div>
            </el-card>
          </el-col>
        </el-row>
        <!-- 实际内容 -->
        <waterfall class="goveranceModFat" :data="governanceList" :col="Waterfallcol">
          <template>
            <el-card class="governaceDiv goveranceMod" v-for="(gcl,index) in governanceList" :key="index">
              <div class="flexDiv marBtm6">
                <p class="Text22">#{{gcl.id}}</p>
                <p class="governaceDiv-status Text18 textCenter" :class="gcl.status | statusBg">
                  {{gcl.status == 'Vote' ? 'Voting' : gcl.status}}
                </p>
              </div>
              <div class="flexDiv cursorPointer marTop8" style="height: 44px;" @click="jumpUrl(gcl.address)">
                <p class="marBtm6 Text18 twoLine" style="width:90%">
                  {{gcl.title}}
                </p>
                <i class="el-icon-arrow-right"></i>
              </div>
              <div class="flexDiv marBtm6 marTop24" style="height: 40px;">
                <div style="width: calc(100% - 114px)">
                  <div class="governace-process flexDiv justifyStart">
                    <!--  rightBor  leftBor radius4 -->
                    <el-tooltip v-if="gcl.yesVal > 0" class="processYes" :style="{ 'width': gcl.yesPer+'%' }" placement="top">
                      <div slot="content" class="Text14">
                        Yes: {{gcl.yesVal | thousands}} &nbsp;({{gcl.yesPer}}%)
                      </div>
                      <div></div>
                    </el-tooltip>
                    <el-tooltip v-if="gcl.abstainVal > 0" class="processAbstain" :style="{ 'width': gcl.abstainPer+'%' }" placement="top">
                      <div slot="content" class="Text14">
                        Abstain: {{gcl.abstainVal | thousands}}&nbsp;({{gcl.abstainPer}}%)
                      </div>
                      <div></div>
                    </el-tooltip>
                    <el-tooltip v-if="gcl.noVal > 0" class="processNo rightBor" :style="{ 'width': gcl.noPer+'%' }" placement="top">
                      <div slot="content" class="Text14">
                        No: {{gcl.noVal | thousands}}&nbsp;({{gcl.noPer}}%)
                      </div>
                      <div></div>
                    </el-tooltip>
                  </div>
                  <div class="Text16 marBtm4 h5Color marTop8" v-if="gcl.time">
                    <span class="textRight Text18 marLeft4 blueColor" v-html="gcl.time"></span>
                    until<span class="marLeft4 marRight4">{{gcl.status}}</span>end
                  </div>
                </div>
                <div class="governace-processVal borderLeft" v-if="gcl.maxNum6 > 0">
                  <p class="textRight h5Color Text16 marBtm4">
                    Most voted on
                  </p>
                  <p class="textRight Text18" v-show="gcl.maxNum6 == gcl.yesPer">
                    <span style="width:8px;height:8px;background:#5CCD53;display:inline-block" class="radius50per marRight4"></span>Yes {{gcl.maxNum6}}%</p>
                  <p class="textRight Text18" v-show="gcl.maxNum6 == gcl.noPer">
                    <span style="width:8px;height:8px;background:#5CCD53;display:inline-block" class="radius50per marRight4"></span>No {{gcl.maxNum6}}%</p>
                  <p class="textRight Text18" v-show="gcl.maxNum6 == gcl.abstainPer">
                    <span style="width:8px;height:8px;background:#5CCD53;display:inline-block" class="radius50per marRight4"></span>Abstain {{gcl.maxNum6}}%</p>
                </div>
              </div>  
              <div class="marTop32">
                <el-collapse class="governanceCollapse">
                  <!-- Process -->
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
              </div>
            </el-card>
          </template>
        </waterfall>
      </div>
    </div>
  </div>
</template>

<script>
import { account } from "@/assets/api/requset.js";
export default {
  name: "Governance",
  data() {
    return {
      Waterfallcol: 3,
      screenWidth: 800,
      isskeleton: true,
      governanceList: [],
      cr: {
        address: 'addressaddressaddress'
      },
      timer: '',
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ]
    };
  },
  components: {},
  filters: {
    statusBg(val) {
      if(val == 'Vote'){
        return 'voteBg'
      }
      if(val == 'Rejected'){
        return 'rejectedBg'
      }
    },
  },
  computed: {
  },
  mounted() {
    this.getListData();
    window.screenWidth = document.body.clientWidth || document.body.offsetWidth;
    if(window.screenWidth < 768){
      this.Waterfallcol = 1; 
    } else if (window.screenWidth < 996){
      this.Waterfallcol = 2;
    }

    const that = this
    window.onresize = ()=> {
      return (()=> {
        window.screenWidth = document.body.clientWidth || document.body.offsetWidth;
        that.screenWidth = window.screenWidth;
      })()
    }
  },
  watch: {
    screenWidth(val){
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if(!this.timer){
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        if(val < 768) {
          this.Waterfallcol = 1;
        } else if(val < 996) {
          this.Waterfallcol = 2;
        } else {
          this.Waterfallcol = 3;
        }
        this.timer = true;
        let that = this;
        setTimeout(function(){
          // 打印screenWidth变化的值
          that.timer = false;
        },400)
      }
    }
  },
  methods: {
    jumpUrl(url){
      window.location.href = url;
    },
    jumpAddressDetails(url) {
      if(this.showAddress == url) {return;}
      this.$store.commit('updateheadTabClsId', '6');
      this.$router.push({
        path: `/acountdetail/${url}`
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
        var keys = Object.keys(items).reverse();
        keys.forEach((id, i) => {
          var item  = items[id];
          var time = '';
          var Rejected = false;
          if(['Upvote','Dequeue','Approval','Vote','Execute'].indexOf(item.status)>=0){
            var d = parseInt(item.timespan / (24*3600));
            var h = parseInt((item.timespan % (24*3600)) / 3600);
            var m = parseInt((item.timespan % 3600) / 60);
            time = `${d}d  ${h}h  ${m}m`;
          } else if(['Rejected'].indexOf(item.status)>=0){
            Rejected = true;
          }
          // 处理占比
          var yesVal = 0;
          var noVal = 0;
          var abstainVal = 0;
          var perSum = 0;
          // [["id", "1"], ["Yes", 12639595], ["No", 0], ["Abstain", 0]]
          if(items_vote[id-1][0][1] == id){
            yesVal = items_vote[id-1][1][1];
            noVal = items_vote[id-1][2][1];
            abstainVal = items_vote[id-1][3][1];
            perSum = Number(yesVal) + Number(noVal) + Number(abstainVal);
          }
          var yesPer = (perSum > 0) ? ((yesVal/perSum)*100).toFixed(2) : 0;
          var noPer = (perSum > 0) ? ((noVal/perSum)*100).toFixed(2) : 0;
          var abstainPer = (perSum > 0) ? ((abstainVal/perSum)*100).toFixed(2) : 0;
          var arr = [yesPer, noPer, abstainPer];
          let maxNum6 = (perSum > 0) ? Math.max(...arr) : -1;
          var obj = {
            maxNum6: maxNum6,
            yesVal: yesVal,
            noVal: noVal,
            abstainVal: abstainVal,
            yesPer: yesPer,
            noPer: noPer,
            abstainPer: abstainPer,
            id: id,
            address: item.descriptionUrl,
            status: item.status,
            title: item.title,
            time: time,
            Rejected: Rejected,
            // Proposer
            proposerAddress: item.proposer.address,
            proposerDeposit: item.proposer.deposit,
            proposerTime: this.$format.timeSpan(item.proposer.timestamp*1000,'',''),
            // Upvoters
            UpvotersPeoples: item.upvoted.peoples,
            UpvotersUpvotes: item.upvoted.upvotes,
            //Dequeue
            dequeueAddress: item.dequeue.address,
            dequeueTime: this.$format.timeSpan(item.dequeue.timestamp*1000,'',''),
            //approval
            approvalAddress: item.approval.address,
            approvalTime: this.$format.timeSpan(item.approval.timestamp*1000,'',''),
            //Voters
            votedPeoples: item.voted.peoples,
            votedWeight: item.voted.weight,
            //executor   
            executorFrom: item.executed.from,
            executorTime: this.$format.timeSpan(item.executed.timestamp*1000,'',''),
          };
          governanceList.push(obj);
        })
        this.governanceList = governanceList;
        setTimeout(()=>{
          this.isskeleton = false;
        }, 600);
      })
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
    color: #A6A6A6;
    .el-collapse-item__arrow {
      margin: 0 0 0 4px !important;
      color: #A6A6A6;
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
  .governaceDiv-status {
    width: 96px;
    height: 34px;
    line-height: 34px;
    background: #edfaf0;
    border-radius: 23px;
    color: #37cc6e;
  }
  .voteBg{
    background: #E5F4FF;
    color: #0091FF;
  }
  .rejectedBg{
    color: #F55543;
    background: #FFEDEB;
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
    .radius4{
      border-radius: 4px !important;
    }
    .processYes {
      width: 50%;
      height: 12px;
      background: #5ccd53;
    }
    .processAbstain {
      height: 12px;
      background: #FFCB3B;
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
</style>
