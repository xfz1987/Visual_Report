/* 饼图组件对象 */
;(function($){
	var H5ComponentPie = function(name, cfg){
		this.component = new H5ComponentBase(name, cfg);
		this.w = cfg.width;
		this.h = cfg.height;
		this.data = cfg.data;
        this.colors = cfg.colors||['green','blue','black','red','orange','pink'];
        this.markFillColor = cfg.markFillColor||'pink';
        this.markStrokeColor = cfg.markStrokeColor||'pink';
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.ctx.width = this.w;
        this.canvas.height = this.ctx.height = this.h;
        this.r = this.w/2;
		this._init();
		return this.component;
	};
	H5ComponentPie.prototype = {
		_init: function(){
			//绘制底图
			this._drawBackLayer();
			//绘制数据层
			this._drawDataLayer();
            //绘制蒙版层
            this._drawMarkLayer();
            //事件初始化
            this._eventInit();
		},
        _drawBackLayer: function(){
            var markFillColor = this.markFillColor,
                markStrokeColor = this.markStrokeColor,
                r = this.w/2,a = r,b = r,
                _can = this._drawArc('back', {
                    fillStyle : markFillColor,
                    strokeStyle : markStrokeColor,
                    lineWidth : 1,
                    a : a,
                    b : b,
                    r : r
                });
            this.component.append(_can);
        },
        _drawDataLayer: function(){
            var r = this.w/2,a = r,b = r,
                step = this.data.length,
                data = this.data,
                colors = this.colors,
                _can = this._drawArc('data', {
                    sAngel : 1.5 * Math.PI,//起始角度
                    eAngel : 0,//结束角度
                    a : a,
                    b : b,
                    r : r,
                    step : step,
                    data: data,
                    colors : colors
                });               
            this.component.append(_can);
        },
		_drawMarkLayer: function(){
            //绘制蒙版层
            $(this.canvas).css('zIndex',3);
            //绘制画底层
            this.ctx.fillStyle = this.markFillColor;
            this.ctx.strokeStyle = this.markStrokeColor;
            this.ctx.lineWidth = 1;
            this._draw(0);
            this.component.append(this.canvas);

		},
        _drawArc: function(type, opts){
            var canvas = document.createElement('canvas'),ctx = canvas.getContext('2d');
            canvas.width = ctx.width = this.w;
            canvas.height = ctx.height = this.h;
            if(type == 'back'){
                $(canvas).css('zIndex',1);
                ctx.beginPath();
                ctx.fillStyle = opts.fillStyle;
                ctx.strokeStyle = opts.strokeStyle;
                ctx.lineWidth = opts.lineWidth;
                ctx.arc(opts.a,opts.b,opts.r,0,2*Math.PI);
                ctx.fill();
                ctx.stroke();
            }else{
                $(canvas).css('zIndex',2);
                var sAngel = opts.sAngel;
                for(var i=0;i<opts.step;i++){
                    var item = opts.data[i],
                        color = item[2]||(item[2] = opts.colors.pop()),
                        eAngel = sAngel + Math.PI*2 * item[1];
                    ctx.beginPath();
                    ctx.fillStyle = color;
                    ctx.strokeStyle = color;
                    ctx.lineWidth = .1;
                    ctx.moveTo(opts.a,opts.b);
                    ctx.arc(opts.a,opts.b,opts.r,sAngel,eAngel);
                    ctx.fill();
                    ctx.stroke(); 
                    sAngel = eAngel;

                    //加入项目文本及百分比
                    var text = $('<div class="text">'+item[0]+'<div class="per">'+item[1]*100+'%</div></div>'),
                        x = opts.a + Math.sin(.5*Math.PI - sAngel) * opts.r,
                        y = opts.b + Math.cos(.5*Math.PI - sAngel) * opts.r,
                        transStyle = 'all .5s ' + i*.1 + 's';
                
                    x > this.w/2 ? text.css('left',x/2) : text.css('right',(this.w-x)/2);
                    y > this.h/2 ? text.css('top',y/2) : text.css('bottom',(this.h-y)/2);
                    item[2] && text.css('color',item[2]);
                    text.appendTo(this.component).css({'webkitOpacity':0,'opacity':0,'webkitTransition':transStyle,'transition':transStyle});
                }
            }
            return canvas;
        },
        /**
         * 蒙版层生成动画
         * @param  {float} per 0~1之间的数据，会根据这个值绘制最终数据对应的中间状态
         */
		_draw: function(per){
            this.ctx.clearRect(0,0,this.w,this.h);
            this.ctx.beginPath();
            this.ctx.moveTo(this.r,this.r);
            if(per <= 0){
                this.ctx.arc(this.r,this.r,this.r,0,2*Math.PI, true);
                this.component.find('.text').css({'webkitOpacity':0,'opacity':0});
            }else{
                this.ctx.arc(this.r,this.r,this.r,1.5 * Math.PI,1.5 * Math.PI+2*Math.PI*per, true);    
            }
            
            this.ctx.fill();
            this.ctx.stroke();

            if(per >= 1){
                this.component.find('.text').css('transition','all 0s');
                this.reSort(this.component.find('.text'));
                this.component.find('.text').css({'webkitTransition':'all 1s','transition':'all 1s','webkitOpacity':1,'opacity':1});
                this.ctx.clearRect(0,0,this.w,this.h); 
            }
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
                //雷达图消失动画
                var s = 1;//步长
                for(var i=0;i<100;i++){
                    setTimeout(function(){
                        s -= .01;
                        _this._draw(s);
                    },i*10);
                }
            });
            return this.component;
        },
        //重排项目文本元素
        reSort: function(list){
            //  1. 检测相交
            var compare = function( domA, domB ){

                //  元素的位置，不用 left，因为有时候 left为 auto
                var offsetA = $(domA).offset();
                var offsetB = $(domB).offset();

                //  domA 的投影
                var shadowA_x = [ offsetA.left,$(domA).width()  + offsetA.left ];
                var shadowA_y = [ offsetA.top ,$(domA).height() + offsetA.top ];

                //  domB 的投影
                var shadowB_x = [ offsetB.left,$(domB).width()  + offsetB.left ];
                var shadowB_y = [ offsetB.top ,$(domB).height() + offsetB.top  ];

                //  检测 x
                var intersect_x = ( shadowA_x[0] > shadowB_x[0] && shadowA_x[0] < shadowB_x[1] ) || ( shadowA_x[1] > shadowB_x[0] &&  shadowA_x[1] < shadowB_x[1]  );

                //  检测 y 轴投影是否相交
                var intersect_y = ( shadowA_y[0] > shadowB_y[0] && shadowA_y[0] < shadowB_y[1] ) || ( shadowA_y[1] > shadowB_y[0] &&  shadowA_y[1] < shadowB_y[1]  );
                return intersect_x && intersect_y;
            };

            //  2. 错开重排
            var reset = function( domA, domB ){
                if($(domA).css('top') != 'auto') $(domA).css('top', parseInt($(domA).css('top')) + $(domB).height());
                if($(domA).css('bottom') != 'auto')$(domA).css('bottom', parseInt($(domA).css('bottom')) + $(domB).height());
            };

            //  定义将要重排的元素
            var willReset = [list[0]];

            $.each(list,function(i,domTarget){
                if(compare(willReset[willReset.length-1] , domTarget)) willReset.push(domTarget);  //  不会把自身加入到对比
            });

            if(willReset.length > 1){
                $.each(willReset,function(i,domA){
                    if(willReset[i+1]) reset(domA,willReset[i+1]);
                });
                this.reSort( willReset );
            }
        }
	};
	window['H5ComponentPie'] = H5ComponentPie;
})(jQuery);
