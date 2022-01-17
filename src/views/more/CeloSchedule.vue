<template>
  <div :class="$store.state.themeCls">
    <div class="mainContainer celoSchedule">
      <div class="">
        <p class="primaryTitle">CELO Token Release Schedule</p>
      </div>
      <div class="mainCon-sub">
        <el-card class="marTop32 ">
          <!-- tableHeadF6 -->
          <div class="myTable " style="margin-top: 0;">
            <el-table :data="ScheduleList" stripe fit align="center" style="width: 100%;overflow-y:hidden;">
              <template slot="empty">
                <div class="flexDiv columnFlex justifyCenter" style="height: 260px;">
                  <img src="../../assets/images/notData2.png" class="normalImg">
                  <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
                </div>
              </template>
              <el-table-column prop="text" width="160" align="center">
                <template slot="header">
                  <div class="flexDiv">
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="sales" width="160" label="Pre-launch sales" align="center">
                <template slot-scope="scope">
                  <span class="">{{scope.row.sales}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="Contributors" width="220" align="center" label="Team, Advisors">
                <template slot="header">
                  <div class="textRight lineOne h3Color" style="font-size:14px">Team, Advisors, <br/>Founders and Contributors</div>
                </template>
                <template slot-scope="scope">
                  <span class="">{{scope.row.Contributors}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="Rewards" width="240" align="center" label="Staking">
                <template slot="header">
                  <div class="textRight lineOne h3Color" style="font-size:14px">Staking & Validator Rewards<br/> (thru 3/2050)</div>
                </template>
                <template slot-scope="scope">
                  <span class="">{{scope.row.Rewards}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="Community" width="180" align="center" label="Community">
                <template slot="header">
                  <div class="textCenter lineOne h3Color" style="font-size:14px">Community Grants <br/>(Thru 3/2050)</div>
                </template>
                <template slot-scope="scope">
                  <span class="">{{scope.row.Community}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="Operational" width="170" align="center" label="Operational Grants">
                <template slot-scope="scope">
                  <span class="">{{scope.row.Operational}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="Reserve" width="150" align="center" label="Inital Reserve">
                <template slot-scope="scope">
                  <span class="">{{scope.row.Reserve}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="Total" width="140" align="center" label="Total">
                <template slot-scope="scope">
                  <span class="">{{scope.row.Total}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <el-card class="marTop42">
          <div class="myTable" style="margin-top: 0;">
            <el-table :data="filterList" fit stripe align="center" style="width: 100%;overflow-y:hidden;">
              <template slot="empty">
                <div class="flexDiv columnFlex justifyCenter" style="height: 260px;">
                  <img src="../../assets/images/notData2.png" class="normalImg">
                  <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
                </div>
              </template>
              <el-table-column width="160" align="center">
                <template slot="header" slot-scope="{}">
                  <el-select v-model="searchYear" size="mini" class="greenSelect" style="width: 80px;" filterable 
                    @change="changesearchYear">
                    <el-option v-for="(item, index) in searchoptionsList" :key="index" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </template>
                <template slot-scope="scope">
                  {{scope.row.time}}
                </template>
              </el-table-column>
              <el-table-column prop="sales" width="160" align="center" label="Pre-launch sales">
              </el-table-column>
              <el-table-column prop="Contributors" width="220" align="center" label="Team, Advisors, Founders and Contributors">
                <template slot="header">
                  <div class="textRight lineOne h3Color" style="font-size:14px">Team, Advisors, <br/>Founders and Contributors</div>
                </template>
              </el-table-column>
              <el-table-column prop="Rewards" width="220" align="center" label="Staking & Validator Rewards (thru 3/2050)">
                <template slot="header">
                  <div class="textRight lineOne h3Color" style="font-size:14px">Staking & Validator Rewards <br/>(thru 3/2050)</div>
                </template>
              </el-table-column>
              <el-table-column prop="Grants" width="180" align="center" label="Community Grants (Thru 3/2050)">
                <template slot="header">
                  <div class="textCenter lineOne h3Color" style="font-size:14px">Community Grants <br/>(Thru 3/2050)</div>
                </template>
              </el-table-column>
              <el-table-column prop="OperationalGrants" width="180" align="center" label="Operational Grants">
              </el-table-column>
              <el-table-column prop="Reserve" width="180" align="center" label="Inital Reserve">
              </el-table-column>
              <el-table-column prop="Supply" width="170" align="center" label="Circulating Supply (without reserve)">
              </el-table-column>
              <el-table-column prop="includingreserve" width="162" align="center" label="Circulating Supply (including reserve)">
              </el-table-column>
              <el-table-column prop="CirculatingSupply" width="180" align="center" label="Circulating Supply %">
              </el-table-column>
              <el-table-column prop="IncrementalSupply" width="180" align="center" label="Incremental Supply %">
              </el-table-column>
              <el-table-column prop="Rewards02" width="160" align="center" label="Monthly Supply With Epoch Rewards">
              </el-table-column>
              <el-table-column prop="SupplyAs" width="220" align="center" label="Circulating Supply as a % of Current Supply">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <el-card class="marTop42 myTable">
          <div class="myTable" style="margin-top: 0;">
            <el-table :data="TypeList" fit stripe align="center" style="width: 100%;overflow-y:hidden;">
              <template slot="empty">
                <div class="flexDiv columnFlex justifyCenter" style="height: 260px;">
                  <img src="../../assets/images/notData2.png" class="normalImg">
                  <p class="notDataText h5Color" style="margin-top: -16px;">Nothing</p>
                </div>
              </template>
              <el-table-column prop="typename" min-width="200" align="center" label="Type">
                <template slot-scope="scope">
                  {{scope.row[0]}}
                </template>
              </el-table-column>
              <el-table-column prop="t1Year" width="150" align="center" label="T+1 Year">
                <template slot-scope="scope">
                  <span class="">{{scope.row[1]}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="t10Year" width="150" align="center" label="T+10 Years">
                <template slot-scope="scope">
                  <span class="">{{scope.row[2]}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="lastNum" width="150" align="center" label="2050">
                <template slot-scope="scope">
                  <span class="">{{scope.row[3]}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="Total" width="150" align="center" label="Total">
                <template slot-scope="scope">
                  <span class="">{{scope.row[4]}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="t1Total" width="120" align="center" label="T+1/Total">
                <template slot-scope="scope">
                  <span class="">{{scope.row[5]}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { account } from "@/assets/api/requset.js";
export default {
  name: "CeloSchedule",
  data() {
    return {
      searchYear: '2020',
      searchoptionsList: [
        {value: '2020', label: '2020'},
        {value: '2021', label: '2021'},
        {value: '2022', label: '2022'},
        {value: '2023', label: '2023'},
        {value: '2024', label: '2024'},
        {value: '2025', label: '2025'},
        {value: '2026', label: '2026'},
        {value: '2027', label: '2027'},
        {value: '2028', label: '2028'},
        {value: '2029', label: '2029'},
        {value: '2030', label: '2030'},
        {value: '2031', label: '2031'},
        {value: '2032', label: '2032'},
        {value: '2033', label: '2033'},
        {value: '2034', label: '2034'},
        {value: '2035', label: '2035'},
        {value: '2036', label: '2036'},
        {value: '2037', label: '2037'},
        {value: '2038', label: '2038'},
        {value: '2039', label: '2039'},
        {value: '2040', label: '2040'},
        {value: '2041', label: '2041'},
        {value: '2042', label: '2042'},
        {value: '2043', label: '2043'},
        {value: '2044', label: '2044'},
        {value: '2045', label: '2045'},
        {value: '2046', label: '2046'},
        {value: '2047', label: '2047'},
        {value: '2048', label: '2048'},
        {value: '2049', label: '2049'},
        {value: '2050', label: '2050'},
        {value: 'All', label: 'All'},
      ],
      ScheduleList: [
        {
          text: 'Token Allocation', sales: '122,853,061', Contributors: '193,716,690', Rewards: '244,818,027', Community: '171,424,328',
          Operational: '73,611,936', Reserve: '120,000,000', Total: '926,424,042'
        },
        {
          text: '% of Total Supply', sales: '12.29%', Contributors: '19.37%', Rewards: '24.48%', Community: '17.14%', Operational: '7.36%',
          Reserve: '12.00%', Total: '92.64%'
        }
      ],
      month_allocated: [ ],
      filterList: [
        {
          time: '',
          sales: '',
          Contributors: '',
          Rewards: '',
          Grants: '',
          OperationalGrants: '',
          Reserve: '',
          Supply: '',
          includingreserve: '',
          CirculatingSupply: '',
          IncrementalSupply: '',
          Rewards02: '',
          SupplyAs: '',
        }
      ],
      TypeList: []
    };
  },
  components: {
  },
  computed: {
  },
  mounted() {
    this.$store.commit('updateMoreText', 'more2');
    this.celo_release_schedule();
  },
  methods: {
    celo_release_schedule(){
       var parmas = {
        method: 'celo_release_schedule'
      };
      account(parmas).then((obj, result) => {
        this.month_allocated = obj.month_allocated;
        this.TypeList = obj.total_allocated;
        this.filterListFun();
      })
    },
    changesearchYear(){
      this.filterListFun();
    },
    filterListFun(){
      var m = this.searchYear;
      var filterList = [];
      if(m && m != 'All'){
        // 按年 筛选
        for(var i in this.month_allocated){
          var obj = {};
          if(this.month_allocated[i][0].split(', ')[1] == m){
            obj.time = this.month_allocated[i][0];
            obj.sales	= this.month_allocated[i][2];
            obj.Contributors	= this.month_allocated[i][3];
            obj.Rewards	= this.month_allocated[i][4];
            obj.Grants	= this.month_allocated[i][5];
            obj.OperationalGrants	= this.month_allocated[i][6];
            obj.Reserve	= this.month_allocated[i][7];
            obj.Supply	= this.month_allocated[i][8];
            obj.includingreserve	= this.month_allocated[i][9];
            obj.CirculatingSupply	= this.month_allocated[i][10];
            obj.IncrementalSupply	= this.month_allocated[i][11];
            obj.Rewards02	= this.month_allocated[i][12];
            obj.SupplyAs	= this.month_allocated[i][13];

            filterList.push(obj);
          }
        }
        this.filterList = filterList;
      } else {
        // 所有
        console.log("all")
        for(var i in this.month_allocated){
          var obj = {};
          obj.time = this.month_allocated[i][0];
          obj.sales	= this.month_allocated[i][2];
          obj.Contributors	= this.month_allocated[i][3];
          obj.Rewards	= this.month_allocated[i][4];
          obj.Grants	= this.month_allocated[i][5];
          obj.OperationalGrants	= this.month_allocated[i][6];
          obj.Reserve	= this.month_allocated[i][7];
          obj.Supply	= this.month_allocated[i][8];
          obj.includingreserve	= this.month_allocated[i][9];
          obj.CirculatingSupply	= this.month_allocated[i][10];
          obj.IncrementalSupply	= this.month_allocated[i][11];
          obj.Rewards02	= this.month_allocated[i][12];
          obj.SupplyAs	= this.month_allocated[i][13];

          filterList.push(obj);
        }
        this.filterList = filterList;
      }
    }
  },
};
</script>
<style scoped lang="scss">
</style>
