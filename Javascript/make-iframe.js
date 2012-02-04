// Creates a new iframe and attaches it to the DOM, waits for it to load, tests
// that we did not hit https://bugzilla.mozilla.org/show_bug.cgi?id=295813 nor
// https://bugzilla.mozilla.org/show_bug.cgi?id=388714 (and retries otherwise),
// to finally call the provided done callback, passing the iframe, its window
// and document. (The optional name parameter, if provided, will be used to name
// the iframe in window.frames, or be created as "pane-1" onwards, otherwise.)
function makeFrame(cb/*(iframeTag, window, document)*/, name, debug) {
  function testInvasion() {
    iframe.removeEventListener("load", done, true);
    var message = ((new Date)-load.start)+ "ms passed, ";
    try { // probe for security violation error, in case mozilla struck a bug
      var url = unsafeWindow.frames[framename].location.href;
      message += url == "about:blank" ?
        "but we got the right document." :
        "and we incorrectly loaded "+ url;
      if (debug)
        console.log(message);
      done();
    }
    catch(e) {
      if (console && console.error && console.trace) {
        console.error( e );
        console.trace();
      }
      if (debug)
        console.log(message + "and our iframe was invaded. Trying again!");
      document.body.removeChild(iframe);
      makeFrame(cb, name);
    }
  }

  function done() {
    clearTimeout(load.timeout);
    if (debug)
      console.log("IFrame %x load event after %d ms",
                  framename, (new Date)-load.start);
    var win = unsafeWindow.frames[framename];
    var doc = iframe.contentWindow.document;
    cb( iframe, win, doc );
  }

  var iframe = document.createElement("iframe");
  var framename = iframe.name = typeof name != "undefined" ? name :
    ("pane" + (makeFrame.id = (makeFrame.id || 0) - 1));
  iframe.setAttribute("style", "overflowY:hidden; overflowX:hidden; " +
                      "z-index:9999; border:0; margin:0; padding:0; " +
                      "top:auto; right:auto; bottom:auto; left:auto;");
  iframe.src = "about:blank";
  iframe.addEventListener("load", done, true);

  var frames = makeFrame.data || {};
  var load = frames[framename] || { start:new Date, sleepFor:400 };
  load.timeout = setTimeout(testInvasion, load.sleepFor);
  load.sleepFor *= 1.5;
  frames[framename] = load;
  makeFrame.data = frames;
  document.body.appendChild(iframe);
}
