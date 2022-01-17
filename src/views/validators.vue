<template>
  <div :class="$store.state.themeCls">
    <div class="mainContainer">
      <div class="">
        <p class="primaryTitle">Validators</p>
      </div>
      <div class="mainCon-sub">
        <el-row class="marTop42">
          <el-col :md="5" :sm="12" :xs="12" class="marBtm16 borderRight">
            <div class="valiPad">
              <p class="marBtm4 Text18 h5Color textCenter">Group Validators</p>
              <div class="textCenter yibianpan">
                <ybp style="width:90%;height:100px;margin-left:5%" :options="optionsGroup"></ybp>
                <div class="yibianpanText Text30 fontweight">
                  {{elected_group_count}}/{{allGroups}}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :md="5" :sm="12" :xs="12" class="marBtm16 borderRight hideBorderRightxs">
            <div class="valiPad">
              <p class="marBtm4 Text18 h5Color textCenter">Individual Validators</p>
              <div class="textCenter yibianpan">
                <ybpblue style="width:90%;height:100px;margin-left:5%" :options="optionsValidator"></ybpblue>
                <div class="yibianpanText Text30 fontweight">
                  {{elected_validator_count}}/{{validator_count}}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24" class="marBtm16 borderRight hideBorderRightxs">
            <div class="valiPad">
              <p class="marBtm24 Text18 h5Color">Total Votes</p>
              <div class="marBtm12 Text26 fontweight">
                {{total_votes | formatAmountNum}}
              </div>
              <div class="marBtm12 greenColor">
                <span></span>{{total_votes_change > 0 ? '+' : ''}}{{total_votes_change | formatNum | thousands}}
              </div>
            </div>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24" class="marBtm16">
            <div class="valiPad valiPadTop">
              <p class="marBtm24 Text18 h5Color">Elected Minimum Votes</p>
              <el-row>
                <el-col :span="12">
                  <div class="marBtm12 Text26 greenColor fontweight">
                    {{current_minimum_votes | formatAmountNum}}
                  </div>
                  <div class="marBtm12 h5Color">
                    Current
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="marBtm12 Text26  fontweight">
                    {{frontrunner_minimum_votes | formatAmountNum}}
                  </div>
                  <div class="marBtm12 h5Color">
                    Next
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <div class="flexDiv marTop42">
          <div class="flexDiv marTop12 tabGroup">
            <el-tabs v-model="TypeTabs" class="epochDetailChange " @tab-click="changeTypeTabs">
              <el-tab-pane label="Group" name="0">
                <p slot="label" class="tabWid" style="width:96px;">Group</p>
              </el-tab-pane>
              <el-tab-pane label="Validators" name="1">
                <p slot="label" class="tabWid" style="width:96px;">Validators</p>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div v-if="TypeTabs == '0'">
          <div class="myTable myTable02" style="margin-top:0">
            <!-- :default-sort = "{prop: 'Votes', order: 'descending'}" -->
            <el-table v-if="TypeTabs == '0'" class=" downLoadTable" ref="tableSort" :data="groupsListData" fit stripe align="center" style="width: 100%;overflow-y:hidden;"
               @row-click="openDetails" v-loading="isLoadingTableone" element-loading-background="rgba(0, 0, 0, 0)" element-loading-text="loading..." 
               element-loading-spinner="el-icon-loading" min-height="500" :row-class-name="tableRowClassName" v-sticky="{ top: 0 }">
              <template slot="empty">
                <div class="flexDiv columnFlex justifyCenter" style="height: 260px;" v-if="!isLoadingTableone">
                  <img src="../assets/images/notData2.png" class="normalImg">
                  <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
                </div>
              </template>
              <el-table-column width="60" align="center" class="indexCell">
                <template slot-scope="scope">
                  {{scope.row.id}}
                </template>
              </el-table-column>
              <el-table-column prop="address" label="Group" align="center" width="220">
                <template slot-scope="scope">
                  <div class="flexDiv justifyStart cursorPointer startDivFat">
                    <p class="startDiv" @click.stop="">
                      <i class="iconfont" @click="biaojiGroupStart(scope.row.id)" :class="scope.row.isStar == 'isStar' ? 'icon-star blockDiv greenColor Text18' : 'iconicon_rank_star'"></i>
                    </p>
                    <img v-if="scope.row.img" :src="scope.row.img" class="radius50per marRight4 groupListImg">
                    <i v-if="!scope.row.img" class="iconfont iconuser greenColor marRight4 marLeft4" style="font-size:22px;"></i>
                    <p style="width:calc(100% - 66px)" class="Text16 textLeft">
                      <span class="">{{scope.row.address}}</span>
                      <el-tooltip class="item" placement="bottom" v-if="scope.row.isgroup9 && (scope.row.group9 && JSON.stringify(scope.row.group9).trim().length>0)">
                        <div slot="content" class="Text14">
                          Domain claim: {{scope.row.group9}}
                        </div>
                        <i class="p-1 iconfont iconelected greenColor marLeft4" style="font-size:16px;cursor: pointer;"></i>
                      </el-tooltip>
                      <el-tooltip class="item marLeft4" placement="bottom" v-if="scope.row.alladdress">
                        <div slot="content" class="Text14">
                          Copy Address: {{scope.row.alladdress}}
                        </div>
                        <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="scope.row.alladdress" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                        </span>
                      </el-tooltip>
                    </p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Votes" align="center" min-width="154" label="Total Votes">
                <template slot="header" slot-scope="{}">
                  <div class="flexDiv cursorPointer Text18 justifyEnd marRight8" @click="changeSort('Votes')">
                    Total Votes
                    <p class="flexDiv columnFlex Text18">
                      <i class="el-icon-caret-top Text20" :class="(listOneprop=='Votes'&&listOneOrder=='up') ? 'sortBownCls' : 'sortTopCls'"></i>
                      <i class="el-icon-caret-bottom Text20" style="margin-top:-8px;" :class="(listOneprop=='Votes'&&listOneOrder=='down') ? 'sortBownCls' : 'sortTopCls'"></i>
                    </p>
                  </div>
                </template>
                <template slot-scope="scope">
                  <p class="textRight greenColor Text18 marRight12">{{scope.row.Votes | formatAmountNum}}</p>
                  <p class="textRight blueColor Text16 marRight12">{{scope.row.VotesNum}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="Share" align="center" min-width="190" label="% Cumulative Share">
                <template slot-scope="scope">
                  <div class="flexDiv justifyCenter">
                    <div class="myProceDiv flexDiv justifyStart marRight8">
                      <p class="preProce" :style="{ 'width': scope.row.perProcessVal+'%' }"></p>
                      <p class="nowProce" :style="{ 'width': scope.row.nowProcessVal+'%' }"></p>
                    </div>
                    <span class="">{{scope.row.showprocessVal03}}%</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Groupshare" width="128" align="center" label="Group share">
                <template slot="header" slot-scope="{}">
                  <div class="flexDiv cursorPointer Text18 justifyStart" @click="changeSort('Groupshare')">
                    Group share
                    <p class="flexDiv columnFlex Text18">
                      <i class="el-icon-caret-top Text20" :class="(listOneprop=='Groupshare'&&listOneOrder=='up') ? 'sortBownCls' : 'sortTopCls'"></i>
                      <i class="el-icon-caret-bottom Text20" style="margin-top:-8px;" :class="(listOneprop=='Groupshare'&&listOneOrder=='down') ? 'sortBownCls' : 'sortTopCls'"></i>
                    </p>
                  </div>
                </template>
                <template slot-scope="scope">
                  {{scope.row.Groupshare}}%
                </template>
              </el-table-column>
              <el-table-column prop="GroupScore" align="center" width="126" label="* score">
                <template slot="header" slot-scope="{}">
                  <div class="flexDiv cursorPointer Text18 justifyStart" style="padding-left: 18px;" @click="changeSort('GroupScore')">
                    * score
                    <p class="flexDiv columnFlex Text18">
                      <i class="el-icon-caret-top Text20" :class="(listOneprop=='GroupScore'&&listOneOrder=='up') ? 'sortBownCls' : 'sortTopCls'"></i>
                      <i class="el-icon-caret-bottom Text20" style="margin-top:-8px;" :class="(listOneprop=='GroupScore'&&listOneOrder=='down') ? 'sortBownCls' : 'sortTopCls'"></i>
                    </p>
                    <el-tooltip class="item" effect="dark" content="* Group epoch score is the average of each member's epoch score.">
                      <i class="el-icon-info h7Color"></i>
                    </el-tooltip>
                  </div>
                </template>
                <template slot-scope="scope">
                  {{scope.row.GroupScore}}%
                </template>
              </el-table-column>
              <el-table-column prop="ElectedTotal" align="center" min-width="106" label="Elected/Total">
                <template slot="header" slot-scope="{}">
                  <div class="flexDiv cursorPointer Text18 justifyCenter" @click="changeSort('members')">
                    <div>
                      <p class="textRight Text18">Elected</p>
                      <p class="textRight Text18">/Total</p>
                    </div>
                    <p class="flexDiv columnFlex Text18">
                      <i class="el-icon-caret-top Text20" :class="(listOneprop=='members'&&listOneOrder=='up') ? 'sortBownCls' : 'sortTopCls'"></i>
                      <i class="el-icon-caret-bottom Text20" style="margin-top:-8px;" :class="(listOneprop=='members'&&listOneOrder=='down') ? 'sortBownCls' : 'sortTopCls'"></i>
                    </p>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- <div class="myTable-pagination">
            <el-pagination background v-show="groupsListData.length > 0" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :current-page="listPageData.pageNo" layout="total, prev, pager, next,jumper" :total="listPageData.total">
            </el-pagination>
          </div> -->
        </div>
        <div v-if="TypeTabs == '1'">
          <div class="myTable myTable02" style="margin-top:0">
            <el-table v-if="TypeTabs == '1'" class=" downLoadTable" :data="validatorListData" stripe fit align="center" style="width: 100%;overflow-y:hidden;" 
              @row-click="jumpAddressDetails" v-loading="isLoadingTabletwo" element-loading-background="rgba(0, 0, 0, 0)" element-loading-text="loading..." 
              element-loading-spinner="el-icon-loading" :row-class-name="tableRowClassName" v-sticky="{ top: 0 }">
              <template slot="empty">
                <div class="flexDiv columnFlex justifyCenter" style="height: 260px;" v-if="!isLoadingTabletwo">
                  <img src="../assets/images/notData2.png" class="normalImg">
                  <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
                </div>
              </template>
              <el-table-column width="56">
                <template slot-scope="scope">
                  {{scope.row.id}}
                </template>
              </el-table-column>
              <el-table-column prop="address" label="Validator" align="center" min-width="230">
                <template slot="header" slot-scope="{}">
                  <div class="flexDiv cursorPointer Text18 justifyCenter" @click="changeTwoSort('address')">
                    Validator
                    <p class="flexDiv columnFlex Text18">
                      <i class="el-icon-caret-top Text20" :class="(listTwoprop=='address'&&listTwoOrder=='up') ? 'sortBownCls' : 'sortTopCls'"></i>
                      <i class="el-icon-caret-bottom Text20" style="margin-top:-8px;" :class="(listTwoprop=='address'&&listTwoOrder=='down') ? 'sortBownCls' : 'sortTopCls'"></i>
                    </p>
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="flexDiv justifyStart cursorPointer startDivFat">
                    <p class="startDiv" @click.stop="">
                      <i class="iconfont" @click="biaojivalidatorStart(scope.row.id)" :class="scope.row.isStar == 'isStar' ? 'icon-star blockDiv greenColor Text18' : 'iconicon_rank_star'"></i>
                    </p>
                    <img v-if="scope.row.img" :src="scope.row.img" class="radius50per marRight4 groupListImg">
                    <i v-if="!scope.row.img" class="iconfont icondefault-header greenColor marRight4" style="font-size:30px;"></i>
                    <!--  :class="(validator2!=validator3) ? 'blueColor' : (!validator2 && !validator3 ? 'greenColor' : '')" -->
                    <p style="max-width:calc(100% - 110px)" class=" Text16  textLeft">
                      {{scope.row.address}}
                    </p>
                    <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom">
                      <span class="iconfont icon-lianjie h3Color cursorPointer" @click="jumpAddress(scope.row.alladdress)">
                      </span>
                    </el-tooltip>
                    <el-tooltip class="item marLeft4" placement="bottom">
                      <div slot="content" class="Text14">
                        Copy Address: {{scope.row.alladdress}}
                      </div>
                      <span class="iconfont icon-fuzhi h3Color cursorPointer" v-clipboard:copy="scope.row.alladdress" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
                      </span>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Score" align="center" width="126" label="* Score">
                <template slot="header" slot-scope="{}">
                  <div class="flexDiv cursorPointer Text18 justifyCenter" style="padding-left: 16px;" @click="changeTwoSort('score')">
                    * Score
                    <p class="flexDiv columnFlex Text20">
                      <i class="el-icon-caret-top" :class="(listTwoprop=='score'&&listTwoOrder=='up') ? 'sortBownCls' : 'sortTopCls'"></i>
                      <i class="el-icon-caret-bottom" style="margin-top:-8px;" :class="(listTwoprop=='score'&&listTwoOrder=='down') ? 'sortBownCls' : 'sortTopCls'"></i>
                    </p>
                    <el-tooltip class="item" effect="dark" content="* Validator score is the exponential moving average of their epoch scores.">
                      <i class="el-icon-info h7Color"></i>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Elected" align="center" min-width="126" label="* Elected">
                <template slot="header" slot-scope="{}">
                  <div class="flexDiv cursorPointer Text18 justifyCenter" @click="changeTwoSort('elected')">
                    * Elected
                    <p class="flexDiv columnFlex Text20">
                      <i class="el-icon-caret-top" :class="(listTwoprop=='elected'&&listTwoOrder=='up') ? 'sortBownCls' : 'sortTopCls'"></i>
                      <i class="el-icon-caret-bottom" style="margin-top:-8px;" :class="(listTwoprop=='elected'&&listTwoOrder=='down') ? 'sortBownCls' : 'sortTopCls'"></i>
                    </p>
                    <el-tooltip class="item" effect="dark" content="* Elected is whether the current epoch is elected.">
                      <i class="el-icon-info h7Color"></i>
                    </el-tooltip>
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="text-center" :class="(scope.row.validator2!=scope.row.validator3?'blueColor':'')">
                    <i style="font-size:1em;" class="iconfont" :class="(scope.row.validator2?'icon-duigou greenColor':'iconunelected')"></i>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Frontrunner" width="146" align="center" label="* Frontrunner">
                <template slot="header" slot-scope="{}">
                  <div class="flexDiv cursorPointer Text18 justifyStart" @click="changeTwoSort('frontrunner')">
                    * Frontrunner
                    <p class="flexDiv columnFlex Text20">
                      <i class="el-icon-caret-top" :class="(listTwoprop=='frontrunner'&&listTwoOrder=='up') ? 'sortBownCls' : 'sortTopCls'"></i>
                      <i class="el-icon-caret-bottom" style="margin-top:-8px;" :class="(listTwoprop=='frontrunner'&&listTwoOrder=='down') ? 'sortBownCls' : 'sortTopCls'"></i>
                    </p>
                    <el-tooltip class="item" effect="dark" content="* Frontrunner is whether the next epoch will be elected, according to the current votes.">
                      <i class="el-icon-info h7Color"></i>
                    </el-tooltip>
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="text-center" :class="(scope.row.validator2!=scope.row.validator3?'blueColor':'')">
                    <i style="font-size:1em;" class="iconfont" :class="(scope.row.validator3?'icon-duigou greenColor':'iconunelected')"></i>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Attestation" align="center" min-width="186" label="* Attestation fulfilled/requested">
                <template slot="header" slot-scope="{}">
                  <div class="flexDiv cursorPointer Text18 justifyStart" style="padding-left: 12px;" @click="changeTwoSort('attestation')">
                    <p class="Text18" style="line-height: 1.2;"> * Attestation <br> fulfilled/requested</p>
                    <p class="flexDiv columnFlex Text20">
                      <i class="el-icon-caret-top" :class="(listTwoprop=='attestation'&&listTwoOrder=='up') ? 'sortBownCls' : 'sortTopCls'"></i>
                      <i class="el-icon-caret-bottom" style="margin-top:-8px;" :class="(listTwoprop=='attestation'&&listTwoOrder=='down') ? 'sortBownCls' : 'sortTopCls'"></i>
                    </p>
                    <el-tooltip class="item" effect="dark" content="* Attestation is the rate at which validator successfully sends signed SMS messages.">
                      <i class="el-icon-info h7Color"></i>
                    </el-tooltip>
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="text-center greenColor" v-html="scope.row.Attestation">
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Uptime" align="center" min-width="100" label="* Uptime">
                <template slot="header" slot-scope="{}">
                  <div class="flexDiv cursorPointer Text18 justifyCenter" @click="changeTwoSort('uptime')">
                    * Uptime
                    <p class="flexDiv columnFlex Text20">
                      <i class="el-icon-caret-top" :class="(listTwoprop=='uptime'&&listTwoOrder=='up') ? 'sortBownCls' : 'sortTopCls'"></i>
                      <i class="el-icon-caret-bottom" style="margin-top:-8px;" :class="(listTwoprop=='uptime'&&listTwoOrder=='down') ? 'sortBownCls' : 'sortTopCls'"></i>
                    </p>
                    <el-tooltip class="item" effect="dark" content="* Uptime is the percentage of 12-block windows that include at least one signature of the given validator.">
                      <i class="el-icon-info h7Color"></i>
                    </el-tooltip>
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="uptimeProcessDiv">
                    <el-progress class="uptimeProcess" :percentage="scope.row.signatures" color="#64CF5B" :show-text="false" :stroke-width="20"></el-progress>
                    <p>{{scope.row.signatures}}%</p>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- <div class="myTable-pagination">
            <el-pagination background v-show="validatorListData.length > 0" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :current-page="listPageData.pageNo" layout="total, prev, pager, next,jumper" :total="listPageData.total">
            </el-pagination>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ybp from '@/components/ybp';
import ybpblue from '@/components/ybpBlue';
import Charts from '@jiaminghi/charts'

import * as echarts from "echarts";
import VabChart from "@/plugins/echarts";

import { account } from "@/assets/api/requset.js";
export default {
  name: "RichList",
  data() {
    return {
      optionsGroup: {value: '', startColor:'', endColor: ''},
      optionsValidator: {value: '', startColor:'', endColor: ''},
      screenWidth: document.documentElement.clientWidth,//屏幕宽度
      isLoadingTableone: true,
      isLoadingTabletwo: true,
      // 顶部数据
      elected_group_count: 0,
      electedGroupRate: 0,
      ValidatorRate: 0,
      allGroups: 0,
      elected_validator_count: 0,
      validator_count: 0,
      total_votes: 0,
      total_votes_change: 0,
      current_minimum_votes: 0,
      frontrunner_minimum_votes: 0,
      groupsListData: [],
      groupsListDataFixed: [],
      saveGroupsList: [],
      validatorListData: [],
      // tab
      TypeTabs: '0',
      SearchText: '',
      listOneprop: 'Votes',
      listOneOrder: 'down',
      isloadListData: false,
      listPageData: {
        pageSize: 10,
        pageNo: 1,
        total: 0
      },
      addvotes: {},
      listTwoprop: 'address',
      listTwoOrder: 'down'
    };
  },
  components: { VabChart, ybp, ybpblue },
  computed: {
  },
  watch: {
  },
  mounted() {
    var _this = this;
    window.onresize = function(){ // 定义窗口大小变更通知事件
      _this.screenWidth = document.documentElement.clientWidth; //窗口宽度
    };
    // window.onresize = () => {
    //   return (() => {
    //   })()
    // }
    if (this.$store.state.validatorTypeTabs) {
      this.TypeTabs = this.$store.state.validatorTypeTabs;
    }
    this.getTopSetGroupsList();
    this.getListData();
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      return 'successRow';
    },
    // 获取顶部数据请求
    getTopSetGroupsList() {
      var that = this;
      if (this.isloadListData) { return; }
      this.isloadListData = true;
      account({ method: 'groups' }).then((response) => {
        var that = this;
        this.groupsList = response.groups;
        account({ method: 'latest_epoch_election_votes' }).then((response) => {
          this.isloadListData = false;
          let obj = response;
          let votes = obj.votes;
          let total_votes_change = 0;
          votes.forEach((item, i) => {
            if (this.addvotes[item[1]]) {
              this.addvotes[item[1]] += item[7] / 1e+18;
              this.addvotes[item[1]] += item[5] / 1e+18;
            }
            else {
              this.addvotes[item[1]] = item[7] / 1e+18;
              this.addvotes[item[1]] += item[5] / 1e+18;
            }
            total_votes_change += (item[7] / 1e+18) + (item[5] / 1e+18);
          });
          this.total_votes_change = total_votes_change;
          this.current_minimum_votes = obj.current_elected_minimum_votes;
          this.frontrunner_minimum_votes = obj.frontrunner_elected_minimum_votes;

          // 顶部数据
          var topData = this.groupsList;
          var elected_group_count = 0;
          var elected_validator_count = 0;
          var validator_count = 0;
          var min_elected_votes = 1e+50;
          var total_voting_power = 0;
          Object.keys(topData).forEach(function (address) {
            //   //address 0:name 1:votes,2:Capacity, 3:ElectedCount 4:MemberCount 5:eligible 6:commission,7:logo
            var group = topData[address];
            total_voting_power += group[1];
            elected_validator_count += group[3];
            validator_count += group[4];
            if (group[3] > 0) {
              if (group[3] > group[4]) {
                group[3] = group[4];
              }
              elected_group_count++;

              var avg_votes = group[1] / group[3];
              if (avg_votes < min_elected_votes) {
                min_elected_votes = avg_votes;
              }
            }
          });
          this.elected_group_count = elected_group_count;
          this.allGroups = Object.keys(topData).length;
          this.electedGroupRate = (parseInt(this.elected_group_count / this.allGroups * 100) > 100) ? 100 : parseInt(this.elected_group_count / this.allGroups * 100);
          this.optionsGroup = {
            value: (100-this.electedGroupRate),
            startColor: '#F9E96B',
            endColor: '#5CCD53'
          } ;
          // 
          this.elected_validator_count = elected_validator_count;
          this.validator_count = validator_count;
          this.ValidatorRate = (parseInt(this.elected_validator_count / this.validator_count * 100) > 100) ? 100 : parseInt(this.elected_validator_count / this.validator_count * 100);
          this.optionsValidator = {
            value: (100-this.ValidatorRate),
            startColor: '#FF9696',
            endColor: '#2188FF'
          } ;
          this.total_votes = total_voting_power;

          // if(this.TypeTabs == '0'){
          // 设置 groups列表数据
          this.setGroupsListData();
          // }
        })
      })
    },
    // 获取列表数据
    getListData() {
      var method = (this.TypeTabs == '0') ? 'groups' : 'validators';
      var parmas = {
        method: method
      };
      account(parmas).then((response) => {
        var that = this;
        // 0: groups    1: Validators
        // 0： groups 列表  及 顶部数据
        if (this.TypeTabs == '1') {
          this.dataBackValidator = response;
          this.setValifetData();
        }
      });
    },
    changeSort(obj) {
      console.log("ddc+++changeSort")
      this.listOneprop = obj;
      this.listOneOrder = (this.listOneOrder == 'up') ? 'down' : 'up';
      this.setGroupsListData();
    },
    biaojiGroupStart(num) {
      var grouplistfavs = JSON.parse(window.localStorage.getItem('groipListfavsLocal')) || [];
      // 已经存在 需要删除
      if (grouplistfavs.indexOf(num) != -1) {
        var index = grouplistfavs.indexOf(num);
        grouplistfavs.splice(index, 1);
      } else {
        grouplistfavs.push(num);
      }
      window.localStorage.setItem('groipListfavsLocal', JSON.stringify(grouplistfavs));
      this.setGroupsListData();
    },
    // 处理 groups 列表
    setGroupsListData() {
      let split_line = '';
      var that = this;
      var recordsList = [];
      var groups = this.groupsList;
      this.prePec = 0;
      var flg = this.listOneprop;
      var order = this.listOneOrder;
      // 
      // up  升序
      console.log(flg + "===flg==" + order);
      var keys = Object.keys(groups).sort(function (x, y) {
        if (flg == 'Votes' && order == 'down') return (groups[y][1] - groups[x][1]);
        if (flg == 'Votes' && order == 'up') return (groups[x][1] - groups[y][1]);
        // score  GroupScore
        if (flg == 'GroupScore' && order == 'down') return (groups[y][8] - groups[x][8]);
        if (flg == 'GroupScore' && order == 'up') return (groups[x][8] - groups[y][8]);
        // Groupshare
        if (flg == 'Groupshare' && order == 'down') return (groups[y][6] - groups[x][6]);
        if (flg == 'Groupshare' && order == 'up') return (groups[x][6] - groups[y][6]);
        // members  ElectedTotal
        if (flg == 'members' && order == 'down') return (groups[y][4] - groups[x][4]);
        if (flg == 'members' && order == 'up') return (groups[x][4] - groups[y][4]);
      });
      //
      var cumulative_votes = 0;

      var groipListfavs = JSON.parse(window.localStorage.getItem('groipListfavsLocal'));
      keys.forEach(function (address, i) {
        // Object.keys(groups).forEach((address) => {
        //address 0:name 1:votes,2:Capacity, 3:ElectedCount 4:MemberCount 5:eligible 6:commission,7:logo
        var group = groups[address];
        var obj = {};
        var add = '';
        var addr = address.toLowerCase();
        var isgroup9 = false;
        if (!group[0] || group[0].trim().length == 0) {
          add = that.$format.formatAddress(address, false, false, true);
        } else {
          isgroup9 = true;
          add = group[0];
        }
        obj.id = Number(i) + 1;
        // iconfont iconicon_rank_star
        var i_class = 'noStar';
        if (groipListfavs && groipListfavs.indexOf(obj.id) > -1) {
          i_class = 'isStar';
        }
        obj.isStar = i_class;

        obj.alladdress = group[0].trim().length == 0 ? address : '';
        obj.group9 = group[9];
        obj.isgroup9 = isgroup9;
        obj.group4 = group[4];
        obj.group2 = group[2];
        obj.group6 = group[6];
        obj.group8 = group[8];
        obj.jumpaddress = address;
        obj.address = add;
        obj.Votes = group[1];
        var str = '';
        // 判断对象是否包含特定的自身（非继承）属性
        /**
         * { "0x7c75b0b81a54359e9dccda9cb663ca2e3de6b710":5224.475696066761,
         *   "0x2c2b0f71d59b546b2cafd222696589c13c3c325c":0,
         *   "0x0d4f8cea48cdadeae345431577a64983c0535b12":30.471700449455483, }
        */
        if (that.addvotes.hasOwnProperty(addr)) {
          // 根据键，地址 查数量
          str = that.$format.thousands(that.addvotes[addr].toFixed(2));
          if (that.addvotes[addr] > 0) {
            str = '+' + str;
          }
        }
        obj.VotesNum = str;

        obj.Groupshare = group[6] * 100;
        obj.GroupScore = (group[8] * 100).toFixed(2);
        obj.ElectedTotal = group[3] + '/' + group[4];
        obj.group7 = group[7];
        // 占比部分
        var cumulative_share_0 = ((cumulative_votes * 100) / that.total_votes).toFixed(4);
        var cumulative_share_1 = ((obj.Votes * 100) / that.total_votes).toFixed(4);
        cumulative_votes += obj.Votes;
        var cumulative_share_2 = (parseFloat(cumulative_share_0) + parseFloat(cumulative_share_1)).toFixed(2);
        obj.perProcessVal = parseFloat(cumulative_share_0).toFixed(4);
        obj.nowProcessVal = parseFloat(cumulative_share_1).toFixed(2);
        obj.showprocessVal03 = cumulative_share_2;
        that.prePec = Number(that.prePec) + Number(cumulative_share_1);
        // 
        var img = '';
        if (group[7]) {
          img = 'https://thecelo.com/logos/' + address.toLowerCase() + '.jpg'
        }
        obj.img = img;
        if(obj.address && JSON.stringify(obj.address).indexOf('Polychain') != -1){
          obj.img = 'https://thecelo.com/logos/' + address + '.jpg'
        }

        // 大于-1 存在  需要置顶
        if (groipListfavs && groipListfavs.indexOf(obj.id) > -1) {
          recordsList.unshift(obj);
        } else {
          recordsList.push(obj);
        }
      })
      this.groupsListData = JSON.parse(JSON.stringify(recordsList));
      this.isLoadingTableone = false;
    },
    openDetails(row) {
      this.$store.commit('updatevalidatorTypeTabs', '0');
      var domain = row.group9.split('.');
      var name = (row.group9.indexOf('.') != -1) ? domain[domain.length - 2] : row.group9;
      name = name ? name : row.jumpaddress;
      name = (name.indexOf('http') == -1) ? name : row.jumpaddress;
      if (name) {
        this.$router.push({
          path: `/groupDetail/${name}`
        })
      }
    },
    jumpAddressDetails(row) {
      this.$store.commit('updatevalidatorTypeTabs', '1');
      this.$store.commit('updateheadTabClsId', '1');
      var domain = row.alladdress;
      if (domain) {
        this.$router.push({
          path: `/siteDetail/${domain}`
        })
      }
    },
    changeTwoSort(obj) {
      this.listTwoprop = obj;
      this.listTwoOrder = (this.listTwoOrder == 'up') ? 'down' : 'up';
      this.setValifetData();
    },
    biaojivalidatorStart(num) {
      var validatorfavs = JSON.parse(window.localStorage.getItem('validatorfavsLocal')) || [];
      // 已经存在 需要删除
      if (validatorfavs.indexOf(num) != -1) {
        var index = validatorfavs.indexOf(num);
        validatorfavs.splice(index, 1);
      } else {
        validatorfavs.push(num);
      }
      window.localStorage.setItem('validatorfavsLocal', JSON.stringify(validatorfavs));
      this.setValifetData();
    },
    setValifetData() {
      var validators = this.dataBackValidator.validators;
      var validatorList = [];
      var flg = this.listTwoprop;
      var order = this.listTwoOrder;
      var keys = Object.keys(validators).sort(function (x, y) {
        if (flg == 'score' && order == 'down') return (validators[y][6] - validators[x][6]);
        if (flg == 'score' && order == 'up') return (validators[x][6] - validators[y][6]);
        if (flg == 'elected' && order == 'down') return (validators[y][2] - validators[x][2]);
        if (flg == 'elected' && order == 'up') return (validators[x][2] - validators[y][2]);
        if (flg == 'frontrunner' && order == 'down') return (validators[y][3] - validators[x][3]);
        if (flg == 'frontrunner' && order == 'up') return (validators[x][3] - validators[y][3]);
        if (flg == 'attestation' && order == 'down') return (validators[y][10] - validators[x][10]);
        if (flg == 'attestation' && order == 'up') return (validators[x][10] - validators[y][10]);
        if (flg == 'uptime') {
          var signatures_x = validators[x][5];
          var signatures_y = validators[y][5];
          if (signatures_x == null) signatures_x = '0%';
          if (signatures_y == null) signatures_y = '0%';
          if (order == 'down')
            return (Math.round(signatures_y.replace('%', '')) - Math.round(signatures_x.replace('%', '')));
          if (order == 'up')
            return (Math.round(signatures_x.replace('%', '')) - Math.round(signatures_y.replace('%', '')));
        }
        if (flg == 'address') {
          var yname = validators[y][0];
          var xname = validators[x][0];
          if (yname == '') yname = y;
          if (xname == '') xname = x;
          if (order == 'up')
            return xname.localeCompare(yname);
          if (order == 'down')
            return yname.localeCompare(xname);
        }
        if (flg == '') {
          if ((validators[x][2] != validators[x][3]) && (validators[y][2] == validators[y][3]))
            return -1;
          else if ((validators[x][2] && validators[x][3]) && (!validators[y][2] || !validators[y][3]))
            return -1;
          else return 1;
        }
      });

      var validatorfavs = JSON.parse(window.localStorage.getItem('validatorfavsLocal'));
      keys.forEach((address, i) => {
        var validator = validators[address];
        var obj = {};
        var img = '';
        if (validator[7]) {
          img = 'https://thecelo.com/logos/' + address.toLowerCase() + '.jpg'
        }
        obj.id = Number(i) + 1;
        obj.img = img;
        obj.alladdress = address;
        obj.validator2 = validator[2];
        obj.validator9 = validator[9];
        obj.validator3 = validator[3];
        // address地址
        var add = '';
        if (validator[0].trim().length == 0)
          add = this.$format.formatAddress(address, true, false, true, false, true);
        else {
          add = validator[0];
        }
        
        obj.address = add;
        if(obj.address && JSON.stringify(obj.address).indexOf('Polychain') != -1){
          obj.img = 'https://thecelo.com/logos/' + address + '.jpg'
        }
        // 分数 score
        obj.Score = (validator[6] * 100).toFixed(2) + '%';
        // iconfont iconicon_rank_star
        var i_class = 'noStar';
        if (validatorfavs && validatorfavs.indexOf(obj.id) > -1) {
          i_class = 'isStar';
        }
        obj.isStar = i_class;

        // attestation
        var attestation = '-';
        if (validator[9] > 0 && validator[10] > 0) {
          let per = ((validator[9] * 100) / validator[10]).toFixed(2) + '%'
          attestation = '<span class="greenColor">' + per + '</span>(' + validator[9] + '/' + validator[10] + ')'
        }
        obj.Attestation = attestation;
        // Uptime
        var signatures = parseInt(validator[5]) > 100 ? 100 : parseInt(validator[5]);
        if (signatures == null) { signatures = '0%' };
        obj.signatures = signatures;
        obj.validator5 = validator[5];
        // 大于-1 存在  需要置顶
        if (validatorfavs && validatorfavs.indexOf(obj.id) > -1) {
          validatorList.unshift(obj);
        } else {
          validatorList.push(obj);
        }
      })
      this.validatorListData = validatorList;
      this.isLoadingTabletwo = false;
    },
    // 
    formatGroupRate(percentage) {
      return this.elected_group_count + '/' + this.allGroups;
    },
    formatValidatorRate(percentage) {
      return this.elected_validator_count + '/' + this.validator_count;
    },
    searchRecordsList() {
      this.getListData();
    },
    changeTypeTabs() {
      this.getListData();
    },
    //分页
    handleCurrentChange: function (pageNo) {
      this.listPageData.pageNo = pageNo;
      this.getListData();
    },
    jumpAddress(address) {
      this.$store.dispatch('jumpAddress', address);
    },
    // 复制成功时的回调函数
    onCopySuc(e) {
      this.copyIng = true;
      this.$notify({
        message: 'Copy success！',
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
<style lang="scss">
.startDiv {
  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
  i {
    font-size: 18px;
    display: none;
  }
}
.successRow:hover .startDiv i,
.startDivFat:hover .startDiv i {
  display: block !important;
}
.blockDiv {
  display: block !important;
}
.uptimeProcessDiv {
  width: 90px;
  margin: 0 auto;
  position: relative;
  p {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    color: white;
    font-size: 13px;
  }
}
.uptimeProcess {
  width: 90px;
}
.valiPad {
  padding: 0 20px;
}
@media only screen and (max-width: 767px) {
  .valiPad {
    padding: 0 6px;
  }
  .mainContainer {
    .mainCon-sub {
      padding: 0 4px;
    }
  }
  .valiPadTop {
    border-top: 1px solid #e1e1e1;
    padding-top: 22px;
  }
  .blackTheme .valiPadTop {
    border-top: 1px solid #434343;
  }
}
</style>
