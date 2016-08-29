//使用前请引入JQuery，或者zepto
//增加数据使用的插件，提供了成功失败等回调函数，在需要加入数据的元素中写入自定义属性
//dataContainer//文本数据写入"t-"+"数据名字"
//dataContainer//图片数据写入"i-"+"数据名字"
//dataContainer//链接数据写入"l-"+"数据名字"
//如果数据长度超过2后面加上形如"-0-a"
//请在body标签后方实例化函数并作形如以下配置
//var getData=new getData({
//		url:"http://127.0.0.1:8020/workspace/test/test.json", //请求路径
//		ele:".dataContainer",//需要增加数据的元素，请传入一个类名
//		Success:function(data){//成功回调
//			//console.log(data);
//		},
//		Error:function(data){//失败回调
//			//console.log(data);
//		},
//		Fail:function(data){//错误请求的回调
//			//console.log("失败");
//		},
//		errorMsg:"errmsg",//错误信息所在对象
//		flag:"code==0",//判断符所在对象以及何种表示成功
//		dataName:"data",//数据所在的对象
//		type:"get",//请求类型
//		dataType:"json",//返回数据类型
//		async:true,//是否异步请求
//		data:{//传输的数据
//			id:0
//		}
//	});
var getData=function(config){
	var ele=$(config.ele);
	var flag=config.flag||"code==0";
	var flagArr=flag.split("==");
	var async=config.aysc||true;
	var dataType=config.dataType||"json";
	var type=config.type||"get";
	var dataName=config.dataName;
	var Success=config.Success;
	var Error=config.Error;
	var Fail=config.Fail;
	var errorMsg=config.errorMsg||"errmsg";
	$.ajax({
		type:type,
		url:config.url,
		async:async,
		data:config.data,
		success:function(data){
			if (data[flagArr[0]]==flagArr[1]) {
				if (dataName) {
					getData.addData(data[dataName],ele)
					Success(data[dataName]);
				}else{
					getData.addData(data)
					Success(data);
				}
			}else{
				Error(data[errorMsg]);
			}
		},
		error:function(){
			Fail();
		}
	});
}
getData.prototype.addData=function(data,ele){
	for (var i=0;i<ele.length;i++) {
		var dataPos=$(ele[i]).attr("dataContainer");
		var dataPosArr=dataPos.split(">");
		switch(dataPosArr[0]){
			case "t":
				if (dataPosArr.length>=3) {
					var str="data[dataPosArr[1]][dataPosArr[2]]";
					for (var k=3;k<dataPosArr.length;k++) {
						str+="[dataPosArr["+k+"]]"
					}
					$(ele[i]).html(eval(str));
				}else{
					$(ele[i]).html(data[dataPosArr[1]]);
				}
				break;
			case "i":
				if (dataPosArr.length>=3) {
					var str="data[dataPosArr[1]][dataPosArr[2]]";
					for (var k=3;k<dataPosArr.length;k++) {
						str+="[dataPosArr["+k+"]]"
					}
					ele[i].src=eval(str);
				}else{
					ele[i].src=data[dataPosArr[1]];
				}
				break;
			case "l":
				if (dataPosArr.length>=3) {
					var str="data[dataPosArr[1]][dataPosArr[2]]";
					for (var k=3;k<dataPosArr.length;k++) {
						str+="[dataPosArr["+k+"]]"
					}
					ele[i].href=eval(str);
				}else{
					ele[i].href=data[dataPosArr[1]];
				}
				break;
		}
	}
}

