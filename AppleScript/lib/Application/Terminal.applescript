(*
-- Terminal.scpt
-- Library - Terminal
*)

-- Change directories
--
-- @param  alias|string  _path  The path you want to change to
-- @param  string|window  _window  The terminal window to run the command in
-- @return void

on cd(_path, _window)
	if _path is "" or _path is false or _path is null then return false
	if class of _path is alias then set _path to POSIX path of _path
	
	set _cmd to "cd " & quoted form of _path
	
	tell application "Terminal"
		if (class of _window) is window then
			do script _cmd in _window
		else if (class of _window) is integer or (class of _window) is text then
			do script _cmd in window (_window as integer)
		else
			do script _cmd
		end if
	end tell
end cd

-- Activate Terminal (supports Visor)
-- "Show on Reopen" must be checked in the Visor Preferences
-- 
-- @return void

on _activate()
	tell application "Terminal"
		activate
		reopen
	end tell
end _activate

-- Create a new tab
--
-- @return void

on newTab()
	if application "Terminal" is running then
		my _activate()
		tell application "System Events" to tell process "Terminal" to click menu item "New Tab" of menu "Shell" of menu bar 1
	else
		my _activate()
	end if
end newTab

-- Create a new tab and cd to a directory
--
-- @param alias|string _path The path to change to
-- @return void

on newTabAt(_path)
	my newTab()
	my cd(_path, 1)
end newTabAt

-- Open a new window and cd to a directory
--
-- @param string|alias _path The path to change to
-- @return void

on newWindowAt(_path)
	if application "Terminal" is not running then
		tell application "Terminal" to activate
		my cd(_path, 1)
	else if _path is not "" then
		my cd(_path, false)
	end if
end newWindowAt

-- Open a new Visor tab
--
-- @deprecated
-- @return void

on newVisorTab()
	if application "Terminal" is not running then
		my _activate()
	else
		my _activate()
		my newTab()
	end if
end newVisorTab

-- Open a new Visor tab and cd to a directory
-- If terminal isn't running, it will open it and use the first tab
--
-- @deprecated
-- @param string|alias _path The path to change to
-- @return void

on newVisorTabAt(_path)
	my newTabAt(_path)
	my cd(_path, 1)
	my _activate()
end newVisorTabAt