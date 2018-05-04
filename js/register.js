$(function(){
//	tab切换部分
//	元素获取
	var scan_code=$("#register-box .scan-code");
	var pas=$("#register-box .pas");
//	右柄
	$("#right-hand").mouseenter(function(){
//		手柄切换
		$(this).addClass("active show").siblings("div").removeClass("active show");
		$(this).parent().addClass("go-right");
		$(this).parent().removeClass("go-left");
//		表单切换成密码登录
		pas.removeClass("pas-hide").addClass("pas-show").animate({
			opacity:1
		},500);
		scan_code.removeClass("scan-show").addClass("scan-hide").animate({
			opacity:0
		},500);
	});
//	左柄
	$("#left-hand").mouseenter(function(){
//		手柄切换
		$(this).addClass("active show").siblings("div").removeClass("active show");
		$(this).parent().addClass("go-left");
		$(this).parent().removeClass("go-right");
//		表单切换成扫码登录
		scan_code.removeClass("scan-hide").addClass("scan-show").animate({
			opacity:1
		},500);
		pas.removeClass("pas-show").addClass("pas-hide").animate({
			opacity:0
		},500);
	});
	
//	表单验证
//	元素获取
	var phonenum=$("input[name='phonenum']"),
		pwd=$("input[name='pass']"),
		message=$("input[name='message']"),
		getm=$("input[name='getm']"),
		rem=$("input[name='rem']"),
		sub=$("input[name='sub']");
//	记住密码
	if(!window.localStorage){
		alert("您的浏览器版本太低，请先升级浏览器！");
	}else{
		function rem_m(){
			if(rem.is(":checked")){
				localStorage.ice_username=phonenum.val();
				localStorage.ice_pwd=pwd.val();
			}else{
//				只能清除当前页面的信息,如果用clear,会把整个本地存储的信息全部删除,影响其他页面
				localStorage.removeItem("ice_username");
				localStorage.removeItem("ice_pwd");
			}
		}
	}
	$("input").focus(function(){
		$(".err").css({
			opacity:0,
			top:-50,
		}).html();
	});
	$("form[name='pasform']").submit(function(){
//		验证函数
		function check(obj,reg,word1,word2){
			var errors=obj.next();
			var value=obj.val();
			if(value==""){
				errors.css({
					opacity:1,
					top:0,
				}).html(word1);
				return false;
			}else if(!reg.test(value)){
				errors.css({
					opacity:1,
					top:0,
				}).html(word2);
				return false;
			}else{
				
			}
		}
//		用户名验证
		var phone=check(phonenum,/^1[34578]\d{9}$/,"请输入手机号码！","手机号码格式不正确!");
		if(phone==false){
			return false;
		}
//		密码验证
		var pass=check(pwd,/^[a-z]\w{5,12}$/i,"请设置密码！","密码格式不正确！");
		if(pass==false){
			return false;
		}
//		短信验证码验证
		var messages=check(message,/^\d{6}$/,"请输入验证码！","验证码不正确!");
		if(messages==false){
			return false;
		}
//		记住密码
		rem_m();
	});
//	要写在表单外才有效
//	获取短信验证码
	getm.click(function(){
		var reg=/^1[34578]\d{9}$/;
		if( phonenum.val()=="" ){
			phonenum.next().css({
				opacity:1,
				top:0,
			}).html("请输入手机号码！");
		}else if( !reg.test(phonenum.val()) ){
			phonenum.next().css({
				opacity:1,
				top:0,
			}).html("手机号码不正确！");
		}else{
			$(this).css({
				borderColor:"gray",
				color:"gray"
			});
			var i=60;
			var timer=setInterval(function(){
				getm.attr("disabled","true");
				getm.val(i+"秒后可重新获取");
				if(i<=0){
					clearInterval(timer);
					getm.val("获取短信验证码").css({
						borderColor:"#fff",
						color:"#fff"
					});
					getm.removeAttr("disabled");
				}
				i--;
			},1000);
		}
	});
//	自动填入上次记录的信息
	$(window).load(function(){
//		不能单纯判断localStorage的长度,因为在所有文件都在同一个本地存储里,相互间会有影响！！除非文件在不同的本地存储中
		if(localStorage.ice_username&&localStorage.ice_pwd){
			phonenum.val(localStorage.ice_username);
			pwd.val(localStorage.ice_pwd);
		}	
	})
});


//canvas气泡效果
var canvas=document.getElementById("with-bub");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var context=canvas.getContext("2d");
//创建一个放画好的圆的数组，规定数组最大长度为300，实现了数组最多只能画300个圆
var balls=[];
//圆的颜色组
var colors=["#69D2E7","#A7DBD8","#E0E4CC","#F38630","#FA6900","#FF4E50","#F9D423"];
var timer;
//随机函数
function rm(min,max){
	return Math.round(Math.random()*(max-min)+min);
}
//控制定时器的开关
var on=true;
canvas.onmousemove=function(ev){
	//用户鼠标移动一下，鼠标的位置已经是移动了多次，会话很多圆，所以鼠标每移动一次，创建两个圆就足矣
	for(var i=0;i<2;i++){
		var ball={
			//让圆在鼠标左边5像素到右边5像素的位置
			x:rm(-5,5)+ev.clientX,
			//让圆在鼠标上面5像素到下面5像素的位置
			y:rm(-5,5)+ev.clientY,
			r:rm(10,50),
			vx:rm(-4,4),
			vy:rm(-4,4),
			color:colors[rm(0,colors.length-1)],
		};
		balls.push(ball);
		//控制数组的长度，最大为300
		if(balls.length>300){
			//把一开始进来的删掉，就会循环往复的只有300个
			balls.shift();
		}
	}
	//定时器执行的函数
	function drawBall(){
		context.clearRect(0,0,canvas.width,canvas.height);
		for(var i=0;i<balls.length;i++){
			balls[i].x+=balls[i].vx;
			balls[i].y+=balls[i].vy;
			//让圆的半径越来越小，半径每一次乘以一个小数
			balls[i].r=balls[i].r*0.94;
			//添加这个索引是为了在下面能够找到那个半径小于1的圆，并且删除
			balls[i].index=i;
//			如果圆的半径小于1,就不让canvas再画它了
			if(balls[i].r<1){
				balls.splice(balls[i].index,1);
				continue;//如果圆已经被删除了，下面的代码就不用再走了，也就是不画
			}
//			画圆
			context.beginPath();
			context.arc(balls[i].x,balls[i].y,balls[i].r,0,360*Math.PI/180);
			context.fillStyle=balls[i].color;
			//合成，代表在两个圆叠加时以发亮的形式出现
			context.globalCompositeOperation="lighter";
			context.fill();
//			如果balls的数组已经没有圆了,就把定时器就清除掉
			if(!balls.length){
				clearInterval(timer);
				on=true;
			}
		}
	}
	drawBall();
	//让整个移动过程中定时器只开启一次
	if(on){
		clearInterval(timer);
		timer=setInterval(drawBall,30);
		on=false;
	}
};