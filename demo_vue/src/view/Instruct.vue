<template>
  <div class="h5 instruct">
    <Caption :word="'核心理念'"></Caption>
    <div class="ty">好好学习 天天向上</div>
    <div class="h5_component word">唯有提升自己，才不会被那些别有用心的人当枪使，当你足够强大时，你需要转身才能看见他们，但你没有那个必要，因为已经不在同一层面上，感谢自己的努力，我成就了自己。</div>
    <div class="h5_component sy"></div>
    <navbar :prev="'\/'" :next="'\/polyline'"></navbar>
  </div>
</template>
<script>
import Caption from '@/components/Caption'
import Navbar from '@/components/Navbar'
export default {
  name: 'instruct',
  components: { Caption, Navbar}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.instruct{
    background-image:url(../assets/images/page_bg.png);
	  .ty{
      position:absolute;left:0;top:240px;opacity:0;text-align:center;color:red;font-size:26px;width:100%;animation: pyshow 1s 1s forwards;
    }
    .word{
      background-image: url(../assets/images/description_bg.gif);width:240.5px;height:147.5px;opacity:0;padding:15px 10px 10px;color:#fff;font-size:15px;line-height:18px;text-align:justify;left:50%;margin-left:-120.25px;top:240px;animation: wordshow 1s 1.5s forwards;
    }
    .sy{
      width:257.5px;height:152.5px;background-image: url(../assets/images/p1_people.png);left:50%;margin-left:-128.75px;opacity:0;bottom:0;animation: tyshow 1s 2s forwards;                    
    }
	}
	@keyframes pyshow{
    0%{opacity:0;top:240px;}
    100%{opacity:1;top:120px;}
  }
  @keyframes wordshow{
    0%{opacity:0;top:240px;}
    100%{opacity:1;top:180px;}
  }
  @keyframes tyshow{
    0%{opacity:0;bottom:0;}
    100%{opacity:1;bottom:40px;}
  }
</style>
