<template>
  <div :class="$store.state.themeCls">
    <div class="mainContainer">
      <div class="">
        <p class="primaryTitle">APIs</p>
      </div>
      <div class="mainCon-sub">
        <el-row class="marTop20" style="min-height: 1080px;">
          <el-col :md="5" :sm="9" class="marTop12">
            <div class="leftPad">
              <div class="borderAll radius8 aplTitleList">
                <div v-for="(atl, index) in aplTitleList" :key="index" :class="activeApiId == atl.id ? 'activeApi' : ''" @click="changeActiveApiId(atl)" class="flexDiv">
                  {{atl.text}}
                  <i class="el-icon-caret-right" v-show="activeApiId == atl.id"></i>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :md="19" :sm="15" id="scrollDivA" class="marTop12">
            <div class="borderAll radius8 apiContent">
              <p class="apiContent-Title Text22 ">{{activeApiText}}</p>
              <div class="apiContent-Con">
                <!-- networkRequest -->
                <div v-for="(nr, index) in showPrices" :key="index" style="padding-top: 32px;padding-bottom: 20px;" class="borderTop">
                  <!-- Request -->
                  <p style="color: #262827;" class="fontweight Text20 blackWhiteColor" v-if="nr.Request">Request</p>
                  <div class="RequestCon">
                    <p v-for="(cls, clsindex) in nr.Request" :key="clsindex" class="cursorPointer" @click="jumpOpenUrl(cls.url)">
                      {{cls.text}}：<span class="blueColor">{{cls.url}}</span>
                    </p>
                  </div>
                  <!-- Request02 -->
                  <p style="color: #262827;" class="fontweight Text20 marTop42 blackWhiteColor" v-if="nr.Request02">Request</p>
                  <div class="RequestCon">
                    <p v-for="(res2, res2index) in nr.Request02" :key="res2index">
                      <!-- blueColor -->
                      <span class="">{{res2.text}}</span>：{{res2.name}}
                    </p>
                  </div>
                  <p style="color: #262827;margin-top: 60px" class="fontweight Text20 blackWhiteColor" v-if="nr.Response">Response</p>
                  <p class="indent20 marTop8">{{nr.ResponseTitle}}</p>
                  <!-- Response -->
                  <div class="RequestCon">
                    <div v-for="(res, resindex) in nr.Response" :key="resindex">
                      <p class="flexDiv justifyStart Text20">
                        <span class="dian"></span>{{res.name}}
                      </p>
                      <!-- 二级 -->
                      <div class="h5Color padLeft20 ResponseDesc" v-if="res.childResponse">
                        <div v-for="(child, childIndex) in res.childResponse" :key="childIndex">
                          <p class="marBtm8 Text18">{{child.name}}</p>
                          <!-- 三级 -->
                          <div class="h5Color padLeft20 ResponseDesc marBtm12" v-if="child.childResponse">
                            <p v-for="(thirdchild, thirdIndex) in child.childResponse" :key="thirdIndex" class="Text16">
                              {{thirdchild.name}}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { account } from "@/assets/api/requset.js";
export default {
  name: "APIs",
  data() {
    return {
      activeApiId: '',
      activeApiText: 'Network Stats',
      aplTitleList: [
        { text: 'Network Stats', id: '1' },
        { text: 'cUSD/CELO Prices', id: '2' },
        { text: 'LockedCELO / Votes', id: '3' },
        { text: 'Groups', id: '4' },
        { text: 'Group', id: '5' },
        { text: 'Validators', id: '6' },
        { text: 'Accounts', id: '7' },
        { text: 'Exchange', id: '8' },
        { text: 'Governance', id: '9' },
      ],
      networkRequest: [
        {
          Request: [
            { text: 'Mainnet', url: 'https://thecelo.com/api/v0.1?method=dashboard' },
            { text: 'Testnet Baklava', url: 'http://baklava.thecelo.com/api/v0.1?method=dashboard' },
          ],
          ResponseTitle: '',
          Response: [
            { name: 'timestamp' },
            {
              name: 'dashboard',
              childResponse: [
                { name: '0 : Total Blocks' },
                { name: '1 : Average Block Time' },
                { name: '2 : Blocks until Epoch' },
                { name: '3 : Epoch Size' },
                { name: '4 : Total Transactions' },
                { name: '5 : Gas Price' },
                { name: '6 : CELO Price' },
                { name: '7 : cUSD Price' },
                { name: '8 : Market Cap' },
                { name: '9 : Active Nodes' },
                { name: '10 : Elected Groups' },
                { name: '11 : Registered Groups' },
                { name: '12 : Elected Validators' },
                { name: '13 : Registered Validators' },
                { name: '14 : CELO Allocated totalSupply' },
                { name: '15 : CELO addresses' },
                { name: '16 : CELO transfers' },
                { name: '17 : cUSD totalSupply' },
                { name: '18 : cUSD addresses' },
                { name: '19 : cUSD transfers' },
                { name: '20 : miner group address' },
                { name: '21 : miner group name' },
                { name: '22 : miner group logo' },
              ]
            }
          ]
        }
      ],
      PricesRequest: [
        {
          Request: [
            { text: 'Mainnet', url: 'https://thecelo.com/api/v0.1?method=getprices' },
            { text: 'Testnet Baklava', url: 'http://baklava.thecelo.com/api/v0.1?method=getprices' },
          ],
          ResponseTitle: 'exchange_prices[0-n]',
          Response: [
            {name: '0 : HH:MM' },
            {name: '1 : cUSD' }
          ]
        }
      ],
      LockedCELORequest: [
        {
          Request: [
            { text: 'Mainnet', url: 'https://thecelo.com/api/v0.1?method=getlockedgold' },
            { text: 'Testnet Baklava', url: 'http://baklava.thecelo.com/api/v0.1?method=getlockedgold' },
          ],
          Response: [
            {name: 'CELO_total_supply' },
            {name: 'locked_CELO [n]',
              childResponse: [
                { name: 'key : epoch' },
                { name: 'value : []',
                  childResponse: [
                    { name: 'totalLockedCELO' },
                    { name: 'totalVotes' },
                    { name: 'nonvotingLockedCELO' }
                  ]
                }
              ]
            }
          ]
        }
      ],
      groupsRequest: [
        {
          Request: [
            { text: 'Mainnet', url: 'https://thecelo.com/api/v0.1?method=groups' },
            { text: 'Testnet Baklava', url: 'http://baklava.thecelo.com/api/v0.1?method=groups' },
          ],
          Response: [
            {name: 'timestamp' },
            {name: 'groups{}',
              childResponse: [
                { name: 'key : address' },
                { name: 'value : []',
                  childResponse: [
                    { name: '0 : Group Name' },
                    { name: '1 : Votes' },
                    { name: '2 : Capacity' },
                    { name: '3 : ElectedCount' },
                    { name: '4 : MemberCount' },
                    { name: '5 : eligible' },
                    { name: '6 : commission' },
                    { name: '7 : logo' },
                    { name: '8 : score' },
                    { name: '9 : domain' },
                    { name: '10 : keybase' }
                  ]
                }
              ]
            }
          ]
        }
      ],
      groupRequest: [
        {
          Request: [
            { text: 'Mainnet', url: 'https://thecelo.com/api/v0.1?method=group&address={address}' },
            { text: 'Testnet Baklava', url: 'http://baklava.thecelo.com/api/v0.1?method=group&address={address}' },
          ],
          Response: [
            {name: 'timestamp' },
            {name: 'rank' },
            {name: 'group[]',
              childResponse: [
                { name: '0 : Address' },
                { name: '1 : GroupName' },
                { name: '2 : Votes' },
                { name: '3 : CELO' },
                { name: '4 : LockedCELO' },
                { name: '5 : cUSD' },
                { name: '6 : Total' },
                { name: '7 : Commission' },
                { name: '8 : nextCommission' },
                { name: '9 : nextCommissionBlock' },
                { name: '10 : slashingMultiplier' },
                { name: '11 : lastSlashed' },
                { name: '12 : MembersUpdated' },
                { name: '13 : members / validators [n]',
                  childResponse: [
                    { name: '0 : Validator Name' },
                    { name: '1 : Validator Address' },
                    { name: '2 : Score(Uptime)' },
                    { name: '3 : Pending CELO' },
                    { name: '4 : Active CELO' },
                    { name: '5 : Elected' },
                    { name: '6 : CELO' },
                    { name: '7 : LockedCELO' },
                    { name: '8 : cUSD' },
                    { name: '9 : Total' },
                    { name: '10 : signer' },
                    { name: '11 : frontrunner' },
                    { name: '12 : proposed' },
                    { name: '13 : signatures' },
                    { name: '14 : Attestations requested' },
                    { name: '15 : Attestations fulfilled' }
                  ]
                }
              ]
            }
          ]
        }
      ],
      ValidatorsRequest: [
        {
          Request: [
            { text: 'Mainnet', url: 'https://thecelo.com/api/v0.1?method=validators' },
            { text: 'Testnet Baklava', url: 'http://baklava.thecelo.com/api/v0.1?method=validators' },
          ],
          Response: [
            {name: 'timstamp' },
            {name: 'validators [n]',
              childResponse: [
                { name: '0 : Address' },
                { name: '1 : Name' },
                { name: '2 : SignerAddress' },
                { name: '3 : Elected' },
                { name: '4 : Frontrunner' },
                { name: '5 : Proposed' },
                { name: '6 : signatures' },
                { name: '7 : score' },
                { name: '8 : logo(boolean)' },
              ]
            }
          ]
        }
      ],
      AccountsRequest: [
        {
          Request: [
            { text: 'Mainnet', url: 'https://thecelo.com/api/v0.1?method=accounts&page=[page]&count=[count]&sort_flg=[sort_flg]' },
            { text: 'Testnet Baklava', url: 'http://baklava.thecelo.com/api/v0.1?method=accounts&page=[page]&count=[count]&sort_flg=[flg]' },
          ],
          Request02: [
            {text: 'page', name: 'page number, starting from 0'},
            {text: 'count', name: 'the number of items displayed per page'},
            {text: 'sort_flg', name: 'sort flag (0: celo, 1: cusd, 2: txs)'}
          ],
          Response: [
            {name: 'CELO_totalSupply' },
            {name: 'cUSD_totalSupply' },
            {name: 'totalCELO' },
            {name: 'totalcUSD' },
            {name: 'CELO_total_addresses' },
            {name: 'cusd_total_addresses' },
            {name: 'cusd_total_transfers' },
            {name: 'accounts{}',
              childResponse: [
                { name: 'key : address' },
                { name: 'value : [0-n]',
                  childResponse: [
                    { name: '0 : TXs' },
                    { name: '1 : CELO' },
                    { name: '2 : cUSD' },
                    { name: '3 : Name' },
                    { name: '4 : lockedCELO' },
                    { name: '5 : nonVotingLockedCELO' },
                    { name: '6 : pendingWithdrawals' },
                    { name: '7 : metadataURL' },
                  ]
                }
              ]
            }
          ]
        }
      ],
      ExchangeRequest: [
        {
          Request: [
            { text: 'Summary', url: 'https://thecelo.com/api/?method=ex_summary' },
          ],
          Response: [
            { name: 'code' },
            { name: 'msg' },
            { name: 'data:{0...n}',
              childResponse: [
                { name: 'trading_pairs' },
                { name: 'last_price' },
                { name: 'last_price' },
                { name: 'lowest_ask' },
                { name: 'highest_bid' },
                { name: 'base_volume' },
                { name: 'quote_volume' },
                { name: 'price_change_percent_24h' },
                { name: 'highest_price_24h' },
                { name: 'lowest_price_24h' },
              ]
            }
          ]
        },
        {
          Request: [
            { text: 'Trades', url: 'https://thecelo.com/api/?method=ex_celocusd' },
          ],
          Response: [
            { name: 'code' },
            { name: 'msg' },
            { name: 'data:{0...n}',
              childResponse: [
                { name: 'trade_id' },
                { name: 'timestamp' },
                { name: 'price' },
                { name: 'quote_volume' },
                { name: 'base_volume' },
                { name: 'type' }
              ]
            }
          ]
        }
      ],
      GovernanceRequest: [
        {
          Request: [
            { text: 'Mainnet', url: 'https://thecelo.com/api/v0.1?method=proposalList' },
            { text: 'Testnet Baklava', url: 'http://baklava.thecelo.com/api/v0.1?method=proposalList' },
          ],
          ResponseTitle: 'items[0...n]',
          Response: [
            { name: 'key : id' },
            { name: 'value : {n}',
              childResponse: [
                { name: 'status' },
                { name: 'timespan' },
                { name: 'title' },
                { name: 'desc' },
                { name: 'proposer',
                  childResponse: [
                    { name: 'address' },
                    { name: 'deposit' },
                    { name: 'timestamp' },
                  ]
                },
                { name: 'upvoted',
                  childResponse: [
                    { name: 'addresses' },
                    { name: 'upvotes' },
                  ]
                },
                { name: 'dequeue',
                  childResponse: [
                    { name: 'address' },
                    { name: 'timestamp' },
                  ]
                },
                { name: 'approval',
                  childResponse: [
                    { name: 'address' },
                    { name: 'timestamp' },
                  ]
                },
                { name: 'voted',
                  childResponse: [
                    { name: 'addresses' },
                    { name: 'weight' },
                  ]
                },
                { name: 'executed',
                  childResponse: [
                    { name: 'from' },
                    { name: 'blockNumber' },
                    { name: 'transactionHash' },
                  ]
                },
                { name: 'items_vote[1...n]',
                  childResponse: [
                    { name: "['id','n']" },
                    { name: "['Yes/No/Abstain',0]" },
                  ]
                }
              ]
            }
          ]
        }
      ],
      showPrices: []
    };
  },
  components: {},
  computed: {
  },
  mounted() {
    this.changeActiveApiId(this.aplTitleList[0]);
  },
  methods: {
    jumpOpenUrl(url){
      if(url && url.indexOf('http') != 1){
        window.open(url);
      }
    },
    changeActiveApiId(obj) {
      if (this.activeApiId == obj.id) { return; }
      window.screenWidth = document.body.clientWidth || document.body.offsetWidth;
      if(window.screenWidth < 768){
        // document.getElementById('scrollDivA').scrollIntoView();
      }
      this.activeApiId = obj.id;
      this.activeApiText = obj.text;
      if(obj.id == '1'){ return this.showPrices = JSON.parse(JSON.stringify(this.networkRequest));}
      if(obj.id == '2'){ return this.showPrices = JSON.parse(JSON.stringify(this.PricesRequest));}
      if(obj.id == '3'){ return this.showPrices = JSON.parse(JSON.stringify(this.LockedCELORequest));}
      if(obj.id == '4'){ return this.showPrices = JSON.parse(JSON.stringify(this.groupsRequest));}
      if(obj.id == '5'){ return this.showPrices = JSON.parse(JSON.stringify(this.groupRequest));}
      if(obj.id == '6'){ return this.showPrices = JSON.parse(JSON.stringify(this.ValidatorsRequest));}
      if(obj.id == '7'){ return this.showPrices = JSON.parse(JSON.stringify(this.AccountsRequest));}
      if(obj.id == '8'){ return this.showPrices = JSON.parse(JSON.stringify(this.ExchangeRequest));}
      if(obj.id == '9'){ return this.showPrices = JSON.parse(JSON.stringify(this.GovernanceRequest));}
    }
  },
};
</script>
<style scoped lang="scss">
.leftPad {
  padding-right: 12px;
}
.aplTitleList {
  padding: 6px 0;
  i {
    color: white;
  }
  & > div {
    width: 100%;
    margin: 16px 0;
    height: 46px;
    padding: 0 12px 0 14px;
    color: #a6a6a6;
    cursor: pointer;
  }
  .activeApi {
    background: #262827;
    color: #ffffff;
  }
}
.blackTheme .aplTitleList .activeApi {
    background: #4a4a4a;
}
@media only screen and (max-width: 768px) {
  .leftPad {
    padding-right: 0px;
  }
  .aplTitleList {
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
    & > div {
      height: 36px;
      margin: 6px 0;
      width: 50%;
      padding: 0 6px;
    }
  }
}
  
.apiContent {
  padding-bottom: 20px;
  .apiContent-Title {
    padding: 24px 14px;
    font-weight: 600;
    color: #262827;
  }
  .apiContent-Con {
    padding: 0 14px 24px 14px;
  }
  .RequestCon {
    margin-top: 26px;
    padding-left: 20px;
    p {
      margin-bottom: 10px;
    }
    .ResponseDesc > p {
      margin-bottom: 6px;
    }
  }
}
.blackTheme .apiContent .apiContent-Title {
  color: #b6b6b6;
}
.dian {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
  background: #4a4a4a;
  margin-right: 12px;
}
.indent20 {
  text-indent: 20px;
}
</style>
