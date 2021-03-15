
var index = 2;
var img_arr = [ "https://img.ltn.com.tw/Upload/news/600/2021/01/18/phpNzJEoj.jpg",
				"https://images.chinatimes.com/newsphoto/2021-01-25/656/20210125004939.jpg",
				"https://miro.medium.com/max/2444/1*rUIKFy9CUQXuSIo-DnzGPw.png",
				"https://cdn2.ettoday.net/images/5434/5434015.jpg",
				"https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/01/19/2/11257956.png&s=Y&x=0&y=61&sw=992&sh=558&sl=W&fw=1050&exp=3600&exp=3600",
				]

//click on previous
var element = document.getElementById("previous");
element.addEventListener(
	"click", 
	function() {
		if( index == 0 ) return;

		if( document.getElementById("next").className == "disabled")
			document.getElementById("next").className = "";

		var image = document.getElementById("display");
		image.src = img_arr[index-1];
		var ahref = document.getElementById("img__link__text");
		ahref.href = img_arr[index-1];

		index--;

		if( index == 0 )
			document.getElementById("previous").className = "disabled";
	}
);
	
//click on next
var element = document.getElementById("next");  
element.addEventListener( 
	"click",   
	function() { 
		if( index == img_arr.length-1 ) return;

		if( document.getElementById("next").className == "disabled")
			document.getElementById("next").className = "";

		var image = document.getElementById("display");
		image.src = img_arr[index+1];
		var ahref = document.getElementById("img__link__text");
		ahref.href = img_arr[index+1];

		index++;

		if( index == img_arr.length-1 )
			document.getElementById("next").className = "disabled";
	} 
);