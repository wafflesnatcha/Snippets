(*
-- Finder.scpt
-- Finder library
*)

property lib : load script POSIX path of (path to scripts folder) & "lib/lib.scpt"

-- Folder of the frontmost Finder window
--
-- @return alias

on frontmostFile()
	tell application "Finder" to return (folder of the front Finder window) as alias
end frontmostFile

-- Returns the selected file of the frontmost window
-- If more than one file is selected, defaults  back to frontmostFile()
--
-- @return alias

on frontmostSelectedFile()
	tell application "Finder" to set _selection to selection
	if (count of _selection) is 1 then
		return item 1 of _selection as alias
	else
		return my frontmostFile()
	end if
end frontmostSelectedFile

-- Get selected items in Finder, but faster!
--
-- This is obsolete, instead use:
-- tell application "Finder" to set _selection to selection as alias list
--
-- @return list of alias

on getSelection()
	tell application "Finder"
		set d to AppleScript's text item delimiters
		set AppleScript's text item delimiters to {"\n"}
		set s to selection as text
		set l to {}
		repeat with f in every text item of s
			copy (f as alias) to the end of l
		end repeat
		set AppleScript's text item delimiters to d
		return l
	end tell
end getSelection

-- Emulates using the "Go" menu in Finder to open folders
--
-- @param alias|string _path
-- @return void

on go(_path)
	tell application "Finder"
		if (class of _path) is "alias" then set _path to path of (_path as string)
		
		if (count of Finder windows) < 1 then
			open _path
		else
			tell the front Finder window
				if toolbar visible then
					set target to _path
				else
					open _path
				end if
			end tell
		end if
	end tell
end go


script _window
	
	-- Finder > _Window
	-- Functions for Finder windows
	
	using terms from application "Finder"
		property default_properties : {current view:missing value, zoomed:missing value, sidebar width:missing value, statusbar visible:missing value, toolbar visible:missing value, width:missing value, height:missing value, list view options:missing value, column view options:missing value, icon view options:missing value}
	end using terms from
	
	on getFront()
		tell application "Finder" to return the front Finder window
	end getFront
	
	on setProperties(_win, _properties)
		tell application "Finder"
			set _p to _properties & default_properties
			
			tell application "Finder" to tell _win
				if statusbar visible of _p is not missing value then set statusbar visible to statusbar visible of _p
				if toolbar visible of _p is not missing value then set toolbar visible to toolbar visible of _p
				if sidebar width of _p is not missing value then set sidebar width to sidebar width of _p
				if current view of _p is not missing value then set current view to current view of _p
				-- if  of _p is not missing value then set  to  of _p
				
				if (list view options of _p) is not missing value then set properties of (list view options of _win) to list view options of _p
				if (column view options of _p) is not missing value then set properties of (column view options of _win) to column view options of _p
				if (icon view options of _p) is not missing value then set properties of (icon view options of _win) to icon view options of _p
				
				if zoomed of _p is not missing value then set zoomed to zoomed of _p
			end tell
		end tell
	end setProperties
	
end script