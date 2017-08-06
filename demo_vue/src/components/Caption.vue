<template>
	<div class="h5_component caption">{{ word }}</div>
</template>
<script>
export default {
	name : 'caption',
	props: ['word']
}
</script>
<style lang="less" scoped>
	.caption{left:-100%;width:283px;height:160px;text-align:center;line-height:140px;background:url(../assets/images/page_caption_bg.png) no-repeat center center / 100% 100%;font-size:20px;color:#fff;animation:show 1s 500ms forwards;}
	@keyframes show{
		0%{left:-100%;}
		100%{left:0;}
	}
</style>