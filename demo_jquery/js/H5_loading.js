;(function($){
	var H5Loading = function(images, firstPage){
		var id = thid.id;
		if(this._images === undefined){
			//第一次进入
			this._images = (images|| []).length;
			this._loaded = 0;
			window[id] = this;//把当前对象存储在全局对象 window 中，用来进行某个图片加载完成之后的回调
			for(i in images){
				var item = images[i],img = new Image();
                img.onload = function(){
                    window[id].loader();
                }
                img.src = item;
			}
			$('#rate').text('0%');
			return this;
		}else{
			this._loaded ++ ;
            $('#rate').text(((this._loaded / this._images*100) >> 0 ) + '%' );

            if(this._loaded < this._images) return this;
		}
		window[id] = null;
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
	};
	window['H5Loading'] = H5Loading;
})(jQuery);