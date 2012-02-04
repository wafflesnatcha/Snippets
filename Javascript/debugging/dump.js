// Class: Dump
// Author: Shuns (www.netgrow.com.au/files)
// Version: 1.1 (2006-10-10)
/* Modified by Steven Levithan (2007-02-21):
	- Changed the dump target from a new window to a specified HTML element. If no taget element is supplied, this function returns the generated markup.
	- Changed empty string handling to behave like cfdump (outputs "[empty string]").
	- Minor code tweaks and cleanup (incomplete).
*/

dump = function(object, showTypes, targetElement) {
	var st = typeof showTypes == 'undefined' ? true : showTypes;
	var dumpedObject = (/string|number|undefined|boolean/.test(typeof(object)) || object == null) ? object : recurse(object, typeof object);
	
	if(targetElement){
		document.getElementById(targetElement).innerHTML = dumpedObject;
	}else{
		return dumpedObject;
	}
	
	function recurse(o, type) {
		var i;
		var j = 0;
		var r = '';
		type = _dumpType(o);
		switch (type) {		
			case 'regexp':
				var t = type;
				r += '<table' + _dumpStyles(t,'table') + '><tr><th colspan="2"' + _dumpStyles(t,'th') + '>' + t + '</th></tr>';
				r += '<tr><td colspan="2"' + _dumpStyles(t,'td-value') + '><table' + _dumpStyles('arguments','table') + '><tr><td' + _dumpStyles('arguments','td-key') + '><em>RegExp: </em></td><td' + _dumpStyles(type,'td-value') + '>' + o + '</td></tr></table>';
				j++;
				break;
			case 'date':
				var t = type;
				r += '<table' + _dumpStyles(t,'table') + '><tr><th colspan="2"' + _dumpStyles(t,'th') + '>' + t + '</th></tr>';
				r += '<tr><td colspan="2"' + _dumpStyles(t,'td-value') + '><table' + _dumpStyles('arguments','table') + '><tr><td' + _dumpStyles('arguments','td-key') + '><em>Date: </em></td><td' + _dumpStyles(type,'td-value') + '>' + o + '</td></tr></table>';
				j++;
				break;
			case 'function':
				var t = type;
				var a = o.toString().match(/^.*function.*?\((.*?)\)/im); 
				var args = (a == null || typeof a[1] == 'undefined' || a[1] == '') ? 'none' : a[1];
				r += '<table' + _dumpStyles(t,'table') + '><tr><th colspan="2"' + _dumpStyles(t,'th') + '>' + t + '</th></tr>';
				r += '<tr><td colspan="2"' + _dumpStyles(t,'td-value') + '><table' + _dumpStyles('arguments','table') + '><tr><td' + _dumpStyles('arguments','td-key') + '><em>Arguments: </em></td><td' + _dumpStyles(type,'td-value') + '>' + args + '</td></tr><tr><td' + _dumpStyles('arguments','td-key') + '><em>Function: </em></td><td' + _dumpStyles(type,'td-value') + '>' + o + '</td></tr></table>';
				j++;
				break;
			case 'domelement':
				var t = type;
				r += '<table' + _dumpStyles(t,'table') + '><tr><th colspan="2"' + _dumpStyles(t,'th') + '>' + t + '</th></tr>';
				r += '<tr><td' + _dumpStyles(t,'td-key') + '><em>Node Name: </em></td><td' + _dumpStyles(type,'td-value') + '>' + o.nodeName.toLowerCase() + '</td></tr>';
				r += '<tr><td' + _dumpStyles(t,'td-key') + '><em>Node Type: </em></td><td' + _dumpStyles(type,'td-value') + '>' + o.nodeType + '</td></tr>'; 
				r += '<tr><td' + _dumpStyles(t,'td-key') + '><em>Node Value: </em></td><td' + _dumpStyles(type,'td-value') + '>' + o.nodeValue + '</td></tr>'; 					
				r += '<tr><td' + _dumpStyles(t,'td-key') + '><em>innerHTML: </em></td><td' + _dumpStyles(type,'td-value') + '>' + o.innerHTML + '</td></tr>';
				j++;
				break;
		}
		if (/object|array/.test(type)) {
			for (i in o) {
				var t = _dumpType(o[i]);
				if (j < 1) {
					r += '<table' + _dumpStyles(type,'table') + '><tr><th colspan="2"' + _dumpStyles(type,'th') + '>' + type + '</th></tr>';
					j++;
				}
				if (typeof o[i] == 'object' && o[i] != null) {
					r += '<tr><td' + _dumpStyles(type,'td-key') + '>' + i + (st ? ' [' + t + ']' : '') + '</td><td' + _dumpStyles(type,'td-value') + '>' + recurse(o[i], t) + '</td></tr>';
				} else if (typeof o[i] == 'function') {
					r += '<tr><td' + _dumpStyles(type ,'td-key') + '>' + i + (st ? ' [' + t + ']' : '') + '</td><td' + _dumpStyles(type,'td-value') + '>' + recurse(o[i], t) + '</td></tr>';
				} else {
					r += '<tr><td' + _dumpStyles(type,'td-key') + '>' + i + (st ? ' [' + t + ']' : '') + '</td><td' + _dumpStyles(type,'td-value') + '>' + (o[i] === '' ? '<em style="color:#666;">[empty string]</em>' : o[i]) + '</td></tr>';
				}
			}
		}
		if (j == 0) {
			r += '<table' + _dumpStyles(type,'table') + '><tr><th colspan="2"' + _dumpStyles(type,'th') + '>' + type + ' [empty]</th></tr>'; 	
		}
		r += '</table>';
		return r;
	};	
};

_dumpStyles = function(type, use) {
	var r = '';
	var table = 'font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;cell-spacing:2px;';
	var th = 'font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;text-align:left;color:white;padding:5px;vertical-align:top;cursor:pointer;';
	var td = 'font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;vertical-align:top;padding:3px;';
	var thScript = 'onclick="tTable(this);" title="click to collapse"';
	var tdScript = 'onclick="tRow(this);" title="click to collapse"';
	switch (type) {
		case 'string':
		case 'number':
		case 'boolean':
		case 'undefined':
		case 'object':
			switch (use) {
				case 'table':
					r = ' style="' + table + 'background:#00c;"';
					break;
				case 'th':
					r = ' style="' + th + 'background:#44c;"' + thScript;
					break;
				case 'td-key':
					r = ' style="' + td + 'background:#cdf;cursor:pointer;"' + tdScript;
					break;
				case 'td-value':
					r = ' style="' + td + 'background:#fff;"';
					break;
			}
			break;
		case 'array':
			switch (use) {
				case 'table':
					r = ' style="' + table + 'background:#060;"';
					break;
				case 'th':
					r = ' style="' + th + 'background:#090;"' + thScript;
					break;
				case 'td-key':
					r = ' style="' + td + 'background:#cfc;cursor:pointer;"' + tdScript;
					break;
				case 'td-value':
					r = ' style="' + td + 'background:#fff;"';
					break;
			}
			break;
		case 'function':
			switch (use) {
				case 'table':
					r = ' style="' + table + 'background:#a40;"';
					break;
				case 'th':
					r = ' style="' + th + 'background:#c60;"' + thScript;
					break;
				case 'td-key':
					r = ' style="' + td + 'background:#fff;cursor:pointer;"' + tdScript;
					break;
				case 'td-value':
					r = ' style="' + td + 'background:#fff;"';
					break;
			}
			break;
		case 'arguments':
			switch (use) {
				case 'table':
					r = ' style="' + table + 'background:#ddd;cell-spacing:3;"';
					break;
				case 'td-key':
					r = ' style="' + th + 'background:#eee;color:#000;cursor:pointer;"' + tdScript;
					break;
			}
			break;
		case 'regexp':
			switch (use) {
				case 'table':
					r = ' style="' + table + 'background:#c00;cell-spacing:3;"';
					break;
				case 'th':
					r = ' style="' + th + 'background:#f00;"' + thScript;
					break;
				case 'td-key':
					r = ' style="' + th + 'background:#FF5757;color:#000;cursor:pointer;"' + tdScript;
					break;
				case 'td-value':
					r = ' style="' + td + 'background:#fff;"';
					break;
			}
			break;
		case 'date':
			switch (use) {
				case 'table':
					r = ' style="' + table + 'background:#639;cell-spacing:3;"';
					break;
				case 'th':
					r = ' style="' + th + 'background:#96c;"' + thScript;
					break;
				case 'td-key':
					r = ' style="' + th + 'background:#B266FF;color:#000;cursor:pointer;"' + tdScript;
					break;
				case 'td-value':
					r = ' style="' + td + 'background:#fff;"';
					break;
			}
			break;
		case 'domelement':
			switch (use) {
				case 'table':
					r = ' style="' + table + 'background:#fc3;cell-spacing:3;"';
					break;
				case 'th':
					r = ' style="' + th + 'background:#FFD966;"' + thScript;
					break;
				case 'td-key':
					r = ' style="' + th + 'background:#FFF2CC;color:#000;cursor:pointer;"' + tdScript;
					break;
				case 'td-value':
					r = ' style="' + td + 'background:#fff;"';
					break;
			}
			break;
	}
	return r;
};

_dumpType = function (obj) {
	var t = typeof(obj);
	if (t == 'function') {
		var f = obj.toString();
		if ( ( /^\/.*\/[gi]{0,2}$/ ).test(f)) {
			return 'regexp';
		} else if ((/^\[object.*\]$/i ).test(f)) {
			t = 'object'
		}
	}
	if (t != 'object') {
		return t;
	}
	switch (obj) {
		case null:
			return 'null';
		case window:
			return 'window';
		case document:
			return document;
		case window.event:
			return 'event';
	}
	if (window.event && (event.type == obj.type)) {
		return 'event';
	}
	var c = obj.constructor;
	if (c != null) {
		switch(c) {
			case Array:
				t = 'array';
				break;
			case Date:
				return 'date';
			case RegExp:
				return 'regexp';
			case Object:
				t = 'object';	
				break;
			case ReferenceError:
				return 'error';
			default:
				var sc = c.toString();
				var m = sc.match(/\s*function (.*)\(/);
				if(m != null) {
					return 'object';
				}
		}
	}
	var nt = obj.nodeType;
	if (nt != null) {
		switch(nt) {
			case 1:
				if(obj.item == null) {
					return 'domelement';
				}
				break;
			case 3:
				return 'string';
		}
	}
	if (obj.toString != null) {
		var ex = obj.toString();
		var am = ex.match(/^\[object (.*)\]$/i);
		if(am != null) {
			var am = am[1];
			switch(am.toLowerCase()) {
				case 'event':
					return 'event';
				case 'nodelist':
				case 'htmlcollection':
				case 'elementarray':
					return 'array';
				case 'htmldocument':
					return 'htmldocument';
			}
		}
	}
	return t;
};


function tRow(s) {
	t = s.parentNode.lastChild;tTarget(t, tSource(s));
}
function tTable(s) {
	var switchToState = tSource(s);
	var table = s.parentNode.parentNode;
	for (var i = 1; i < table.childNodes.length; i++) {
		t = table.childNodes[i];
		if (t.style) {
			tTarget(t, switchToState);
		}
	}
}
function tSource(s) {
	if (s.style.fontStyle == "italic" || s.style.fontStyle == null) {
		s.style.fontStyle = "normal";
		s.title = "click to collapse";
		return "open";
	} else {
		s.style.fontStyle = "italic";
		s.title = "click to expand";
		return "closed";
	}
}
function tTarget (t, switchToState) {
	if (switchToState == "open") {
		t.style.display = "";
	} else {
		t.style.display = "none";
	}
}