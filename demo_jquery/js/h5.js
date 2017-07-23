/* 内容管理对象 */
;(function($){
	var H5 = function(){
		this.id = ('h5_' + Math.random()).replace('.','_');
		this.el = $('<div class="h5" id="' + this.id + '">').hide();//先隐藏起来
		this.page = [];
		$('body').append(this.el);
		return this;
	};
	H5.prototype = {
		/**
     	 * 新增一个页
     	 * name [组件的名称，会加入到ClassName中]
     	 * text [页内的默认文本]
     	 * return [H5对象，可以重复使用H5对象支持的方法]
     	 */
		addPage: function(name, text){
			var page = $('<div class="h5_page section">').appendTo(this.el);
        	name && page.addClass('h5_page_' + name);
        	text && page.text(text);
        	this.page.push(page);
        	typeof(this.whenAddPage) === 'function' && this.whenAddPage();
        	return this;
		},
		/**
		 * 新增一个组件
		 * name 组件名称
		 * opts 配置项
		 */
		addComponent: function(name, opts){
			var cfg = $.extend({type:'base'}, opts || {}),
			    page = this.page.slice(-1)[0],
			    component;
			switch(cfg.type){
				case 'base':
					component = new H5ComponentBase(name, cfg);
					break;
				case 'bar':
					component = new H5ComponentBar(name, cfg);
					break;
				case 'bar_v':
					component = new H5ComponentBarV(name, cfg);
					break;
				case 'pie':
					component = new H5ComponentPie(name, cfg);
					break;
				case 'point':
					component = new H5ComponentPoint(name, cfg);
					break;
				case 'polyline':
					component = new H5ComponentPolyline(name, cfg);
					break;
				case 'polyline':
					component = new H5ComponentPolyline(name, cfg);
					break;
				case 'radar':
					component = new H5ComponentRadar(name, cfg);
					break;
				case 'ring':
					component = new H5ComponentRing(name, cfg);
					break;
				default:
			}
			page.append(component);
			return this;
		},
		/**
		 * H5对象初始化呈现
		 */
		loader: function(firstPage){
			this.el.fullpage({
                //index是从1开始算起的
                onLeave : function(index,nextIndex,direction){
                    $(this).find('.h5_component').trigger('leave');//触发自定义事件
                },
                afterLoad : function(anchor,index){
                    $(this).find('.h5_component').trigger('load');
                }
            });
            this.page[0].find('.h5_component').trigger('load');
            this.el.show();
            firstPage && $.fn.fullpage.moveTo(firstPage);
		}
	};
	H5.loader = typeof H5Loading === 'function' ? H5Loading : H5.loader;
	window['H5'] = H5;
})(jQuery);