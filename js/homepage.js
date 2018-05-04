$(function(){
//	全屏滚动
	$('#dowebok').fullpage({
		navigation:true,
		css3:false,//必须加上这个属性，底下设置的运动easing参数才会有效！！！
		easing:"easeInCubic",
		afterLoad:function(anchorLink,index){
//			一屏元素显示
			if(index==1){
				$("img[src='caseimg/logo.png']").animate({
					opacity:1
				},800);
				$("img[src='caseimg/logo-quan.png']").animate({
					top:"4%"
				},500,"easeOutBounce");
			}
//			二屏元素显示
			if(index==2){
				for(var i=0;i<$(".two-title").length;i++){
					$(".two-title").eq(i).delay(i*200).animate({
						opacity:1,
						marginTop:0
					},800);
				}
			}
//			三屏元素显示
			if(index==3){
				$(".three-part").find(".content").css({
					opacity:1
				});
			}
		},
		onLeave:function(index,nextIndex,direction){
//			一屏元素消失
			if(index==1){
				$("img[src='caseimg/logo.png']").animate({
					opacity:0
				},500);
				$("img[src='caseimg/logo-quan.png']").animate({
					top:"-100%"
				},500);
			}
//			二屏元素消失
			if(index==2){
				$(".two-title").animate({
					opacity:0,
					marginTop:-100
				},500);
			}
//			三屏元素消失
			if(index==3){
				$(".three-part").find(".content").css({
					opacity:0
				});
			}
		},
	});
	
	
//	第二屏幕布变换
	$(".two-title").mouseover(function(){
//		所有的都去掉class
		$(".two-title").find(".view").removeClass("c");
		$(".two-title").find(".word").removeClass("b");
		$(".two-part").find(".back").removeClass("show");
//		当前移入的加上class
		$(this).find(".view").addClass("c");
		$(this).find(".word").addClass("b");
		$(".two-part").find(".back").eq($(this).index()).addClass("show");
	});
	
	
//	图片随鼠标移动
//  波浪1
	var wave1=$("img[src='caseimg/3_1.png']");
	var wave1_l=wave1.position().left;
//  波浪2
	var wave2=$("img[src='caseimg/3_2.png']");
	var wave2_l=wave2.position().left;
//	宫殿
	var palace=$("img[src='caseimg/4_1.png']");
	var palace_l=palace.position().left;
//	鼠标向左移时,图片的移动函数
	function mouse_left(){
		wave1.css({
			left:wave1.position().left-1
		});
		wave2.css({
			left:wave2.position().left+1
		});
		palace.css({
			left:palace.position().left+1
		});
//		控制图片只能向左移动40,向右移动40
		if(wave1.position().left<wave1_l-40){
	    	wave1.css({
				left:wave1_l-40
			});
	    }
		if(wave2.position().left>wave2_l+40){
	    	wave2.css({
				left:wave2_l+40
			});
	    }
	    if(palace.position().left>palace_l+40){
	    	palace.css({
				left:palace_l+40
			});
	    }
	}
//	鼠标向右移时,图片的移动函数
	function mouse_right(){
		wave1.css({
			left:wave1.position().left+1
		});
		wave2.css({
			left:wave2.position().left-1
		});
		palace.css({
			left:palace.position().left-1
		});
//		控制图片只能向左移动40,向右移动40
		if(wave1.position().left>wave1_l+40){
	    	wave1.css({
				left:wave1_l+40
			});
	    }
		if(wave2.position().left<wave2_l-40){
	    	wave2.css({
				left:wave2_l-40
			});
	    }
	    if(palace.position().left<palace_l-40){
	    	palace.css({
				left:palace_l-40
			});
	    }
	}
//	判断鼠标移动方向
//	初始坐标看成0
	var lastX = 0;
	$("body").mousemove(function(e){
	    if(lastX > e.pageX){
//          鼠标向左移
			mouse_left();
	    }else if (lastX < e.pageX){
//          鼠标向右移
			mouse_right();
	    }else{
//          不移动
//          console.log("—");
	    }
//      每判断一次后,就将上一次的鼠标位置存给变量，这样就实现了将下一次鼠标位置跟上一次鼠标位置作比较
	    lastX=e.pageX;
	});
	
//	三屏 旋转
//	元素获取
	var pc_3part=$(".three-part").find(".pc");
	var mo_3part=$(".three-part").find(".mobile");
	var p_on=true;
	function rotatePM(){
		if(p_on){
//			透明度的变化写在这里,不要直接设置在css里和animation里面
			pc_3part.removeClass("pcshow").addClass("pchide").animate({
				opacity:0
			},2000);
			mo_3part.removeClass("mohide").addClass("moshow").animate({
				opacity:1
			},2000);
			p_on=false;
		}else{
			pc_3part.removeClass("pchide").addClass("pcshow").animate({
				opacity:1
			},2000);
			mo_3part.removeClass("moshow").addClass("mohide").animate({
				opacity:0
			},2000);
			p_on=true;
		}
	}
	setInterval(rotatePM,5000);
});

//三屏canvas星空
var canvas=document.getElementById("canvas");
var w = window.innerWidth,h = window.innerHeight/1.5;
if(canvas.getContext){
	canvas.width = w,canvas.height = h;
	var ctx=canvas.getContext("2d");
	ctx.fillStyle="#fff";
	var stars=[];
	function rm(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}
//	存放圆的信息
	for(var i=0;i<150;i++){
		var star={
			x:rm(0,w),
			y:rm(0,h),
			r:Math.random(),
			vx:rm(-1,1),
			vy:rm(-1,1)
		}
		stars.push(star);
	}
	function drawStar(){
		ctx.clearRect(0,0,canvas.width, canvas.height);
		for (var i = 0; i < 150; i++) {
//			改变球心、线坐标
			stars[i].x+=stars[i].vx;
			stars[i].y+=stars[i].vy;
			stars[i].x=stars[i].x>w?0:stars[i].x;
			stars[i].x=stars[i].x<0?w:stars[i].x;
			stars[i].y=stars[i].y>h?0:stars[i].y;
			stars[i].y=stars[i].y<0?h:stars[i].y;
			//画球
			ctx.beginPath();
			ctx.arc(stars[i].x, stars[i].y, stars[i].r, 0, 2*Math.PI);
			ctx.closePath();
			ctx.fill();
		}
	}
	drawStar();
	setInterval(drawStar,100);
}
