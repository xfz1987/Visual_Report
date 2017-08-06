<template>
  <div class="h5 point">
    <Caption :word="'课程难度分布'"></Caption>
    <div class="h5_component com_point">
    	<com-point v-for="(item,index) in list" :child="item" :index="index" key="index" :base="list[0][1]" :curIndex="curIndex" @change="changeCur"></com-point>
    </div>
    <navbar :prev="'\/radar'" :next="'\/end'"></navbar>
  </div>
</template>
<script>
import Caption from '@/components/Caption'
import ComPoint from '@/components/ComPoint'
import Navbar from '@/components/Navbar'
export default {
  	name: 'point',
  	components: { Caption, ComPoint, Navbar },
  	data(){
  		return {
  			list: [
  				['中级' , .4  ,'#ff7676'],
  				['初级' , .2  ,'#ffa3a4', 0 ,'-60%'],
  				['高级' , .3  ,'#99c1ff', '50%' ,'-120%']
  			],
  			curIndex: 0
  		}
  	},
  	methods: {
  		changeCur(n){
  			this.curIndex = n;
  		}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.com_point{
		width:150px;height:150px;left:0;right:0;bottom:20%;margin:0 auto;
	}
</style>
