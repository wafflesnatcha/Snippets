(*
-- TextMate.scpt
-- Library - TextMate
*)

on frontmostFile()
	try
		tell application "TextMate" to return ((path of front document) as POSIX file) as alias
	end try
	return false
end frontmostFile

on openFinderSelected()
	set _selection to (selection of application "Finder")
	set _files to {}
	
	repeat with _i in _selection
		copy (_i as string) to the end of _files
	end repeat
	
	if (count of _files) > 0 then
		tell application "TextMate" to open _files
	end if
end openFinderSelected