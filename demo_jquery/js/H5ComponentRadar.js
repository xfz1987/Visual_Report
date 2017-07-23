/* 雷达图组件对象 */
;(function($){
	var H5ComponentRadar = function(name, cfg){
		this.component = new H5ComponentBase(name, cfg);
		this.w = cfg.width;
		this.h = cfg.height;
        this.r = this.w/2;
		this.data = cfg.data;
        this.step = cfg.data.length;
        this.bgColor = cfg.bgColor;
        this.lineColor = cfg.lineColor||'green';
        this.fillColor = cfg.fillColor||'pink';
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.ctx.width = this.w;
        this.canvas.height = this.ctx.height = this.h;
		this._init();
		return this.component;
	};
	H5ComponentRadar.prototype = {
		_init: function(){
			//绘制网格背景
			this._drawBg();
			//创建数据层
			// this._draw(.5);
            //事件初始化
            this._eventInit();
		},
		_drawBg: function(){
			var canvas = document.createElement('canvas'),
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
                var text = $('<div class="text">'+this.data[i][0]+'</div>');
                x > this.w/2 ? text.css('left',x/2+5) : text.css('right',(this.w-x)/2+5);
                y > this.h/2 ? text.css('top',y/2+5) : text.css('bottom',(this.h-y)/2+5);
                this.data[i][2] && text.css('color',this.data[i][2]);
                var transStyle = 'all .5s ' + i*.1 + 's';                
                text.appendTo(this.component).css({'webkitOpacity':0,'opacity':0,'webkitTransition':transStyle,'transition':transStyle});
            }
            ctx.strokeStyle = '#e0e0e0';
            ctx.stroke();
            
            this.component.append(canvas);
		},
        /**
         * 创建折线画布(数据层)
         * @param  {float} per 0~1之间的数据，会根据这个值绘制最终数据对应的中间状态
         */
		_draw: function(per){
            if(per >= 1){
                this.component.find('.text').css('opacity',1);
            }
            if(per <= 1){
                this.component.find('.text').css('opacity',0);
            }

            this.ctx.clearRect(0,0,this.w,this.h);
            
            //输出数据的折线
            this.ctx.strokeStyle = this.lineColor;
            for(var i=0;i<this.step;i++){
                var rad = (2*Math.PI/360) * (360/this.step) * i,
                    rate = this.data[i][1] * per,
                    x = this.r + Math.sin(rad) * this.r * rate,
                    y = this.r + Math.cos(rad) * this.r * rate;
                this.ctx.lineTo(x,y);
            }
            this.ctx.closePath();
            this.ctx.stroke();
            
            //输出数据的小点
            this.ctx.fillStyle = this.fillColor;
            for(var i=0;i<this.step;i++){
                var rad = (2*Math.PI/360) * (360/this.step) * i,
                    rate = this.data[i][1] * per,
                    x = this.r + Math.sin(rad) * this.r * rate,
                    y = this.r + Math.cos(rad) * this.r * rate;
                this.ctx.beginPath();
                this.ctx.arc(x,y,5,0,2*Math.PI);
                this.ctx.fill();
                this.ctx.closePath();
            }

            this.component.append(this.canvas);
		},
        _eventInit: function(){
            var _this = this;
            this.component.on('load',function(){
                //雷达图生长动画
                var s = 0;//步长
                for(var i=0;i<100;i++){
                    setTimeout(function(){
                        s += .01;
                        _this._draw(s);
                    },i*10+500);
                }
            });
            this.component.on('leave',function(){
                //折线图生长动画
                var s = 1;//步长
                for(var i=0;i<100;i++){
                    setTimeout(function(){
                        s -= .01;
                        _this._draw(s);
                    },i*10);
                }
            });
            return this.component;
        }
	};
	window['H5ComponentRadar'] = H5ComponentRadar;
})(jQuery);
