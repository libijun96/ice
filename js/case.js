$(function(){
//	正则表达式，navigator.userAgent浏览器信息是否含有MSIE字样，就是判断是否为IE浏览器
	if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
	    new WOW().init();
	};
	
//	手机图动效
	$("img[src='caseimg/1bn1.jpg']").css({
		opacity:1,
		transform:"rotateZ(-90deg) rotateY(60deg)"
	});
	$("img[src='caseimg/1bn2.jpg']").css({
		opacity:1,
		top:"-40%"
	});
	$("img[src='caseimg/1bn3.jpg']").css({
		opacity:1,
		top:"-30%"
	});
	
//	数据加载
	function d_sta(i,obj){
		var sta=0;
		var sta_timer1=setInterval(function(){
			sta++;
			if(sta==i){
				clearInterval(sta_timer1);
			}
			obj.html("<span>"+sta+"</span>+");
		},50);	
	}
	$(window).load(function(){
		d_sta(54,$(".stastic").find(".dtsj").eq(0));
		d_sta(42,$(".stastic").find(".dtsj").eq(1));
		d_sta(18,$(".stastic").find(".dtsj").eq(2));
	});
	
	
	
//	轮播图
//	元素获取
	var b_slider=$(".banner").find(".slider");
	var b_ln=b_slider.children().length;
	var b_i=0;
//	用JS设置的样式是行内样式,等于是在html页面加载,因此路径要与html引入图片一致！！！！
//	var arrSrc=["url(caseimg/b1.jpg) repeat 0 0","url(caseimg/b2.jpg) repeat 0 -250px","url(caseimg/b3.jpg) repeat 0 0"];
	
//	设置滑动盒子,以及每一帧的宽度
	b_slider.css({
		width:b_ln+"00%"
	});
	b_slider.children().css({
		width:1/b_ln*100+"%"
	});
//	滑动,换背景
	function b_c(){
		b_slider.animate({
			marginLeft:-b_i+"00%"
		},1000,"easeOutElastic");
//		切换背景
		$("#top-banner").find(".bg").eq(b_i).addClass("showbg").siblings().removeClass("showbg");
	}
//	向左滑
	function run_left(){
		b_i++;
		if(b_i>=b_ln){
			b_slider.css({
				marginLeft:0
			})
			b_i=1;
		}
		console.log(b_i);
		b_c();
	}
//	向右滑
	function run_right(){
		b_i--;
		if(b_i<0){
			b_slider.css({
				marginLeft:-(b_ln-1)+"00%"
			})
			b_i=b_ln-2;
		}
		b_c();
	}
	var b_timer=setInterval(run_left,3000);
//	鼠标移入清理定时器
	function clear_bt(obj){
		obj.mouseover(function(){
			clearInterval(b_timer);
		}).mouseout(function(){
			b_timer=setInterval(run_left,3000);
		});
	}
	clear_bt($(".banner").find(".prev"));
	clear_bt($(".banner").find(".next"));
	$(".banner").find(".prev").click(function(){
		if(!b_slider.is(":animated")){
			run_right();
		}
	})
	$(".banner").find(".next").click(function(){
		if(!b_slider.is(":animated")){
			run_left();	
		}
	});
	
	
//	回到顶部
	$(window).scroll(function(){
		var disc=$(this).scrollTop();
		$("#back-top").click(function(){
			var i=disc;
			var timer=setInterval(function(){
				i-=200;
				if(i<0){
					clearInterval(timer);
				}
				$(window).scrollTop(i);
			},5);
		});
	});
});
