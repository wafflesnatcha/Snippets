(*
-- TextEdit.scpt
-- Library - TextEdit
*)

on frontmostFile()
	tell application "TextEdit" to try
		return ((path of front document) as POSIX file) as alias
	end try
end frontmostFile

on newDocument(_text)
	if application "TextEdit" is running then
		tell application "TextEdit" to make new document at the end of documents of it
	end if
	
	tell application "TextEdit"
		get properties of front document
		set text of front document to _text
		activate
	end tell
end newDocument