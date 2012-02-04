(*
-- Font Book.scpt
-- Library - Font Book
*)

on frontmostFile()
	try
		tell application "Font Book"
			set f to first item in (selection as list)
			return first item in (files of f as list) as alias
		end tell
	end try
end frontmostFile