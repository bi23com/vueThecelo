<template>
  <div>
    <div class="linksWallets">
      <el-row class="flexDiv">
        <el-col :lg="12" :md="12" :sm="24" :xs="24" class="borderRight4f">
          <div class="linksWallets-Con flexDiv marTop22">
            <div class="linksImg">
              <img src="../../assets/images/defiImg.png" />
              <p>Def<span>i</span></p>
            </div>
            <div class="linksTextList">
              <p class="Text16">
                <a class="linksA" href="https://app.ubeswap.org/#/swap">Ubeswap | Celo DEX</a>
              </p>
              <p class="Text16">
                <a class="linksA" href="https://moola.market/">Moola Market</a> - By Patrick | Moola
              </p>
              <p class="Text16">
                <a class="linksA" href="https://plock.fi/">Plock.fi</a> - By Alex | cLabs
              </p>
              <p class="Text16">
                <a class="linksA" href="https://www.impactmarket.com/">Impactmarket Mobile App</a> - By EdRodrigues[Lovecrypto]
              </p>
            </div>
          </div>
        </el-col>
        <el-col :lg="12" :md="12" :sm="24" :xs="24" class="linksWalletsPadLeft">
          <div class="linksWallets-Con flexDiv marTop22">
            <div class="linksImg">
              <img src="../../assets/images/walletsImg.png" />
              <p>Wallets</p>
            </div>
            <div class="linksTextList">
              <p class="Text16">
                <a class="linksA" href="https://valoraapp.com/">Valora Mobile App</a> - By cLabs
              </p>
              <p class="Text16">
                <a class="linksA" href="https://celowallet.app">Celo Web App</a> - By J M Rossy and Brian Schwalm
              </p>
              <p class="Text16">
                <a class="linksA" href="https://celoterminal.com">Celo Desktop App</a> - By zviad | WOTrust
              </p>
              <p class="Text16">
                <a class="linksA" href="https://celo.dance">CeloDance Mobile App</a> - By Bi23 Labs
              </p>
            </div>
          </div>
        </el-col>
        <el-col :lg="12" :md="12" :sm="24" :xs="24" class="borderRight4f">
          <div class="linksWallets-Con flexDiv marTop42 marBtm24">
            <div class="linksImg">
              <img src="../../assets/images/linksImg.png" />
              <p>Links</p>
            </div>
            <div class="linksTextList">
              <p class="Text16">
                <a class="linksA" href="https://celovote.com/">Celo vote</a><span class="h3Color Text16"> - By zviad | WOTrust</span>
              </p>
              <p class="Text16">
                <a class="linksA" href="https://dev.vido.vladiatorlabs.io/block-map">Celo signed map</a><span class="h3Color Text16"> - By Pretoria Research Lab</span>
              </p>
              <p class="Text16">
                <a class="linksA" href="https://blog.openzeppelin.com/celo-contracts-audit/#introduction">Celo Contracts Audit</a><span class="h3Color Text16"> - By OpenZeppelin Security</span>
              </p>
            </div>
          </div>
        </el-col>
        <el-col :lg="12" :md="12" :sm="24" :xs="24" class="linksWalletsPadLeft">
          <div class="linksWallets-Con flexDiv marTop42 marBtm24 ">
            <div class="linksImg">
              <img src="../../assets/images/BotsImg.png" />
              <p>Bots</p>
            </div>
            <div class="linksTextList">
              <p class="Text16">
                <a class="linksA" href="https://t.me/Celo_Ryabina_bot">Celo validator bot</a><span class="h3Color Text16"> - By Ryabina</span>
                <a class="linksA cursorPointer" href="https://t.me/Celo_Ryabina_bot"><img class=" marLeft8 icon1" style="width:24px;" src="../../assets/images/footer/icon1.png"></a>
              </p>
              <p class="Text16">
                <a class="linksA" href="https://t.me/Celo_Ryabina_bot">Whale reminder bot</a><span class="h3Color Text16"> - By Bi23 Labs </span>
                <a class="linksA cursorPointer" href="https://t.me/thecelo_bot"><img class=" marLeft8 icon1" style="width:24px;" src="../../assets/images/footer/icon1.png"></a>
                <a class="linksA cursorPointer" href="https://discord.com/invite/XpVFSDC72d"><img class=" marLeft8 icon1" style="width:24px;" src="../../assets/images/footer/icon2.png"></a>
              </p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "linksWallets",
  data() {
    return {
    };
  },
  components: {
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  },
};
</script>
<style scoped lang="scss">
.linksWalletsPadLeft {
  padding-left: 5%;
}
.linksWallets {
  width: 100%;
  height: auto;
  padding: 18px 2% 32px 2%;
  border-radius: 12px;
  background: #343535;
  .linksWallets-Con {
    width: auto;
    max-width: 100%;
    margin: 0 auto;
    padding-left: 4%;
    .linksImg {
      width: 70px;
      text-align: center;
      color: white;
      p {
        text-align: center;
        // letter-spacing:1px;
      }
      img {
        margin: 6px 0 12px 0;
        width: 36px;
      }
    }
    .linksTextList {
      width: calc(100% - 90px);
      p {
        margin: 12px 0;
      }
    }
  }
}
@media only screen and (max-width: 980px) {
  .linksWalletsPadLeft {
    padding-left: 0%;
  }
  .borderRight4f {
    border-right: none;
  }
}

@media only screen and (max-width: 600px) {
  .linksWallets .linksWallets-Con {
    padding-left: 0;
  }
  .linksWallets .linksWallets-Con .linksImg img {
    margin: 6px 0;
  }
  .linksWallets .linksWallets-Con .linksTextList {
    width: calc(100% - 70px);
  }
}
</style>
