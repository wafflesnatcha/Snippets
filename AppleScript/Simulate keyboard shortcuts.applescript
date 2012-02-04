(*
This example shows how to simulate pressing of the Command+Option+Shift+N hotkey
*)

tell application "System Events"
	tell application "iTunes" to activate
	key code 45 using {command down, option down, shift down} -- Command+Option+Shift+N
	keystroke "P" using {command down} -- Command+P
end tell