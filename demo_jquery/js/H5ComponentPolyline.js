/* 折线图组件对象 */
;(function($){
	var H5ComponentPolyline = function(name, cfg){
		this.component = new H5ComponentBase(name, cfg);
		this.w = cfg.width;
		this.h = cfg.height;
		this.data = cfg.data;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.ctx.width = this.w;
        this.canvas.height = this.ctx.height = this.h;
		this._init();
		return this.component;
	};
	H5ComponentPolyline.prototype = {
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
   			//水平网格线 10份
   			var step = 10;
    		ctx.beginPath();
    		ctx.lineWidth = 1;
    		ctx.strokeStyle = '#aaa';

    		//window.ctx = ctx;
    		//水平线
    		for(var i=0;i<=step;i++){
    		    var y = (this.h/step) * i;
    		    ctx.moveTo(0,y);
    		    ctx.lineTo(this.w,y);
    		}

    		//垂直线（根据实际数据来分）
    		step = this.data.length + 1;
    		var txt_w = this.w/step >> 0;//去掉小数
    		for(var i=0;i<=step;i++){
    			var x = (this.w/step)*i;
    			ctx.moveTo(x,0);
    			ctx.lineTo(x,this.h);
    			//输出项目文本
    			if(this.data[i]){
    				var txt = $('<div class="text">');
    				txt.text(this.data[i][0]);
    				txt.css({width:txt_w/2, left:(x/2 - txt_w/4) + txt_w/2});
    				this.component.append(txt);
    			}
    		}
    		ctx.stroke();
    		this.component.append(canvas);
		},
        /**
         * 创建折线画布(数据层)
         * @param  {float} per 0~1之间的数据，会根据这个值绘制最终数据对应的中间状态
         */
		_draw: function(per){
            this.ctx.clearRect(0,0,this.w,this.h);
   			this.ctx.beginPath();
        	this.ctx.lineWidth = 3;
        	this.ctx.strokeStyle = '#ff8878';
        	var row_w = this.w/(this.data.length+1),
        	    x = 0,y=0;
        	for(var i=0,len=this.data.length;i<len;i++){
        	    var item = this.data[i];
        	    x = row_w * (i+1);
                // y = this.h * (1 - item[1]);
        	    y = this.h - (this.h*item[1]*per);
        	    this.ctx.moveTo(x,y);
        	    //数据点
        	    this.ctx.arc(x,y,5,0,Math.PI*2);
        	    //数据 %
        	    this.ctx.font = 'bold 16px Arial';
        	    this.ctx.fillStyle = item[2] ? item[2] : '#595959';
        	    this.ctx.fillText((item[1])*100+'%',x-10,y-10);
        	}
        	//连线
            // this.ctx.moveTo(row_w,this.h * (1 - this.data[0][1]));
        	this.ctx.moveTo(row_w, this.h - (this.h*this.data[0][1]*per));
        	for(var i=0,len=this.data.length;i<len;i++){
        	    var item = this.data[i];
                x = row_w * (i+1);
                // y = this.h * (1 - item[1]);
        	    y = this.h - (this.h*item[1]*per);
        	    //连线
        	    this.ctx.lineTo(x,y);
        	}
        	this.ctx.stroke();

        	//绘制阴影
        	this.ctx.fillStyle = 'rgba(255,136,120,.2)';
        	this.ctx.lineTo(x,this.h);
        	this.ctx.lineTo(row_w,this.h);
        	this.ctx.fill();
   			
   			this.component.append(this.canvas);
			
		},
        _eventInit: function(){
            var _this = this;
            this.component.on('load',function(){
                //折线图生长动画
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
	window['H5ComponentPolyline'] = H5ComponentPolyline;
})(jQuery);
