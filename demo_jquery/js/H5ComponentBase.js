/* 基本图文组件对象 */
;(function($){
	var H5ComponentBase = function(name, opts){
		var opts = opts || {};
		var id = ('h5_c_' + Math.random()).replace('.','_');
		//把当前组件类型添加到样式中进行标记
    	//h5_component : 表明这是一个组件
    	//h5_component_base : 表明这是某种类型的组件，base,pie,point等，并且包含相关状态样式
    	//h5_component_name_xx : 自定义组件名，用于附加样式，例如通用的~_caption
		var cls = 'h5_component_' + opts.type;
		var component = $('<div id="' + id + '" class="h5_component ' + cls + ' h5_component_name_' + name + '">');
		
		opts.text && component.text(opts.text);
		opts.width && component.width(opts.width/2);
		opts.width && component.height(opts.height/2);
		opts.css && component.css(opts.css);
		opts.bg && component.css('backgroundImage','url(' + opts.bg + ')');
		opts.center && component.css({left: 0,right: 0,marginLeft: 'auto',marginRight: 'auto'});

		// ... 很多自定义参数
		typeof(opts.onclick) === 'function' && component.on('click',opts.onclick);
		
		//监听自定义事件
		component.on('load',function(){
			setTimeout(function(){
				component.addClass(cls + '_load').removeClass(cls + '_leave');
        		opts.animateIn && component.animate(opts.animateIn);
			},opts.delay||0);
        	
        	return false;//防止事件循环传播，进入死循环
    	});
		//监听自定义事件
    	component.on('leave',function(){
    		setTimeout(function(){
    	    	component.addClass(cls + '_leave').removeClass(cls + '_load');
    	    	opts.animateOut && component.animate(opts.animateOut);
    	    },opts.delay||0);
    	    return false;
    	});

		return component;
	};
	window['H5ComponentBase'] = H5ComponentBase;
})(jQuery);
