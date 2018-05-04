//canvas背景
//定义画布宽高和生成点的个数
var w = window.innerWidth,h = window.innerHeight,point = 35;
var canvas = document.getElementById('Mycanvas');
if(canvas.getContext){
	canvas.width = w,canvas.height = h;
	var ctx = canvas.getContext('2d');
	ctx.strokeWidth = 20,
	//球的透明度要比线的透明度低
	ctx.fillStyle = 'rgba(250,28,36,0.3)';
	//存放位置的数组
	var circleArr = [];
	//生成max和min之间的随机数
	function rm (min, max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	//将每个球的圆心坐标，半径，运动速度作为一个对象存储入数组
	for (var i = 0; i < point; i++) {
		var circle={
				x:rm(0,w),
				y:rm(0,h),
				r:rm(2,15),
				vx:rm(-1,1),
				vy:rm(-1,1),
		}
		circleArr.push(circle);
	}
	//绘制
	function draw () {
		ctx.clearRect(0,0,canvas.width, canvas.height);
		for (var i = 0; i < point; i++) {
//			改变球心、线坐标
			circleArr[i].x += circleArr[i].vx;
			circleArr[i].y += circleArr[i].vy;
			circleArr[i].x=circleArr[i].x>w?0:circleArr[i].x;
			circleArr[i].x=circleArr[i].x<0?w:circleArr[i].x;
			circleArr[i].y=circleArr[i].y>h?0:circleArr[i].y;
			circleArr[i].y=circleArr[i].y<0?h:circleArr[i].y;
			//画球
			ctx.beginPath();
			ctx.arc(circleArr[i].x, circleArr[i].y, circleArr[i].r, 0, 2*Math.PI);
			ctx.closePath();
			ctx.fill();
			//画线
			for (var j = 0; j < point; j++) {
				if (i + j < point) {
					var a = Math.abs(circleArr[i+j].x - circleArr[i].x),
						b= Math.abs(circleArr[i+j].y - circleArr[i].y);
					var lineLength = Math.sqrt(a*a + b*b);
//					两球有距离的时候才画线
					if(lineLength>0){
						//两球间的距离越大,线越透明
						var c = 1/lineLength*60-0.009;
						var lineOpacity = c > 1 ? 1 : c;
//						画线
						ctx.beginPath();
						ctx.strokeStyle = 'rgba(250,28,36,'+ lineOpacity +')';
						ctx.moveTo(circleArr[i].x, circleArr[i].y);
						ctx.lineTo(circleArr[i+j].x, circleArr[i+j].y);
						ctx.closePath();
						ctx.stroke();
					}
				}
			}
		}
	}
	draw();
	//定时改变球，线的位置
	setInterval(draw,16);	
}

//表单验证
$(function(){
//	元素获取
	var phonenum=$("input[name='phonenum']"),
		pwd1=$("input[name='pass1']"),
		pwd2=$("input[name='pass2']"),
		message=$("input[name='message']"),
		getm=$("input[name='getm']"),
		rem=$("input[name='rem']"),
		sub=$("input[name='sub']"),
		pro=$("input[name='pro']");
	$("input").focus(function(){
		$(".err").css({
			opacity:0,
			top:-50,
		}).html();
	});
	$("form[name='myform']").submit(function(){
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
		var pass1=check(pwd1,/^[a-z]\w{5,12}$/i,"请设置密码！","密码格式不正确！");
		if(pass1==false){
			return false;
		}
//		二次密码验证
		var p2_err=pwd2.next();
		if(pwd2.val()==""){
			p2_err.css({
				opacity:1,
				top:0
			}).html("请再次输入密码！");
			return false;
		}else if(pwd2.val()!=pwd1.val()){
			p2_err.css({
				opacity:1,
				top:0
			}).html("两次密码输入不一致！");
			return false;
		}else{
			
		}
//		短信验证码验证
		var messages=check(message,/^\d{6}$/,"请输入验证码！","验证码不正确!");
		if(messages==false){
			return false;
		}
//		同意协议复选框验证
		var pro_err=pro.next();
//		!!!!jquery里判断复选框是否选中
		if(!pro.is(":checked")){
			pro_err.css({
				opacity:1,
				top:0
			}).html("您还未阅读s协议！");
			return false;
		}else{
			pro_err.css({
				opacity:0,
				top:-50
			}).html();
		}
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
});
