<template>
	<div class="h5_component com-line" :class="{load: isOk}" ref="container">
		<canvas ref="bg"></canvas>
		<canvas ref="line"></canvas>
	</div>
</template>
<script>
export default {
	name : 'comline',
	props: ['list', 'cfg'],
	computed: {
		w(){
			return this.cfg.width;
		},
		h(){
			return this.cfg.height;
		},
		step(){
			//水平网格线 10份
			return 10;
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
  			//折线图生长动画
  			this.load();
  		},
  		_drawBg(){
  			let canvas = this.$refs.bg,
  			    ctx = canvas.getContext('2d');
  			canvas.width = ctx.width = this.w;
  			canvas.height = ctx.height = this.h;
  			
    		ctx.beginPath();
    		ctx.lineWidth = 1;
    		ctx.strokeStyle = '#aaa';

    		//水平线
    		for(let i=0;i<=this.step;i++){
    		    let y = (this.h/this.step) * i;
    		    ctx.moveTo(0,y);
    		    ctx.lineTo(this.w,y);
    		}

    		//垂直线（根据实际数据来分）
    		let step = this.list.length + 1,
    		    txt_w = this.w/step >> 0,//去掉小数
    		    el = this.$refs.container;
    		for(let i=0;i<=step;i++){
    			let x = (this.w/step)*i;
    			ctx.moveTo(x,0);
    			ctx.lineTo(x,this.h);
    			if(this.list[i]){
    				let txt = document.createElement('div');
    				txt.className = 'text';
    				txt.innerHTML = this.list[i][0];
    				txt.style.width = txt_w/2 + 'px';
    				txt.style.left = (x/2 - txt_w/4) + txt_w/2 + 'px';
    				el.appendChild(txt);
    			}
    		}
    		ctx.stroke();
  		},
  		load(){
  			let canvas = this.$refs.line,
  			     ctx = canvas.getContext('2d');
  			canvas.width = ctx.width = this.w;
  			canvas.height = ctx.height = this.h;
  			
            let s = 0;//步长,0~1之间的数据，会根据这个值绘制最终数据对应的中间状态
            for(let i=0;i<100;i++){
                setTimeout(() => {
                    s += .01;
                    //创建折线画布(数据层) 
                    this._draw(s, ctx);
                },i*10+500);
            }
  		},
  		_draw(per, ctx){
  			ctx.clearRect(0,0,this.w,this.h);
   			ctx.beginPath();
        	ctx.lineWidth = 3;
        	ctx.strokeStyle = '#ff8878';
        	var row_w = this.w/(this.list.length+1),x = 0,y=0;
        	for(let i=0,len=this.list.length;i<len;i++){
        	    let item = this.list[i];
        	    x = row_w * (i+1);
                // y = this.h * (1 - item[1]);
        	    y = this.h - (this.h*item[1]*per);
        	    ctx.moveTo(x,y);
        	    //数据点
        	    ctx.arc(x,y,5,0,Math.PI*2);
        	    //数据 %
        	    ctx.font = 'bold 16px Arial';
        	    ctx.fillStyle = item[2] ? item[2] : '#595959';
        	    ctx.fillText((item[1])*100+'%',x-10,y-10);
        	}
        	//连线
            //ctx.moveTo(row_w,this.h * (1 - this.data[0][1]));
        	ctx.moveTo(row_w, this.h - (this.h*this.list[0][1]*per));
        	for(let i=0,len=this.list.length;i<len;i++){
        	    let item = this.list[i];
                x = row_w * (i+1);
                // y = this.h * (1 - item[1]);
        	    y = this.h - (this.h*item[1]*per);
        	    //连线
        	    ctx.lineTo(x,y);
        	}
        	ctx.stroke();

        	//绘制阴影
        	ctx.fillStyle = 'rgba(255,136,120,.2)';
        	ctx.lineTo(x,this.h);
        	ctx.lineTo(row_w,this.h);
        	ctx.fill();
  		}
  	}
}
</script>
<style lang="less">
	.com-line{
		canvas{position:absolute;left:0;top:0;width:100%;height:100%;}
		.text{
			/*chrome浏览器不会显示小于12px的文本,所以用缩放*/
			position: absolute;font-size:12px;text-align: center;bottom: -20px;height: 20px;line-height: 20px;transform:scale(.8);opacity:1;transition:all 1s 1.5s;
			&.show{
				opacity: 1;
			}
		}
	} 
</style>