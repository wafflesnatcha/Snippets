/**
 * Chainable external javascript file loading
 * 
 * @link http://www.webtoolkit.info
 *
 * @example
 * scriptLoader.load([
 *     'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js',
 *     'http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js'
 *     'your-script.js'
 * ]);
 */

var scriptLoader = {
    _loadScript: function(url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        if (callback) {
            script.onreadystatechange = function() {
                if (this.readyState == 'loaded') callback();
            }
            script.onload = callback;
        }
        head.appendChild(script);
    },

    load: function(items, iteration) {
        if (!iteration) iteration = 0;
        if (items[iteration]) {
            scriptLoader._loadScript(
            items[iteration], function() {
                scriptLoader.load(items, iteration + 1);
            })
        }
    }
}
