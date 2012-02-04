(function page_scope_runner() {
  if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = page_scope_runner.caller.toString();

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = "const __PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.
    document.documentElement.appendChild(script);
    document.documentElement.removeChild(script);

    // Stop running, because we know Greasemonkey actually runs us in
    // an anonymous wrapper.
    return;
  }
})();