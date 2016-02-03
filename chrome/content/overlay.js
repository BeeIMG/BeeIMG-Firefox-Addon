beeimg = {
    init: function () {
        window.removeEventListener("load", this.init, false);
        document.getElementById("contentAreaContextMenu").addEventListener("popupshowing", this.Context, false);
    },
    Context: function () {
        var menuitem1 = document.getElementById("beeimg-imagen");
    },
    uploadImage: function () {
        var url = "https://beeimg.com";
        var strImgURL = gContextMenu.imageURL;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url + "/api/upload/url/json/", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("url=" + strImgURL + "&addon=firefox&version=0.0.6"); notifyMe("Image upload requested. Please wait..");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var json = JSON.parse(xhr.responseText);
                if (json.files.code == 200) {
					notifyMe("Image successfully uploaded.");
                    gBrowser.selectedTab = gBrowser.addTab(json.files.view_url);
                } else notifyMe("Error "+json.files.status);
            }
        }
        xhr.send();
    },
};
window.addEventListener("load", beeimg.init, false);

function notifyMe(msg) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(msg);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(msg);
      }
    });
  }
  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}