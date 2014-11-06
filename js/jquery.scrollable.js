/**
 * 插件名称：滚滚滚
 * 作者：夏皆成
 * 功能：可以让任何元素用鼠标滚轮控制滚动
 * 		可设置滚动元素的滚动范围，起始位置，滚动力度
 * 主意：使用前先引入jquery.mousewheel.js
 * 
 * @param {Object} startTop
 * @param {Object} minTop
 * @param {Object} maxTop
 * @param {Object} step
 * @param {Object} threshold
 */

/*状态1：记录进入子滚动区时窗口的滚动位置*/
var scrolltop;
/*状态2：记录是否禁止*/
var isBanWindowScroll = false;
/*事件：滚动条滚动
 * 在滚动事件触发的之前
 * 如果进入了滚动子区，即状态1为禁止，
 * 则用进入的子区时的滚动窗口位置取代即将到来的滚动位置，达到禁止滚动的目的*/
$(window).on('scroll',window,function(){
	if(isBanWindowScroll){
		$(window).scrollTop(scrolltop);
	}
})

jQuery.fn.scrollable = function(options){
	var defaults = {
		startTop: 0,	/*滚动子区的起始top*/
		minTop: -100,	/*滚动子区的最小top*/
		maxTop: 0,		/*滚动子区的最大top*/
		step: 7,		/*页面滚动的步长*/
		threshold: 3	/*鼠标滚轮的阈值*/
	}
	var opts = $.extend(defaults, options);
	/*状态1：记录鼠标滚轮的缓冲*/
	var wheelBuffer = 0;
	/*事件：进入滚动子区
	 * 将状态1置为true
	 * 用状态1记录当前窗口的滚动位置*/
	$(this).mouseenter(function(){
		isBanWindowScroll = true;
		scrolltop = $(window).scrollTop();
	})
	
	/*事件：离开滚动子区
	 * 将状态1置为false*/
	$(this).mouseleave(function(){
		isBanWindowScroll = false;
	})
	
		/*事件：滚轮滚动
	 * 将滚动的数值计入缓冲区
	 * 记录缓冲的方向
	 * 如果缓冲达到阈值
	 * 使用缓冲值
	 * 设置滚动子区的top值
	 * 去掉原来top值中‘xp’单位
	 * 预测即将设置的top值newTop
	 * 如果newTop值超过最大值
	 * 则设置为最大值
	 * 如果newTop值超过最小值
	 * 则设置为最小值
	 * 如果在范围内则设置top为newTop*/
	$(this).mousewheel(function(event,delta){
		wheelBuffer +=delta;
		var dire = (delta/Math.abs(delta));
		if((wheelBuffer>=opts.threshold)||(wheelBuffer<=-opts.threshold)){
			wheelBuffer -= dire*opts.threshold;
			$(this).css("top",function(index,value){
				var nowTop = parseInt(value);
				var newTop = nowTop+dire*opts.step;
				if(delta>0&&newTop>=opts.maxTop){
					return opts.maxTop;
				}
				if(delta<0&&newTop<=opts.minTop){
					return opts.minTop;
				}
				return newTop;
			});
		}
	})
	
	/*初始化：设置滚动子区的起始top*/
	$(this).css("top",opts.startTop)
	/*初始化：设置滚动子区的起始top*/
	$(this).css("position","relative")
	return opts;
}