<template>
  <div :class="$store.state.themeCls">
    <div class="mainContainer">
        <p class="primaryTitle">Group Details</p>
        <div class="mainCon-sub">
          <!-- 首行 -->
          <el-row class="marTop32">
            <el-col :lg="14" :md="14" :sm="12" :xs="24" class="marBtm20">
              <div class="flexDiv flexStart">
                <div class="flexDiv columnFlex marLeft12" style="width: 90px;">
                  <img :src="gropLogo" style="width: 76px;" class="radius50per marTop4">
                  <!-- <img src="https://thecelo.com/images/Group.svg" style="width: 52px"> -->
                  <p class="rankCls marTop8 Text16">Rank: {{rank}}</p>
                </div>
                <div style="width:calc(100% - 112px)">
                  <p class="Text24 fontweight">{{groupName}}<span class="groupCls Text16 marLeft4">Group</span></p>
                  <!-- address -->
                  <div class="flexDiv justifyStart marTop12">
                    <p class="Text18 h1Color oneLine">{{showAddress}}</p>
                    <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom">
                      <span class="iconfont Text22 icon-lianjie h3Color cursorPointer" @click="jumpAddress(showAddress)">
                      </span>
                    </el-tooltip>
                    <el-tooltip class="item marLeft4" placement="bottom">
                      <div slot="content" class="Text14">
                        Copy Address: {{showAddress}}
                      </div>
                      <span class="iconfont Text22 icon-fuzhi h3Color cursorPointer" v-clipboard:copy="showAddress" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                      </span>
                    </el-tooltip>
                  </div>
                  <!-- Domain -->
                  <p class="flexDiv justifyStart Text18 h1Color marTop12">Domain：
                    <span class="blueColor cursorPointer marRight8" @click="onlyJumpUrl(domainData)">{{domainData}}</span>
                    <span v-if="website" @click="jumpUrl(website)" class="marRight8 cursorPointer"><i class="iconfont Text22 icon-diqiu greenColor"></i></span>
                    <span v-if="twitter && groupName != 'Polychain'" @click="jumpUrl(twitter)" class="marRight8 cursorPointer"><i class="iconfont Text20 icontwitter_blank greenColor"></i></span>
                    <span v-if="github && groupName != 'Polychain'" @click="jumpUrl(github)" class="marRight8 cursorPointer"><i class="iconfont Text22 icongithub1 greenColor"></i></span>
                    <!-- 新的 Github link - 
                      新的 Twitter link -  -->
                    <span v-if="twitter && groupName == 'Polychain' " @click="jumpUrl('https://twitter.com/polychain')" class="marRight8 cursorPointer"><i class="iconfont Text20 icontwitter_blank greenColor"></i></span>
                    <span v-if="github && groupName == 'Polychain'" @click="jumpUrl('https://github.com/Polychain')" class="marRight8 cursorPointer"><i class="iconfont Text22 icongithub1 greenColor"></i></span>
                    <span v-if="keybase" @click="jumpUrl(keybase)" class=" cursorPointer"><i class="iconfont Text22 iconkeybase greenColor"></i></span>
                  </p>
                  <!-- Metadata -->
                  <div class="flexDiv Text16 justifyStart h1Color marTop4">Metadata：
                    <p class="Text18 blueColor oneLine">{{metadataUrl}}</p>
                    <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom">
                      <span class="iconfont Text22 icon-lianjie h3Color cursorPointer" @click="jumpUrl(AllmetadataUrl)">
                      </span>
                    </el-tooltip>
                    <el-tooltip class="item marLeft4" placement="bottom">
                      <div slot="content" class="Text14">
                        Copy Address: {{AllmetadataUrl}}
                      </div>
                      <span class="iconfont Text22 icon-fuzhi h3Color cursorPointer" v-clipboard:copy="AllmetadataUrl" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                      </span>
                    </el-tooltip>
                  </div>
                  <!--  -->
                  <p class="Text18 marTop14 h5Color">{{bio}}</p>
                </div>
              </div>
            </el-col>
            <el-col :lg="10" :md="10" :sm="12" :xs="24" class="marBtm20">
              <div class="myCard">
                <p class="Text18">Balance</p>
                <el-row class="">
                  <el-col :lg="8" :md="8" :sm="8" :xs="8">
                    <div class="balanceDiv">
                      <p class="greenColor">{{AvailableNum | thousands}}</p>
                      <p class="Text14 h4Color">Available CELO</p>
                    </div>
                  </el-col>
                  <el-col :lg="8" :md="8" :sm="8" :xs="8">
                    <div class="balanceDiv">
                      <p class="greenColor">{{LockedNum | thousands}}</p>
                      <p class="Text14 h4Color">Locked CELO</p>
                    </div>
                  </el-col>
                  <el-col :lg="8" :md="8" :sm="8" :xs="8">
                    <div class="balanceDiv">
                      <p class="greenColor">{{Pending | thousands}}</p>
                      <p class="Text14 h4Color">Pending CELO</p>
                    </div>
                  </el-col>
                  <el-col :lg="8" :md="8" :sm="8" :xs="8">
                    <div class="balanceDiv">
                      <p class="greenColor">{{AvailableUsd | thousands}}</p>
                      <p class="Text14 h4Color">Available cUSD</p>
                    </div>
                  </el-col>
                  <el-col :lg="8" :md="8" :sm="8" :xs="8">
                    <div class="balanceDiv">
                      <p class="greenColor">{{TotalNum | thousands}}</p>
                      <p class="Text14 h4Color">Total CELO</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <!-- 二行 -->
          <el-row class="marTop22" :gutter="20">
            <el-col :lg="7" :md="8" :sm="12" :xs="24" class="marBtm20">
              <div class="myCard leftSpecialBg" style="padding-top: 26px;height:816px">
                <p class="Text22">Identify</p>
                <div class="flexDiv justifyEnd marTop12 marBtm12">
                  <div class="identifyKuai" v-for="(di, index) in badges_html" :key="index">
                    <img :src="di">
                  </div>
                </div>
                <div>
                  <div v-for="(iden, index) in identifyList" :key="index" class="flexDiv justifyStart marTop17">
                    <p class="Text16 h3Color oneLine" style="width:calc(100% - 20px)">{{iden.name}}
                      <el-tooltip v-if="iden.tooglie" class="item marLeft4" :content="iden.tooglie" placement="bottom">
                        <span class="iconfont icon-lianjie h3Color cursorPointer">
                        </span>
                      </el-tooltip>
                    </p>
                    <p style="width: 18px;" class="textRight">
                      <i v-if="iden.checked" class="iconfont icon-duigou greenColor Text14"></i>
                      <span v-if="!iden.checked" class="greenColor Text14">—</span>
                    </p>
                  </div>
                  <div class="marTop24" style="height: 120px">
                    <p class="textCenter Text12 marTop4 h4Color">
                      <!-- —Learn about Validator Badges  -->
                      <!-- <a class="blueColor" href="https://github.com/celo-org/celo-monorepo/tree/master/packages/web/validator-badges">here</a> -->
                    </p>
                    <p class="textCenter Text12 marTop4 h4Color">—Voting # choosing a validator group 
                      <a class="blueColor" href="https://docs.celo.org/celo-gold-holder-guide/voting-validators#choosing-a-validator-group">guide.</a>
                    </p>
                    <p class="textCenter Text12 marTop4 h4Color marBtm4">—
                      <a class="blueColor" href="https://github.com/bi23com/thecelo/blob/master/identify.en.md">Here</a> 
                      are some notes on group's identify.
                    </p>
                  </div>
                  <div style="width:100%;height:36px" v-show="badges_html.length < 1"></div>
                </div>
              </div>
              <div class="myCard marTop32 leftSpecialBg" style="padding-top: 26px;padding-bottom: 26px;">
                <p class="Text22 marTop4">Info</p>
                <div class="">
                  <div class="flexDiv marTop22 h3Color Text16">Commission<p class="Text16 greenColor">{{Commission}}%</p></div>
                  <div class="flexDiv marTop22 h3Color Text16">Next Commission<p class="Text16 greenColor">{{nextCommission}}</p></div>
                  <div class="flexDiv marTop22 h3Color Text16">Next Commission Block<p class="Text16 greenColor">{{nextCommissionBlock}}</p></div>
                  <div class="flexDiv marTop22 h3Color Text16">Slashing Multiplier<p class="Text16 greenColor">{{slashingMultiplier}}</p></div>
                  <div class="flexDiv marTop22 h3Color Text16">Last Slashed<p class="Text16 greenColor">{{lastSlashed}}</p></div>
                  <div class="flexDiv marTop22 h3Color Text16">Members Updated<p class="Text16 greenColor">{{MembersUpdated}}</p></div>
                </div>
              </div>
            </el-col>
            <el-col :lg="17" :md="16" :sm="12" :xs="24" class="marBtm20">
              <el-row :gutter="20">
                <el-col :lg="12" :md="12" class="marBtm20">
                  <div class="myCard" style="height: 364px">
                    <div class="flexDiv Text16">
                      <p class="Text24" style="height: 60px">
                        Total Voting Capacity
                        <span class="greenColor marLeft6 ">
                          {{totalVotes | thousands}}
                        </span>
                      </p>
                    </div>
                    <vab-chart style="width: 100%;height: 270px" class="echartsCon" :autoresize="true" :options="CapacityEcharts" 
                     :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')"/>
                  </div>
                </el-col>
                <el-col :lg="12" :md="12" class="marBtm20">
                  <!-- Total Votes -->
                  <div class="myCard" style="height: 364px">
                    <div class="flexDiv flexStart" style="height: 60px">
                      <p class="Text24">
                        Total Votes
                        <span class="greenColor marLeft6 ">
                          {{total_votes | thousands}}
                        </span>
                      </p>
                      <p>
                        <span @click="changeVotesType('Votes')" class="iconfont Text22 cursorPointer icon-tubiaozoushitu" :class="VotesType == 'Votes' ? 'greenColor' : ''"></span>
                        <span @click="changeVotesType('Details')" class="marLeft8 Text22 cursorPointer iconfont icon-liebiao" :class="VotesType == 'Details' ? 'greenColor' : ''"></span>
                      </p>
                    </div>
                    <div class="DailyType" v-show="VotesType == 'Votes'">
                      <vab-chart style="width: 100%;height: 270px" class="echartsCon" :autoresize="true" :options="totalVotesEcharts"
                       :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartBlue' : 'blackThemeEchartBlue')" />
                    </div>
                    <!-- Details -->
                    <div v-show="VotesType == 'Details'" class="myTable tabTable" style="margin-top: 10px;">
                      <el-table height="270" class="downLoadTable" :data="totalVotesList" fit stripe 
                         align="center" style="width: 100%;overflow-y:hidden;" :default-sort="{prop: 'percentSort', order: 'descending'}">
                        <template slot="empty">
                          <div class="flexDiv columnFlex justifyCenter" style="height: 270px;">
                            <img src="../../assets/images/notData2.png" class="normalImg">
                            <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
                          </div>
                        </template>
                        <el-table-column prop="EpochShow" label="Address" min-width="160"  show-overflow-tooltip>
                          <template slot-scope="scope">
                            <div class="flexDiv justifyStart">
                              <p class="Text16 oneLine" style="max-width: 79%">{{scope.row.address | normalAddress}}</p>
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
                        <el-table-column prop="voters" align="center" min-width="100" label="Voting" show-overflow-tooltip>
                          <template slot-scope="scope">
                            <span class="">{{scope.row.voters | formatNum3 | thousands}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="percentSort" align="center" label="Percent" show-overflow-tooltip>
                          <template slot-scope="scope">
                            <span class="">{{scope.row.percent }}%</span>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <!-- Vote/Revoke Records -->
              <el-row class="">
                <el-col :span="24">
                  <div class="myCard" style="height: 430px">
                    <div class="flexDiv">
                      <p class="Text22">Vote/Revoke Records
                        <el-tooltip class="">
                          <div slot="content" class="Text14">* Excluding the votes rewarded per epoch</div>
                          <span class="iconfont icon-zhushi h3Color cursorPointer">
                          </span>
                        </el-tooltip>
                      </p>
                      <download-excel class = "export-excel-wrapper" :data="downVoteRevokeList" :fields="downRecordsfields"
                        header="" name = "Vote/Revoke Records.xls">
                        <span class="iconfont icon-downLoaddoc Text22 h3Color cursorPointer hoverGreen"></span>
                      </download-excel>
                    </div>
                    <div class="tabGroup flexDiv smallTab marTop12">
                      <el-tabs v-model="RecordsType" class="epochDetailChange">
                        <el-tab-pane label="Epoch" name="Records">
                          <p slot="label" class="tabWid" style="width:86px;">Epoch</p>
                          <div class="DailyType">
                            <vab-chart style="width: 100%;height: 290px" class="echartsCon" :autoresize="true" :options="VoteRevokeRecordEcharts" 
                             :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartGreen' : 'blackThemeEchartGreen')"/>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="Details" name="Details">
                          <p slot="label" class="tabWid" style="width:86px;">Details</p>
                          <div class="myTable tabTable" style="margin-top:0;">
                            <el-table height="300" class="downLoadTable" :data="VoteRevokeRecordsList" fit stripe 
                              align="center" style="width: 100%;overflow-y:hidden;" :default-sort="{prop: 'EpochShow', order: 'descending'}">
                              <template slot="empty">
                                <div class="flexDiv columnFlex justifyCenter" style="height: 250px;">
                                  <img src="../../assets/images/notData2.png" class="normalImg">
                                  <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
                                </div>
                              </template>
                              <el-table-column prop="EpochShow" label="Epoch" min-width="260"  show-overflow-tooltip>
                                <template slot-scope="scope">
                                {{scope.row.epoch}}
                                </template>
                              </el-table-column>
                              <el-table-column prop="Votes" label="Votes" align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                  <span class="">{{scope.row.votes | formatNum3 | thousands}}</span>
                                </template>
                              </el-table-column>
                              <el-table-column prop="percentSort" width="160" label="+/-" align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                  <span class="">{{scope.row.addVotes }}</span>
                                </template>
                              </el-table-column>
                            </el-table>
                          </div>
                        </el-tab-pane>
                      </el-tabs>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <!-- Daily Votes Rewards ARY -->
              <el-row class="marTop32">
                <el-col :span="24">
                  <div class="myCard">
                    <div class="flexDiv">
                      <div class="flexDiv Text22 justifyStart">
                        Daily Votes Rewards ARY
                        <p class="h3Color Text16">
                          {{RewardsARY | thousands}}
                          <el-tooltip class="">
                            <div slot="content" class="Text14">* APY = ((1+EpochRewards/ActivatedVotes)^365-1)×100</div>
                            <span class="iconfont icon-zhushi h3Color cursorPointer">
                            </span>
                          </el-tooltip>
                        </p>
                      </div>
                      <download-excel class = "export-excel-wrapper" :data="downRewardsARYList" :fields="downDailyfields"
                        header="" name = "Daily Votes Rewards ARY.xls">
                        <span class="iconfont icon-downLoaddoc Text22 h3Color cursorPointer hoverGreen"></span>
                      </download-excel>
                    </div>
                    <div class="tabGroup flexDiv smallTab marTop12">
                      <el-tabs v-model="RewardsType" class="epochDetailChange">
                        <el-tab-pane label="Rewards" name="Rewards">
                          <p slot="label" class="tabWid" style="width:86px;">Epoch</p>
                          <div class="DailyType">
                            <vab-chart style="width: 100%;height: 209px" class="echartsCon" :autoresize="true" :options="RewardsARYEcharts" 
                             :theme="($store.state.themeCls == 'whiteTheme' ? 'whiteThemeEchartGreen' : 'blackThemeEchartGreen')"/>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="Details" name="Details">
                          <p slot="label" class="tabWid" style="width:86px;">Details</p>
                          <div class="myTable tabTable" style="margin-top:0;">
                            <el-table height="210" class="downLoadTable" :data="rewardsARYList" fit stripe 
                              align="center" style="width: 100%;overflow-y:hidden;" :default-sort="{prop: 'EpochShow', order: 'descending'}">
                              <template slot="empty">
                                <div class="flexDiv columnFlex justifyCenter" style="height: 210px;">
                                  <img src="../../assets/images/notData2.png" class="normalImg">
                                  <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
                                </div>
                              </template>
                              <el-table-column prop="EpochShow" label="Epoch" min-width="260"  show-overflow-tooltip>
                                <template slot-scope="scope">
                                {{scope.row.epoch}}
                                </template>
                              </el-table-column>
                              <el-table-column prop="apy" label="APY" align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                  <span class="">{{scope.row.apy}}%</span>
                                </template>
                              </el-table-column>
                              <el-table-column prop="rewards" width="160" label="Rewards" align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                  <span class="">{{scope.row.rewards | formatNum3 | thousands }}</span>
                                </template>
                              </el-table-column>
                            </el-table>
                          </div>
                        </el-tab-pane>
                      </el-tabs>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!--  -->
          <div v-for="(pd, index) in groupData" :key="index">
            <groupPart :groupPart="pd"></groupPart>
          </div>
          <!-- 下方几个 tab 表格 -->
          <tabTable :showAddress="showAddress"></tabTable>
        </div>
    </div>
  </div>
</template>

<script>
import groupPart from "@/views/validatorsDetail/groupPart.vue";
import tabTable from "@/views/validatorsDetail/grouptabTable.vue";
import * as echarts from "echarts";
// import VabChart from "vue-echarts";
import VabChart from "@/plugins/echarts";
import { account } from "@/assets/api/requset.js";
export default {
  name: "groupDetail",
  data() {
    return {
      gropLogo: '',
      groupName: '',
      groupAddress: this.$route.params.id,
      showAddress: '',
      domainData: '',
      metadataUrl: '',
      AllmetadataUrl: '',
      bio: '',
      website: '',   // icongloable
      twitter: '',   // icontwitter_blank
      github: '',    // icongithub1
      keybase: '',   // iconkeybase
      rank: '',
      // Balance 数据
      AvailableNum:'',
      LockedNum:'',
      Pending:'',
      AvailableUsd:'',
      TotalNum:'',
      badges_html: [],
      // Info
      Commission: '',
      nextCommission: '',
      nextCommissionBlock: '',
      slashingMultiplier: '',
      lastSlashed: '',
      MembersUpdated: '',
      // <!-- Total Voting Capacity -->
      totalVotes:'',
      activeVotes: '',
      activeVotesPer: '',
      pendingVotes: '',
      pendingVotesPer: '',
      remainingVotes: '',
      remainingVotesPer: '',
      CapacityEcharts: {
        tooltip: {
          trigger: "item",
          formatter: (res) => {
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            var str = `<div class="${cls}"><span class="Text16 textColor">${res.data.name}</span>
              <p class="tooltipHint Text16 marTop8">${res.data.showValue}（${res.data.per}%）</p></div>`;
            return str;
          }
        },
        grid: {
          top: "0",
          right: "10",
          bottom: "26",
          left: "10"
        },
        legend: {
          type: 'scroll',  // 数据过多时，分页显示
          // orient: 'vertical',
          right: 0,
          bottom: 10,
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            color: "#999999", //图例文字
            fontSize: '12'
          },
          formatter: function (name) {
            return (name.length > 21 ? (name.slice(0, 21) + "...") : name);
          },
        },
        series: [
          {
            name: '',
            type: 'pie',
            minAngle: 2,
            radius: ['39%', '58%'],
            startAngle: 90,
            center: ['50%', '44%'],
            // avoidLabelOverlap: false,
            avoidLabelOverlap: true,//对，就是这里avoidLabelOverlap
            label: {
              normal: {
                show: true,
                formatter: '{d}%',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
                textStyle: {
                  align: 'center',
                  baseline: 'middle',
                  fontSize: 12,
                }
              },
            },
            labelLine: {
              show: true,//数据标签引导线
              length: 3,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            data: [],
            itemStyle: {
              color: function (params) {
                var colorList = ["#49A1FF", "#4FCCCB" , "#FFCB3D"];
                return colorList[params.dataIndex];
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      CapacityData: [],
      // Total Votes
      VotesType: 'Votes',
      total_votes: '',
      totalVotesList: [],
      totalVotesEcharts: {
        tooltip: {
          trigger: "item",
          formatter: (res) => {
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            var str = `<div class="${cls}">
              <span class="Text16 textColor">${res.data.name}</span>
              <p class="tooltipHint Text16 marTop8 flexDiv"><span style="width:120px;display:inline-block;text-align:left" class="textColor">Votes</span>
                ${this.$format.IntNumFilterThreeCut(res.data.value)}</p>
              <p class="textRight Text16 marTop4 tooltipHint">${res.percent}%</p></div>`;
            return str;
          }
        },
        grid: {
          top: "0",
          right: "10",
          bottom: "26",
          left: "10"
        },
        legend: {
          type: 'scroll',  // 数据过多时，分页显示
          // orient: 'vertical',
          right: 0,
          bottom: 10,
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            color: "#999999", //图例文字
            fontSize: '12'
          },
          formatter: function (name) {
            return (name.length > 21 ? (name.slice(0, 21) + "...") : name);
          },
          // data: [],
          // selected: {}  //这里默认显示数组中前六个，如果不设置，则所有的数据都会显示在图表上
        },
        series: [
          {
            name: '',
            type: 'pie',
            minAngle: 2,
            radius: ['39%', '58%'],
            startAngle: 90,
            center: ['50%', '47%'],
            avoidLabelOverlap: true,//对，就是这里avoidLabelOverlap
            label: {
              normal: {
                show: true,
                formatter: '{d}%',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
                textStyle: {
                  align: 'center',
                  baseline: 'middle',
                  fontSize: 12,
                }
              },
            },
            labelLine: {
              show: true,//数据标签引导线
              length: 4,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            data: [],
            itemStyle: {
              color: function (params) {
                // 多  到  少
                var colorList = ["#5BCB74", "#49A1FF", "#FFCB3D", "#7B72E6",  "#4FCCCB", "#F3657C", "#E076F0", "#B6E481", "#F99C47", "#79EAD6"];
                return colorList[params.dataIndex];
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      group_epoch_votes: {},
      // identify
      identifyList: [],
      // Vote/Revoke Records
      RecordsType: 'Records',  // Details
      VoteRevokeRecordsList: [],
      downVoteRevokeList: [],
      // downRecordsfields 
      downRecordsfields:{
        Epoch: 'epoch',
        Votes: 'svotes',
        '+/-': 'addVotes'
      },
      recordDatafirstThree:[],
      recordDataLastThree: [],
      VoteRevokeRecordEcharts: {
        tooltip: {
          trigger: "axis",
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置
            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];
            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];
            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }
            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }
            return [x, y];
          },
          formatter: (res) => {
            var i= res[0].dataIndex;
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            var str = `<div class="${cls}">
              <span class="textColor Text16">${this.VoteRevokeRecordsList[i].epoch02}</span><p class="tooltipHint Text16 marTop4 marBtm6 flexDiv">
              <span style="width: 100px;display:inline-block;" class="textColor">Votes</span>${this.$format.thousands(this.VoteRevokeRecordsList[i].votes)}</p>
              <p class="tooltipHint Text16 textRight">${this.VoteRevokeRecordsList[i].addVotes}</p></div>
              `
            return str;
          }
        },
        grid: {
          top: "34",
          right: "0",
          bottom: "30",
          // left: "100",
          left: '0'
        },
        legend: {
          bottom: "0",
          textStyle: {
            color: "#999999", //图例文字
          },
          itemWidth: 14,
          itemHeight: 8,
        },
        xAxis: {
          type: "category",
          data: [],
          axisTick: { show: false },
          splitLine: { show: false },
          axisLine: { show: false },
          axisLabel: { textStyle: { color: "#999999", fontSize: "12" } },
        },
        yAxis: {
          type: "value",
          // name:'Votting',
          // nameLocation: "middle",    //坐标位置，支持start,end，middle
          // nameTextStyle: { 
          //   fontSize: 12,//正常是不用添加
          //   padding: 62 //距离坐标位置的距离
          // },
          axisLine: { show: false },
          axisLabel: { show: false },
          // axisLabel: { textStyle: { color: "#999999", fontSize: "12" } },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        series: [
          {
            name: "",
            smooth: 0.6,
            symbol: 'none',   // 不显示拐点
            type: "line",
            markPoint: {
              symbol: 'image://https://thecelo.com/staticNew/markBgEmpty.png',
              // symbolSize: [96, 28], //容器大小
              symbolOffset: ['0', '-5'],  // 位置偏移
              animation: false,
              itemStyle: {
                normal:{
                  label:{
                    color: (res) => {},//气泡中字体颜色
                    fontSize: 12,
                    fontWeight: 'normal',
                    formatter:  (res) => {
                      if(this.$store.state.themeCls == 'whiteTheme'){
                        if(this.recordDatafirstThree.indexOf(JSON.stringify(res.value)) != -1){
                          return `{a|              ${this.$format.thousands(res.value)}}`
                        }
                        if(this.recordDataLastThree.indexOf(JSON.stringify(res.value)) != -1){
                          return `{a| ${this.$format.thousands(res.value)}}                      `
                        }
                        return `{a| ${this.$format.thousands(res.value)}}`
                      }
                      // console.log(this.recordDatafirstThree+"=22==this.recordDatafirstThree==="+res.value)
                      if(this.recordDatafirstThree.indexOf(JSON.stringify(res.value)) != -1){
                      // console.log(this.recordDatafirstThree+"===336 this.recordDatafirstThree==="+res.value)
                        return `{b|              ${this.$format.thousands(res.value)}}`
                      }
                      if(this.recordDataLastThree.indexOf(JSON.stringify(res.value)) != -1){
                        return `{b| ${this.$format.thousands(res.value)}}                      `
                      }
                      return `{b| ${this.$format.thousands(res.value)}}`
                    },
                    rich: {
                      a: {
                        color: '#4a4a4a'
                      },
                      b: {
                        color: '#ffffff',
                      }
                    }
                  }
                }
              },
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            data: [],
            itemStyle: {
              normal: {
                color: '#63CF59',
              },
            },
          },
        ],
      },
      // Daily Votes Rewards ARY
      RewardsARY: '',
      RewardsType: 'Rewards',   //Details
      rewardsARYList: [],
      downRewardsARYList: [],
      downDailyfields: {
        Epoch: 'epoch',
        APY: 'sapy',
        Rewards: 'sRewards'
      },
      RewardsARYEcharts: {
        tooltip: {
          trigger: "axis",
          formatter: (res) => {
            var i= res[0].dataIndex;
            var cls = this.$store.state.themeCls != 'whiteTheme' ? 'blackTooltip' : '';
            var str = `
              <div class="${cls}">
              <span class="textColor Text16">${this.rewardsARYList[i].epochTitle}</span>
              <div class="flexDiv marTop4"><p style="width: 120px;" class="Text14">APY</p>
                 <p style="width: 120px;" class="Text16 textRight tooltipHint">${this.rewardsARYList[i].apy}%</p></div>
              <div class="flexDiv marTop4"><p style="width: 120px;" class="Text14">ActivatedVotes</p>
                 <p style="width: 120px;" class="Text16 textRight tooltipHint">${this.rewardsARYList[i].activated_votes.toFixed(2)}</p></div>
              <div class="flexDiv marTop4"><p style="width: 120px;" class="Text14">Rewards</p>
                 <p style="width: 120px;" class="Text16 textRight tooltipHint">
                 ${this.$format.thousands(this.rewardsARYList[i].rewards.toFixed(2))}&nbsp;CELO</p></div></div>
              `
            return str;
          }
        },
        grid: {
          top: "34",
          right: "0",
          bottom: "30",
          left: "20",
        },
        legend: {
          bottom: "0",
          textStyle: {
            color: "#999999", //图例文字
          },
          itemWidth: 14,
          itemHeight: 8,
        },
        xAxis: {
          type: "category",
          data: [],
          axisTick: { show: false },
          splitLine: { show: false },
          axisLine: { show: false },
          axisLabel: { textStyle: { color: "#999999", fontSize: "12" } },
        },
        yAxis: {
          type: "value",
          // name:'APY(%)',
          nameLocation: "middle",    //坐标位置，支持start,end，middle
          nameTextStyle: { 
            fontSize: 12,//正常是不用添加
            padding: 8 //距离坐标位置的距离
          },
          axisLine: { show: false },
          axisLabel: { textStyle: { color: "#999999", fontSize: "12" } },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        series: [
          {
            name: "",
            smooth: 0.6,
            symbol: 'none',   // 不显示拐点
            type: "line",
            markPoint: {
              symbol: 'image://https://thecelo.com/staticNew/markBgEmpty.png',
              // symbolSize: [64, 30], //容器大小
              symbolOffset: ['0', '-5'],  // 位置偏移
              animation: false,
              itemStyle: {
                normal:{
                  label:{
                    color: (res) => {},//气泡中字体颜色
                    fontSize: 12,
                    fontWeight: 'normal',
                    formatter:  (res) => {
                      if(this.$store.state.themeCls == 'whiteTheme'){
                        return `{a| ${this.$format.thousands(res.value)}}`
                      }
                      return `{b| ${this.$format.thousands(res.value)}}`
                    },
                    rich: {
                      a: {
                        color: '#4a4a4a'
                      },
                      b: {
                        color: '#ffffff',
                      }
                    }
                  }
                }
              },
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            data: [],
            itemStyle: {
              normal: {
                color: '#63CF59',
              },
            },
          },
        ],
      },
      groupData: [],
    };
  },
  components: {
    VabChart,groupPart,tabTable
  },
  computed: {
    themeCls(){
      return this.$store.state.themeCls;
    }
  },
  watch: {
    themeCls(val) {
      this.load_voteds();
      this.getApyData();
    },
    $route() {
      if (this.$route.params.id) {
        this.groupAddress = this.$route.params.id;
        this.firstFun();
      }
    },
  },
  mounted() {
    this.firstFun();
  },
  methods: {
    firstFun(){
      if(this.groupAddress && this.groupAddress.indexOf('0x')===0){
        this.showAddress = this.groupAddress;
        this.goto_load();
      } else{
        var pathnames = window.location.pathname.split('/');
        if(pathnames.length>2){
          var address = pathnames[2];
          if(address&&address.indexOf('0x')===0){
          this.showAddress = address;
            this.goto_load();
          }
          else if(address&&address.length>0){
            this.nameGetAddress();
          }
        }
      }
    },
    changeVotesType(data){
      if(this.VotesType != data){
        this.VotesType = data;
      }
    },
    nameGetAddress(){
       var parmas = {
        method: 'find_address',
        name: encodeURI(this.groupAddress)
      };
      account(parmas).then((response) => {
        this.showAddress = response.address;
        this.goto_load();
      })
    },
    goto_load(){
      this.loadInfo();
      this.load_more()
      this.getUser();
      this.getVotesStatus();
      this.load_voteds();
    },
    getApyData(){
      var parmas = {
        method: 'epochRewardsDistributedToVoters',
        address: this.showAddress
      };
      account(parmas).then((result) => {
        // rewardsARYList
        var apy = 0;
        var activated_votes = 0;
        var rewardsARYList = [];
        var epochDate = [];
        var recordData = [];
        Object.keys(result).forEach((epoch, i) => {
          var rewards = 0;
          if(result[epoch]) {
            rewards = result[epoch]/1e+18;
          }
          var activated_votes = this.group_epoch_votes[epoch].activeVotesForGroup/1e+18;
          if(activated_votes>0){
            apy = (Math.pow(1+rewards/activated_votes,365)-1)*100;
          }
          apy = Number(apy.toFixed(3));
          //
          if(epoch>=27){
            // 列表数据
            let epoch_date = this.$format.getEpochDate(epoch);
            let sRewards = Number(rewards).toFixed(3);
            sRewards = this.$format.thousands(sRewards);
            rewardsARYList.push({
              EpochShow: this.$format.getEpochDateSorate(epoch),
              epoch: epoch_date.substr(5,6),
              epochTitle: this.$format.chartTipTitle(epoch),
              apy: apy,
              sapy: apy+'%',
              activated_votes: activated_votes,
              rewards: rewards,
              sRewards: sRewards
            })
            // 图形数据
            epochDate.push(epoch_date.substr(5,6));
            recordData.push(apy.toFixed(2));
          }
        })
        this.rewardsARYList = rewardsARYList;
        this.downRewardsARYList = [...rewardsARYList].reverse();
         // 修改  x 轴  起始数据内容
        epochDate[0] = `           ${epochDate[0]}`;
        var lasii = epochDate.length - 1;
        epochDate[lasii] = `${epochDate[lasii]}           `;
        this.RewardsARYEcharts.xAxis.data = epochDate;
        this.RewardsARYEcharts.series[0].data = recordData;
      })
    },
    load_voteds(){
      var parmas = {
        method: 'voteds',
        address: this.showAddress
      };
      account(parmas).then((response) => {
        var votes = response.voteds;
        var voters = {};
				var blocks = {};
				var weights = 0;
        //
        var total_activated_votes = 0;
        var epoch_activated_votes = {};
        for(var i=0;i<votes.length;i++){
          var vote = votes[i];
          var from = vote[0];
          var weight = vote[1]/1e+18;
          if(voters[from]) {
            voters[from] += weight;
          } else {
            voters[from] = weight;
          }
          //
          weights += weight;
          blocks[vote[2]] = weights;
          //
          total_activated_votes += weight;//parseInt(vote[3]) + parseInt(vote[4]);
          epoch_activated_votes[Math.ceil(vote[2]/17280)] = total_activated_votes;
        }
        /**
         * 设置 “Total Votes” 图形 + 表格
         * */ 
        this.setTotalVotesData(voters, total_activated_votes );
        
        /**
         * 设置 "Vote/Revoke Records” 图形 + 表格
         * */ 
        this.setVoteRevokeData(blocks);

      })
    },
    setTotalVotesData(voters, activated, itemVote){
      var selected = {};
      var item_vote = [];
      Object.keys(voters).forEach((address, i) => {
        if(voters[address]>0){
          var percent = (voters[address]*100/activated).toFixed(2);
          var percentSort = percent * 100;
          item_vote.push({
            address: address,
            value: Number(voters[address]),
            name: address,
            voters: voters[address],
            percent: percent,
            percentSort: percentSort
          })
        }
      });
      item_vote = item_vote.sort(function(x,y){ return y.percentSort-x.percentSort;});

      var otherList = JSON.parse(JSON.stringify(item_vote));
      var newOtherList = [];
      var otherNum = 0;
      var otherpercent = 0;
      for(var i in otherList){
        if(i < 9){
          newOtherList.push({
            value: otherList[i].value,
            name: otherList[i].name
          });
        } else {
          otherNum+=Number(otherList[i].voters);
          otherpercent+=Number(otherList[i].percent);
        }
      }
      newOtherList.push({
        name: 'others', 
        value: otherNum
      })
      newOtherList = newOtherList.sort(function(x,y){ return y.value-x.value;});

      this.totalVotesList = item_vote;
      for(var i in this.totalVotesList){
        var address = this.totalVotesList[i].name;
        selected[address] = i < 16; //限制图表中起始显示10个，这里必须保证 name 不为空
      }

      this.totalVotesEcharts.series[0].data = newOtherList;
      // 设置显示的数据
      // this.totalVotesEcharts.legend.selected = selected;
      // this.totalVotesEcharts.legend.data = item_vote;
    },
    setVoteRevokeData(blocks){
      var epoch_votes = {};
      var pre_th_epoch = 0;
      Object.keys(blocks).forEach((key, i) => {
        var th_epoch = Math.ceil(key/17280);
        //
        var addVotes = 0;
        if(epoch_votes[th_epoch])
          addVotes = epoch_votes[th_epoch][1];
        //
        var preVotes = 0;
        if(pre_th_epoch>0)
          preVotes = epoch_votes[pre_th_epoch];
        //
        addVotes += parseFloat(blocks[key]) - parseFloat(preVotes);
        epoch_votes[th_epoch] = [blocks[key],addVotes];
        //
        pre_th_epoch = th_epoch;
      });
      var votes = 0;
      var VoteRevokeList = [];
      var epoch_dateData = [];
      var recordData = [];
      Object.keys(epoch_votes).forEach((epoch, i) => {
        var addVotes = 0;
        if(epoch_votes[epoch]){
          votes = epoch_votes[epoch][0];
          addVotes = epoch_votes[epoch][1];
        }
        if(addVotes!=0){
          if(Math.abs(addVotes)>=0.0001){
            addVotes = (addVotes>0?'+':'') + this.$format.thousands(addVotes.toFixed(4));
          }
          else{
            addVotes = addVotes.toFixed(18);
          }
          let epoch_date = this.$format.getEpochDate(epoch);
          epoch_dateData.push(epoch_date.substr(5,6));
          let svotes = votes.toFixed(2);
          svotes = Number(svotes).toFixed(3);
          svotes = this.$format.thousands(svotes);

          VoteRevokeList.push({
            epoch: epoch_date.substr(5,6),
            epoch02: this.$format.chartTipTitle(epoch),
            votes: votes.toFixed(2),
            addVotes: addVotes,
            svotes: svotes,
            EpochShow: this.$format.getEpochDateSorate(epoch),
          })
          recordData.push(votes.toFixed(2));
        }
      });
      this.VoteRevokeRecordsList = VoteRevokeList;
      this.downVoteRevokeList = [...VoteRevokeList].reverse();
      // Daily Transfers  >>>  1:cUSD   2:celo
      // 修改  x 轴  起始数据内容
      epoch_dateData[0] = `                  ${epoch_dateData[0]}`;
      var lasii = epoch_dateData.length - 1;
      epoch_dateData[lasii] = `${epoch_dateData[lasii]}                  `;
      // 取前三个为数组 、 后三个为数组   recordDatafirstThree    recordDataLastThree
      this.recordDatafirstThree = [
        recordData[0], recordData[1], recordData[2]
      ];
      var last1 = recordData.length - 1;
      var last2 = recordData.length - 2;
      var last3 = recordData.length - 3;
      this.recordDataLastThree = [
        recordData[last1], recordData[last2], recordData[last3]
      ];

      this.VoteRevokeRecordEcharts.xAxis.data = epoch_dateData;
      this.VoteRevokeRecordEcharts.series[0].data = recordData;
    },
    getVotesStatus(){
      var parmas = {
        method: 'get_group_epoch_votes',
        address: this.showAddress
      };
      account(parmas).then((response) => {
				this.group_epoch_votes = response;
				var epoch = Math.max.apply(null, Object.keys(response));
				var votes_status = response[epoch];
				var votes_capacity = votes_status.numVotesReceivable;
				var active_votes = votes_status.activeVotesForGroup;
				var active_votes_rate = parseFloat(active_votes*100/votes_capacity).toFixed(2);
				var pending_votes = votes_status.pendingVotesForGroup;
				var pending_votes_rate = parseFloat(pending_votes*100/votes_capacity).toFixed(2);
				var remaining_votes = votes_capacity - active_votes - pending_votes;
        var remaining_votes_rate = parseFloat(100 - active_votes_rate - pending_votes_rate).toFixed(2);
        // 赋值
        this.totalVotes = this.$format.formatAmount(votes_capacity,true);
        this.activeVotes = this.$format.formatAmount(active_votes,true);
        this.activeVotesPer = active_votes_rate;
        this.pendingVotes = this.$format.formatAmount(pending_votes,true);
        this.pendingVotesPer = pending_votes_rate;
        this.remainingVotes = this.$format.formatAmount(remaining_votes,true);
        this.remainingVotesPer = remaining_votes_rate;

        this.CapacityData = [
          {value: active_votes, name: 'Active Votes', per: this.activeVotesPer, showValue: this.activeVotes },
          {value: pending_votes, name: 'Pending Votes', per: this.pendingVotesPer, showValue: this.pendingVotes },
          {value: remaining_votes, name: 'Remaining Votes', per: this.remainingVotesPer, showValue: this.remainingVotes }
        ]
        this.CapacityEcharts.series[0].data = this.CapacityData;

        
        this.getApyData();
      })
    },
    loadInfo(){
       var parmas = {
        method: 'metadata',
        address: this.showAddress
      };
      account(parmas).then((response) => {
        var badges_html = [];
        console.log(response.badges+"===response.badges 36")
				for(let i=0;i<response.badges.length;i++){
          badges_html.push(`https://thecelo.com/images/${response.badges[i]}.png`)
				}
        this.badges_html = badges_html;
        

        if(response.metadataURL && response.metadataURL.trim().length>0){
					var metadataURL_html='';
					if(response.identify[0].trim().length>0){
						metadataURL_html = response.identify[0];
					}
					var shorturl = response.metadataURL;
					if(shorturl.length>40){
						shorturl = response.metadataURL.substr(0,25)+'......'+response.metadataURL.substr(response.metadataURL.length-10);
          }
          this.metadataUrl = shorturl;
          this.AllmetadataUrl = response.metadataURL;
          this.domainData = metadataURL_html;
          
        }

        // identifyList
        var identifyList = [];
        var identifyName = ["Domain proven", "Can receive votes", "Will get elected", "Participated in TGCSO", "Master validator challenge in TGCSO",
          "Reliable", "No recent slashing", "Runs an Attestation Service", "Runs a Validator on Baklava", "Receives Celo Foundation votes",
          "Promotes the Celo mission", "Broadens Diversity", "Participates in the community"];
        for(var i=0;i < response.identify.length;i++) {
          identifyList.push({
            name: identifyName[i],
            tooglie: (response.identify[i].trim().length > 0) ? response.identify[i] : '',
            checked: (response.identify[i].trim().length > 0) ? true : false,
          })
        };
        this.identifyList = identifyList;
      })
    },
    load_more(){
       var parmas = {
        method: 'group',
        address: this.showAddress
      };
      account(parmas).then((response) => {
        var group = response.group;
        this.groupName = group[1];
        this.rank = response.rank;
        this.total_votes = this.$format.formatAmount(group[2],true);
        // balance数据
        this.AvailableNum = group[3].toFixed(2);
        this.LockedNum = group[4].toFixed(2);
        this.Pending = group[6].toFixed(2);
        this.AvailableUsd = group[5].toFixed(2);
        var total = parseFloat(group[3]) + parseFloat(group[4]) + parseFloat(group[6]);
        this.TotalNum = total.toFixed(2);
        // Info
        this.Commission = (group[7]*100).toFixed(2);
        this.nextCommission = (parseInt(group[9])==0) ? '—' : ((group[8]*100).toFixed(2)+'%');
        this.nextCommissionBlock = (parseInt(group[9])==0) ? '—' : group[9];
        this.slashingMultiplier = group[10];
        this.lastSlashed = group[11];
        this.MembersUpdated = this.$format.timeSpan(group[12]*1000,'','');

        // groupPart 组件数据
        var members = group[13];
        var elected = 0;
        var groupData = [];
        members.forEach((member)=> {
          var obj = {};
          var fas = 'icon-user-check';
          if(member[5]){
            elected++;
          } else{
            fas ='iconuser-x';
          }  
          obj.title = member[0];
          obj.fasIcon = fas;
          // 组件左侧数据
          obj.copyAddress = member[1];
          obj.address = this.$format.formatAddress(member[1],true,false,true,false,true);
          obj.fulfilled = member[14];
          obj.requested = member[15];
          obj.Score = (member[2]*100).toFixed(2);
          obj.availableCelo = this.$format.thousands(member[6].toFixed(2));
          obj.lockedCelo = this.$format.thousands(member[7].toFixed(2));
          obj.availableCuse = this.$format.thousands(member[8].toFixed(2));
          obj.pendingCelo = this.$format.thousands(member[9].toFixed(2));
          var total = Number.parseFloat(member[6])+Number.parseFloat(member[7]);
          obj.totalCelo = this.$format.thousands(total.toFixed(2));
          obj.elected = (member[5]==true);
          obj.frontrunner = (member[11]==true);
          obj.validator = member[1];

          groupData.push(obj);

        })
        this.groupData = groupData;
      })
    },
    getUser(){
       var parmas = {
        method: 'user',
        address: this.showAddress
      };
      account(parmas).then((response) => {
        if(response){
          //group logo
          if(response.logo && response.logo.trim().length>0){
            this.gropLogo = `https://thecelo.com/logos/${this.showAddress.toLowerCase()}.jpg`
          }
          if(this.groupName && JSON.stringify(this.groupName).indexOf('Polychain') != -1){
            this.gropLogo = `https://thecelo.com/logos/${this.showAddress}.jpg`
          }
              
          if(response.bio && response.bio.trim().length>0){
            this.bio = response.bio;
          }

          //website
          if(response.website && response.website.trim().length>0){
            this.website = response.website;  
          }
          //twitter
          if(response.twitter && response.twitter.trim().length>0){
            this.twitter = response.twitter;
          }
          //github
          if(response.github && response.github.trim().length>0){
            this.github = response.github;
          }
          //keybase
          if(response.username && response.username.trim().length>0){
            this.keybase = 'https://keybase.io/'+response.username;
          }
        }
      })
    },
    jumpAddress(address) {
      this.$store.dispatch('jumpAddress', address);
    },
    jumpUrl(url) {
      this.$store.dispatch('jumpUrl', url);
    },
    onlyJumpUrl(url){
      var jumUrl = url;
      if(url.indexOf('http') == -1 ){
        jumUrl = 'http://'+jumUrl
      }
      window.open(jumUrl);
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
.rankCls {
  width: auto;
  height: auto;
  padding: 2px 8px;;
  background: #5CCD53;
  border-radius: 13px;
  color: white;
}
.groupCls {
  width: auto;
  height: auto;
  padding: 3px 16px 2px 16px;;
  background: #E5F4FF;
  border-radius: 23px;
  color: #0091FF;
  display: inline-block;
}
.balanceDiv {
  text-align: center;
  padding-top: 18px;
  p {
    line-height: 1.4;
  }
}

.identifyKuai {
  width: 36px;
  height: 36px;
  margin-left: 8px;
  text-align: center;
  background: #F6F9FA;
  box-shadow: 0px 2px 4px 0px rgba(178, 216, 203, 0.5);
  border-radius: 4px;
  img {
    width: 36px;
  }
}
</style>
