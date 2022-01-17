<template>
  <div :class="$store.state.themeCls">
    <div class="mainContainer">
      <div class="">
        <p class="primaryTitle h1Color">Validator Rewards Calculator</p>
      </div>
      <div class="mainCon-sub">
        <el-card class="marTop32 validator">
          <el-row>
            <el-col :sm='12' :xs="24" class="borderRight hideBorderRightxs">
              <p class="Text22">Choose your parameters?</p>
              <div class="marTop24">
                <div class="padLeft16 padRight16">
                  <div class="padBtm18 borderBottom marBtm24">
                    <p class="Text16 marBtm12">Are you running your own validator group?</p>
                    <div>
                      <el-switch v-model="running" active-color="#5ccd53" inactive-color="#ff4949" active-value="1"
                      inactive-value="0"></el-switch>
                      <span class="marLeft8">{{running =='1'? 'Yes' : 'No'}}</span>
                    </div>
                  </div>
                  <div class="padBtm18 borderBottom marBtm24">
                    <p class="Text16 marBtm8">What percentage of locked Celo do you expect to vote for the validator group you’re in?</p>
                    <div class="flexDiv justifyStart">
                      <!--  -->
                      <el-slider class="marLeft8" style="width: 80%" v-model="voteSlider" :format-tooltip="voteTooltip"></el-slider>
                      <span class="marLeft16 greenColor fontweight">{{showvote}}%</span>
                    </div>
                  </div>
                  <div class="padBtm18 borderBottom marBtm24">
                    <p class="Text16 marBtm8">How many of the group’s validators do you expect to run?</p>
                    <div class="flexDiv justifyStart">
                      <el-slider class="marLeft8" style="width: 80%" v-model="groupSlider" :step="groupStep" :format-tooltip="groupTooltip"></el-slider>
                      <span class="marLeft16 greenColor"><span class="fontweight">{{showgroupSlider}}</span>/{{ownValElected_max}}</span>
                    </div>
                  </div>
                  <div class="padBtm18 borderBottom marBtm24">
                    <p class="Text16 marBtm8">What percentage of rewards does the validator group receive via the group share?</p>
                    <div class="flexDiv justifyStart">
                      <el-slider class="marLeft8" style="width: 80%" v-model="rewardsSlider" :step="5" :format-tooltip="rewardsTooltip"></el-slider>
                      <span class="marLeft16 greenColor fontweight">{{showrewardsVal}}%</span>
                    </div>
                  </div>
                  <div class="padBtm18 marBtm24">
                    <p class="Text16 marBtm8">Estimated price of Celo (in USD)</p>
                    <div class="flexDiv justifyStart">
                      <el-slider class="marLeft8" style="width: 80%" v-model="priceSlider" :format-tooltip="priceTooltip"></el-slider>
                      <span class="marLeft16 greenColor"><span class="fontweight">{{showprice}}</span>:1</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :sm='12' :xs="24">
              <div class="padLeft16">
                <p class="Text22">Assumed protocol parameters</p>
                <div class="marTop12">
                  <div class=" borderBottom marBtm24">
                    <p class="Text16 marBtm8">- Target payment per validator node (annual basis): 
                      <span class="greenColor fontweight">{{targetValReward | thousands}}</span> cUSD
                    </p>
                    <p class="Text16 marBtm12">- Percentage annual reward for staking (dynamically adjusted by protocol): 
                      <span class="greenColor fontweight">{{pctVotingReward}}</span>%
                    </p>
                  </div>
                  <p class="Text22">Estimated annual rewards</p>
                  <div class="marTop12">
                    <p class="Text16 marBtm8">- For running 
                      <span class="greenColor fontweight">{{showgroupSlider}}</span> validator nodes: 
                      <span class="greenColor fontweight">{{valNodesReward_val | thousands}}</span>cUSD
                    </p>
                    <p class="Text16 marBtm8">- For acting as validator group owner: 
                      <span class="greenColor fontweight">{{groupOwnerReward_val | thousands}}</span> cUSD
                    </p>
                    <p class="Text16 marBtm8">- For staking & voting using min. required locked celo: 
                      <span class="greenColor fontweight">{{lockedCELOReward_val | thousands}}</span> cUSD
                    </p>
                    <p class="Text16 marBtm8">- Total rewards: 
                      <span class="greenColor fontweight">{{totalRewardCUSD_val | thousands}}</span> cUSD and 
                      <span class="greenColor fontweight">{{lockedCELOReward_val | thousands}}</span> cUSD 
                      ( approx. <span class="blueColor fontweight">{{totalRewardUSD_val | thousands}}</span> USD*)
                    </p>
                    <p class="Text16 marBtm8">* This calculation is based on the estimated price of CELO provided above.</p>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <p class="textRight Text4 marTop12 marBtm8">Form
            <span class="blueColor marLeft4 cursorPointer wordBreak" @click="jumpOpen()">
              https://observablehq.com/@celohq/validator-rewards-calculator</span>
          </p>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { account } from "@/assets/api/requset.js";
export default {
  name: "validator",
  data() {
    return {
      running: '1',
      voteSlider: 0,
      showvote: '0',
      groupSlider: 0,
      showgroupSlider: '0/0',
      rewardsSlider: 0,
      showrewardsVal: '0',
      priceSlider: 0,
      showprice: '0',
      // 右侧
      targetValReward: 7500,
      pctVotingReward: 6,
      ownValElected_val: 2,
      nodes: 23698,
      owner: 0,
      using: 23698,
      rewardsmin: 36587,
      rewardsmax: 33997,
      approx: 69877

    };
  },
  components: {
  },
  computed: {
    ownValElected_max(){
      return Math.floor(this.showvote) || 0;
    },
    groupStep(){
      if(this.ownValElected_max == 0){
        this.groupSlider = 0;
        this.showgroupSlider = 0;
      }
      return parseInt(100 / this.ownValElected_max) || 0;
    },
    valNodesReward_val(){  
      var per = this.showrewardsVal / 100;
      // var valNodesReward = round(targetValReward*(1-$("#groupShare").val())*($("#ownValElected").val())*rewardsMult, 0);
      var num = this.targetValReward*(1-per)*(this.showgroupSlider)*this.rewardsMult*10;
      return this.$format.roundFun(num, 0)
    },
    groupOwnerReward_val(){
      var per = this.showrewardsVal;
      var totalGroupValElected = Math.floor(this.showvote);
      var num = per*(this.targetValReward/ 10)*totalGroupValElected*this.running;
      // var groupOwnerReward = round($("#groupShare").val()*totalGroupValElected*targetValReward*rewardsMult*ownGroup, 0);
      return this.$format.roundFun(num, 0);
    },
    lockedCELOReward_val(){
      var CELOLockedVals = 10000 * this.showgroupSlider;
	    var CELOLockedGroup = 10000 * Math.floor(this.showvote) * this.running;
      var lockedCELOReward = this.$format.roundFun((CELOLockedVals+CELOLockedGroup)*0.06*this.rewardsMult, 0);
      var lockedCELORewardUSD = this.$format.roundFun(lockedCELOReward * this.showprice, 0);
      return lockedCELORewardUSD;
    },
    totalRewardCUSD_val(){
  	  var totalRewardCUSD = this.$format.roundFun(this.valNodesReward_val + this.groupOwnerReward_val, 0);
      return totalRewardCUSD;
    },
    totalRewardUSD_val(){
	    var totalRewardUSD = this.$format.roundFun(this.totalRewardCUSD_val + this.lockedCELOReward_val, 0);
      return totalRewardUSD;
    },
    rewardsMult(){
      var rewardsMult = 1;
	    var fractionRemaining = 1;
      var overspendAdjustmentFactor = 5; 
      var underspendAdjustmentFactor = 5;
      var maxMultiplier = 2;
       
      if (fractionRemaining<1) {
        let mult = Math.max(0, this.$format.roundFun(1+overspendAdjustmentFactor*(fractionRemaining-1), 4))
        if (isNaN(mult)) {
          rewardsMult = 0
          } else {
            rewardsMult = mult;
            }
      } else {
        rewardsMult = this.$format.roundFun(Math.min(1+underspendAdjustmentFactor*(fractionRemaining-1), maxMultiplier), 4)
      }
      console.log(rewardsMult+"===rewardsMult")
      return rewardsMult;
    },
  },
  mounted() {
    this.$store.commit('updateMoreText', 'more3');
  },
  methods: {
    voteTooltip(val) {
      this.showvote = (val / 16.9).toFixed(1);
      return (val / 16.9).toFixed(1);
    },
    groupTooltip(val) {
      var num = (val && this.groupStep) ? parseInt(val / this.groupStep) : 0;
      this.showgroupSlider = num
      return num+'/'+this.ownValElected_max;
    },
    rewardsTooltip(val) {
      this.showrewardsVal = parseInt(val / 5);
      return parseInt(val / 5) + '%';
    },
    priceTooltip(val) {
      this.showprice = (val / 10).toFixed(1);
      return (val / 10).toFixed(1) ;
    },
    jumpOpen(){
      window.open('https://observablehq.com/@celohq/validator-rewards-calculator');
    }
  }
};
</script>
<style scoped lang="scss">
</style>
