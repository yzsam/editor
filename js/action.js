/*
function Vpic(n) {
	var m = materialtype.toLowerCase().split('/')[1];
	n=n.split('\\')[1];
	for (var i in pathdata) {
		var p=pathdata[i][0], g=pathdata[i][2];
		if ( p.split('/')[1] == m && p.split('/')[2] == n ) {
			$('#list').prepend('<img style="position:relative;top:100px;left:2px;width:60px;" src="'+pichost + g.substring(0,2) + '/' + g+'" />')
			break;
		}
		//console.log(pathdata[i][0] + ' ' + pathdata[i][0].indexOf(materialtype) )
		//console.log(pathdata[i][0] + ' ' + pathdata[i][0].substr(0, pathdata[i][0].lastIndexOf("/")-1) )
		//console.log(pathdata[i][0] + ' : ' + pathdata[i][0].substring(pathdata[i][0].lastIndexOf('/')+1) )
	}
};
*/
function VSetFonts() {
  var list=realurl('font.list','font');
//	$.get(list, function( data ) {
//		console.log( data.getInt32() );
//		console.log( data.getInt32() );
//		console.log( data.readUTFString() );
//		console.log( data.getInt32() );
//	});
};

function VFont(f){

};

function SetTmpData(str,arr){
  var n=str.split('.'),
     tmp="TmpData",
     dat="PData",
     l=n.length-1,
     i=0,
     d;
  for(; i<=l; ++i) {
    tmp+="['"+n[i]+"']";
    dat+="['"+n[i]+"']";
//		console.log(tmp)
//		console.log(dat)
    if (i==l) {
      d=dat+"=arr";
      eval(d);
      d=tmp+"=arr";
      eval(d)
    } else if ( typeof eval(tmp) == 'undefined' ) {
      d=tmp+"={}";
      eval(d)
    }
  }
};

/**
 * 素材资源按钮切换
 */
var toolsboxarr=[
  'Graphics/Face', /*头像*/
  'Graphics/Mood', /*心情*/
  'Graphics/Other', /*其他*/
  'Audio/Se', /*音效*/
  'Audio/Voice', /*语音*/
  'Graphics/Button', /*按钮*/
  'Graphics/Background', /*背景*/
  'Graphics/Half', /*立绘*/
  'Audio/Bgm', /*音乐*/
  'Graphics/Chat',
  'Graphics/System',
  'Graphics/Transitions'];

$("#toolsbox button").each(function(i){
  $(this).click(function(){
    $("#toolsbox button").removeClass('active');
    $(this).addClass('active');
    materialtype = toolsboxarr[i];
    $('#material').attr('data-type',materialtype)
    Vmaterial();
    materialMenu();
    hzObj.mouseEv();
  });
});

/**
 * 加载项目
 */
;(function() {
  $.ajax({
    data: {type: 'data', guid: guid},
    success: function (callback) {
      PData = callback;
      document.title = PData.data.DHeader.title + ' - 编辑器v0.0.001';
      $.cookie("PLAT", PData.data.DHeader.GWidth > PData.data.DHeader.GHeight ? 1 : 3);
      Vmaterial();
      Vworks();
      sessionStorage.setItem('index',0);
      Vlist();
      $("#list ul li").eq(0).addClass('active');
      $("#works .plotName").eq(0).addClass('active');
      VSetFonts();
      resizewin();
      layer.close()
    }
  });
})();
