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
	$('.menu').removeClass("vsbHddn");
	$('.restart').removeClass("vsbHddn");
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
	$('.none').find('div').css('left',$('.mmrEle').eq(0).width() / 2)
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
			case 0: eles.eq(i).addClass("pink");break;
			case 1: eles.eq(i).addClass("green");break;
			case 2: eles.eq(i).addClass("blue");break;
			case 3: eles.eq(i).addClass("yellow");break;
			case 4: eles.eq(i).addClass("purple");break;
			case 5: eles.eq(i).addClass("orange");break;
			case 6: eles.eq(i).addClass("pink2");break;
			case 7: eles.eq(i).addClass("green2");break;
			case 8: eles.eq(i).addClass("blue2");break;
			case 9: eles.eq(i).addClass("yellow2");break;
			case 10: eles.eq(i).addClass("purple2");break;
			case 11: eles.eq(i).addClass("orange2");break;
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
		ele1.removeClass("hide").addClass("hide");
		ele_2.removeClass("hide").addClass("hide");
	}
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
			markTemp = 1;
			timeTemp = 1;
			eleTimeout = setTimeout(function(){
				ele2.removeClass("hide").addClass("hide");
				ele1.removeClass("hide").addClass("hide");
				timeTemp = 0;
			},1000);
		}else if(eleSum.length == 0){
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
				$('.tipMsg').html("恭喜你創造了新紀錄~");
			}
			$('.top').find('i').html($.cookie("Top_" + levelTemp));
			$('.mark').find('i').html($('.mmrStopwatch').html());
			$('.popupWrap').show();
			if(levelTemp == parseInt($.cookie("levelCookie"))){
				$.cookie("levelCookie",levelTemp + 1,"7");
				$('ol li').eq(levelTemp + 1).find('b').remove();
				$('ol').find('li').eq(levelTemp + 1).removeClass("locked");
			}
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
			console.log(time);
			time++;
			s++;
			if(time % 60 == 0){
				m++;
				s = 0;
			}
			mm = m <= 9 ? "0" + m : m;
			ss = s <= 9 ? "0" + s : s;
			$('.mmrStopwatch').html(mm + "：" + ss);
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
	if($('html').width() > $('html').height()){
		$('html').css({'height':$(window).height(),'width':$(window).height()*0.75});
		$('.mmr').addClass('mmrPC').removeClass("mmr");
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
		$('.menu').addClass("vsbHddn");
		$('.restart').addClass("vsbHddn");
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
	if($.cookie("levelCookie")){
		$.cookie("levelCookie");
		for(var i = 1; i <= parseInt($.cookie("levelCookie")); i++){
			$('.cnt>ol>li').eq(i).find('b').remove();
			$('.cnt>ol>li').eq(i).removeClass("locked");
		}
	}else{
		$.cookie("levelCookie",0,"7");
	}
	/*觸摸滑動監聽，阻止滑動*/
	document.addEventListener("touchmove",function(e){
		e.preventDefault();
		e.stopPropagation();
	});
});
