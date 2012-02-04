// Favicon.js - Change favicon dynamically [http://ajaxify.com/run/favicon].
// Copyright (c) 2008 Michael Mahemoff. Icon updates only work in Firefox and Opera.
// Background and MIT License notice at end of file, see the homepage for more.

/* USAGE:

    favicon.change("/icon/active.ico", "new title"); // Cancels any animation/scrolling
    favicon.change("/icon/active.ico"); // leaves title alone. Cancels any animation.
    favicon.change(null, "new title"); // leaves icon alone. Cancels any scrolling.

    favicon.animate(["icon1.ico", "icon2.ico", ...]);
    favicon.animate(["icon1.ico", "icon2.ico", ...], {delay: 500} );
      // Tip: Use "" as the last element to make an empty icon between cycles.
      // Default delay is 2000ms
    // animate() cancels any previous animation

    favicon.scrollTitle("new title");
    favicon.scrollTitle("new title", { delay: 200, gap: "------"} )
      // delay is delay between each scroll unit
      // gap is string appended to title (default: "      ")
    // scrollTitle() cancels any previous scrolling

    favicon.unscroll();

    favicon.unanimate();
*/

var favicon = {

// -- "PUBLIC" ----------------------------------------------------------------

change: function(optionalIconURL, optionalDocTitle) {
  if (optionalIconURL) {
    clearTimeout(this.animateTimer);
    this.addLink(optionalIconURL, true);
  }
  if (optionalDocTitle) {
    clearTimeout(this.scrollTimer);
    document.title = optionalDocTitle;
  }
},

animate: function(iconSequence, options) {
  this.unanimate();
  options = options || {};
  options["delay"] = parseInt(options["delay"]) || 2000;
  this.preloadIcons(iconSequence);
  this.iconSequence = iconSequence;
  favicon.index = 0;
  favicon.change(iconSequence[0]);
  this.animateTimer = setInterval(function() {
    favicon.index = (favicon.index+1) % favicon.iconSequence.length;
    favicon.addLink(favicon.iconSequence[favicon.index], false);
  }, options["delay"]);
},

unanimate: function() {
  clearTimeout(this.animateTimer);
},

scrollTitle: function(title, options) {
  this.unscroll();
  options = options || {};
  options["delay"] = options["delay"] || 250;
  options["gap"]   = options["gap"]   || "     ";
  title = title+options["gap"];
  document.title = title;
  titleOffset = 0;
  this.scrollTimer = setInterval(function() { 
    var startPos = (titleOffset++) % title.length;
    var newTitle = title.substr(startPos);
    newTitle += title.substr(0,startPos);
    document.title = newTitle;
  }, options["delay"]); 
},  

unscroll: function() {
  clearTimeout(this.scrollTimer);
},
    
changeTitle: function(title) {
  document.title = title;
},

// -- "PRIVATE" ---------------------------------------------------------------

scrollTimer: null,
animateTimer: null,

preloadIcons: function(iconSequence) {
  var dummyImageForPreloading = document.createElement("img");
  for (var i=0; i<iconSequence.length; i++) {
    dummyImageForPreloading.src = iconSequence[i];
  }
},

addLink: function(iconURL) {
  var link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = iconURL;
  this.removeLinkIfExists();
  this.docHead.appendChild(link);
},

removeLinkIfExists: function() {
  var links = this.docHead.getElementsByTagName("link");
  for (var i=0; i<links.length; i++) {
    var link = links[i];
    if (link.type=="image/x-icon" && link.rel=="shortcut icon") {
      this.docHead.removeChild(link);
      return; // Assuming only one match at most.
    }
  }
},

docHead:document.getElementsByTagName("head")[0]
}

