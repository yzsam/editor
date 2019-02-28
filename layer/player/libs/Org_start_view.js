/**
 * Created by heshang on 2017/3/2.
 */
var Org_start_view = (function () {
    var body;//body
    var div_back;
    var div_circle;//圆形渐变
    var circle_image;//转动小人图
    var div_progress;//进度条的div
    var progress;//控制进度
    var _this;
    var isLoadOk;//小人图是否加载完毕
    var lisnerT;//计时器
    var allImage;//所有小人图是否加载完成
    var div_back_opactiy;//用来控制div透明度  大于1的时候会有停顿
    var isStop;//小人图是否停止
    var call_start;//加载完成回调
    function Org_start_view(){
        //存放的loading图
        allImage = [
            "./res/org_start_res/g_loading_1.png",
            "./res/org_start_res/g_loading_2.png",
            "./res/org_start_res/g_loading_3.png",
            "./res/org_start_res/g_loading_4.png",
            "./res/org_start_res/g_loading_5.png",
            "./res/org_start_res/g_loading_6.png",
            "./res/org_start_res/g_loading_7.png",
            "./res/org_start_res/g_loading_8.png",
            "./res/org_start_res/g_loading_9.png",
            "./res/org_start_res/g_loading_10.png",
            "./res/org_start_res/g_loading_11.png",
            "./res/org_start_res/g_loading_12.png",
            "./res/org_start_res/g_loading_13.png",
            "./res/org_start_res/g_loading_14.png",
            "./res/org_start_res/g_loading_15.png",
            "./res/org_start_res/g_loading_16.png",
            "./res/org_start_res/g_loading_17.png",
            "./res/org_start_res/g_loading_18.png",
            "./res/org_start_res/g_loading_19.png",
            "./res/org_start_res/g_loading_20.png",
            "./res/org_start_res/g_loading_21.png",
            "./res/org_start_res/g_loading_22.png",
            "./res/org_start_res/g_loading_23.png",
            "./res/org_start_res/g_loading_24.png",
            "./res/org_start_res/g_loading_25.png",
            "./res/org_start_res/g_loading_26.png"
        ];
        _this = this;
        progress = 0;
        div_back_opactiy = 2;
        isStop = false;
        isLoadOk = false;
        body = document.body;
        div_back = document.createElement("div");
        div_circle = document.createElement("div");
        div_progress = document.createElement("div");

        div_back.style = "background-color:#3b3b4b;" +
            "height:100%;" +
            "width:100%;" +
            "z-index:1;"+
            "position:absolute";
        /*div_back.style.backgroundColor = "#3b3b4b";
        div_back.style.height = "100%";
        div_back.style.width = "100%";*/

        var width = body.clientWidth > body.clientHeight? body.clientHeight:body.clientWidth;
        div_circle.style = "width:"+width+"px;height:"+width+"px;" +
            "borderRadius:50%;" +
            "margin:"+(body.clientHeight - width)/2+"px auto;" +
            "background-image:-moz-radial-gradient(50% 50% 45deg, circle cover, #726e6b 10%, #3b3b4b 66%);" +
            "background-image:-webkit-radial-gradient(50% 50%, circle cover, #726e6b 10%, #3b3b4b 66%);" +
            "background-image:radial-gradient(50% 50% 45deg, circle cover, #726e6b 10%, #3b3b4b 66%)";
// "margin-top:"++"px";
        /*div_circle.style.width = width+"px";
        div_circle.style.height = width+"px";
        div_circle.style.borderRadius = "50%";
        div_circle.style.margin = "0 auto";
        div_circle.style.backgroundImage="-moz-radial-gradient(50% 50% 45deg, circle cover, #726e6b 10%, #3b3b4b 66%)";
        div_circle.style.backgroundImage=" -webkit-radial-gradient(50% 50%, circle cover, #726e6b 10%, #3b3b4b 66%)";
        div_circle.style.backgroundImage="radial-gradient(50% 50% 45deg, circle cover, #726e6b 10%, #3b3b4b 66%)";*/

        div_progress.style = "width:"+width+"px;" +
            "margin:0 auto;" +
            "text-align:center;" +
            "margin-top:-20px;" +
            "font-size:"+width*0.7/10+"px;" +
            "color:#ffce6b;" +
            "opacity:0.7";
        /*div_progress.style.width = width+"px";
        div_progress.style.margin = "0 auto";
        div_progress.style.textAlign = "center";
        div_progress.style.marginTop = "-20px";
        div_progress.style.fontSize = width*0.7/12+"px";
        div_progress.style.color = "#ffce6b";
        div_progress.style.opacity = 0.7;*/
        _this.init();
    }
    Org_start_view.prototype = {
        //界面初始化
        init: function () {
            body.appendChild(div_back);
            div_back.appendChild(div_circle);
            circle_image = new Image();
            circle_image.src = allImage[0];
            circle_image.style = "width:70%;margin:15% 15% 0 15%;";
            div_circle.appendChild(circle_image);
            div_circle.appendChild(div_progress);
            div_progress.innerHTML="正在初始化";
            isLoadOk = false;
            _this.loadAll(allImage, function () {
                isLoadOk = true;
                //alert("加载完成");
            });
            _this.checkInterval();
        },
        //加载游戏初始化的图片资源
        loadAll: function (arr,call) {
            var length = arr.length;
            function loadOk(){
                length -- ;
                if(length<=0){
                    loadFinish();
                }
            }
            function loadError(){
                length --;
                if(length<=0){
                    loadFinish();
                }
            }
            function loadFinish(){
                call && call();
            }
            var k = 0;
            while(k < arr.length){
                var image = new Image();
                image.src = arr[k];
                image.onload  = function () {
                    loadOk();
                }
                image.onerror = function () {
                    loadError();
                }
                k++;
            }
        },
        setProgress: function (num,call) {
            progress = num;
            if(num == 100){
                call_start = call;
            }
        },
        checkInterval: function () {
            //console.log(allImage);
            //监听小人动并且设置loading图；
            var current_frame = 0;
            var init_point = 1;
            var nextFrame = 0;
            var last_progress = 0;
            lisnerT = setInterval(function () {
                //所有图片加载完成后执行切换图片
                if(isLoadOk){
                    if(progress>100){
                        progress = 100;
                    }
                    if(!isStop){
                        circle_image.src = allImage[current_frame];
                        current_frame++;
                        if(current_frame>allImage.length-1){
                            current_frame = 0;
                        }
                        if(progress-last_progress>20){
                            last_progress+=4;
                        }else if(last_progress<progress){
                            last_progress+=1;
                        }

                        div_progress.innerHTML=last_progress+"%";
                    }
                    if(last_progress == 100){
                        _this.gameStart();
                    }
                }else{
                    //未加载完成执行初始化
                    nextFrame++;
                    if(nextFrame%10==0){
                        nextFrame = 0;
                        var str="正在初始化";
                        for(var i=0;i<init_point;i++){
                            str+=".";
                        }
                        div_progress.innerHTML=str;
                        init_point += 1;
                        if(init_point>3){
                            init_point = 0;
                        }
                    }

                }
            },1000/20);
        },
        gameStart: function () {
            //将所有资源清空并释放
            div_back_opactiy -= 0.1;
            if(!isStop){
                call_start && call_start()
            }
            isStop = true;
            if(div_back_opactiy<1){
                div_back.style.opacity=div_back_opactiy;
            }
            if(div_back_opactiy <=0){
                clearInterval(lisnerT);
                body.removeChild(div_back);
                body = null;
                div_back = null;
                div_circle = null;
                circle_image = null;
                div_progress = null;
                progress = null;
                lisnerT = null;
                _this = null;
                allImage = null;
                isLoadOk = null;
                start_load = null;
            }

        }
    }
    return  Org_start_view;
})();
var start_load = new Org_start_view();