<template>
  <div class="h5 radar">
    <Caption :word="'后端开发课程'"></Caption>
    <com-radar :list="list" :cfg="cfg"></com-radar>
    <navbar :prev="'\/barV'" :next="'\/point'"></navbar>
  </div>
</template>
<script>
import Caption from '@/components/Caption'
import ComRadar from '@/components/ComRadar'
import Navbar from '@/components/Navbar'
export default {
  	name: 'radar',
  	components: { Caption, ComRadar, Navbar },
  	data(){
  		return {
  			list: [
  				['Java', .9, '#ff7676'],
          ['MySQL', .6],
          ['Ngnix', .4],
          ['PHP', .5],
          ['Meven',.2]
  			],
        cfg: {
          width: 400,height: 400, bgColor: ['#99c0ff','#f1f9ff'], lineColor: '#f00', fillColor: '#ff7676'
        }
  		}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.com-radar{
    width:200px;height:200px;left:0;right:0;top:100px;opacity:0;margin:0 auto;transition: all 1s;
    &.load{
      top:200px;opacity:1;
    }
  }
</style>
