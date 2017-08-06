<template>
  <div class="h5 pie">
    <Caption :word="'移动开发课程资源'"></Caption>
    <com-pie :list="list" :cfg="cfg"></com-pie>
    <navbar :prev="'\/polyline'" :next="'\/bar'"></navbar>
  </div>
</template>
<script>
import Caption from '@/components/Caption'
import ComPie from '@/components/ComPie'
import Navbar from '@/components/Navbar'
export default {
  	name: 'compie',
  	components: { Caption, ComPie, Navbar },
  	data(){
  		return {
  			list: [
  				['Js', .4, '#ff7676'],
          ['CSS3', .2],
          ['HTML5', .05],
          ['jQuery', .2],
          ['Php',.15]
  			],
        cfg: {
          width: 400,height: 400, colors: ['red','green','blue','#a00','orange'], markFillColor: '#eee', markStrokeColor: '#eee'
        }
  		}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.com-pie{
    width:200px;height:200px;left:0;right:0;top:100px;opacity:0;margin:0 auto;transition: all 1s;
    &.load{
      top:250px;opacity:1;
    }
  }
</style>
