<template>
  <div id="app" :class="themeCls" class="appCls">
    <div class="footerBg ">
      <div class="pageCls">
        <headSearch></headSearch>
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
        <!-- <linksWallets></linksWallets> -->
        <baseCon></baseCon>
      </div>
    </div>
    <el-backtop :bottom="100" :visibility-height="50"></el-backtop>
  </div>
</template>
<script>
import linksWallets from "@/views/homeModel/linksWallets";
import baseCon from "@/components/footer";
import headSearch from "@/components/headSearch";
export default {
  name: "app",
  components: { baseCon, headSearch, linksWallets },
  computed: {
    themeCls() {
      return this.$store.state.themeCls;
    },
  },
  data () {
    return {
    }
  },
  mounted(){
  },
  methods:{
  },
  watch: {
  }
};
</script>

<style lang="scss">
@import "./assets/css/blackTheme.scss";
@import "./assets/css/base.scss";
@import "./assets/css/pageScss.scss";
.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s linear;
}
.fade-enter {
  transform: translateX(-100%);
}
.fade-leave-to {
  // transform: translateX(100%);
}

/* fade-transform */
.fade-transform-enter-active {
  transition: all .5s;
}
.fade-transform-leave-active {
  transition: all .2s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>
