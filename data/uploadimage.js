self.on("click", function () {
	var text = document.querySelector("img").src;
	//var text = window.getSelection().toString();
	self.postMessage(JSON.stringify({text:"Image upload requested. Please wait.", icon:"default"}));
	var url = "https://beeimg.com";
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url + "/api/upload/url/json/", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("url=" + text + "&addon=firefox&version=t0.0.1");
	xhr.onreadystatechange = function () {
	   if (xhr.readyState == 4) {
                var json = JSON.parse(xhr.responseText);
                if (json.files.code == 200) {
					self.postMessage(JSON.stringify({text:"Image successfully uploaded. Image link copied to clipboard. Click this notification to open the image view page.", clip:"URL", img_url:json.files.url, url:json.files.view_url, icon:json.files.thumbnail_url}));
                } else self.postMessage(JSON.stringify({text:"Error "+json.files.status+"", icon:"default"}));
            }
	}
	xhr.send();
});