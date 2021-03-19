var count_comment = 1;

const comment_input = document.getElementById("comment-input");
const comment_button = document.getElementById("comment-button");
const cancel_button = document.getElementById("cancel-button");

comment_input.addEventListener("input", updateValue);
function updateValue(input) {
	var str = input.target.value;
	str = str.trim();
	comment_button.disabled = false;

	if( str === "" ){
		comment_button.style.backgroundColor = "#cccccc";
		comment_button.disabled = true;
	}
	else{
		comment_button.style.backgroundColor = "#065fd4";
	}
}

comment_button.addEventListener("click", clickCommentButton);
function clickCommentButton() {
	var node = document.createElement("div");  
	document.getElementById("comment-group").appendChild(node);
	
	var node_img = document.createElement("img")
	var node_tag = document.createElement("div");
	var node_name_time = document.createElement("div");
	var node_name = document.createElement("span");
	var node_time = document.createElement("span");
	var node_text = document.createElement("p");

	node.setAttribute("class", "comment");
	node_img.setAttribute("class", "comment-img");
	node_img.setAttribute("src", "images/user-icon.jpg");
	node_tag.setAttribute("class", "comment-right");
	node_text.setAttribute("class", "comment-text");
	node_text.textContent = comment_input.value;
	node_name.setAttribute("class", "comment-name");
	node_name.textContent = "Toby Chen";
	node_time.setAttribute("class", "comment-time");
	node_time.textContent = "現在";

	node_name_time.appendChild(node_name);
	node_name_time.appendChild(node_time);
	node_tag.appendChild(node_name_time);
	node_tag.appendChild(node_text);
	node.appendChild(node_img);
	node.appendChild(node_tag);

    count_comment ++;
    document.getElementById("comment-num").textContent = String(count_comment)+"則留言";

	comment_input.value = "";
	comment_button.style.backgroundColor = "#cccccc";
}

comment_input.addEventListener("focus", focusCommentInput);
function focusCommentInput() {
	comment_button.style.display = "inline";
	cancel_button.style.display = "inline";
}

cancel_button.addEventListener("click", clickCancelButton);
function clickCancelButton() {
	comment_input.value = "";
	comment_button.style.display = "none";
    comment_button.style.backgroundColor = "#cccccc";
	cancel_button.style.display = "none";
}

