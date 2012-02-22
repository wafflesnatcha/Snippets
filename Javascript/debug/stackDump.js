/**
 * stackDump is a JavaScript function that dumps information about the call stack, starting at the function that called it. It uses the arguments object to find the required information. Out outputs a string containing the stack.
 * 
 * Example usage:
 * 
 * function f(x) { return stackDump(true); }
 * function f2(a1,a2,a3) { return f(a1+a2+a3) }
 * f2(1,[2,3,f,{a:"a"}]);
 * 
 * Return value:
 * 
 * Call stack (2 calls):
 *  ├─ f (x)
 *  │   └─ x="12,3,function f(x) { return stackDump(true); },[object Object]undefined"
 *  └─ f2 (a1, a2, a3)
 *      ├─ a1=1
 *      ├─ a2=Array [
 *      │  ·   0: 2
 *      │  ·   1: 3
 *      │  ·   2: function f(x) { … }
 *      │  ·   3: Object Object {
 *      │  ·   ·   "a": "a"
 *      │  ·   }
 *      │  ]
 *      └─ a3=undefined
 * 
 * Requirements
 *     visualize()
 *     JavaScriptStringEncode() 
 */


function stackDump(iLevel, bArguments) {
	var asStack = [];
	var iCalls = 0;
	// Walk the stack:
	for (var oCaller = arguments.callee.caller; oCaller != null; oCaller = oCaller.caller) {
		// Skip the first X calls on the stack
		if (typeof(iLevel) == "number" && iLevel-- > 0) continue;
		iCalls++;
		var bLastCall = !(oCaller.caller);
		// Convert caller function to a string and cut the function
		// body. For simplicity, I'm not taking into account inline
		// comments in the function declaration, otherwise the regular
		// expressions would become quite complex.
		sCaller = (oCaller+"").replace(/function\s*|\s*{[\s\S]*/g, "");
		// sCaller is now something like "stackDump()", let's seperate
		// the function name from the argument list:
		var asCaller = sCaller.match(/(\w*\s*)\(([^\)]*)\)/);
		// If this failed, we'll use what we have so far and not try to be
		// smart about the arguments:
		var sCallHeadHeader = " " + (bLastCall ? "\u2514":"\u251C") + "\u2500 ";
		var sCallBodyHeader = " " + (bLastCall ? " " : "\u2502") + "  ";
		if (asCaller == null) {
			asStack.push(sCallHeadHeader + visualize(sCaller));
			if (bArguments) asStack.push(sCallBodyHeader + "    Argument info unavailable.");
		} else {
			// We've split the function name from the arguments:
			var sName = asCaller[1];
			// Now let's split the individual arguments, if any:
			var asArgumentNames = asCaller[2].match(/^\s*$/) ?
				[]: asCaller[2].split(",");
			// Add the function name + argument names to the call stack:
			asStack.push(sCallHeadHeader + sName + " (" + asArgumentNames.join(", ") + ")");
			// Next we'll walk the argument names and the argument values
			// to process them and see if there are any arguments in the
			// function definition that were not supplied in the call or
			// extra arguments supplied in the call that are not in the
			// definition:
			if (bArguments) {
				for (var i = 0; i < asArgumentNames.length || i < oCaller.arguments.length; i++) {
					var sArgumentName = "arguments[" + i + "]";
					if (i < asArgumentNames.length) {
						// This argument exists in the function definition, use
						// the name rather than the number:
						asArgumentNames[i] = asArgumentNames[i].replace(/^\s*|\s*$/g, "");
						sArgumentName = asArgumentNames[i];
					}
					// We'll display each named argument from the definition,
					// even if it is not defined in the call. We'll also
					// display any arguments defined in the call that are not
					// in the function definition:
					var bLastArgument = (i + 1 >= asArgumentNames.length && i + 1 >= oCaller.arguments.length);
					var sArgumentHeadHeader = " " + (bLastArgument ? "\u2514":"\u251C") + "\u2500 ";
					var sArgumentBodyHeader = " " + (bLastArgument ? " " : "\u2502") + "  ";
					asStack.push(
						sCallBodyHeader +
						sArgumentHeadHeader +
						sArgumentName + "=" +
						visualize(oCaller.arguments[i], sCallBodyHeader + sArgumentBodyHeader)
					);
				}
			}
		}
	}
	if (iCalls == 0) return "Call stack info unavailable.";
	// Combine all information found and return it:
	return "Call stack (" + iCalls + " calls):\r\n" + asStack.join("\r\n");
}
