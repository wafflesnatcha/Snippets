(*
This snippet allows to simulate user actions using AppleScript
*)

tell application "Terminal" to activate
tell application "System Events"
	tell process "Terminal"
		click menu item "New Window" of menu "Shell" of menu bar 1
	end tell
end tell