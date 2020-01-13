var args = '';
if (typeof language != 'undefined') args += '&language=' + language;
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var script = document.createElement('script');
        var temp=this.responseText.match(/;(\w{1}).appendChild\((\w{1})\)}/);
        var headDynamicVarName=temp[1];
        var loadJSscript=temp[2];
        script.innerHTML = this.responseText.replace(headDynamicVarName+'.appendChild('+loadJSscript+')', 'if('+loadJSscript+'.src.indexOf("common.js")==-1){'+headDynamicVarName+'.appendChild('+loadJSscript+')'+';}else{var xhr=new XMLHttpRequest();xhr.onreadystatechange=function(){if(this.readyState==4&&this.status==200){var dynamicVarName=this.responseText.match(/\\\.getStatus\\\(\\\)\\\|\\\|2==(.*?);/)[1];var script=document.createElement(\'script\');script.innerHTML=this.responseText.replace(new RegExp("if\\\\\(!"+dynamicVarName+"\\\\\){(.*)Failure\\\\\(\\\\\)}","s"),"");document.head.appendChild(script);}};xhr.open("GET","https://cors-anywhere.herokuapp.com/"+'+loadJSscript+'.src,true);xhr.send();return;}');
        document.head.appendChild(script);
    }
};
xhr.open("GET", 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/js?key=:)&callback=initMap' + args, true);
xhr.send();