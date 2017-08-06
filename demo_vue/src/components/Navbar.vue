<template>
  <div class="navbar">
    <router-link v-if="prev!=undefined" class="left" :to='prev'>上一页</router-link>
    <router-link v-if="next!=undefined" class="right" :to='next'>下一页</router-link>
  </div>
</template>
<script>
export default {
  name: 'navbar',
  props: ['prev','next']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.navbar{
	width:100%;position: absolute;left:0;bottom:10px;
	a{
		text-decoration: none;display:block;width:20%;height:30px;line-height:30px;color:rgba(0,0,0,.6);font-size:18px;text-align: center;font-weight:0;
		&.left{float: left;}
		&.right{float: right;}
	}
}
</style>
