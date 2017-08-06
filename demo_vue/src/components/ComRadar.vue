<template>
	<div class="h5_component com-radar" :class="{load: isOk}" ref="container">
		<canvas ref="bg"></canvas>
		<canvas ref="rd"></canvas>
	</div>
</template>
<script>
export default {
	name : 'comradar',
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
    bgColor(){
      return this.cfg.bgColor;
    },
    lineColor(){
      return this.cfg.lineColor||'green';
    },
    fillColor(){
      return this.cfg.fillColor||'pink';
    },
		step(){
			//水平网格线 10份
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
  			//绘制网格线(背景层)
  			this._drawBg();
  			//雷达图生长动画
  			this.load();
  		},
  		_drawBg(){
  			let canvas = this.$refs.bg,
  			    ctx = canvas.getContext('2d');
  			canvas.width = ctx.width = this.w;
  			canvas.height = ctx.height = this.h;

        //画多边形
        //计算多边形在圆上的顶点坐标，圆心坐标(a,b),半径r
        //rad = (2*Math.PI/360) * (360/step) * i
        //x = a + Math.sin(rad) * r
        //y = b + Math.cos(rad) * r
        //分为10份
  			var isBlue = false;
        for(var s=10;s>0;s--){
            ctx.beginPath();
            for(var i=0;i<this.step;i++){
                var rad = (2*Math.PI/360) * (360/this.step) * i,
                    x = this.r + Math.sin(rad) * this.r * (s/10),
                    y = this.r + Math.cos(rad) * this.r * (s/10);
                ctx.lineTo(x,y);
            }
            ctx.closePath();
            ctx.fillStyle = (isBlue = !isBlue) ? (this.bgColor.length&&this.bgColor[0]?this.bgColor[0]:'#000') : (this.bgColor.length&&this.bgColor[1]?this.bgColor[1]:'#fff');
            ctx.fill();
        }
        //绘制伞骨图
        for(var i=0;i<this.step;i++){
            var rad = (2*Math.PI/360) * (360/this.step) * i,
                x = this.r + Math.sin(rad) * this.r,
                y = this.r + Math.cos(rad) * this.r;
            ctx.moveTo(this.r,this.r);
            ctx.lineTo(x,y);
            //输出项目文字
            var text = document.createElement('div');
            text.className = 'text';
            text.innerHTML = this.list[i][0];
            if(x > this.w/2)
              text.style.left = x/2 + 5 + 'px';
            else
              text.style.right = (this.w - x)/2 + 5 + 'px';
            if(y > this.h/2)
              text.style.top = y/2 + 5 + 'px';
            else
              text.style.bottom = (this.h - y)/2 + 5 + 'px';
            if(this.list[i][2]) text.style.color = this.list[i][2]
            text.style.transition = 'all .5s ' + i*.1 + 's';
            this.$refs.container.appendChild(text);
        }
        ctx.strokeStyle = '#e0e0e0';
        ctx.stroke();
  		},
  		load(){
  			let canvas = this.$refs.rd,
  			     ctx = canvas.getContext('2d');
  			canvas.width = ctx.width = this.w;
  			canvas.height = ctx.height = this.h;
  			
        let s = 0;//步长,0~1之间的数据，会根据这个值绘制最终数据对应的中间状态
        for(let i=0;i<100;i++){
            setTimeout(() => {
                s += .01;
                //创建雷达画布(数据层)
                this._draw(s, ctx, this.$refs.container.getElementsByClassName('text'));
            },i*10+500);
        }
  		},
  		_draw(per, ctx, els){
        if(per >= 1){
          for(let t of els) t.className = 'text show';
        } 

  			ctx.clearRect(0,0,this.w,this.h);
   			//输出数据的折线
        ctx.strokeStyle = this.lineColor;
        for(var i=0;i<this.step;i++){
          var rad = (2*Math.PI/360) * (360/this.step) * i,
              rate = this.list[i][1] * per,
              x = this.r + Math.sin(rad) * this.r * rate,
              y = this.r + Math.cos(rad) * this.r * rate;
          ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.stroke();
            
        //输出数据的小点
        ctx.fillStyle = this.fillColor;
        for(var i=0;i<this.step;i++){
          var rad = (2*Math.PI/360) * (360/this.step) * i,
              rate = this.list[i][1] * per,
              x = this.r + Math.sin(rad) * this.r * rate,
              y = this.r + Math.cos(rad) * this.r * rate;
          ctx.beginPath();
          ctx.arc(x,y,5,0,2*Math.PI);
          ctx.fill();
          ctx.closePath();
        }
  		}
  	}
}
</script>
<style lang="less">
  .com-radar{
    canvas{position:absolute;left:0;top:0;width:100%;height:100%;}
    .text{
      position:absolute;font-size:12px;opacity:0;
      &.show{
        opacity:1;
      }
    }
  }
</style>