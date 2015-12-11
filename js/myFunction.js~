var bookmarks;				   //初始获得的bookmarks
var highlight_bookmarks		   //highlight的bookmarks
var obj; 					   //bookmarks表示的内容层，html元素
var pages;       			   //翻页导航层 ，html元素
var allpages;				   //总页数，整数
var pgindex = 1;               //当前页，整数
var count = 1;
//var upScroll;
//var upOffset;

//所有包括在$(document).ready()里面的元素或事件都将会在DOM完成加载之后立即加载
$(document).ready(function() {
	//$.ajaxSettings.async = false;		//发送同步请求
	$.getJSON("bookmarks.json", function(Para) {
		bookmarks = Para;
		Initiation();	//将操作放在json的异步交互方法中可以省略ajaxSettings，或者使用setTimeout延时
		Search();
		$('#modaltrigger').leanModal({ top: 110, overlay: 0.45, closeButton: ".hidemodal" });
		$('#modaltrigger2').leanModal({ top: 110, overlay: 0.45, closeButton: ".hidemodal" });
	})
});

function Initiation() {
	var contentStr = _.chain(bookmarks).map(function(Para) {		
		return createBookmarks(Para.title, Para.created);
	}).value(); //显示调用 lodash.js
	$(".content").html(contentStr);
	Paging();
	highlight_bookmarks = "";
	$(".search .keyword").val("");
}
	
function createBookmarks(title, created) {
	var tempmark = '<div id="marks">';
	tempmark = tempmark +  '<a href="" class="title">' + title + '</a>'
		    			+  '<p class="created">Created @ ' + getTimeStamp(created) +'</p>'
		    			+  '<div class="split"></div>'
	return tempmark+'</div>';
}
	
function getTimeStamp(timestamp) {
	var time = new Date();
	time.setTime(timestamp*1000);
	//getMonth()的返回值是0到11之间的一个整数...
	return time.getUTCFullYear() + "-" + (time.getUTCMonth()+1) + "-" + time.getUTCDate();
}

function Search() {
	$(".search .keyword").bind("input", function() {
		var target = $(this).val();
		if (target != null) {
			filterAndHighlight(target);
			} 
		else{
			Initiation();
		}			
	});
}

function filterAndHighlight(target) {
	var filtering = new RegExp(target, "igm");	//全局匹配，大小写不敏感
	var filter_result = bookmarks.filter(function(Para) {
		return filtering.test(Para.title);
	});	
	highlight_bookmarks = filter_result.map(function(Para) {
	var highlight_title = Para.title.replace(
	filtering, '<span class="heightlight">$&</span>');	//$&：从模式匹配得到的字符串将用于替换
		return createBookmarks(highlight_title, Para.created);
	});
	$(".content").html(highlight_bookmarks);
	Paging();
}

function Paging(){
	obj = document.getElementById("content");  		//获取内容层
	allpages = Math.ceil(parseInt(obj.scrollHeight)/parseInt(obj. offsetHeight));//获取页面数量
	/*
	var eachmarks = parseInt(obj.scrollHeight)/marks.length;
	upOffset = eachmarks * 10;
	allpages = Math.ceil(marks.length/10);		//获取页面数量
	upScroll = upOffset * allpages;
	var temp = upOffset + "px";
	$(".content").css("height",temp);
	*/

	if(typeof(marks) == "undefined")
		document.getElementById("pages").innerHTML = "<b class=\"empty\"> 当前有0条记录!</b>";
	else
	{	
		if(!marks.length)
			marks.length = 1;
		document.getElementById("pages").innerHTML = "<b> 当前有"+ marks.length +"条记录，</b>";
    	pages = document.getElementById("pages");     //输出页面数量 
		pages.innerHTML += "<b> 分"+ allpages +"页显示 </b>      ";
		pages.innerHTML += " <a href=\"javascript:gotopage('-1');\">上一页</a>    "; 
    	for (var i=1;i<=allpages;i++){ 
			if(pgindex != i)
        		pages.innerHTML += "<a href=\"javascript:showPage('"+i+"');\">"+i+"</a>    ";  
			else
				pages.innerHTML += "<a class=\"current\" href=\"javascript:showPage('"+i+"');\">"+i+"</a>    ";  
    	} 
    	pages.innerHTML += " <a href=\"javascript:gotopage('+1');\">下一页</a>";
	}
}

function gotopage(value){ 
	if((value != -1||pgindex != 1)&&(value != 1||pgindex != allpages)){
		try{ 
			value == "-1"?showPage(parseInt(pgindex)-1):showPage(parseInt(pgindex)+1); 
		}
		catch(e){  
		} 
	}
}

function showPage(pageindex) 
{    
	//if(pageindex != allpages) 存在问题，最后一页自动补齐
    obj.scrollTop=(pageindex-1)*parseInt(obj.offsetHeight)		//根据高度，输出指定的页
    pgindex=pageindex; 
	Paging()
} 

$(function(){
  $('#createform').submit(function(e){
	if(!($("#createmark").val()))
	{
		alert("Empty bookmark input!");
		return false;
	}
	if(!($("#createstamp").val()))
	{
		alert("Empty timestamp input!");
		return false;
	}
	var add = {"title":"","created":""};
	add.title = $("#createmark").val();
	add.created = $("#createstamp").val();  
	if(highlight_bookmarks == ""){
		bookmarks.push(add);
		Initiation();
	}
	else{
		var temp = createBookmarks(add.title,add.created);
		highlight_bookmarks.push(temp);
		bookmarks.push(add);
		$(".content").html(highlight_bookmarks);
		Paging();
	}
		
	return false;
});   
  
  $('#deleteform').submit(function(e){
	if(!($("#deletemark").val()))
	{
		alert("Empty bookmark input!");
		return false;
	}
	for(var i=0; i<bookmarks.length; i++){
		if(bookmarks[i].title == $("#deletemark").val()){
			bookmarks.splice(i,1);
			Initiation();
			break;
		}
		else
			continue;
	}
	return false;
  });  
});


