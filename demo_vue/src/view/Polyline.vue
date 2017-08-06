<template>
	<div class="h5 polyline">
		<Caption :word="'课程分布方向'"></Caption>
		<com-line :list="list" :cfg="cfg"></com-line>
		<navbar :prev="'\/instruct'" :next="'\/pie'"></navbar>
	</div>
</template>
<script>
import Caption from '@/components/Caption'
import ComLine from '@/components/ComLine'
import Navbar from '@/components/Navbar'
export default {
	name : 'polyline',
	components: { Caption, ComLine, Navbar },
	data(){
		return {
			list: [
				['Js', .4, '#ff7676'],
                ['CSS3', .1],
                ['HTML5', .2],
                ['jQuery', .35],
                ['Php',.2]
			],
			cfg: {
				width: 530, height: 400 
			}
		}
	}
}
</script>
<style lang="less" scoped>
	.com-line{
		width:265px;height:200px;left:0;right:0;top:100px;opacity:0;margin:0 auto;transition: all 1s;
		&.load{
			top:200px;opacity:1;
		}
	}
</style>