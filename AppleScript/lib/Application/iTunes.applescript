(*
-- iTunes.scpt
-- Library - iTunes
*)

on frontmostFile()
	set s to my selectedFiles()
	if (count of s) is greater than 0 then
		set f to item 1 of s
		tell application "iTunes"
			if (class of f) is file track then return location of f
		end tell
	end if
	return false
end frontmostFile

on selectedFiles()
	tell application "iTunes" to return selection
end selectedFiles