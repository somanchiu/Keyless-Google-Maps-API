var formData = new FormData();
var args = '';
if (typeof language != 'undefined') args += '&language=' + language;
formData.append("url", 'https://maps.googleapis.com/maps/api/js?callback=initMap' + args);
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var script = document.createElement('script');
        script.innerHTML = this.responseText.replace(/d.src=b;/, 'if(b.indexOf("common.js")==-1){d.src=b;}else{var formData = new FormData();formData.append("url", b);var xhr = new XMLHttpRequest();xhr.onreadystatechange = function () {    if (this.readyState == 4 && this.status == 200) {var script=document.createElement(\'script\');script.innerHTML=this.responseText.replace(/if\\\(!b\\\){(.*)Failure\\\(\\\)}/,"");document.head.appendChild(script);}};xhr.open("POST", "https://api-cors.7e14.starter-us-west-2.openshiftapps.com/", true);xhr.send(formData);return;}');
        document.head.appendChild(script);
    }
};
xhr.open("POST", "https://api-cors.7e14.starter-us-west-2.openshiftapps.com/", true);
xhr.send(formData);