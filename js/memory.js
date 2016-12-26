var mmrBox = $('.mmrEles'),
	eles = $('.mmrEle'),
	timeTemp = 0,	//阻止點擊事件同時進行
	eleTemp = 0,
	mmrItvlTemp = 0,
	markTemp = 0,
	mmrItvl,
	eleTimeout,
	arr = [],
	ele1, ele_2,
	ev,
	levelCookie,
	levelTemp = 0,
	eleWidth;
function setLevel(a){
	levelTemp = a;
	mmrBox.empty();
	$('.mmrStopwatch').html("00：00");
	$('.menu').find('b').html("第 <strong>" + (a + 1) + "</strong> 關");
	$('.menu,.restart,.top').removeClass("vsbHddn");
	$('.cnt>ol').hide();
	$('.mmrEles').show();
	for(var i = 0; i < Math.pow((3 + a),2); i ++){
		if((3 + a) % 2 != 0 && i == parseInt( Math.pow((3 + a),2) / 2) ){
			mmrBox.find('tr:last').append("<td class='none'><div>❤</div> </td>");
		}else{
			if(i % (3 + a) == 0){
				mmrBox.append("<tr></tr>");
			}
			mmrBox.find('tr:last').append("<td class='mmrEle hide'></td>");
		}
	}
	eleMargin = (15 - a) + "px";
	$('.mmrEles').css({'height':$('.mmrEles').width()});
	$('.mmrEles').attr('cellspacing',eleMargin);
	$('.none').find('div').css('left',$('.mmrEle').eq(0).width() / 2);
	$('.top').find('i').html((!!($.cookie("Top_" + levelTemp))) ? $.cookie("Top_" + levelTemp) : "暫無");
	init();
}
function init(){
	arr = [];
	mmrItvlTemp = 0;
	eles = $('.mmrEle');
	eles.each(function(){
		$(this).attr('class','mmrEle hide');
	});
	for(var i = 0; i < eles.length; i ++){
		arr[i] = i + 1;
	}
	arr.sort(function(){
		return 0.5 - Math.random();
	});
	for(var i = 0; i < arr.length; i ++){
		switch((arr[i]) % (arr.length / 2)){
			case 33:
			case 0: eles.eq(i).addClass("pink");break;
			case 34:
			case 1: eles.eq(i).addClass("green");break;
			case 35:
			case 2: eles.eq(i).addClass("blue");break;
			case 36:
			case 3: eles.eq(i).addClass("yellow");break;
			case 37:
			case 4: eles.eq(i).addClass("purple");break;
			case 38:
			case 5: eles.eq(i).addClass("orange");break;
			case 39:
			case 6: eles.eq(i).addClass("pink2");break;
			case 40:
			case 7: eles.eq(i).addClass("green2");break;
			case 41:
			case 8: eles.eq(i).addClass("blue2");break;
			case 42:
			case 9: eles.eq(i).addClass("yellow2");break;
			case 43:
			case 10: eles.eq(i).addClass("purple2");break;
			case 44:
			case 11: eles.eq(i).addClass("orange2");break;
			case 45:
			case 12: eles.eq(i).addClass("pink3");break;
			case 46:
			case 13: eles.eq(i).addClass("green3");break;
			case 47:
			case 14: eles.eq(i).addClass("blue3");break;
			case 48:
			case 15: eles.eq(i).addClass("yellow3");break;
			case 49:
			case 16: eles.eq(i).addClass("purple3");break;
			case 50:
			case 17: eles.eq(i).addClass("orange3");break;
			case 18: eles.eq(i).addClass("pink4");break;
			case 19: eles.eq(i).addClass("green4");break;
			case 20: eles.eq(i).addClass("grey");break;
			case 21: eles.eq(i).addClass("red");break;
			case 22: eles.eq(i).addClass("blue4");break;
			case 23: eles.eq(i).addClass("green5");break;
			case 24: eles.eq(i).addClass("blue5");break;
			case 25: eles.eq(i).addClass("grey2");break;
			case 26: eles.eq(i).addClass("red2");break;
			case 27: eles.eq(i).addClass("grey3");break;
			case 28: eles.eq(i).addClass("red3");break;
			case 29: eles.eq(i).addClass("orange4");break;
			case 30: eles.eq(i).addClass("purple4");break;
			case 31: eles.eq(i).addClass("yellow4");break;
			case 32: eles.eq(i).addClass("pink5");break;
		}
	}
	eles.on(ev,function(event){
		event.preventDefault();
		if($(this).hasClass("hide")){	//阻止已打開的格子再次觸發點擊事件
			if(mmrItvlTemp == 0){
				mmrWatchFn();
			}
			if(eleTemp == 0){
				turnEle_1($(this));
			}else{
				turnEle_2($(this));
			}
		}
	});
}
function turnEle_1(ele){
	if(markTemp == 1){
		clearTimeout(eleTimeout);
		ele1.addClass("hide");
		ele_2.addClass("hide");
	}
	console.log("click1");
	clicksnd.currentTime = 0;
	clicksnd.play();
	ele.removeClass("hide").addClass("click");
	eleTemp = 1;
	ele1 = ele;
}
function turnEle_2(ele2){
	ele_2 = ele2;
	if(!ele2.hasClass("click")){
		ele1.removeClass("click");
		ele2.removeClass("hide");
		eleSum = $('.hide');
		markTemp = 0;
		if(ele1.attr("class") != ele2.attr("class")){
			console.log("click2");
			clicksnd.currentTime = 0;
			clicksnd.play();
			markTemp = 1;
			timeTemp = 1;
			eleTimeout = setTimeout(function(){
				ele2.removeClass("hide").addClass("hide");
				ele1.removeClass("hide").addClass("hide");
				timeTemp = 0;
			},1000);
		}else if(eleSum.length == 0){
			marksnd.currentTime = 0;
			marksnd.play();
			winsnd.currentTime = 0.1;
			winsnd.play();
			clearInterval(mmrItvl);
			if($.cookie("Top_" + levelTemp)){
				var cookieTop = $.cookie("Top_" + levelTemp).split("："),
					thisMark = $('.mmrStopwatch').html().split("：");
				if(thisMark[0] < cookieTop[0] || (thisMark[0] = cookieTop[0] && thisMark[1] < cookieTop[1])){
					$.cookie("Top_" + levelTemp,$('.mmrStopwatch').html(),"7");
					$('.tipMsg').html("恭喜你破紀錄啦~");
				}else{
					$('.tipMsg').html("恭喜你過關啦~");
				}
			}else{
				$.cookie("Top_" + levelTemp,$('.mmrStopwatch').html(),"7");
				if(levelTemp == 9){
					$('.tipMsg').html("我的天吶！你居然通過了所有關卡，打敗了妖精！！ㄒ-ㄒ");
				}else{
					$('.tipMsg').html("恭喜你創造了新紀錄~");
				}
			}
			$('.top').find('i').html($.cookie("Top_" + levelTemp));
			$('.mark').find('i').html($('.mmrStopwatch').html());
			$('.popupWrap').show();
			if(levelTemp == parseInt($.cookie("levelCookie"))){
				$.cookie("levelCookie",levelTemp + 1,"7");
				$('ol li').eq(levelTemp + 1).find('b').remove();
				$('ol').find('li').eq(levelTemp + 1).removeClass("locked");
			}
		}else{
			marksnd.currentTime = 0;
			marksnd.play();
		}
		eleTemp = 0;
	}
}
function mmrWatchFn(){
	mmrItvlTemp = 1;
		var time = 0,
			m = 0,
			s = 1;
		$('.mmrStopwatch').html("00：01");
		clearInterval(mmrItvl);
		mmrItvl = setInterval(function(){
			time++;
			s++;
			if(time % 60 == 0){
				m++;
				s = 0;
			}
			mm = m <= 9 ? "0" + m : m;
			ss = s <= 9 ? "0" + s : s;
			$('.mmrStopwatch').html(mm + "：" + ss);
			if(time >= 300){
				clearInterval(mmrItvl);
				alert("時間到了，遊戲失敗。。");
				$('.restart').click();
			}
		},1000);
}
if(typeof(document.ontouchstart)=="undefined"){
	ev="click";
}else{
	ev="touchstart";
}
$('.restart').click(function(){
	clearInterval(mmrItvl);
	$('.mmrStopwatch').html("00：00");
	init();
});
$(document).ready(function(){
	var clicksnd = document.getElementById("clicksnd"),
		marksnd = document.getElementById("marksnd")
		winsnd = document.getElementById("winsnd");
	console.log($(window).height());
	if($('html').width() > $('html').height()){
		$('.mmr').addClass('mmrPC').removeClass("mmr");
		$('html').css({'height':$(window).height()});
		$('.mmrPC').css('width',$(window).height()*0.75)
	}
	$('.cnt>ol').removeClass('hidden');
	$('.cnt>ol>li').click(function(){
		//levelTemp = $(this).index();
		if(!$(this).hasClass("locked")){
			setLevel($(this).index());
		}else{
			alert("此關卡還未解鎖。");
		}
	});
	$('.back').click(function(){
		$('.menu,.restart,.top').addClass("vsbHddn");
		$('.cnt>ol').show();
		$('.mmrEles').hide();
		clearInterval(mmrItvl);
	});
	$('.popupBox>b>i').click(function(){
		$('.popupWrap').hide();
	});
	$('.popupBox>button').click(function(){
		$('.popupWrap').hide();
		setLevel(levelTemp + 1);
	});
	$('.rule>button').click(function(){
		$('.ruleWrap').hide();
		if($('.checkBox').eq(0).is(":checked")){
			$.cookie("rule",1,"7");
		}
	});
	if($.cookie("levelCookie")){
		$.cookie("levelCookie");
		for(var i = 1; i <= parseInt($.cookie("levelCookie")); i++){
			$('.cnt>ol>li').eq(i).find('b').remove();
			$('.cnt>ol>li').eq(i).removeClass("locked");
		}
	}else{
		$.cookie("levelCookie",0,"7");
	}
	if(!$.cookie("rule") || $.cookie("rule") == 0){
		$('.ruleWrap').show();
		$.cookie("rule",0,"7");
	}else if($.cookie("rule") == 1){
		$('.ruleWrap').hide();
	}
	/*觸摸滑動監聽，阻止滑動*/
	document.addEventListener("touchmove",function(e){
		e.preventDefault();
		e.stopPropagation();
	});
});