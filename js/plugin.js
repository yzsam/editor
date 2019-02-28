
var hzObj = {
	mouseEv:function () {
		/*鼠标进入元素*/
		var type = $('#material').attr('data-type').toLowerCase();
		if(type == 'graphics/background' || type == 'graphics/half'){
			$('#material li').mouseenter(function () {
				/*获取左侧选择元素的图片的url，分成数组获取值*/
				let src = $(this).attr('data-src');
				/*获取左侧选择元素的图片的名字，分成数组获取值*/
				let name = $(this).attr('data-name');
				if($(this).children('img').width()<$(this).children('img').height()){
					$('#item-preview').css('width','225px');
				}else{
					$('#item-preview').css('width','450px');
				}
				/*元素图片预览图显示及定位*/
				$('#item-preview').show();
				$('#item-preview').css({
					'top':$(this).position().top-95,
					// 'background-image':"url('"+src+"')"
				});
				$('#item-preview img').attr('src',src)
				/*元素图片预览图名字*/
				$('#pic-name').html(name);
				/*鼠标离开元素*/
				$('#material').mouseleave(function () {
					$('#item-preview').hide();
				})
			})
		}
	},
	dragPic:function (startId, endId) {
		console.log('拖拽')
		var elDrag = null;
		/* 左侧拖拽*/
		$('#' + startId).delegate('li', {
			/*左侧拖拽开始*/
			dragstart: function(event) {
				var li = $(this);
				elDrag = li;
				event.originalEvent.dataTransfer.setData('text/plain', 'for firefox');
			},
			/*左侧拖拽结束*/
			dragend: function(event) {
				elDrag = null;
				event.preventDefault();
			}
		});
		/*经过背景框元素*/
		$('#' + endId).on({
			/*在背景框元素上方悬浮时*/
			dragover: function(event) {
				event.preventDefault()
			},
			/*在背景框元素里放下时*/
			drop: function(event) {
				var posX,posY;
				var type = $('#material').attr('data-type').toLowerCase();
				var url = elDrag && elDrag.attr('data-src');
				var name = $(elDrag).attr('data-name')? elDrag.attr('data-name') : elDrag && elDrag.attr('data-name');
				var insert_index = sessionStorage.getItem('index');
				console.log(url)
				$('#control').mousemove(function(event){
					posX = event.offsetX;
					posY = event.offsetY;
					/*解绑鼠标移动事件*/
					$('#control').unbind('mousemove')
					getImageWidth(url,function(w,h){
						if(url && type == 'graphics/background'){
							$('#controlBG').css('background-image',"url('"+url+"')");
							var bg_obj =  {
									"Code": 400,
									"Indent": 0,
									"Argv": [
										"99",
										"Background\\"+name,
										0,
										0,
										0,
										100,
										100,
										0,
										0,
										"",
										2
									]
								};
							PData.data.Main.DStory[dramatype][1]._events.splice(insert_index,0,bg_obj);
							sessionStorage.setItem('index',++insert_index);
							Vlist()
						}else if (url && type == 'graphics/half') {
							var half_obj = {
								"Code": 400,
								"Indent": 0,
								"Argv": [
									99,
									"Half\\"+name,
									0,
									-450,
									-40,
									100,
									100,
									0,
									0,
									"",
									2,
									0,
									0
								]
							};
							var halfImg = '<img class="ctrl-selectImg" src="'+url+'" style="width:'+w+'px;height:'+h+'px;top:'+posY+'px;left:'+posX+'px">';
							$('#control .itemImg').html($('#control .itemImg').html()+halfImg)
							PData.data.Main.DStory[dramatype][1]._events.splice(insert_index,0,half_obj);
							sessionStorage.setItem('index',++insert_index);
							Vlist()
						}else if (url && type == 'graphics/button') {
							var btnImg = '<img class="ctrl-selectImg" src="'+url+'" style="width:'+w+'px;height:'+h+'px;top:'+posY+'px;left:'+posX+'px;z-index: 2">';
							$('#control .itemImg').html($('#control .itemImg').html()+btnImg)
						}
					});
				})
				hzObj.mouseEv();
				hzObj.moveDel('#control .itemImg .ctrl-selectImg','#control .delect');
				return false;
			}
		});
	},
	moveDel:function(moveEle,delEle) {
		$(document).ready(function() {
			$(delEle).on('mouseenter', function() {
				$('.selectImg').addClass('enterSelect')
				$(this).css({
					'backgroundImage':'url("./img/del_open.png")',
					'backgroundColor':'rgba(255,187,80,0.5)'
				})
				$(document).on('mouseup', function() {
					$('.selectImg.enterSelect').remove()
				})
			}).on('mouseleave', function() {
				$('.selectImg').removeClass('enterSelect');
				$(this).css({
					'backgroundImage':'url("./img/del_close.png")',
					'backgroundColor':'rgba(255,255,255,0.5)'
				})
			})

			$(moveEle).each(function() {
				var _that = $(this);
				_that.draggable({
					stop: function( event, ui ) {
						console.log("left:"+ui.position.left+",top:"+ui.position.top)
					}
				});
				// _that.on('mousedown', function(event) {
				// 	event = event || window.event
				//	 $('#control .delect').show()
				//	 $(this).addClass('selectImg')
				//	 $(this).css({
				//		 'cursor': 'move',
				//		 'border': '1px dotted #1B57D5'
				//	 }); //改变鼠标的形状
				//	 /*var off = $(this).offset(); //获得的是方块的绝对偏移量
				//	 var x = event.pageX - off.left; //这个是获得鼠标点击的位置与边框边左边距的位置
				//	 var y = event.pageY - off.top; //这个是获得鼠标点击位置与上边框的位置*/
				//	 $(document).bind('mousemove', function(ev) {
				//		 _that.stop();
				//		 /*使图片移动时，鼠标在正中心*/
				//		 var lastx = ev.pageX-_that.width()/2-$('#control').offset().left+310;
				//		 var lasty = ev.pageY-$('#control').offset().top-_that.height()/2;
				//		 // var lastx = ev.offsetX;
				//		 // var lasty = ev.offsetY;
				//		 _that.animate({
				//			 left: lastx + 'px',
				//			 top: lasty + 'px'
				//		 }, 10);
				//		 _that.attr('data-pos',lastx+','+lasty)
				//	 })
				// })
				// $(document).on('mouseup', function(event) {
				//	 event = event || window.event
				//	 $('#control .delect').hide()
				//	 setTimeout(function() {
				//		 _that.removeClass('selectImg')
				//	 }, 100)
				//	 _that.css({
				//		 'cursor': 'default',
				//		 'border': 'none'
				//	 });
				//	 $(this).unbind('mousemove')
				//	 event.preventDefault();
				// })
			})

		})
	},
	contextMenu:function (ele,option) {
		var rightMenuData = option;
		var name = ele.split('.')[1];
		$(ele).smartMenu(rightMenuData, {
			name: name
		});
	}
}
hzObj.mouseEv();
hzObj.dragPic('material','control');
listMenu();
materialMenu();
workMenu();
function listMenu() {
	hzObj.contextMenu('#list .design',[
		[{
			text: "编辑 ",
			func: function() {
				$(this).dblclick()
			}
		}],
		[{
			text: "剪切",
			func: function() {
				let index = $(this).attr('data-id');
				let listData = parent.PData.data.Main.DStory[parent.dramatype][1]._events.splice(index,1);
				console.log(listData);
				sessionStorage.setItem('listData',JSON.stringify(listData));
				parent.PData.data.Main.DStory[parent.dramatype][1]._events.splice(index,1);
				Vlist();
				listMenu()
			}
		},{
			text: "复制",
			func: function() {
				// let index = $(this).attr('data-id');
				// let listData = parent.PData.data.Main.DStory[parent.dramatype][1]._events.slice(index,1);
				// console.log('复制'+JSON.stringify(listData))
				// sessionStorage.setItem('listData',JSON.stringify(listData))
			}
		}],
		[{
			text: "粘贴",
			func: function() {
				let index = $(this).attr('data-id')
				if(sessionStorage.getItem('listData')){
					let pasteData = JSON.parse(sessionStorage.getItem('listData'));
					console.log(pasteData);
					parent.PData.data.Main.DStory[parent.dramatype][1]._events.splice(index,0,pasteData[0])
				};
				Vlist();
				listMenu()
			}
		},{
			text: "删除",
			func: function() {
				let index = $(this).attr('data-id');
				parent.PData.data.Main.DStory[parent.dramatype][1]._events.splice(index,1);
				Vlist();
				listMenu()
			}
		}],
		[{
			text: "全选",
			func: function() {
				alert('点击了全选')
			}
		},{
			text: "快捷操作",
			data: [
				[{
					text: "批量剧本导入",
					func: function() {
						alert('批量剧本导入')
					}
				}, {
					text: "批量设置姓名",
					func: function() {
						alert('批量设置姓名')
					}
				}, {
					text: "批量设置语速",
					func: function() {
						alert('批量设置语速')
					}
				}]
			]
		}]
	]);
}

function materialMenu() {
	hzObj.contextMenu('#material li',[
		[{
			text: "打开 ",
			func: function() {
				$(this).dblclick()
			}
		},{
			text: "刷新",
			func: function() {
				window.location.reload();
			}
		}],
		[{
			text: "复制",
			func: function() {

			}
		},
		{
			text: "剪切",
			func: function() {

			}
		},{
			text: "粘贴",
			func: function() {

			}
		},
		{
			text: "删除",
			func: function() {

			}
		}],
		[{
			text: "重命名",
			func: function() {

			}
		}],
		[{
			text: "新建文件夹",
			func: function() {

			}
		}]
	]);

}
function workMenu() {
	hzObj.contextMenu('#works li',[
		[{
			text: "新建 ",
			func: function() {
				$(this).dblclick()
			}
		}],
		[{
			text: "复制",
			func: function() {

			}
		},{
			text: "粘贴",
			func: function() {

			}
		},
		{
			text: "删除",
			func: function() {

			}
		}],
		[{
			text: "重命名",
			func: function() {

			}
		}],
		[{
			text: "从此剧情开始测试",
			func: function() {

			}
		}]
	]);
}

function getImageWidth(url,callback){
	var img = new Image();
	img.src = url;
	// 如果图片被缓存，则直接返回缓存数据
	if(img.complete){
		callback(img.width, img.height)
	}else{
		// 完全加载完毕的事件
		img.onload = function(){
			callback(img.width, img.height)
		}
	}
}