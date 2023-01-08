var proxyURL = 'https://api.allorigins.win/raw?url=';

var args = '';
if (typeof language != 'undefined') args += '&language=' + language;

var bypass = function (googleAPIcomponentJS, googleAPIcomponentURL, proxyURL) {
    if (googleAPIcomponentURL.toString().indexOf("common.js") == -1) {
        googleAPIcomponentJS.src = googleAPIcomponentURL;
    } else {
        var removeFailureAlert = function(googleAPIcomponentURL, proxyURL) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var script = document.createElement('script');
                    script.innerHTML = this.responseText.replace(new RegExp(/;if.*Failure.*\}/), ";");
                    document.head.appendChild(script);
                }
            };
            xhr.open("GET", proxyURL + googleAPIcomponentURL, true);
            xhr.send();
        }
        googleAPIcomponentJS.innerHTML = '(' + removeFailureAlert.toString() + ')("' + googleAPIcomponentURL.toString() + '","' + proxyURL + '")';
    }
}

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var script = document.createElement('script');
        var appendChildToHeadJS = this.responseText.match(/(\w+)\.src=(_.*?);/);
        var googleAPIcomponentJS = appendChildToHeadJS[1];
        var googleAPIcomponentURL = appendChildToHeadJS[2];
        script.innerHTML = this.responseText.replace(appendChildToHeadJS[0], '(' + bypass.toString() + ')(' + googleAPIcomponentJS + ', ' + googleAPIcomponentURL + ', "' + proxyURL + '");');
        document.head.appendChild(script);
    }
};
xhr.open("GET", proxyURL + encodeURIComponent('https://maps.googleapis.com/maps/api/js?key=:)&callback=initMap' + args), true);
xhr.send();