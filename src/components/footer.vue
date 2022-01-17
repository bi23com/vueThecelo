<template>
  <div class="">
    <div class="footerBom textCenter">
      <div class="footerSearDiv">
         <div class="footer-search flexDiv"> 
          <input placeholder="Type your email..." v-model="inpsubscribe"/>
          <p class="searBF cursorPointer" @click="subscribe">Subscribe</p>
        </div>
        <p class="textCenter Text16 marTop12">{{subscribeTip}}</p>
      </div>
      <p class="whiteColor">Like what we do? Support thecelo by making a donation!</p>
      <p class="h5Color Text16">{{fotAdd}}
        <el-tooltip class="item marLeft4" content="Go Explorer" placement="bottom">
          <span class="iconfont icon-lianjie h5Color cursorPointer" @click="jumpAddress(fotAdd)">
          </span>
        </el-tooltip>
        <el-tooltip class="item marLeft4" placement="bottom">
          <div slot="content" class="Text14">
            Copy Address: {{fotAdd}}
          </div>
          <span class="iconfont icon-fuzhi h5Color cursorPointer" v-clipboard:copy="fotAdd" v-clipboard:success="onCopySuc" v-clipboard:error="onCopyError">
          </span>
        </el-tooltip>
      </p>
      <div class="flexDiv footerIcon h5Color marTop12">
        <p class="h5Color Text16 flexDiv">
          Built by<span><a class="linksA Text16 h5Color" href="https://bi23.com/"><img class="icon3" src="../assets/images/footer/icon5.png">Bi23 Labs</a></span>
          <a class="linksA" href="https://twitter.com/bi23com"><span><i class="iconfont icontwitter h5Color"></i></span></a>
          <a class="linksA" href="https://github.com/bi23com/thecelo"><span><i class="iconfont icongithub h5Color"></i></span></a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { account } from "@/assets/api/requset.js";
export default {
  name: "Home",
  data() {
    return {
      inpsubscribe: '',
      subscribeTip: '',
      fotAdd: '0xdD6B923D48E5A8Ca3eb0db3E995D59fa94A33930'
    };
  },
  components: {},
  computed: {},
  methods:{
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
    subscribe(){
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(this.inpsubscribe === "" || !regex.test(this.inpsubscribe.toLowerCase())){
        this.subscribeTip = 'PLEASE ENTER A VALID EMAIL!'
        return;
      }
      this.subscribeTip = `Thank you!  We'll add you to the list`
      account({method: 'email_subscribe', email: this.inpsubscribe}).then((response) => {
        setTimeout(()=>{
          this.subscribeTip = '';
          this.inpsubscribe = '';
        }, 1600)
      })
    }
  }
};
</script>
<style scoped lang="scss">
.icon1 {
  width: 30px;
  margin: 0 8px;
}
.pageCls {
  color: #ffffff;
}
.footerBom {
  height: auto;
  width: 100%;
  padding: 20px 0 30px 0;
  .footerSearDiv {
    margin: 28px 0 20px 0;
  }
  .footer-search {
    width: 300px;
    height: 40px;
    border-radius: 24px;
    border: 1px solid #666666;
    border-right: none;
    background: transparent;
    margin: 0 auto;
    input,
    input:focus {
      width: 180px;
      height: auto;
      padding-left: 20px;
      background: transparent;
      border: none;
      outline: 0;
      color: white;
    }
    .searBF {
      width: 90px;
      background-color: #2DC478;
      border-color: #2DC478;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: white;
      border-radius: 24px;
    }
  }
  p {
    margin: 4px 0;
  }
  .footerIcon {
    p{
      line-height: 1;
    }
    justify-content: center;
    img {
      width: 20px;
    }
    img.icon3 {
      width: 10px;
      margin-right: 8px;
    }
    span {
      line-height: 1;
      margin-left: 12px;
    }
    i {
      font-size: 14px;
    }
  }
}
</style>
