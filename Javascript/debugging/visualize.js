/**
 * visualize is a JavaScript function that returns a descriptive string for any JavaScript object or literal. It should work for all objects.
 * 
 * Example usage:
 * 
 * var x = [1,2,{a:"a", b:new Function()}]
 * visualize(x);
 * 
 * Return value:
 * 
 * Array [
 * ·   0: 1
 * ·   1: 2
 * ·   2: Object Object {
 * ·   ·   "a": "a"
 * ·   ·   "b": function anonymous() { ... }
 * ·   }
 * ]
 * 
 * Requirements
 * 	JavaScriptStringEncode()
 */

function visualize(xValue, sPadding, iDepth) {
	if (typeof(sPadding) !== "string") sPadding = "";
	if (typeof(iDepth) !== "number") iDepth = 2;
	switch (typeof(xValue)) {
		case "undefined": return "undefined";
		case "boolean":   return xValue.toString();
		case "string":    return "\"" + JavaScriptStringEncode(xValue) + "\"";
		case "number":
			// Inifinity, NaN, floats, small integers and negative numbers
			// are displayed as is:
			if (
				!isFinite(xValue) || isNaN(xValue) ||
				xValue != parseInt(xValue) || xValue < 10
			) {
				return xValue.toString();
			}
			// Otherwise we'll display as a decimal and hexadecimal number:
			return xValue.toString() + "  (0x" + xValue.toString(16).toUpperCase() + ")";
		case "function":
			var sFunction = xValue.toString();
			if (iDepth == 2) return sFunction.replace(/\r?\n/g, "$&" + sPadding);
			else return sFunction.replace(/\{[\s\S]*$/, "{ \u2026 }");
		case "object":
			if (xValue == null) return "null";
			var sConstructor = null;
			try { sConstructor = xValue.constructor.toString(); }
			catch (e) { return "object unknown"; }
			var sHeader = "Unknown{", sFooter = "}";
			var oName = sConstructor.match(/^\r?\n?function\s+(\w+)\s*\([\s\S]*$/);
			if (oName) switch (oName[1]) {
				case "Boolean": return "Boolean(" + visualize(xValue.valueOf(), sPadding, iDepth) + ")";
				case "Date":    return "Date(" + visualize(xValue.toString(), sPadding, iDepth) + ")";
				case "Number":  return "Number(" + visualize(xValue.valueOf(), sPadding, iDepth) + ")";
				case "String":  return "String(" + visualize(xValue.valueOf(), sPadding, iDepth) + ")";
				case "RegExp":
					var sFlags = "";
					if (xValue.global) sFlags += "g";
					if (xValue.ignoreCase) sFlags += "i";
					if (xValue.multiline) sFlags += "m";
					return "RegExp(/" + xValue.source + "/" + sFlags + ")";
				case "Array":
					sHeader = "Array [", sFooter = "]";
					break;
				default:
					sHeader = "Object " + oName[1] + " {";
			} else try {
				oName = xValue.toString().match(/^\[(?:object )?(.*)\]$/);
				if (oName) sHeader = "Object [" + oName[1] + "] {";
			} catch (e) { }
			if (iDepth == 0) return sHeader + " \u2026 " + sFooter;
			var asValues = [];
			try {
				for (var i in xValue) {
					// Integers are displayed as numbers, anything else as a string
					var sIndex = parseInt(i).toString() == i ?
						i:
						visualize(i);
					// A child object that is the same as its parent is displayed as "=> self",
					// Anything else is "visualized":
					var sValue = xValue[i] === xValue ?
						"\u21D2 self":
						visualize(xValue[i], sPadding + "\xB7   ", iDepth - 1);
					asValues.push(sPadding + "\xB7   " + sIndex + ": " + sValue);
				}
			} catch (e) {
				return "object unknown";
			}
			return sHeader + "\r\n" +
				asValues.join("\r\n") + "\r\n" +
				sPadding + sFooter;
		default:
			try { return typeof(xValue) + " " + new String(xValue); }
			catch(e) { return "unknown"; }
	}
}