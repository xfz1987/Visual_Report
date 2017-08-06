<template>
	<div ref="point" class="point" :class="{point_focus:curIndex==index}" :style="pointStyle" @click="$emit('change',index)">
		<div class="name">
			{{ child[0] }}
			<div class="per">{{ child[1]*100}}%</div>	
		</div>
	</div>
</template>
<script>
export default {
	name : 'compoint',
	props: ['child','index','base','curIndex'],
	computed: {
		pointStyle(){
			let per = this.child[1]/this.base * 100 + '%';
			return {
				zIndex: 100-this.index,
				width: per,
				height: per,
				backgroundColor: this.child[2]||'', // 必须驼峰式写法
				transitionDelay: this.index*.5+'s'
			}
		}
	},
	mounted(){
  		this.$nextTick(() => {
  			let el = this.$refs.point;
  			setTimeout(() => {
  				el.style.left = this.child[3]||0;
  				el.style.top = this.child[4]||0;
				el.style.opacity = 1;
				el.style.transform = 'scale(1)';
  			},1000);		
  		});
  	}
}
</script>
<style lang="less" scoped>
	.point{
		color:#fff;position:absolute;top:0;left:0;display:block;background-color:#ccc;border-radius:50%;opacity:0;transform:scale(1.1);transition:all 1s;
		.name{
			position:absolute;top:0;bottom:0;margin-top:auto;margin-bottom:auto;height:30px;width:100%;text-align:center;font-size:22px;
			.per{
				font-size:.5em;
			}
		}
	}
	.point_focus{box-shadow:0 0 10px rgba(0,0,0,.5);}
    .point_focus:after{content:'';text-indent:-999px;position:absolute;width:100%;height:100%;left:50%;top:50%;margin-left:-50%;margin-top:-50%;border-radius:50%;-webkit-opacity:.5;opacity:.5;background-color:inherit;-webkit-animation:breathe 3s infinite ease-in-out .5s;animation:breathe 3s infinite ease-in-out .5s;z-index:-1;}
	@keyframes breathe{
    	0%{transform:scale(.5);opacity:.9;}
    	95%{transform:scale(1.5);opacity:0;}
    	100%{transform:scale(.9);opacity:0;}
	}
</style>