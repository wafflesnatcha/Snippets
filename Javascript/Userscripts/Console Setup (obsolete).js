const DEBUG = 1;
if (!console) console = function() {
	var console = {},
		c = unsafeWindow.console,
		cfn = ['log','debug','info','warn','error','assert','dir','dirxml','trace','group','groupCollapsed','groupEnd','time','timeEnd','profile','profileEnd','count','exception','table'];	
	for(var i=0,l=cfn.length; i<l; i++) {
		console[cfn[i]] = function() {
			if (DEBUG && c)
				c[cfn[i]].apply(null, arguments)
		}
	}
	return console;
}();