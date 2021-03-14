
const img_url = ["https://300hours.com/wp-content/uploads/2020/12/title_orig.jpeg", "https://quotesnhumor.com/wp-content/uploads/2019/04/1.jpg", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/friends14-1518625349.jpg","https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/friends10-1518455389.jpg","https://filmdaily.co/wp-content/uploads/2020/11/friendshipmemes-09.jpg"];

let img_idx = 2;

function display_image(idx){
    let imageDiv = document.getElementById("display");
    imageDiv.setAttribute("src", img_url[img_idx]);
    let url = document.getElementById("url");
    url.setAttribute("href", img_url[img_idx]);
    url.innerHTML = `Source: ${img_url[img_idx]}`;
}

let pre = document.getElementById("previous");
let next = document.getElementById("next");

window.addEventListener("load", function(event) {
    display_image(img_idx);
});

pre.addEventListener("click", function(){
    if(img_idx != 0) img_idx--;
    if(img_idx === 0){
        pre.classList.add("disabled");
    } else {
        next.classList.remove("disabled");
    }
    display_image(img_idx);
});

next.addEventListener("click", function(){
    if(img_idx != img_url.length - 1) img_idx++;
    if(img_idx === img_url.length - 1){
        next.classList.add("disabled");
    } else {
        pre.classList.remove("disabled");
    }
    display_image(img_idx);
});
