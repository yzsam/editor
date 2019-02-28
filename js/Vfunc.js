var guid=$.cookie("GUID")||'038bc8a54b8a4f74957b2f0ddde7601b';
function Vmaterial() {
  $("#material").empty();
  var material = PData.material;
  var l = materialtype.toLowerCase();
  var type = l.split('/')[0];
  var k_index = 0;
  for (var i in material) {
    if ( material[i][0].indexOf(l) !== 0 ) continue;
    var src = pichost + material[i][2].substring(0,2) + '/' + material[i][2];
    var li = (type !== 'audio')
       ? '<li style="float:left;width:95px;font-size:10px;" data-id="'+k_index+'" data-src="' + src + '" data-name="'+ material[i][0].split('/')[2] +'"><span class="m_img"><img id="mli' + i + '" src="' + src + '"></span><span class="m_title">' + material[i][0].split('/')[2].split('.')[0] + '</span></li>'
       : '<li class="audio" style="font-size:10px;" data-id="'+k_index+'" data-src="' + src + '" data-name="'+material[i][0].split('/')[2]+'" title="单击试听"><span class="song-name">' + material[i][0].split('/')[2].split('.')[0] + '</span><span class="song-time">0:01</span><!--<span class="play-btn"></span>--></li>';
    ++k_index;
    $("#material").append(li);
    $("#material li.audio").each(function(index){
      $(this).click(function(){
        var audioSrc = $(this).attr('data-src')
        $('#material_audio').attr('src','').attr('src',audioSrc)
        var playPromise = $('#material_audio')[0].play();
        $("#material li.audio").removeClass('active').eq(index).addClass('active');
        if (playPromise !== undefined) {
          playPromise.then(_ => {
          	// Autoplay started!
            $('#material_audio')[0].play();
          }).catch(error => {
          	// Autoplay was prevented.
          	// Show a "Play" button so that user can start playback.
          });
        }
        // $("#material li.audio .play-btn").each(function () {
        // $(this).css({
        // 	'background':'url("./img/play-btn.png") no-repeat',
        // 	'background-size':'100% 100%'
        // })
        // if ($('#material_audio').attr('data-state') == '0'){
        // 	$("#material li.audio .play-btn").eq(index).css({
        // 			'background':'url("./img/pause-btn.png") no-repeat',
        // 			'background-size':'100% 100%'
        // 	})
        //
        //		 $('#material_audio').attr('data-state','1')
        // }else{
        //		 $("#material li.audio .play-btn").eq(index).css({
        //			 'background':'url("./img/play-btn.png") no-repeat',
        //			 'background-size':'100% 100%'
        //		 })
        //		 if (playPromise !== undefined) {
        //			 playPromise.then(_ => {
        //				 $('#material_audio')[0].pause();
        //			 }).catch(error => {});
        //		 }
        //		 $('#material_audio').attr('data-state','0')
        // }
        // })
      });
    });
    $("#mli" + i).mouseleave(function () {
      //console.log('out '+this.src);
    })
    .mouseenter(function () {
    	//console.log('in '+this.src);
    });
  }
}

function Vworks() {
  $("#works").empty();
  $("#works").append('<li class="totalTitle">' + PData.data.Main.projectName + ':</li>');
  var chapter = PData.data.Main.DStory;
  for (var i = 0; i < chapter.length; ++i) {
    var li = $('<li class="plotName" data-id="' + i + '">' + chapter[i][1].Name + '</li>');
    li.click(function () {
      $('#works .plotName').removeClass('active');
      $(this).addClass('active');
      dramatype = $(this).data("id");
      Vlist();
      listMenu();
      sessionStorage.setItem('index',0);
      $("#list ul li").eq(0).addClass('active');
      $('#control .dialog-btns').show();
      $('#control .speaker').hide();
      $('#controlBG').css({'background-image': 'none','background-position-x':0,'opacity':0});
      $('#control .dialog').show().html('双击此处设置对话').removeAttr('style')
    });
    $("#works").append(li);
  }
}

function Vlist() {
  $("#list ul").empty();
  var drama = PData.data.Main.DStory[dramatype][1]._events || _events(); /* _events 为空时请求数据 */
  for (var i in drama) {
    Vdrama(drama[i][1],i)
  }
  $("#list ul li").eq(sessionStorage.getItem('index')).addClass('active')
}

/**
 * _events 为空时请求数据
 */
function _events() {
  $.ajax({
    data: {type: 'data', guid: guid, event: dramatype},
    success: function (callback) {
      return PData.data.Main.DStory[dramatype][1]._events = callback.data;
    }
  });
  return PData.data.Main.DStory[dramatype][1]._events || []
}

function Vclick(_that){
  var li_index = _that.data('id');
  sessionStorage.setItem('index',li_index)
  let material = PData.material;
  $('#control .itemImg').html('');
  var drama = PData.data.Main.DStory[dramatype][1]._events;
  $('#list .design').each(function (i) {
    $('#list .design').eq(i).removeClass('active');
    $(_that).addClass('active')
  })
  for (let index_i=0;index_i<$('#list .design').length;index_i++){
    var d=drama[index_i][1];
    if(d.Code == 101 || d.Code == 1010){
      console.log('文字选项的下标是：'+index_i)
    }
    if(d.Code == 102){
      console.log('文字选项结束的下标是：'+index_i)
    }
  }
  for(let j=0;j<=li_index;j++){
    var d=drama[j][1];
    if(d.Code == 100 || d.Code == 1010){
      $('#control .dialog').show();
      $('#control .dialog-btns').hide();
      if(d.Argv[2]){
        var text = d.Argv[2].replace(/\\n/ig,'<br>');
        text = text.replace(/(\\c\[(\d+),(\d+),(\d+)\])([^\\c]+)?/ig,"<span style='color:rgb($2,$3,$4)'>$5</span>"),
           text = $("<div style='cursor:move;padding-left:"+PData.data.DSystem.MessageBox.Talk.textX*0.67
              +"px;padding-top:"+PData.data.DSystem.MessageBox.Talk.textY*0.67
              +"px;font-size:"+PData.data.DSystem.FontSize*0.67
              +"px'>"+text+"</div>")
              .dblclick(function () {
                layer.open({
                  type: 2,
                  title: '显示文本',
                  maxmin: false,
                  area: ['820px', '616px'],
                  content: './layer/viewtext.html?id='+_that.data('id')+'&_='+new Date().getTime()
                });
              });
        var bg=realurl(PData.data.DSystem.MessageBox.Talk.backimage.name,'graphics\/ui');
        var namebg = realurl(PData.data.DSystem.MessageBox.Name.backimage.name,'graphics\/ui');
        if(d.Argv[0] != ''){
          $('#control .speaker').show().html(d.Argv[0]).css({
            'color':'rgb('+PData.data.DSystem.FontTalkColor+')',
            'background':'url('+namebg+') no-repeat',
            'backgroundSize':'contain',
            'background-position-x':'50%'
          })
        }else{
          $('#control .speaker').hide()
        }
        if($(text[0])[0].innerText.trim()){
          $('#control .dialog').show().html(text).css({
            'color':'rgb('+PData.data.DSystem.FontTalkColor+')',
            'background':'url('+bg+') no-repeat',
            'backgroundSize':'100% 100%',
            'bottom': '8px',
            'width': '100%',
            'height': '125px',
            'line-height': 1
          })
        }else{
          $('#control .dialog').hide()
        }
      }
    }
    if(d.Code == 109){
      $('#control .speaker').hide()
      $('#control .dialog').hide()
    }
    if(d.Code == 400|| d.Code == 402){
      let path = 'graphics/' + d.Argv[1].replace(/\\/g,'/').toLowerCase();
      var picNum = d.Argv[0];
      var opa = d.Argv[7];
      var pos_x = d.Argv[3];
      var pos_y = d.Argv[4];
      let firstWord = d.Argv[1].substr(0,1).toLowerCase();
      console.log(picNum)
      for (let k=0;k<material.length;k++) {
        var pArr=[], gArr=[];
        var p = material[k][0], g=material[k][2];
        pArr.push(p);
        gArr.push(g);
        for (let a in pArr){
          if(pArr[a] == path) {
            let imgUrl = pichost + gArr[a].substr(0, 2) + '/' + gArr[a];
            if(firstWord == 'b'){
              $('#controlBG').css({'background-image': 'url("' + imgUrl + '")','background-position-x':(pos_x*0.67)+'px','opacity':opa/255});
            }else if(firstWord == 'h'){
              if($('#control').attr('data-direction') == 'horizontal') {
                //var halfImg = '<img data-index="'+j+'" class="ctrl-selectImg picNum'+picNum+'" src="'+imgUrl+'" style="width: '+w+'px;height: '+h+'px; opacity: '+ opa/255 +';left:'+pos_x+'px;top:'+pos_y+'px;transform: none">';
                var halfImg = '<img data-index="'+j+'" class="ctrl-selectImg picNum'+picNum+'" src="'+imgUrl+'" style="opacity: '+ opa/255 +';left:'+pos_x+'px;top:'+pos_y+'px;transform: none">';
              }else{
                //var halfImg = '<img data-index="'+j+'" class="ctrl-selectImg picNum'+picNum+'" src="'+imgUrl+'" style="width: '+w+'px;height: '+h+'px; opacity: '+ opa/255 +';left:'+pos_x*0.67+'px;top:'+pos_y*0.67+'px;transform: none">';
                var halfImg = '<img data-index="'+j+'" class="ctrl-selectImg picNum'+picNum+'" src="'+imgUrl+'" style="opacity: '+ opa/255 +';left:'+pos_x*0.67+'px;top:'+pos_y*0.67+'px;transform: none">';
              }
              $('#control .itemImg').html($('#control .itemImg').html()+halfImg)
            }
          }
        }
        for(let i =0;i<$('.picNum'+picNum).length-1;i++){
          $('.picNum'+picNum).eq(i).remove()
        }
      }
    }
    else if(d.Code == 401){
      var clearNum = d.Argv[0];
      for(let i =0;i<$('.picNum'+clearNum).length;i++){
        $('.picNum'+clearNum).eq(i).remove()
      }
    }
  }
  // hzObj.dragPic('material','control');
  hzObj.moveDel('#control .itemImg .ctrl-selectImg','#control .delect');
}

function realurl(f,t){
  for (var i in PData.material) {
    if ( PData.material[i][0] == t+'\/'+f ) return pichost + PData.material[i][2].substring(0,2) + '/' + PData.material[i][2]
  }
}

function Vdrama(d,i) {
  var time = null;
  switch (d.Code) {
    case 100: //文本
      var li = $('<li class="design" data-id="' + i + '" data-index="' + d.Indent +'" data-text="' + d.Argv[2]+'" data-name="'+d.Argv[0]+'" data-color="' + d.Argv[1] + '">文本: '+d.Argv[2]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '显示文本',
             maxmin: false,
             area: ['820px', '616px'],
             content: './layer/viewtext.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 101: //文字选项
      var li = $('<li class="design pTitle" data-id="' + i + '" data-index="' + d.Indent + '">文字选项:</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '文字选项',
             maxmin: false,
             area: ['440px', '350px'],
             content: './layer/textoption.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
    case 1010: //文字选项
      var li = $('<li class="design pTitle" data-id="' + i + '" data-index="' + d.Indent + '">文字选项:</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '文字选项',
             maxmin: false,
             area: ['440px', '350px'],
             content: './layer/textoption.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
    case 102: //文字选项结束
      var li = $('<li class="design" data-id="' + i + '" data-index="' + d.Indent + '">文字选项结束</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           alert(_that.attr('data-id'))
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
    case 103: //自动播放剧情
      var li = $('<li class="design gray" data-id="' + i + '" data-value="'+d.Argv[0]+'" data-index="' + d.Indent + '">自动播放剧情:'+d.Argv[1]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '自动播放',
             maxmin: false,
             area: ['165px', '135px'],
             content: './layer/autoplay.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 107: //注释
      var li = $('<li class="design commet" data-id="' + i + '" data-index="' + d.Indent + '" data-value="' + d.Argv[0] + '">注释:' + d.Argv[0] + '</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '注释',
             maxmin: false,
             area: ['314px', '189px'],
             content: './layer/comments.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 108: //文字选项-剧情标题
      var li = $('<li class="design subPTitle" data-id="' + i + '" data-index="' + d.Indent + '">'+d.Argv[1]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           console.log(_that.attr('data-id'))
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
    case 109: //消失对话框
      var li = $('<li class="design noneOperate" data-id="' + i + '" data-index="' + d.Indent + '">消失对话框</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           alert(_that.attr('data-id'))
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 112: //悬浮组件开关
      var li = $('<li class="design gray" data-id="' + i + '" data-index="' + d.Indent + '">悬浮组件开关:'+d.Argv[1]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '悬浮组件开关',
             maxmin: false,
             area: ['165px', '135px'],
             content: './layer/switch.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 200: //条件分歧
      var li = $('<li class="design noneOperate pTitle" data-id="' + i + '" data-index="' + d.Indent + '">条件分歧:'+d.Argv[5]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '条件分歧',
             maxmin: false,
             area: ['440px', '390px'],
             content: './layer/disagreement.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
    case 201: //条件分歧结束
      var li = $('<li class="design noneOperate" data-id="' + i + '" data-index="' + d.Indent + '">:分歧结束</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           alert(_that.attr('data-id'))
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
    case 202: //循环
      var li = $('<li class="design" data-id="' + i + '" data-index="' + d.Indent + '">循环</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           console.log(_that.attr('data-id'))
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
    case 203: //循环结束
      var li = $('<li class="design" data-id="' + i + '" data-index="' + d.Indent + '">以上反复</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           console.log(_that.attr('data-id'))
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
    case 204: //图片选项
      var li = $('<li class="design pTitle" data-id="' + i + '" data-index="' + d.Indent + '">图片选项:</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '图片选项',
             maxmin: false,
             area: ['394px', '293px'],
             content: './layer/picopt.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
    case 205: //图片选项结束
      var li = $('<li class="design" data-id="' + i + '" data-index="' + d.Indent + '">图片选项结束</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           alert(_that.attr('data-id'))
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
    case 206: //跳转剧情
      var li = $('<li class="design noneOperate" data-id="' + i + '" data-index="' + d.Indent + '">跳转剧情:'+d.Argv[2]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '跳转剧情',
             maxmin: false,
             area: ['320px', '137px'],
             content: './layer/jumpplot.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
    case 207: //数值操作
      var li = $('<li class="design noneOperate" data-id="' + i + '" data-index="' + d.Indent + '">数值操作:'+d.Argv[4]+'</li>')
         .dblclick(function () {
           let _that = $(this)// 取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '数值操作',
             maxmin: false,
             area: ['350px', '445px'],
             content: './layer/numerical.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this)// 取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
    case 208: //返回标题画面
      var li = $('<li class="design noneOperate" data-id="' + i + '" data-index="' + d.Indent + '">返回标题画面</li>')
         .dblclick(function () {
           let _that = $(this)// 取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '返回标题画面',
             maxmin: false,
             area: ['250px', '160px'],
             content: './layer/titlescreen.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this)// 取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
    case 209: //中断循环
      var li = $('<li class="design" data-id="' + i + '" data-index="' + d.Indent + '">中断循环-层数:'+d.Argv[0]+'</li>')
         .dblclick(function () {
           let _that = $(this)// 取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '等待',
             maxmin: false,
             area: ['200px', '140px'],
             content: './layer/interruptcycle.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this)// 取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
    case 210: //等待
      var li = $('<li class="design noneOperate" data-id="' + i + '" data-index="' + d.Indent + '">等待:'+d.Argv[0]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '等待',
             maxmin: false,
             area: ['200px', '150px'],
             content: './layer/wait.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);
           //取消上次延时未执行的方法
           clearTimeout(time);
           //执行延时
           time = setTimeout(function(){
             //do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 211: //除此之外的剧情
      var li = $('<li class="design" data-id="' + i + '" data-index="' + d.Indent + '">:除此之外的剧情:</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           alert(_that.attr('data-id'))
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
    case 212: //图片选项-剧情标题
      var li = $('<li class="design subPTitle" data-id="' + i + '" data-index="' + d.Indent + '">'+d.Argv[2]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           console.log(_that.attr('data-id'))
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
    case 213: //二周目数值
      var li = $('<li class="design noneOperate" data-id="' + i + '" data-index="' + d.Indent + '">二周目数值:'+d.Argv[4]+'</li>')
         .dblclick(function () {
           let _that = $(this)// 取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '二周目数值',
             maxmin: false,
             area: ['350px', '445px'],
             content: './layer/value.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this)// 取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 214: //呼叫界面
      var li = $('<li class="design noneOperate" data-id="' + i + '" data-index="' + d.Indent + '">呼叫界面:</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '呼叫界面',
             maxmin: false,
             area: ['250px', '160px'],
             content: './layer/interface.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 215: //字符串
      var li = $('<li class="design noneOperate" data-id="' + i + '" data-index="' + d.Indent + '">字符串:'+d.Argv[0]+'-范例="'+d.Argv[1]+'"</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '图片选项',
             maxmin: false,
             area: ['440px', '290px'],
             content: './layer/string.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 216: //高级数值操作
      var li = $('<li class="design noneOperate" data-id="' + i + '" data-index="' + d.Indent + '">高级数值操作:'+d.Argv[4]+'"</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '数值操作',
             maxmin: false,
             area: ['350px', '445px'],
             content: './layer/numerical.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 218: //强制存档/读档
      var li = $('<li class="design noneOperate" data-id="' + i + '" data-index="' + d.Indent + '">强制'+(d.Argv[0]==0?"存档:":"读档:")+d.Argv[1]+'号 '+(d.Argv[2]==1?"读后删除":"")+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '强制存档/读档',
             maxmin: false,
             area: ['296px', '182px'],
             content: './layer/saveread.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 220: //气泡模式
      var li = $('<li class="design noneOperate" data-id="' + i + '" data-index="' + d.Indent + '">气泡模式:'+d.Argv[0]+','+(d.Argv[1]==0?"关,":"开,")+(d.Argv[2]==0?"清除,":"保留,")+'起始位置X'+d.Argv[3]+',起始位置Y'+d.Argv[4]+',显示区域宽'+d.Argv[5]+',显示区域高'+d.Argv[6]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '气泡模式',
             maxmin: false,
             area: ['776px', '575px'],
             content: './layer/bubble.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 221: //发射气泡
      var li = $('<li class="design noneOperate" data-id="' + i + '" data-index="' + d.Indent + '">发射:'+d.Argv[0]+','+(d.Argv[1]==1?"左,":d.Argv[1]==2?"中,":"右,")+(d.Argv[3]==1?"字,":d.Argv[3]==2?"图,":"音,")+d.Argv[6]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '发射气泡',
             maxmin: false,
             area: ['800px', '600px'],
             content: './layer/launch.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 252: //体力锁
      var li = $('<li class="design noneOperate" data-id="' + i + '" data-index="' + d.Indent + '">当前体力值(hp) -= '+d.Argv[1]+'</li>')
         .dblclick(function () {
           let _that = $(this)// 取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '体力锁',
             maxmin: false,
             area: ['300px', '160px'],
             content: './layer/physicallock.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this)// 取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 253: //剧情锁商品
      var li = $('<li class="design" data-id="' + i + '" data-index="' + d.Indent + '">'+d.Argv[1]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '图片选项',
             maxmin: false,
             area: ['440px', '290px'],
             content: './layer/string.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 301: //天气
      var li = $('<li class="design red" data-id="' + i + '" data-value="'+d.Argv[0]+'" data-index="' + d.Indent + '">天气:'+d.Argv[1]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '自动播放',
             maxmin: false,
             area: ['200px', '140px'],
             content: './layer/weather.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 302: //震动
      var li = $('<li class="design red" data-id="' + i + '" data-value="'+d.Argv[2]+'" data-index="' + d.Indent + '">震动:强度'+d.Argv[0]+',速度:'+d.Argv[1]+',时间:'+d.Argv[3]+'帧</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '画面震动',
             maxmin: false,
             area: ['335px', '250px'],
             content: './layer/shock.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 303: //画面闪烁
      var li = $('<li class="design red" data-id="' + i + '" data-value="'+d.Argv[2]+'" data-index="' + d.Indent + '">画面闪烁:'+d.Argv[0]+','+d.Argv[1]+'帧</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '画面闪烁',
             maxmin: false,
             area: ['420px', '250px'],
             content: './layer/blinking.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 308: //插入至CG鉴赏
      var li = $('<li class="design red" data-id="' + i + '" data-value="'+d.Argv[0]+'" data-index="' + d.Indent + '">插入到CG鉴赏中 '+d.Argv[1]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '插入至CG鉴赏',
             maxmin: false,
             area: ['595px', '323px'],
             content: './layer/cg.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 400: //背景图
      let firstWord = d.Argv[1].substr(0,1).toLowerCase();
      var indexImg = d.Argv[1].split('\\').length;
      var li = $('<li class="design image" data-opa="'+d.Argv[7]+'" data-path="'+d.Argv[1]+'" data-id="' + i + '" data-index="' + d.Indent + '">'+ (firstWord=="h"?"立绘:":"背景图:") +
         d.Argv[0] + ',' +
         d.Argv[1].split('\\')[indexImg-1].split('.')[0] + ',X' +
         d.Argv[3] + ',Y' +
         d.Argv[4] + ',透明' +
         d.Argv[7] + ',' +
         d.Argv[5] + '%,' +
         d.Argv[6] + '%,' +
         '</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           if(firstWord=="h"){
             layer.open({
               type: 2,
               title: '显示立绘',
               maxmin: false,
               area: ['1042px', '430px'],
               content: './layer/painted.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
             });
           }else{
             layer.open({
               type: 2,
               title: '显示图片',
               maxmin: false,
               area: ['1042px', '430px'],
               content: './layer/background.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
             });
           }
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });

      var m = materialtype.toLowerCase().split('/')[1];
      var n = d.Argv[1].split('\\')[1];
      var material = PData.material;
      for (var j in material) {
        var p=material[j][0], g=material[j][2];
// $('#list img').eq(图片下标).before()[0].previousElementSibling.offsetTop-115
        if ( p.split('/')[1] == m && p.split('/')[2] == n ) {
          $(li).append('<img class="previewPic" style="position:absolute; top:'+(i*20+22)+'px; right:248px; width:60px;" src="' + pichost + g.substring(0,2) + '/' + g + '" />')
          break;
        }
      }

      $("#list ul").append(li);
      break;
    case 401: //图片消除
      var li = $('<li class="design image" data-id="' + i + '" data-index="' + d.Indent + '">图片消除:编号:'+d.Argv[0]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '图片消除',
             maxmin: false,
             area: ['235px', '300px'],
             content: './layer/remove.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 402: //移动图片
      var checkTest = d.Argv[1].split('\\')[1];
      var indexImg = d.Argv[1].split('\\').length;
      var li = $('<li class="design image" data-opa="'+d.Argv[7]+'" data-path="'+d.Argv[1]+'" data-id="' + i + '" data-index="' + d.Indent + '">移动图片:' +
         d.Argv[0] + ',' +
         d.Argv[9] + '帧,' +
         d.Argv[1].split('\\')[indexImg-1].split('.')[0] + ',X' +
         d.Argv[3] + ',Y' +
         d.Argv[4] + ',透明' +
         d.Argv[7] + ',' +
         d.Argv[5] + '%,' +
         d.Argv[6] + '%' +
         '</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '移动图片',
             maxmin: false,
             area: ['966px', '680px'],
             content: './layer/move.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 404: //旋转图片
      var li = $('<li class="design image" data-id="' + i + '" data-index="' + d.Indent + '">旋转图片:'+d.Argv[8]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '图片旋转',
             maxmin: false,
             area: ['860px', '600px'],
             content: './layer/rotate.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 406: //显示动态图片
      var li = $('<li class="design image" data-id="' + i + '" data-index="' + d.Indent + '">显示动态图片:' +
         d.Argv[0] + ',' +
         d.Argv[1].split('\\')[1].split('.')[0] + ',' +
         d.Argv[9] + ',X' +
         d.Argv[3] + ',Y' +
         d.Argv[4] + ',透明' +
         d.Argv[7] + ',' +
         d.Argv[5] + '%,' +
         d.Argv[6] + '%' +
         '</li>')
         .dblclick(function () {
           let _that = $(this)// 取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '显示动态图片',
             maxmin: false,
             area: ['760px', '400px'],
             content: './layer/animated.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this)// 取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 4062: //显示动态图片
      var li = $('<li class="design image" data-id="' + i + '" data-index="' + d.Indent + '">显示动态图片:' +
         d.Argv[0] + ',' +
         d.Argv[1].split('\\')[1].split('.')[0] + ',' +
         d.Argv[9] + ',X' +
         d.Argv[3] + ',Y' +
         d.Argv[4] + ',透明' +
         d.Argv[7] + ',' +
         d.Argv[5] + '%,' +
         d.Argv[6] + '%' +
         '</li>')
         .dblclick(function () {
           let _that = $(this)// 取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '显示动态图片',
             maxmin: false,
             area: ['760px', '400px'],
             content: './layer/animated.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this)// 取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 501: //播放BGM
      var li = $('<li class="design bgm" data-id="' + i + '" data-index="' + d.Indent + '">播放背景音乐:' +
         d.Argv[2].split('.')[0] + ',音量' +
         d.Argv[1] +
         '</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '播放背景音乐',
             maxmin: false,
             area: ['350px', '415px'],
             content: './layer/playbgm.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 502: //播放音效
      var li = $('<li class="design commet" data-id="' + i + '" data-value="'+d.Argv[2]+'" data-index="' + d.Indent + '">播放音效:'+d.Argv[2].split(".")[0]+',音量:'+d.Argv[1]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '音乐选择-SE',
             maxmin: false,
             area: ['440px', '390px'],
             content: './layer/play.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 503: //播放语音
      var li = $('<li class="design commet" data-id="' + i + '" data-value="'+d.Argv[2]+'" data-index="' + d.Indent + '">播放语音:'+d.Argv[2].split(".")[0]+',音量:'+d.Argv[1]+'</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '音乐选择-Voice',
             maxmin: false,
             area: ['350px', '415px'],
             content: './layer/voice.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 505: //淡出背景音乐
      var li = $('<li class="design commet" data-id="' + i + '" data-index="' + d.Indent + '">淡出背景音乐:'+d.Argv[0]+'秒</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '淡出背景音乐',
             maxmin: false,
             area: ['220px', '170px'],
             content: './layer/fadeout.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 506: //停止音效
      var li = $('<li class="design commet" data-id="' + i + '" data-index="' + d.Indent + '">停止音效</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           console.log(_that.attr('data-id'))
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 507: //停止语音
      var li = $('<li class="design commet" data-id="' + i + '" data-index="' + d.Indent + '">停止语音</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           console.log(_that.attr('data-id'))
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    case 508: //淡出循环音效
      var li = $('<li class="design commet" data-id="' + i + '" data-index="' + d.Indent + '">淡出循环音效:'+d.Argv[0]+'秒</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           layer.open({
             type: 2,
             title: '淡出循环音效',
             maxmin: false,
             area: ['220px', '170px'],
             content: './layer/stopcycle.html?id='+_that.attr('data-id')+'&_='+new Date().getTime()
           });
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             Vclick(_that)
           },300);
         });
      $("#list ul").append(li);
      break;
    default:
      var li = $('<li class="design" data-id="' + i + '" data-index="' + d.Indent + '">Code: ' + d.Code + '</li>')
         .dblclick(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);
           alert("未定义Code: " + _that.attr('data-id'))
         })
         .click(function () {
           let _that = $(this);//取消上次延时未执行的方法
           clearTimeout(time);//执行延时
           time = setTimeout(function(){//do function在此处写单击事件要执行的代码
             console.log(_that.attr('data-id'))
           },300);
         });
      $("#list ul").append(li);
      break;
  }
}
