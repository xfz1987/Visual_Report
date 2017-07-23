/* 柱图组件对象 */
;(function($){
	var H5ComponentBar = function(name, cfg){
		var component = new H5ComponentBase(name, cfg);
		$.each(cfg.data, function(index,item){
            var line = $('<div class="line">'),
                name = $('<div class="name">' + item[0] + '</div>'),
                bgstyle = item[2] ? 'style="background-color:'+item[2]+'"' : '',
                rate = $('<div class="rate" style="width:'+item[1]*100+'%"><div class="bg" '+bgstyle+'></div></div>'),
                per = $('<div class="per">' + item[1]*100 + '%</div>');

            line.append(name).append(rate).append(per);
            component.append(line);
		});

		return component;
	};
	window['H5ComponentBar'] = H5ComponentBar;
})(jQuery);
