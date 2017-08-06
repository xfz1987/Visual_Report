<template>
	<div class="h5_component com-pie" :class="{load: isOk}" ref="container">
    <canvas ref="backLayer" style="z-index:1;"></canvas>
		<canvas ref="dataLayer" style="z-index:2;"></canvas>
    <canvas ref="markLayer" style="z-index:3;"></canvas>
	</div>
</template>
<script>
export default {
	name : 'compie',
	props: ['list', 'cfg'],
	computed: {
		w(){
			return this.cfg.width;
		},
		h(){
			return this.cfg.height;
		},
    r(){
      return this.cfg.width/2;
    },
    colors(){
      return this.cfg.colors||['green','blue','black','red','orange','pink'];
    },
    markFillColor(){
      return this.cfg.markFillColor||'pink';
    },
    markStrokeColor(){
      return this.cfg.markStrokeColor||'pink';
    },
    step(){
      return this.list.length;
    }
	},
	data(){
		return { isOk: false };
	},
	mounted(){
  		this.$nextTick(() => {
			   setTimeout(() => {
			   	this.isOk = true;
			   	this.init();
			   }, 1000);
  		});
  	},
  	methods: {
  		init(){
  			//绘制底图
        this._drawBackLayer();
        //绘制数据层
        this._drawDataLayer();
        //绘制蒙版层
        this._drawMarkLayer();
  			//雷达图生长动画
  			this.load();
  		},
  		_drawBackLayer(){
        let canvas = this.$refs.backLayer,
            ctx = canvas.getContext('2d');
        canvas.width = ctx.width = this.w;
        canvas.height = ctx.height = this.h;

        ctx.beginPath();
        ctx.fillStyle = this.markFillColor
        ctx.strokeStyle = this.markStrokeColor;
        ctx.lineWidth = 1;
        ctx.arc(this.r,this.r,this.r,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
  		},
      _drawDataLayer(){
        let canvas = this.$refs.dataLayer,
            ctx = canvas.getContext('2d');
        canvas.width = ctx.width = this.w;
        canvas.height = ctx.height = this.h;
        var sAngel = 1.5 * Math.PI;
        for(var i=0;i<this.step;i++){
            var item = this.list[i],
                color = item[2]||(item[2] = this.colors.pop()),
                eAngel = sAngel + Math.PI*2 * item[1];
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = .1;
            ctx.moveTo(this.r,this.r);
            ctx.arc(this.r,this.r,this.r,sAngel,eAngel);
            ctx.fill();
            ctx.stroke(); 
            sAngel = eAngel;

            //加入项目文本及百分比
            let txt = document.createElement('div');
            txt.className = 'text';
            txt.innerHTML = item[0];
            let per = document.createElement('div');
            per.className = 'per';
            per.innerHTML = item[1]*100 + '%';
            txt.appendChild(per);
            let x = this.r + Math.sin(.5*Math.PI - sAngel) * this.r,
                y = this.r + Math.cos(.5*Math.PI - sAngel) * this.r,
                transStyle = 'all .5s ' + i*.1 + 's';
            if(x > this.w/2)
              txt.style.left = x/2 + 'px';
            else
              txt.style.right = (this.w-x)/2 + 'px';
            if(y > this.h/2)
              txt.style.top = y/2 + 'px';
            else
              txt.style.bottom = (this.h-y)/2 + 'px';
            if(item[2]) txt.style.color = item[2];
            txt.style.transition = transStyle;
            this.$refs.container.appendChild(txt);
        }
      },
      _drawMarkLayer(){
        let canvas = this.$refs.markLayer,
            ctx = canvas.getContext('2d');
        canvas.width = ctx.width = this.w;
        canvas.height = ctx.height = this.h;
        ctx.fillStyle = this.markFillColor;
        ctx.strokeStyle = this.markStrokeColor;
        ctx.lineWidth = 1;
        this._draw(0, ctx);
      },
      _draw(per, ctx, els){
        ctx.clearRect(0,0,this.w,this.h);
        ctx.beginPath();
        ctx.moveTo(this.r,this.r);
        per <= 0 ? ctx.arc(this.r,this.r,this.r,0,2*Math.PI, true) : ctx.arc(this.r,this.r,this.r,1.5 * Math.PI,1.5 * Math.PI+2*Math.PI*per, true); 
        ctx.fill();
        ctx.stroke();

        if(per >= 1){
            for(let s of els) s.className = 'text show';            
        }
      },
  		load(){
        let ctx = this.$refs.markLayer.getContext('2d'),
            s = 0;//步长,0~1之间的数据，会根据这个值绘制最终数据对应的中间状态
        for(let i=0;i<100;i++){
            setTimeout(() => {
                s += .01;
                //创建雷达画布(数据层)
                this._draw(s, ctx, this.$refs.container.getElementsByClassName('text'));
            },i*10+500);
        }
  		}
  	}
}
</script>
<style lang="less">
  .com-pie{
    canvas{position:absolute;left:0;top:0;width:100%;height:100%;}
    .text{
      position:absolute;text-align:center;z-index:99;height:24px;line-height:13px;opacity:0;transition: all 1s linear;
      &.show{
        opacity:1;
      }
    }
  }
</style>