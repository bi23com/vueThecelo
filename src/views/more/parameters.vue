<template>
  <div :class="$store.state.themeCls">
    <div class="mainContainer">
      <div class="">
        <p class="primaryTitle">Network Parameters</p>
      </div>
      <div class="mainCon-sub">
        <el-card class="marTop32 Parameterspage">
          <div v-html="network_parameters_body" class="parametersCon"></div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { account } from "@/assets/api/requset.js";
export default {
  name: "parameters",
  data() {
    return {
      network_parameters_body: '',
    };
  },
  components: {
  },
  computed: {
  },
  mounted() {
    this.$store.commit('updateMoreText', 'more1');
    this.getHtmlData();
  },
  methods: {
    getHtmlData() {
      var parmas = {
        method: 'network_parameters'
      };
      account(parmas).then((response) => {
        var replacePer = response.replace("var parameters = '","");
        var replaceNext = replacePer.replace("';","");
        this.network_parameters_body = replaceNext;
      })
    }
  },
};
</script>
<style lang="scss">
.parametersCon {
  p{
    font-size: 1.1rem;
    margin-top: 12px;
  }
  strong  {
    font-weight: normal !important;
  }
  ul,li {
    width: 100%;
  }
  ul {
    display: block;
  }
  ul {
    li{
      width: 100%;
      margin-bottom: 16px;
      display: -webkit-flex;
      display: flex;
      justify-content: start;
      align-content: start;
      align-items: start;
      & > span:first-child {
        width: 200px;
        color: #4A4A4A;
        font-size: 0.9rem;
        display: inline-block;
      }
      & > span:last-child {
        font-size: 0.9rem;
        color: #5CCD53;
        display: inline-block;
        width: calc(100% - 200px);
      }
    }
  }
  & > ul {
    width: 98%;
    height: auto;
    padding: 24px 20px;
    margin: 16px 0 36px 2%;
    border-radius: 8px;
    // #FBFBFB
    background: #f9f9f9;
    & > li > ul li:first-child {
      margin-left: 0 !important;
    }
    & > li > ul {
      width: calc(100% - 200px);
      li {
        display: inline-block;
        margin-bottom: 12px;
        span {
          color: #5CCD53 !important;
        }
      }
      & > li > ul {
        margin-top: 10px;
        width: 100%;
        li {
          display: inline-block;
          margin-left: 20px;
          span {
            color: #5CCD53 !important;
          }
        }
        li span:first-child {
          color: #959595 !important;
        }
      }
      & > li > ul li:first-child{
        margin-left: 20px !important;
      }
    }
  }
  hr {
    display: none;
  }
}
@media only screen and (max-width: 767px) {
  .parametersCon > ul {
    width: 100%;
    margin: 16px 0 36px 0;
    padding: 24px 12px;
  }
  .parametersCon ul li {
    flex-wrap: wrap;
  }
  .parametersCon ul li > span:first-child,
  .parametersCon ul li > span:last-child,
  .parametersCon ul li > span,
  .parametersCon ul li {
    width: auto;
  }
  .parametersCon ul li > span:last-child {
    margin-left: 8px;
  }
  .parametersCon > ul > li > ul{
    width: auto;
    margin-left: 8px;
  }
  .parametersCon li > ul li {
    margin-left: 8px;
  }
  .parametersCon ul li > span {
    word-break:break-all;
  }
}
.width120px {
  width: 120px;
}
.width120Other {
  width: calc(100% - 140px);
}
</style>
