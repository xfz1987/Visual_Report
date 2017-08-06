<template>
  <div class="h5 end">
    <div class="h5_component logo"></div>
    <div class="h5_component slogan"></div>
    <div class="h5_component share"></div>
    <div class="h5_component back" @click="goHome"></div>
  </div>
</template>
<script>
export default {
  name: 'end',
  methods: {
    goHome(){
      this.$router.replace('/');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.end{
		background-image:url(../assets/images/page_bg.png);
		.logo{
      left:50%;top:240px;width:179.5px;height:60px;margin-left:-89.75px;opacity:0;animation: logoShow 1s 500ms forwards;background-image: url(../assets/images/tail_logo.png);
    }
    .slogan{
      left:50%;top:280px;width:157px;height:23px;margin-left:-78.5px;opacity:0;animation: sloganShow 1s 1s forwards,rock 2s infinite 2s;background-image: url(../assets/images/tail_slogan.png);
    }
    .share{
      top:110px;right:110px;width:64px;height:60px;opacity:0;animation: shareShow 1s 2s forwards;background-image: url(../assets/images/tail_share.png);
    }
    .back{
      left:50%;top:30px;width:26px;height:25px;margin-left:-16px;animation: back 2s infinite 2s;background-image: url(../assets/images/tail_back.png);
    }
	}
  @keyframes logoShow{
    0%{opacity:0;top:240px;}
    100%{opacity:1;top:210px;}
  }
  @keyframes sloganShow{
    0%{opacity:0;}
    100%{opacity:1;}
  }
	@keyframes rock{
    0%{transform:rotate(0);}
    5%{transform:rotate(3deg);}
    10%{transform:rotate(-4deg);}
    15%{transform:rotate(3deg);}
    20%{transform:rotate(-2deg);}
    25%{transform:rotate(1deg);}
    30%{transform:rotate(-1deg);}
    70%{transform:rotate(0);}
    100%{transform:rotate(0);}
  }
  @keyframes shareShow{
    0%{opacity:0;top:110px;right:110px;}
    100%{opacity:1;top:10px;right:10px;}
  }
  @keyframes back{
    50%{top:20px;}
  }
</style>
