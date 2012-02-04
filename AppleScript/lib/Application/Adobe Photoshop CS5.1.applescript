(*
-- Adobe Photoshop CS5.1.scpt
-- Library - Adobe Photoshop CS5.1
*)

on frontmostFile()
	try
		tell application "Adobe Photoshop CS5.1" to return file path of current document as alias
	end try
end frontmostFile