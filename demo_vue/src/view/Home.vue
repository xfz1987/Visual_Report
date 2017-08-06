<template>
  <div class="h5 home">
    <div class="h5_component logo" :class="{show:isShow}"></div>
    <div class="h5_component slogan" :class="{show:isShow}"></div>
    <div class="h5_component face_img_left" :class="{show:isShow}"></div>
    <div class="h5_component face_img_right" :class="{show:isShow}"></div>
    <navbar :next="'\/instruct'"></navbar>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'home',
  components: { Navbar },
  data(){
  	return {
  		isShow: false
  	}
  },
  mounted(){
  	this.$nextTick(function(){
  		setTimeout(() => {
  			this.isShow = true;
  		}, 500);
  	});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.pos(@a,@b){top:@a;left:@b;};
	.home{
		background-image:url(../assets/images/face_bg.png);
		.logo{
			background-image: url(../assets/images/face_logo.png);width:197.5px;height:65px;.pos(0,50%);margin-left: -98.75px;opacity:0;transition: all 1s;
			&.show{.pos(100px,50%);opacity:1;}
		}
		.slogan{
			background-image: url(../assets/images/face_slogan.png);width:182.5px;height:49.5px;.pos(180px,50%);margin-left: -91.25px;opacity:0;transition: all 1s 500ms;animation:rock 2s infinite 2s;
			&.show{opacity:1;}
		}
		.face_img_left{
			background-image: url(../assets/images/face_img_left.png);width:185px;height:246.5px;left:-50px;bottom:-50px;opacity:0;transition: all 1s 1000ms;
			&.show{opacity:1;left:0;bottom:0;}
		}
		.face_img_right{
			background-image: url(../assets/images/face_img_right.png);width:188px;height:224.5px;right:-50px;bottom:-50px;opacity:0;transition: all 1s 1000ms;
			&.show{opacity:1;right:0;bottom:0;}
		}
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
</style>
