<template>
	<div class="h5 bar">
		<Caption :word="'前端开发课程'"></Caption>
		<div class="h5_component com_bar">
			<com-bar v-for="(item,index) in list" :child="item" :key="index" :type="type"></com-bar>
		</div>
		<navbar :prev="'\/pie'" :next="'\/barV'"></navbar>
	</div>
</template>
<script>
import Caption from '@/components/Caption'
import ComBar from '@/components/ComBar'
import Navbar from '@/components/Navbar'
export default {
	name : 'bar',
	components: { Caption, ComBar, Navbar },
	data(){
		return {
			type: 'bar',
			list: [
				['Vue', .2],
                ['React', .3, '#ff7676'],
                ['ReactN', .15],
                ['Angular', .15],
                ['Node', .2]
			]
		}
	}
}
</script>
<style lang="less" scoped>
	.com_bar{
		width:265px;height:300px;left:0;right:0;top:200px;margin:0 auto;opacity:1;
	}
</style>