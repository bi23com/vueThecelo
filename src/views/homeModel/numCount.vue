<template>
  <div class="">
    <div class="count flexDiv justifyCenter">
      <div class="countList" v-for="(item, index) in prosecutorArr" :key="index" :class="(item == ',') ? 'dhCls' : ''">
        <div class="countItem flexDiv" :style="{top: -item*30+'px'}" v-if="(item != ',')">
          <i v-for="(ic, indexc) in 10" :key="indexc">{{ic-1}}</i>
        </div>
        <div class="countItem countItem02 flexDiv" v-if="(item == ',')">
          <i class="netDataNumText">,</i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['num'],
  data() {
    return {
      prosecutorArr: [],
      //这里的数字数组是个8位数，只是占位，不能直接使用，看需求有可能是10位或11、12、20等等
      numbers: ''
      //这个参数是后台传给我们的，也不能直接使用，需要转换
    }
  },
  watch: {
    num(val) {
      this.numbers = val;
      var str = val.toString();
      var arr=str.split("");
      if(this.prosecutorArr < arr.length){
        var prosecutorArr = [];
        for(var i in arr){
          if(i == '3' || i == '7' || i == '11'){
            prosecutorArr.unshift(',','0');
          } else {
            prosecutorArr.unshift('0');
          }
        }
        this.prosecutorArr = prosecutorArr;
      }
      this.plusNPrAll();
    }
  },
  mounted() {
  },
  methods: {
    PrefixInteger(num, length) { //给数字前面补零 比如‘59832’补成8位即位‘00059832’
      return (Array(length).join('0') + num).slice(-length);
    },
    getRandomNumber(min, max) { //为了看效果，refreshLeft触发增加数字看效果，和后台数据过来效果一样，不管增加或减少
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    plusNPrAll() { //为了看效果，点击上面html中的iconfont触发，refreshLeft方法（我真啰嗦~）
      // const res = this.PrefixInteger(this.numbers, 8)
      this.prosecutorArr = this.numbers ? this.$format.thousands(this.numbers) : ['0'];
      // this.prosecutorArr = res.toString().split('')
    },
    refreshLeft() { //刷新数据，我这里因为静态看效果，联调时将请求写在里面就好了
      this.numbers = parseInt(this.numbers) + this.getRandomNumber(1, 100)
      this.plusNPrAll()
    }
  }
}
</script>
<style scoped lang='scss'>
.count .dhCls {
  min-width: 6px !important;
}
.count {
  height: 40px;
  padding: 0 2px;
  .countList {
    width: auto;
    min-width: 14px;
    height: 30px;
    color: #000;
    text-align: center;
    margin: 0;
    position: relative;
    z-index: 3;
    overflow: hidden;
    .countItem {
      width: 100%;
      height: 300px;
      position: absolute;
      left: 0;
      top: 0;
      transition: all 0.7s ease-in-out;
      flex-direction: column;
      i {
        width: 100%;
        height: 30px;
        font-style: normal;
        font-size: 1.5rem;
        color: #5ccd53;
        line-height: 1;
      }
    }
  }
}
@media only screen and (max-width: 1300px) {
  .count .countList {
    min-width: 12px;
  }
  .count .countList .countItem i {
    font-size: 1.2rem;
  }
}
</style>