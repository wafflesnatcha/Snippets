(*
-- iPhoto.scpt
-- Library - iPhoto
*)

on frontmostFile()
	try
		tell application "iPhoto"
			get item 1 of (selection as list)
			try
				return ((original path of result) as POSIX file) as alias
			on error
				try
					return ((image path of result) as POSIX file) as alias
				end try
			end try
		end tell
	end try
	return false
end frontmostFile