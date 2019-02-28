
$(document).keyup(function (e) {
  var key = e.which;
  //alert(key);
  if (key == 121) eval("openwin('测试','0,0,player/index')");
  //if (key == 123) eval("openwin('测试','0,0,player/index')");
  if (key == 27) layer.closeAll(); //按esc关闭弹出层
  if (key == 78) eval("openwin('新建','525,230,new')");
  return false;
});