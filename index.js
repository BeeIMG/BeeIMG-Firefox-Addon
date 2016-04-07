var self = require("sdk/self");
var contextMenu = require("sdk/context-menu");
var notifications = require("sdk/notifications");
var clipboard = require("sdk/clipboard");
var tabs = require("sdk/tabs");

var menuItem = contextMenu.Item({
  label: "Upload to BeeIMG",
  context: contextMenu.SelectorContext("img"),
  contentScriptFile : self.data.url("uploadimage.js"),
  image: self.data.url("bee16.png"),
  accessKey: "u",
  onMessage: function (json) {
   var data = JSON.parse(json);
   if(data.icon=='default') var tu = self.data.url("bee48.png"); else var tu = "https:"+data.icon;
   if(data.clip=='URL') clipboard.set(data.img_url, "text");
	notifications.notify({
	  title: "BeeIMG",
	  text: data.text,
	  iconURL: tu,
	  data: data.url,
	  onClick: function (data) {
		tabs.open("https:"+data);
	  }
	});
  },
});