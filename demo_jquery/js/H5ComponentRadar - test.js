/* 雷达图组件对象 */
;(function($){
	var H5ComponentRadar = function(name, cfg){
		this.component = new H5ComponentBase(name, cfg);
		this.w = cfg.width;
		this.h = cfg.height;
        this.r = this.w/2;
		this.data = cfg.data;
        this.step = cfg.data.length;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.ctx.width = this.w;
        this.canvas.height = this.ctx.height = this.h;
		this._init();
		return this.component;
	};
	H5ComponentRadar.prototype = {
		_init: function(){
			//绘制网格线(背景层)
			this._drawBg();
			//创建折线画布(数据层)
			// this._draw();
            //事件初始化
            this._eventInit();
		},
		_drawBg: function(){
			//创建画布
			var canvas = document.createElement('canvas'),
   				ctx = canvas.getContext('2d');
   			canvas.width = ctx.width = this.w;
   			canvas.height = ctx.height = this.h;
   			//圆心小圈
            ctx.beginPath();
            ctx.arc(this.r,this.r,5,0,2*Math.PI);
    		ctx.stroke();
            //外围大圈
            ctx.beginPath();
            ctx.arc(this.r,this.r,this.r,0,2*Math.PI);
            ctx.stroke();
            
            //画多边形
            //计算多边形在圆上的顶点坐标，圆心坐标(a,b),半径r
            //rad = (2*Math.PI/360) * (360/step) * i
            //x = a + Math.sin(rad) * r
            //y = b + Math.cos(rad) * r
            
            ctx.beginPath();
            for(var i=0;i<this.step;i++){
                var rad = (2*Math.PI/360) * (360/this.step) * i,
                    x = this.r + Math.sin(rad) * this.r,
                    y = this.r + Math.cos(rad) * this.r;
                // ctx.arc(x,y,5,0,2*Math.PI);
                // ctx.moveTo(this.r,this.r);
                ctx.lineTo(x,y);
                
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            for(var i=0;i<this.step;i++){
                var rad = (2*Math.PI/360) * (360/this.step) * i,
                    x = this.r + Math.sin(rad) * this.r * .5,
                    y = this.r + Math.cos(rad) * this.r * .5;
                ctx.lineTo(x,y);
                
            }
            ctx.fillStyle = '#f00';
            ctx.closePath();
            ctx.fill();
            ctx.stroke();


            this.component.append(canvas);
		},
        /**
         * 创建折线画布(数据层)
         * @param  {float} per 0~1之间的数据，会根据这个值绘制最终数据对应的中间状态
         */
		_draw: function(per){
            
			
		},
        _eventInit: function(){
            var _this = this;
            this.component.on('load',function(){
                //雷达图生长动画
                var s = 0;//步长
                for(var i=0;i<100;i++){
                    setTimeout(function(){
                        s += .01;
                        // _this._draw(s);
                    },i*10+500);
                }
            });
            this.component.on('leave',function(){
                //折线图生长动画
                var s = 1;//步长
                for(var i=0;i<100;i++){
                    setTimeout(function(){
                        s -= .01;
                        // _this._draw(s);
                    },i*10);
                }
            });
            return this.component;
        }
	};
	window['H5ComponentRadar'] = H5ComponentRadar;
})(jQuery);
