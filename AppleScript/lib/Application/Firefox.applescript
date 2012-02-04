(*
-- Firefox.scpt
-- Library - Firefox
*)

on getURL()
	if application "Firefox" is not running then return
	set _prev_clip to the clipboard
	activate application "Firefox"
	try
		tell application "System Events"
			tell application process "Firefox"
				click menu item "Open Location…" of menu "File" of menu bar item "File" of menu bar 1
				click menu item "Copy" of menu "Edit" of menu bar item "Edit" of menu bar 1
			end tell
		end tell
		tell application "Firefox" to copy (the clipboard as Unicode text) to _url
	on error
		set _url to false
	end try
	set the clipboard to _prev_clip
	return _url
end getURL

on refresh()
	if application "Firefox" is not running then return
	activate application "Firefox"
	tell application "System Events" to click menu item "Reload" of menu "View" of menu bar item "View" of menu bar 1 of application process "Firefox"
end refresh

on sendTo(_browser)
	if class of _browser is application then set _browser to name of _browser
	
	set _url to my getURL()
	if class of _url is not string then return
	
	if _browser = "Opera" then
		do shell script "open -a " & quoted form of _browser & " " & quoted form of _url
	else
		tell application _browser
			activate
			open location _url
		end tell
	end if
end sendTo