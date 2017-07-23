/* 散点图表组件对象 */
;(function($){
	var H5ComponentPoint = function(name, cfg){
		var component = new H5ComponentBase(name, cfg),
		    base = cfg.data[0][1];//以第一个数据的比例大小为基准 100%
		$.each(cfg.data, function(index,item){
			var point = $('<div class="point point_' + index + '">'),
        		name = $('<div class="name">'+item[0]+'</div>'),
        		rate = $('<div class="per">'+item[1]*100+'%</div>');
        	name.appendTo(point).append(rate);
        	
        	var per = item[1]/base * 100 + '%';
        	point.width(per).height(per);

        	item[2] && point.css('backgroundColor',item[2]);
        	
        	//暂存left、top到元素上
        	if(item[3] !== undefined && item[4] !== undefined) point.data('left',item[3]).data('top',item[4]);

        	//设置zIndex、重设位置
        	point.css('zIndex',100-index);
        	// point.css('left',0).css('top',0);
        	point.css({'-webkit-transition':'all 1s '+index*.5+'s','transition':'all 1s '+index*.5+'s'});

        	component.append(point);

        	//load之后取出暂存的left、top 并且附加到 CSS 中
        	component.on('load',function(){
            	component.find('.point').each(function(){
                	$(this).css({'left':$(this).data('left'),'top':$(this).data('top')});
            	});
        	});

        	//leave之后，还原初始的位置
        	component.on('leave',function(){
            	component.find('.point').each(function(){
                	$(this).css({'left':0,'top':0});
            	});
        	});

        	component.find('.point').on('click',function(){
        		if($(this).hasClass('point_focus')) return false;
            	$(this).addClass('point_focus').siblings('.point').removeClass('point_focus');
            	return false;
        	}).eq(0).addClass('point_focus');

		});

		return component;
	};
	window['H5ComponentPoint'] = H5ComponentPoint;
})(jQuery);
