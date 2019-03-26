var args = '';
if (typeof language != 'undefined') args += '&language=' + language;
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var script = document.createElement('script');
        script.innerHTML = this.responseText.replace(/d.src=b;/, 'if(b.indexOf("common.js")==-1){d.src=b;}else{var xhr=new XMLHttpRequest();xhr.onreadystatechange=function(){if(this.readyState==4&&this.status==200){var dynamicVarName=this.responseText.match(/\\\.getStatus\\\(\\\)\\\|\\\|2==(.*?);/)[1];var script=document.createElement(\'script\');script.innerHTML=this.responseText.replace(new RegExp("if\\\\\(!"+dynamicVarName+"\\\\\){(.*)Failure\\\\\(\\\\\)}","s"),"");document.head.appendChild(script);}};xhr.open("GET","https://cors-anywhere.herokuapp.com/"+b,true);xhr.send();return;}');
        document.head.appendChild(script);
    }
};
xhr.open("GET", 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/js?key=AIzaSyDIJ9XX2ZvRKCJcFRrl-lRanEtFUow4piM&callback=initMap' + args, true);
xhr.send();