var bookmarks;
var url = "bookmarks.json";

//所有包括在$(document).ready()里面的元素或事件都将会在DOM完成加载之后立即加载
$(document).ready(function() {
	//$.ajaxSettings.async = false;		//发送同步请求
	$.getJSON(url, function(Para) {
		bookmarks = Para;
		Initiation();	//将操作放在json的异步交互方法中可以省略ajaxSettings，或者使用setTimeout延时
		Search();
	});
});

function Initiation() {
	var contentStr = _.chain(bookmarks).map(function(Para) {		
		return createBookmarks(Para.title, Para.created);
	}).value(); //显示调用 lodash.js
	$(".content").html(contentStr);
}
	
function createBookmarks(title, created) {
	var tempmark = '<div>';
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
	var highlight_bookmarks = filter_result.map(function(Para) {
	var highlight_title = Para.title.replace(
	filtering, '<span class="heightlight">$&</span>');	//$&：从模式匹配得到的字符串将用于替换
		return createBookmarks(highlight_title, Para.created);
	});
	$(".content").html(highlight_bookmarks);
}


