

/**
 * function helpers
 */

(function() {
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(fn, bind) {
			for(var i = 0; i < this.length ; i++) fn.call(bind, this[i], i);
		};
	}
	Array.prototype.each = Array.prototype.forEach;
	Array.prototype.compact = function() {
		return this.select(function(value) {
			return value != null;
		});
	};
	$A = function(iterable) {
		if (!iterable) return [];
		if ('toArray' in Object(iterable)) return iterable.toArray();
		var length = iterable.length || 0, results = new Array(length);
		while (length--) results[length] = iterable[length];
		return results;
	}
	if(!Function.prototype.bind) {
		Function.prototype.bind = function(object) {
			var __method = this;
			return function() {
				return __method.apply(object, arguments);
			}
		};
	}
	if(!Function.prototype.bindAsEventListener) {
		Function.prototype.bindAsEventListener = function() {
			var __method = this, args = $A(arguments), object = args.shift();
			return function(event) {
				return __method.apply(object, [event || window.event].concat(args));
			}
		};
	}
	if(!Function.prototype.wrap) {
		Function.prototype.wrap = function(wrapper) {
			var __method = this;
			return function() {
				return wrapper.apply(this, [__method.bind(this)].concat($A(arguments)));
			}
		};
	}
	Object.extend = function(destination, source) {
		for (var property in source)
			destination[property] = source[property];
		return destination;
	};
})();

/**
 * @scope iim
 */

var iim = {};

/**
 * Base class for any iMacro command statement
 */

/**
 * @constructor
 */

iim.Statement = function(sObj) {
	if(typeof sObj == "string")
		sObj = { "raw": [sObj] };

	for (var property in this.defaults)
		this[property] = sObj[property] || this.defaults[property];

	if(this.timeout)
		this.timeout = parseInt(this.timeout);
	
	if(typeof this.raw == "string")
		this.raw = [this.raw];		
	
	return this;
};

iim.Statement.prototype.defaults = {
	raw: '',
	timeout: null,
	errorStr: null,
	isError: false
};


/**
 * Called during each iim.Statement.Play() to check for iMacro errors
 * @private
 * @param Number rc (optional) A iimPlay return code
 * @returns True if an error occurred, false otherwise
 * @type Boolean
 */

iim.Statement.prototype.ErrorHandler = function(rc) {
	this.returnCode = rc || this.returnCode;
	this.errorStr = null;
	this.isError = false;
	
	if (this.returnCode < 0) {
		this.errorStr = iimGetLastError();
		this.isError = true;
		
		//iim.Display("ERROR: [" + this.returnCode + "] " + this.errorStr);
			
		switch(this.returnCode) {
			
			// Not supported in Firefox
			// Code -101 is supposed to refer to the STOP button being pressed in the iMacros sidebar
			case -101:
				iim.Quit();
				break;
		}
	}

	return this.isError;
}

/**
 * @method iim.Statement.Play
 */
iim.Statement.prototype.Play = function(timeout) {
	timeout = timeout || this.timeout;

	var r = $A(this.raw);
	if(!isNaN(timeout) && parseInt(timeout)>0)
		r.splice(0,0,"SET !TIMEOUT " + parseInt(timeout));
		
	this.returnCode = iimPlay("CODE:" + r.join("\n"), timeout);
	this.ErrorHandler();
	return this.returnCode;
};

/**
 * @method iim.Statement.Extract
 */
iim.Statement.prototype.Extract = function() {
	this.Play();

	var e = iimGetLastExtract();
	if (e == "#EANF#")
		e = false;

	this.lastExtract = e;
	return this.lastExtract;
};


/**
 * Delay the script for a set amount of time
 * @param {Number} seconds Length of time to wait
 * @returns The iim.Statement that was created to execute the WAIT command
 * @type Object iim.Statement
 */
iim.Wait = function(seconds) {
	if(isNaN(seconds) || seconds < 1)
		return false;

	return iim.Play("WAIT SECONDS="+seconds);
};

/**
 * Shortcut to create a new iim.Statement and Play it
 * @returns The iim.Statement that was created and played
 * @type Object iim.Statement
 */
iim.Play = function(raw, timeout) {
	var s = new iim.Statement({
		"raw": raw,
		"timeout": timeout
	});
	s.Play();
	return s;
};

/**
 * Shouldn't ever be called
 * @see iim.ErrorHandler
 */
iim.Quit = function() {
	iim.Display("QUITTING");
	iim.FATAL_ERROR = true;
};

/**
 * @function iim.Display
 */
iim.Display = function(str) {
	if(typeof str == "string")
		str = [str];
	return iimDisplay($A(str).join("\n"));
};

/**
 * @scope iim.Page
 */
iim.Page = function() {
	var rootURL;
	return {
		SetRootURL: function(url) {
			rootURL = url;
		},

		Navigate: function(url) {
			iim.Play("URL GOTO="+rootURL+"/"+url);
		},

		Refresh: function() {
			iim.Play("REFRESH");
		},

		CurrentURL: function() {
			var s = new iim.Statement("SET !EXTRACT {{!URLCURRENT}}");
			return s.Extract();
		}
	};
}();





/**
 * @scope App
 */

var App = function() {
	var captchaContents;
	return {
		URL: "http://www.ninjamanager.com",
		
		/**
		 * start the app
		 * @returns void
		 */
		init: function() {
			iim.Page.SetRootURL(this.URL);
			App.Ladder.Start();
		},

		/**
		 * check for Captcha
		 */
		Captcha: function() {
			var s = new iim.Statement({
				timeout: 1,
				raw: [
					"TAG POS=1 TYPE=DIV ATTR=ID:numbers",
					"TAG POS=1 TYPE=IMG ATTR=WIDTH:132&&HEIGHT:46 EXTRACT=HREF"
				]
			});
			var captchaContents = s.Extract();

			if(captchaContents)	{
			    alert("CAPTCHA REQUIRED");
				return true;
			}
			
			return false;
		}
	};
}();

App.Challenges = function() {
	return {
		Refresh: function() {
			return iim.Play([
				"TAG POS=1 TYPE=DIV ATTR=ID:ma_refresh",
				"TAG POS=R1 TYPE=A" //ATTR=HREF:javascript:refreshMatches();
			]); 
		},
		
		AcceptAll: function() {
			return iim.Play([
				"TAG POS=1 TYPE=DIV ATTR=ID:ma_acca",
				"TAG POS=R1 TYPE=A" //ATTR=HREF:javascript:chresp(1,0);
			]);  
		}
	};
}();


App.Ladder = function() {
	return {
		lastStatement: null,
		loopCount: 0,

		Start: function() {
			iim.Page.Navigate("ladder");

			if(App.Captcha())
				return false;

			var count=0;
			while(this.Loop() && !iim.FATAL_ERROR) {
				count++;
				/*
				if(count%10==0) {
					App.Challenges.AcceptAll();
					iim.Display("Accepting new challenges")
				}
				*/
			}
			
			if(this.Continue(count))
				return this.Start();
			
			return;
		},
		
		Continue: function(count) {
			this.loopCount+=count;
			iim.Display([
				"Total Count: " + this.loopCount,
				"Since Previous Error: " + count,
				"Exit Status: " + (this.lastStatement? this.lastStatement.errorStr : "NO STATEMENT")
				]);
		
			if(iim.FATAL_ERROR)
				return false;
			
			return true;
		},
		
		Countdown: function() {
			var s = new iim.Statement("TAG POS=1 TYPE=DIV ATTR=ID:countdown EXTRACT=TXT");
			var seconds = s.Extract();
			if(!seconds || isNaN(seconds))
				seconds = 1;

			iim.Wait(parseInt(seconds));
		},

		ErrCheck: function() {
			var s = new iim.Statement("TAG POS=1 TYPE=DIV ATTR=CLASS:errlink EXTRACT=TXT");
			if(s.Extract())
				return true;
			return false;
		},

		CheckURL: function() {
			if(iim.Page.CurrentURL()!=this.URL + "/ladder")
				return false;
			return true;
		},

		Loop: function() {
			if(!this.CheckURL) return false;

			this.Countdown();

			this.lastStatement = iim.Play("TAG POS=1 TYPE=A ATTR=ID:startladder");
			if(this.lastStatement.isError) return false;

			if(this.ErrCheck())
				return false;

			this.lastStatement = iim.Play("TAG POS=1 TYPE=A ATTR=ID:exp", 120);
			if(this.lastStatement.isError) return false;

			this.lastStatement = iim.Play("TAG POS=1 TYPE=A ATTR=ID:ladderclose");
			if(this.lastStatement.isError) return false;

			return true;
		}
	};
}();


App.init();
