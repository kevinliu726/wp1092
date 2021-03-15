var num=0

var img = ["https://wallpapercave.com/wp/wp4472278.jpg",
"https://vinafix.com/media/4096-x-2160.2429/full?d=1497733071",
"https://www.1zoom.me/big2/722/253215-Sepik.jpg",
"https://wallpapercave.com/wp/wp4472311.jpg",
"https://s1.1zoom.me/big3/340/Skyscrapers_Fantastic_451869.jpg",
"https://s1.1zoom.me/big3/272/Star_Wars_Soldiers_458514.jpg"];
var max = img.length - 1;

var displayimg = document.getElementById("display");
var back = document.getElementById("back");
var next = document.getElementById("next");
var displaybg = document.getElementById("displaybg");

back.classList.add("disabled");
displaybg.classList.add("loadbg");

setTimeout('displayimg.src = img[0];',0);
document.getElementById("name").innerHTML = img[0];
document.getElementById("name").href = img[0];


function backimg(){
	num --;
	if(num == 0){
		back.className = "disabled";
	}
	if(num < 0){
		back.className = "disabled";
		num = 0;
		return 1;
	}

	if (num < max){
		next.className="image-viewer__button"
	}

	displayimg.style.opacity = 0;
	displaybg.classList.add("loadbg");
	
	setTimeout('displayimg.src = img[num];',0);
	document.getElementById("name").innerHTML = img[num];
	document.getElementById("name").href = img[num];
}


function nextimg(){
	num ++;
	if(num == max){
		next.className = "disabled";
	}

	if( num > max){
		next.className = "disabled";
		num = max;
		return 1;
	}

	if (num > 0){
		back.className="image-viewer__button"
	}


	displayimg.style.opacity = 0;
	displaybg.classList.add("loadbg");


	setTimeout('displayimg.src = img[num];',0);
	document.getElementById("name").innerHTML = img[num];
	document.getElementById("name").href = img[num];
}

function loadingImg(){
	displayimg.style.opacity = 1;
	displaybg.classList.remove("loadbg");
}