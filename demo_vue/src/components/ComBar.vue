<template>
	<div v-if="type=='bar'" class="line" :class="{load: isOk}">
		<div class="name">{{ child[0] }}</div>
		<div class="rate" :style="{width:child[1]*100+'%'}">
			<div class="bg" :style="{backgroundColor:child[2]||''}"></div>
		</div>
		<div class="per">{{ child[1]*100 }}%</div>
	</div>
	<div v-else class="line-v" :class="{load: isOk}" :style="{width:wi}">
		<div class="name">{{ child[0] }}</div>
		<div class="rate" :style="{height:child[1]*100+'%'}">
			<div class="bg" :style="{backgroundColor:child[2]||''}"></div>
		</div>
		<div class="per">{{ child[1]*100 }}%</div>
	</div>
</template>
<script>
export default {
	name : 'combar',
	props: ['child', 'type', 'wi'],
	data(){
		return {isOk: false}
	},
	mounted(){
  		this.$nextTick(() => {
			setTimeout(() => {
				this.isOk=true;
			}, 1000)
  		});
  	}
}
</script>
<style lang="less" scoped>
	.line{
		height:15px;font-size:12px;line-height:15px;margin-bottom:15px;
		.name{
			width:60px;float:left;color:#000;text-align:right;opacity:0;transition:all 1s;
		}
		.rate{
			height:15px;margin-left:5px;float:left;position:relative;
			.bg{background-color:#99c0ff;width:0;height:100%;position:absolute;top:0;left:0;border-radius:5px;transition:all 1s .5s;}
		}
		.per{float:left;color:#99c0ff;margin-left:5px;opacity:0;transition:all 1s 1.5s;}
		&.load{
			.name{opacity:1;}
			.bg{width:100%;}
			.per{opacity:1;}
		}
	}
	.line-v{
		position:relative;height:100%;font-size:12px;float:left;width:15px;
		.name{
			width:100%;position:absolute;left:0;height:20px;line-height:20px;bottom:-20px;text-align:center;opacity:0;transition:all 1s;
		}
		.rate{
			height:100%;width:15px;position:absolute;bottom:0;left:50%;margin-left:-8px;
			.bg{background-color:#99c0ff;height:0;width:100%;position:absolute;bottom:0;left:0;border-radius:5px;transition:all 1s .5s;}
		}
    	.per{
    		width:100%;height:20px;line-height:20px;text-align:center;position:absolute;left:0;top:-25px;color:#99c0ff;margin-bottom:5px;opacity: 0;transition:all 1s 1.5s;
    	}
    	&.load{
			.name{opacity:1;}
			.bg{height:100%;}
			.per{opacity:1;}
		}
	}
</style>