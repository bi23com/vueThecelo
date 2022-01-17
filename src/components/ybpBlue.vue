<template>
  <div style="transform: scale(0.8);">
    <svg :viewBox="`0 0 ${2*radius + srtokeWidth} ${radius + srtokeWidth}`" shape-rendering="optimizeQuality">
      <defs>
        <linearGradient id="linear02" x1="0%" y1="0%" x2="100%" y2="0%" shape-rendering="optimizeQuality">
          <stop offset="0%" :stop-color="startColor" />
          <stop offset="100%" :stop-color="endColor" />
        </linearGradient>
      </defs>
      <path :d="`M ${srtokeWidth/2} ${radius + srtokeWidth/2} a ${radius} ${radius} 0 1 1 ${radius * 2} 0`" 
        :stroke-width="srtokeWidth" :stroke="emptyColor" fill="none" stroke-linecap="round" shape-rendering="optimizeQuality"></path>
        
      <path :d="`M ${ srtokeWidth/2} ${radius + srtokeWidth/2} a ${radius} ${radius} 0 1 1 ${radius * 2} 0`" 
        :stroke-width="srtokeWidth" stroke="url(#linear02)" fill="none" stroke-linecap="round" 
        :stroke-dasharray="strokeDasharray" :stroke-dashoffset="strokeDashoffset" shape-rendering="optimizeQuality">
        <animate attributeName="stroke-dashoffset" :dur="`${durTime}ms`" fill="freeze" 
          :from="strokeDasharray" :to="strokeDashoffset"></animate>
      </path>
    </svg>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultDurTime: 1000, //进度条完结时间
      defaultEmptyColor: '#ECF2FF', //默认底色
      defaultNegativeColor: '#FF4456',
      //        defaultPositiveColor: '#56D5E4', //进行时底色
      defaultSrtokeWidth: 4, //进度线宽度
      defaultRadius: 20,
    }
  },
  props: ['options'],
  computed: {
    startColor(){
      return this.options.startColor || '#FF9696';
    },
    endColor(){
      return this.options.endColor || '#2188FF';
    },
    durTime() {
      return this.options
        ? this.options.durTime || this.defaultDurTime
        : this.defaultDurTime
    },
    radius() {
      return this.options
        ? this.options.radius || this.defaultRadius
        : this.defaultRadius
    },
    emptyColor() {
      return this.options
        ? this.options.emptyColor || this.defaultEmptyColor
        : this.defaultEmptyColor
    },
    srtokeWidth() {
      return this.options
        ? this.options.srtokeWidth || this.defaultSrtokeWidth
        : this.defaultSrtokeWidth
    },
    strokeDasharray() {
      return 3.1415926 * this.radius
    },
    strokeDashoffset() {
      return this.options.value
    }
  },
  mounted(){
  },
  watch: {
    options(val) {
      this.options = val;
    // console.log(JSON.stringify(this.options)+"===options")
    }
  }
}
</script>
