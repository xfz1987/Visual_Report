<template>
    <div class="loadingPage" v-if="isShow">
      <div class="loading">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
          <div id="rate">{{ rate }}%</div>
      </div>
    </div>
</template>
<script>
export default {
  	name: 'loading',
  	data(){
  		return { rate: 0,isShow: true};
  	},
  	mounted(){
  		this.changeRate(0);
  	},
  	methods: {
  		changeRate(n){
  			var _this = this;
  			setTimeout(function(){
  				_this.rate += 1;
  				if(_this.rate <= 100)
  					_this.changeRate(this.base);
  				else{
  					_this.rate = '100';
  					_this.isShow = false;
  				}
  			}, 1);
  		}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loadingPage{width:100%;height:100%;position: fixed;top:0;left:0;z-index:100;background:#ddd;}
.loading{width: 60px;height: 60px;position: absolute;left:50%;top:50%;margin:-30px 0 0 -30px;}
.loading #rate{font-size: 9px;width: 100%;text-align: center;height: 20px;line-height: 20px;color: #0062e0;position: absolute;top: 100%;}
.double-bounce1,.double-bounce2{width: 100%;height: 100%;border-radius: 50%;background-color: #0062e0;left: 0;top: 0;position: absolute;opacity: .6;}
.double-bounce1 {-webkit-animation:bounce 2s infinite ease-in-out 0s;}
.double-bounce2 {-webkit-animation:bounce2 2s infinite ease-in-out 0s;}
@-webkit-keyframes bounce{
    0%, 100%{-webkit-transform:scale(0);}
    50%{-webkit-transform:scale(1);}
}
@keyframes bounce{
    0%, 100%{transform:scale(0);}
    50%{transform:scale(1);}
}
@-webkit-keyframes bounce2{
    0%, 100%{-webkit-transform:scale(1);}
    50%{-webkit-transform:scale(0);}
}
@keyframes bounce2{
    0%, 100%{transform:scale(1);}
    50%{transform:scale(0);}
}
</style>
