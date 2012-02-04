/**
 * JavaScriptStringEncode is a JavaScript function that returns a string that 
 * can be executed as JavaScript to re-create a JavaScript object or literal.
 * It also makes the string easier to read, as control characters, high-ASCII
 * and Unicode characters are encoded so you can see their character codes.
 * 
 * Example usage:
 * 
 * JavaScriptStringEncode("test\r\nnewline\r\nUnicode: \"\uFFFF\""));
 * 
 * Return value:
 * 
 * test\r\nnewline\r\nUnicode: \"\uFFFF\" 
 */

function JavaScriptStringEncode(sString) {
	return (sString+"").replace(/[\0-\x1F\"\\\x7F-\xA0\u0100-\uFFFF]/g, function (sChar) {
		switch (sChar) {
			case "\b": return "\\b";
			case "\t": return "\\t";
			case "\n": return "\\n";
			case "\f": return "\\f";
			case "\r": return "\\r";
			case "\\": return "\\\\";
			case "\"": return "\\\"";
		}
		var iChar = sChar.charCodeAt(0);
		if (iChar < 0x10) return "\\x0" + iChar.toString(16);
		if (iChar < 0x100) return "\\x" + iChar.toString(16);
		if (iChar < 0x1000) return "\\u0" + iChar.toString(16);
		return "\\u" + iChar.toString(16);
	});
}