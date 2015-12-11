var bookmarks;
var url = "bookmarks.json";

//���а�����$(document).ready()�����Ԫ�ػ��¼���������DOM��ɼ���֮����������
$(document).ready(function() {
	//$.ajaxSettings.async = false;		//����ͬ������
	$.getJSON(url, function(Para) {
		bookmarks = Para;
		Initiation();	//����������json���첽���������п���ʡ��ajaxSettings������ʹ��setTimeout��ʱ
		Search();
	});
});

function Initiation() {
	var contentStr = _.chain(bookmarks).map(function(Para) {		
		return createBookmarks(Para.title, Para.created);
	}).value(); //��ʾ���� lodash.js
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
	//getMonth()�ķ���ֵ��0��11֮���һ������...
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
	var filtering = new RegExp(target, "igm");	//ȫ��ƥ�䣬��Сд������
	var filter_result = bookmarks.filter(function(Para) {
		return filtering.test(Para.title);
	});			
	var highlight_bookmarks = filter_result.map(function(Para) {
	var highlight_title = Para.title.replace(
	filtering, '<span class="heightlight">$&</span>');	//$&����ģʽƥ��õ����ַ����������滻
		return createBookmarks(highlight_title, Para.created);
	});
	$(".content").html(highlight_bookmarks);
}


