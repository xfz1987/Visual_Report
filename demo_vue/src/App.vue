<template>
  <div id="app">
    <transition :name="enterType">
      <router-view></router-view>
    </transition>
    <loading></loading>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
// import { mapState } from 'vuex';
export default {
  name: 'app',
  props: ['forward'],
  components: {Loading},
  computed: {
    // ...mapState(['count']),
    enterType(){
      return this.forward ? 'slide-left' : 'slide-right';
    }
  }
}
</script>

<style lang="less">
  @import url(./assets/css/main.less);
  #app{width:100%;height:100%;overflow:hidden;}

</style>
