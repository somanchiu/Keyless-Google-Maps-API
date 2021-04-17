var proxyURL = 'https://api.allorigins.win/raw?url=';

var args = '';
if (typeof language != 'undefined') args += '&language=' + language;

var bypass = function (googleAPIcomponent, proxyURL) {
    if (googleAPIcomponent.src.indexOf("common.js") == -1) {
        document.head.appendChild(googleAPIcomponent);
    } else {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var script = document.createElement('script');
                script.innerHTML = this.responseText.replace(new RegExp(/;if\(!\w{1}\){.*Failure\(\)}/s), ";");
                document.head.appendChild(script);
            }
        };
        xhr.open("GET", proxyURL + googleAPIcomponent.src, true);
        xhr.send();
    }
}

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var script = document.createElement('script');
        var appendChildToHeadJS = this.responseText.match(/;\w{1}.appendChild\((\w{1})\)/);
        var googleAPIcomponent = appendChildToHeadJS[1];
        script.innerHTML = this.responseText.replace(appendChildToHeadJS[0], ';(' + bypass.toString() + ')(' + googleAPIcomponent + ', "' + proxyURL + '")');
        document.head.appendChild(script);
    }
};
xhr.open("GET", proxyURL + encodeURIComponent('https://maps.googleapis.com/maps/api/js?key=:)&callback=initMap' + args), true);
xhr.send();