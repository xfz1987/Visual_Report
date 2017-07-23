/* 环图组件对象 */
;(function($){
    var H5ComponentRing = function(name, cfg){
		this.cfg = cfg;
        this.cfg.type = 'pie';
        this.cfg.data = cfg.data.length>1 ? [cfg.data[0]] : cfg.data;
        this.component = new H5ComponentPie(name, this.cfg);
        this.text = this.component.find('.text').attr('style','');
        this.cfg.data[0][2] && this.text.css('color',this.cfg.data[0][2]);
        $('<div class="mask"></div>').append(this.text).appendTo(this.component);

		return this.component.addClass('h5_component_ring');
	};
	window['H5ComponentRing'] = H5ComponentRing;
})(jQuery);
