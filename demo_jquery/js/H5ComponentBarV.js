/* 垂直柱图组件对象 */
;(function($){
	var H5ComponentBarV = function(name, cfg){
		var component = new H5ComponentBar(name, cfg);
		
		//计算 width 每个柱图中项目的宽度
		var width = (100 / cfg.data.length) + '%';
		component.find('.line').width(width);

		component.find('.rate').each(function(){
			$(this).css({'height':$(this).css('width'),'width':''});
		});
		
		// 重新调整 DOM 结构，把百分比数值(.per)添加到 进度区 (.rate)中，和色块元素(.bg)同级
		component.find('.per').each(function(){
			$(this).appendTo($(this).closest('.line').find('.rate'));
		});
		return component;
	};
	window['H5ComponentBarV'] = H5ComponentBarV;
})(jQuery);
