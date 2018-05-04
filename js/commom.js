$(function(){
	//导航条,圆角边框移动
//	获取元素
	var nav_a=$("#nav").find(".nav-bar").find("a");
	var nav_bg=$("#nav").find(".nav-bar").find(".nav-bg");
	nav_a.mouseover(function(){
		nav_bg.animate({
			left:($(this).index()-1)*115
		},5);
	}).mouseout(function(){
		nav_bg.animate({
			left:0
		},5);
	});
});


