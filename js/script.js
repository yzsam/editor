
$("#menu").mouseover(function(e) {
  $("#menu div ul").hide();
  //$("#menu div").find("ul").first().show();
  /*
      var offset = $('#menu').offset();
      var x = e.pageX - offset.left;
      var y = e.pageY - offset.top;
      console.log('X: '+x+' Y: '+y); //you want this
  */
});

var navarr=[
  "openwin('新建','525,230,new')",//新建
  "openwin('打开','500,310,open')",//打开
  "SaveProject(),alert('保存')",//保存
  "openwin('查找','380,160,find')",//查找
  "openwin('替换','380,165,replace')",//替换
  "openwin('设置','810,615,setting')",//设置
  "openwin('文本导入','925,720,import')",//文本导入
  "openwin('素材库','1098,717,material')",//素材库
  "openwin('测试','0,0,player/index')",//测试
  "openwin('分段测试','572,330,segmentation')",//分段测试
  "openwin('发布','820,650,release')",//发布
  "openwin('高级UI','940,540,ui')",//高级UI
  "openwin('悬浮组件','940,531,suspension')",//悬浮组件
];
$("#navigation li").each(function(i) {
  $(this).click(function() {
    eval(navarr[i]);//console.log(i)
  });
});

function SaveProject() {
  $.ajax({
    data: {type: 'save', guid:guid, TmpData: TmpData},
    success: function (callback) {

    }
  });
}

var butarr=[
  "openwin('显示文本','820,616,viewtext')",//显示文本
  "alert('消失对话框')",//消失对话框
  "openwin('悬浮组件开关','165,135,switch')",//悬浮组件开关
  "openwin('文字选项','440,350,textoption')",//文本选项
  "openwin('注释','314,189,comments')",//注释
  "openwin('气泡模式','776,575,bubble')",//气泡模式
  "openwin('图片选项','394,293,picopt')",//图片选项
  "openwin('自动播放剧情','165,135,autoplay')",//自动播放剧情
  "openwin('发射气泡','800,600,launch')",//发射气泡
  "openwin('条件分歧','440,390,disagreement')",//条件分歧
  "openwin('数值操作','350,445,numerical')",//数值操作
  "openwin('跳转剧情','320,137,jumpplot')",//跳转剧情
  "alert('添加循环')",//循环
  "openwin('二周目数值','350,445,value')",//二周目数值
  "openwin('呼叫子剧情','320,137,callsubplot')",//呼叫子剧情
  "openwin('中断循环','200,140,interruptcycle')",//中断循环
  "openwin('字符串','440,290,string')",//字符串
  "openwin('呼叫界面','250,160,interface')",//呼叫界面
  "openwin('体力锁','300,160,physicallock')",//体力锁
  "openwin('强制存档/读档','296,182,saveread')",//强制存档/读档
  "openwin('返回标题画面','250,160,titlescreen')",//返回标题画面
  "openwin('剧情锁','350,260,dramalock')",//剧情锁
  "openwin('等待','200,150,wait')",//等待
  "openwin('插入至BGM鉴赏','595,323,bgm')",//插入至BGM鉴赏
  "openwin('天气设置','200,140,weather')",//天气设置
  "openwin('插入至CG鉴赏','595,323,cg')",//插入至CG鉴赏
  "openwin('画面闪烁','420,250,blinking')",//画面闪烁
  "openwin('画面震动','335,250,shock')",//画面震动
  "openwin('显示远景图','1042,430,vista')",//显示远景图
  "openwin('移动图片','966,680,move')",//移动图片
  "openwin('显示动态图片','760,400,animated')",//显示动画图片
  "openwin('显示背景图','1042,430,background')",//显示背景图
  "openwin('图片消除','235,300,remove')",//图片消除
  "openwin('显示前景图','1042,430,foreground')",//显示前景图
  "openwin('图片旋转','860,600,rotate')",//图片旋转
  "openwin('显示立绘','1042,430,painted')",//显示立绘
  "openwin('资源预加载','400,470,preloading')",//资源预加载
  "openwin('播放背景音乐','350,415,playbgm')",//播放背景音乐
  "openwin('淡出背景音乐','220,170,fadeout')",//淡出背景音乐
  "openwin('播放音效','440,390,play')",//播放音乐
  "alert('停止音效')",//停止音乐
  "openwin('播放循环音效','350,415,playcycle')",//播放循环音乐
  "openwin('淡出循环音效','220,170,stopcycle')",//淡出循环音乐
  "openwin('播放语音','350,415,voice')",//播放语音
  "alert('停止语音')",//停止语音
];
$("#selbox").find("div").first().show();
$("#selbox li").each(function(i) {
  $(this).click(function() {
    $("#selbox li").removeClass('active').eq(i).addClass('active');
    $("#selbox div").hide().eq(i).show();
  });
});
$("#selbox button").each(function(i) {
  $(this).click(function() {
    eval(butarr[i]);//console.log(i)
  });
});

function openwin(title,str) {
	/** /
  if ( !uuid ) { //登录窗口
    layer.open({
      type: 2,
      title: '登录',
      maxmin: false,
      area: ['300px', '200px'],
      content: './layer/login.html?_='+new Date().getTime(),
    });
    return
  }
	/**/
  var s=str.split(",");
  /**/
  if('player/index'==s[2]) {
    var m=(PData.data.DHeader.GHeight>PData.data.DHeader.GWidth&&PData.data.DHeader.GHeight+26>$("body").height())?$("body").height()/(PData.data.DHeader.GHeight+26):1;
    s[0]=PData.data.DHeader.GWidth*m;
    s[1]=(PData.data.DHeader.GHeight+26)*m;
  }
  /**/
  //if('player/index'==s[2]) {var m=1,d=PData.data.DHeader,h=d.GHeight,w=d.GWidth;if(h>w&&h+26>$("body").height())m=$("body").height()/(h+26),s[0]=w*m,s[1]=(h+26)*m}
  layer.open({
    type: 2,
    title: title,
    maxmin: false,
    area: [s[0]+'px', s[1]+'px'],
    content: './layer/'+s[2]+'.html?uuid='+uuid+'&_='+new Date().getTime(),
    end: function() {
      layer.tips('Hi', '#about', {tips: 1})
    }
  });
}

///*双击打开对话设置*/
//$('#control .dialog').dblclick(function () {
//	layer.open({
//		type: 2,
//		title: '显示文本',
//		maxmin: false,
//		area: ['820px', '616px'],
//		content: './layer/viewtext.html?_='+new Date().getTime(),
//		end: function() {
//			layer.tips('Hi', '#about', {tips: 1})
//		}
//	});
//});
/*对话提示框显示隐藏*/
$('#control .dialog-hide').click(function() {
  $('#control .dialog').hide();
  $(this).css('visibility','hidden');
  $('#control .dialog-show').css('visibility','visible')
})
$('#control .dialog-show').click(function() {
  $('#control .dialog').show();
  $(this).css('visibility','hidden');
  $('#control .dialog-hide').css('visibility','visible')
})

/*侧边栏显示/隐藏*/
$('#preview .leftScale').click(function() {
  let clientHeight = $('#main')[0].clientHeight; // 获取两者隐藏时，满屏的高
  let mg_lr = ($('#preview').width - $('#control').width())/2
  if($("#control").attr('data-direction') == 'horizontal') {	/*横屏*/
    if($('#preview .leftScale').attr('data-show') == 'true' && $('#preview .bottomScale').attr('data-show') == 'true') { //底栏显示，侧边隐藏
      $('#preview .leftScale span').removeClass('triangle-hide').addClass('triangle-show');
      $('#control').css('margin','0 '+mg_lr+'px');
      $('#preview .leftScale').css('left','0').attr('data-show','false')
    }
    else if($('#preview .leftScale').attr('data-show') == 'true' && $('#preview .bottomScale').attr('data-show') == 'false') { //底栏隐藏，侧边隐藏
      $('#preview .leftScale span').removeClass('triangle-hide').addClass('triangle-show');
      $('#control').css({'max-width':'100%','margin':'0 '+mg_lr+'px'});
      $('#preview .bottomScale').css('bottom','0');
      $('#preview .leftScale').css({'left':'0','top':'0'}).attr('data-show','false')
    }
    else if($('#preview .leftScale').attr('data-show') == 'false' && $('#preview .bottomScale').attr('data-show') == 'true') { //底栏显示，侧边显示
      $('#preview .leftScale span').removeClass('triangle-show').addClass('triangle-hide');
      $('#preview').css('margin','0');
      $('#preview .leftScale').css('left','0').attr('data-show','true')
    }
    else if($('#preview .leftScale').attr('data-show') == 'false' && $('#preview .bottomScale').attr('data-show') == 'false') { //底栏隐藏，侧边显示
      $('#preview .leftScale span').removeClass('triangle-show').addClass('triangle-hide');
      $('#preview .bottomScale').css('bottom','0');
      $('#preview .leftScale').css('top','0').attr('data-show','true')
    }
  }
  else if($("#control").attr('data-direction') == 'vertical') { /*竖屏*/
    if($('#preview .leftScale').attr('data-show') == 'true' && $('#preview .bottomScale').attr('data-show') == 'true') { //底栏显示，侧边隐藏
      $('#preview .leftScale span').removeClass('triangle-hide').addClass('triangle-show');
      $('#control').css('margin','0 auto');
      $('#preview .leftScale').css('left','0').attr('data-show','false')
    }
    else if($('#preview .leftScale').attr('data-show') == 'true' && $('#preview .bottomScale').attr('data-show') == 'false') { //底栏隐藏，侧边隐藏
      $('#preview .leftScale span').removeClass('triangle-hide').addClass('triangle-show');
      $('#control').css({'margin':'0 auto','height':clientHeight+'px','width':clientHeight*9/16 +'px'});
      $('#preview .bottomScale').css('bottom','0');
      $('#preview .leftScale').css({'left':'0','top':'0'}).attr('data-show','false')
    }
    else if($('#preview .leftScale').attr('data-show') == 'false' && $('#preview .bottomScale').attr('data-show') == 'true') { //底栏显示，侧边显示
      $('#preview .leftScale span').removeClass('triangle-show').addClass('triangle-hide');
      $('#preview').css('margin','0');
      $('#preview .leftScale').css('left','0').attr('data-show','true')
    }
    else if($('#preview .leftScale').attr('data-show') == 'false' && $('#preview .bottomScale').attr('data-show') == 'false') { //底栏隐藏，侧边显示
      $('#preview .leftScale span').removeClass('triangle-show').addClass('triangle-hide');
      $('#control').css({'margin':'0 auto','height':clientHeight,'width':clientHeight*9/16});
      $('#preview .bottomScale').css('bottom','0');
      $('#preview .leftScale').css('top','0').attr('data-show','true');
    }
  }
  $('#left').toggle();
  resizewin()
})

/*底下菜单栏显示/隐藏*/
$('#preview .bottomScale').click(function() {
  let clientHeight = $('#main')[0].clientHeight;
  let mg_lr = ($('#preview').width - $('#control').width())/2
  if($("#control").attr('data-direction') == 'horizontal') { /*横屏*/
    if($('#preview .leftScale').attr('data-show') == 'true' && $('#preview .bottomScale').attr('data-show') == 'true') { //侧边显示,底栏隐藏
      $('#preview .bottomScale span').removeClass('triangle-hide').addClass('triangle-show');
      $('#control').css({'max-width':'100%','margin':'0 '+mg_lr+'px'});
      $('#preview .leftScale').css('top','0');
      $('#preview .bottomScale').css('bottom','0').attr('data-show','false')
    }
    else if($('#preview .leftScale').attr('data-show') == 'true' && $('#preview .bottomScale').attr('data-show') == 'false') { //侧边显示,底栏显示
      $('#preview .bottomScale span').removeClass('triangle-show').addClass('triangle-hide');
      $('#control').css({'max-width':'100%','margin':'0 '+mg_lr+'px'});
      $('#preview .leftScale').css('top','0');
      $('#preview .bottomScale').css('bottom','210px').attr('data-show','true')
    }
    else if($('#preview .leftScale').attr('data-show') == 'false' && $('#preview .bottomScale').attr('data-show') == 'true') { //侧边隐藏,底栏隐藏
      $('#preview .bottomScale span').removeClass('triangle-show').addClass('triangle-hide');
      $('#control').css({'max-width':'100%','margin':'0 '+mg_lr+'px'});
      $('#preview .leftScale').css({'top':'0','left':'0'});
      $('#preview .bottomScale').css('bottom','0').attr('data-show','false')
    }
    else if($('#preview .leftScale').attr('data-show') == 'false' && $('#preview .bottomScale').attr('data-show') == 'false') { //侧边隐藏,底栏显示
      $('#preview .bottomScale span').removeClass('triangle-show').addClass('triangle-hide');
      $('#control').css({'max-width':'100%','margin':'0 '+mg_lr+'px'})
      $('#preview .leftScale').css({'left':'0','top':'0'});
      $('#preview .bottomScale').css('bottom','210px').attr('data-show','true')
    }
  }
  else if($("#control").attr('data-direction') == 'vertical') { /*竖屏*/
//console.log( $('#preview .leftScale').attr('data-show') + " " +$('#preview .bottomScale').attr('data-show') );
    if($('#preview .leftScale').attr('data-show') == 'true' && $('#preview .bottomScale').attr('data-show') == 'true') { //侧边显示,底栏隐藏
      $('#preview .bottomScale span').removeClass('triangle-hide').addClass('triangle-show');
      $('#control').css({'margin':'0 auto','height':$('#preview').height()+'px','width':$('#preview').height()*9/16+'px'});
      $('#preview .leftScale').css('top','0');
      $('#preview .bottomScale').css('bottom','0').attr('data-show','false')
    }
    else if($('#preview .leftScale').attr('data-show') == 'true' && $('#preview .bottomScale').attr('data-show') == 'false') { //侧边显示,底栏显示
      $('#preview .bottomScale span').removeClass('triangle-show').addClass('triangle-hide');
      $('#control').css({'margin':'0 auto','height':$('#preview').height()-210+'px','width':($('#preview').height()-210)*9/16+'px'})
      $('#preview .leftScale').css('top','0');
      $('#preview .bottomScale').css('bottom','210px').attr('data-show','true');
    }
    else if($('#preview .leftScale').attr('data-show') == 'false' && $('#preview .bottomScale').attr('data-show') == 'true') { //侧边隐藏,底栏隐藏
      $('#preview .bottomScale span').removeClass('triangle-show').addClass('triangle-hide');
      $('#control').css({'margin':'0 auto','height':clientHeight+'px','width':clientHeight*9/16+'px'});
      $('#preview .leftScale').css({'top':'0','left':'0'});
      $('#preview .bottomScale').css('bottom','0').attr('data-show','false')
    }
    else if($('#preview .leftScale').attr('data-show') == 'false' && $('#preview .bottomScale').attr('data-show') == 'false') { //侧边隐藏,底栏显示
      $('#preview .bottomScale span').removeClass('triangle-show').addClass('triangle-hide');
      $('#control').css({'margin':'0 auto','height':$('#preview').height()-$("#selbox").height(),'width':($('#preview').height()-$("#selbox").height())*9/16});
      $('#preview .leftScale').css({'left':'0','top':'0'});
      $('#preview .bottomScale').css('bottom','210px').attr('data-show','true')
    }
  }
  $('#selbox').toggle();
  resizewin()
})

/* 自动重排 */
$(document).ready(function() {
  $(window).resize(function() {
    resizewin()
  });
  resizewin()
});

function resizewin() {
  if ( PData.data.DHeader.GWidth > PData.data.DHeader.GHeight ) { /*横屏*/
    if($('#preview .bottomScale').attr('data-show') == 'true') {
      var mg_top = ($(window).height()-$("#menu").height()-$("#navigation").height()-210)-$("#control").width() * PData.data.DHeader.GHeight / PData.data.DHeader.GWidth;
    }else{
      var mg_top = ($(window).height()-$("#menu").height()-$("#navigation").height())-$("#control").width() * PData.data.DHeader.GHeight / PData.data.DHeader.GWidth;
    }
    $("#control").attr('data-direction','horizontal');
    $("#control").css({'backgroundSize':'100% 100%','height':$("#control").width() * PData.data.DHeader.GHeight / PData.data.DHeader.GWidth,'margin-top':mg_top/2})
  } else { /*竖屏*/
    $("#control").attr('data-direction','vertical');
    $("#control").css({'backgroundSize':'cover','width':$("#control").height() * PData.data.DHeader.GWidth / PData.data.DHeader.GHeight })
  }
  // $("#preview").width($(window).width()-$("#left").width()-$("#list").width());
  // $("#control").height($(window).height()-$("#menu").height()-$("#navigation").height()-210);
  $("#material").height($(window).height()-$("#menu").height()-$("#navigation").height()-$("#toolsbox").height()-210);
  $("#list").height($(window).height()-$("#menu").height()-$("#navigation").height());
  $("#preview").height($(window).height()-$("#menu").height()-$("#navigation").height());
}

/*
$("#list .previewPic").each(function(i) {
	if($('#list .previewPic').eq(i).before()) {
		var top = $('#list .previewPic').eq(i).before()[0].previousElementSibling.offsetTop - 115;
		$('#list .previewPic').eq(i).css('top', top+'px')
	}else{
		$('#list .previewPic').eq(i).css('top', 0)
	}
});
*/

/* 让滚动条生效
$(window).onmouseover(function() {
	$(this).focus();
}).onmouseout(function() {
	$(this).blur();
});

!function ($) {
	$(document).on('mousewheel DOMMouseScroll', function (e) {
		//WebKit内核，Trident内核 => mousewheel
		//Gecko内核 => DOMMouseScroll
		e.preventDefault();
		var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
		//e.originalEvent.wheelDelta => 120(up) or -120(down) 谷歌IE内核
		//e.originalEvent.detail => -3(up) or 3(down) 火狐内核
		var delta = Math.max(-1, Math.min(1, value));
		console.log(delta < 0 ? 'down' : 'up');
	});
}(jQuery);

$(window).mouseover(function() {
	$(this).focus();
}).mouseout(function() {
	$(this).blur();
})

*/
