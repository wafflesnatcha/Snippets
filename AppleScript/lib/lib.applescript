(*
-- lib.scpt
-- Library Manager
--
-- @example
-- property lib : load script POSIX path of (path to scripts folder) & "lib/lib.scpt"
-- tell lib
-- 	get frontmostApplicationID()
-- end tell
--
-- @example
-- property lib : load script (POSIX path of (path to scripts folder) & "lib/lib.scpt")
-- property Firefox : include("Application/Firefox") of lib
-- tell Firefox to refresh()
*)

property _include_path : POSIX path of (path to scripts folder) & "lib/"

-- Load a script from _include_path
--
-- @param string _name Path and name of library. For example, "Application/Finder"
-- @return script
-- @example
-- property lib : load script (POSIX path of (path to scripts folder) & "lib/lib.scpt")
-- property Firefox : include("Firefox") of lib
-- tell Firefox to refresh()

on include(_name)
	return (load script _include_path & _name & ".scpt")
end include

-- Try to activate an application using the SmartActivate scripting extension 
-- if it's installed, otherwise activate the old fashioned way.
--
-- @param string _app Application name
-- @return void

on activateApp(_app)
	try
		activate process _app
	on error
		activate application _app
	end try
end activateApp

-- Display an error message
--
-- @param string _message Error message
-- @param integer _number Error code (set to anything other than an integer to omit)
-- @return void
-- @example
-- property lib : load script (POSIX path of (path to scripts folder) & "lib/lib.scpt")
-- try
--	-- commands that might fail
-- on error error_message number error_number
-- 	displayError(error_message, error_number) of lib
-- end try

on displayError(_message, _number)
	if (class of _number is integer) then set _message to _message & "\n[" & _number & "]"
	display alert "Error" message _message as warning buttons {"OK"} default button 1
end displayError

-- Is UI Scriping is enabled?
--
-- @return boolean

on UIScriptingEnabled()
	tell application "System Events" to return UI elements enabled
end UIScriptingEnabled

-- Advanced {do shell script} using a bash login shell
--
-- @param string _command The command you wish to run through a bash login shell.
-- @param boolean _background Run as a background process (asynchronously).
-- @return string the commands output

on bashScript(_command, _background)
	set _script to "bash -ls <<'EOF'"
	if _background = true then set _script to _script & " &>/dev/null &"
	return do shell script _script & "\n" & _command & "\nEOF"
end bashScript

-- Alias to bashScript(_command, false)
--
-- @see bashScript

on bash(_command)
	return my bashScript(command, false)
end bash



script _CocoaDialog
	
	-- lib > _CocoaDialog
	-- CocoaDialog wrapper
	
	-- Show a dialog using CocoaDialog
	--
	-- @return void
	
	on _display(config)
		set c to config & {type:"", title:"", |text|:"", width:false, height:false, string_output:false}
		
		set cmd to "CocoaDialog " & (type of c) & ¬
			" --button1 'Close'" & ¬
			" --title " & quoted form of (title of c as string) & ¬
			" --text " & quoted form of (|text| of c as string)
		
		if ((width of c) as integer) > 0 then set cmd to cmd & " --width " & (width of c)
		if ((height of c) as integer) > 0 then set cmd to cmd & " --height " & (height of c)
		
		if (string_output of c) then set cmd to cmd & " --string-output"
		
		
		return bashScript(cmd, true)
	end _display
	
	on bubble(config)
		return my _display(config & {type:"bubble"})
	end bubble
	
	on filesave(config)
		return my _display(config & {type:"filesave"})
	end filesave
	
	on fileselect(config)
		return my _display(config & {type:"fileselect"})
	end fileselect
	
	on inputbox(config)
		return my _display(config & {type:"inputbox"})
	end inputbox
	
	on msgbox(config)
		return my _display(config & {type:"msgbox"})
	end msgbox
	
	on ok_msgbox(config)
		return my _display(config & {type:"ok-msgbox"})
	end ok_msgbox
	
	on progressbar(config)
		return my _display(config & {type:"progressbar"})
	end progressbar
	
	on secure_inputbox(config)
		return my _display(config & {type:"secure-inputbox"})
	end secure_inputbox
	
	on secure_standard_inputboxdropdown(config)
		return my _display(config & {type:"secure-standard-inputboxdropdown"})
	end secure_standard_inputboxdropdown
	
	on standard_dropdown(config)
		return my _display(config & {type:"standard-dropdown"})
	end standard_dropdown
	
	on standard_inputbox(config)
		return my _display(config & {type:"standard-inputbox"})
	end standard_inputbox
	
	on textbox(config)
		return my _display(config & {type:"textbox"})
	end textbox
	
	on yesno_msgbox(config)
		return my _display(config & {type:"yesno-msgbox"})
	end yesno_msgbox
	
end script



script _File
	
	-- lib > _File
	-- File system functions
	
	-- Return the filename portion of a pathname
	--
	-- @return string
	
	on basename(_path)
		if class of _path is alias then set _path to (POSIX path of _path)
		return do shell script "basename " & (quoted form of _path)
	end basename
	
	-- Return the directory portion of a pathname
	--
	-- @return string
	
	on dirname(_path)
		if class of _path is alias then set _path to (POSIX path of _path)
		return do shell script "dirname " & (quoted form of _path)
	end dirname
	
	-- Same as basename() but also removes the extension
	--
	-- @return string
	
	on filename(_path)
		if class of _path is alias then set _path to (POSIX path of _path)
		return do shell script "f=`basename " & (quoted form of _path) & "` && echo ${f%.*}"
	end filename
	
	-- Filters a list of files to only contain files with one of the given extensions
	--
	-- @param alias[] _files The list of files to filter
	-- @param string|string[] _extensions A list of file extensions to match
	-- @return list
	
	on onlyExt(_files, _extensions)
		set _extensions to _extensions as list
		tell application "Finder"
			set _filtered to {}
			repeat with f in _files
				if name extension of f is in _extensions then copy contents of f to the end of _filtered
			end repeat
			return _filtered as list
		end tell
	end onlyExt
	
	-- Turns a list of files into a string of quoted shell arguments
	--
	-- @param alias[] _files The list of files to filter
	-- @return string
	
	on toShellArg(_files)
		tell application "Finder"
			set _paths to ""
			repeat with f in _files
				set _paths to _paths & " " & (quoted form of POSIX path of (f as string))
			end repeat
			if _paths is "" then return false
			return _paths
		end tell
	end toShellArg
	
	-- Same as filename() but uses the current script/application as the path
	-- @return string
	
	on scriptName()
		return my filename(path to me)
	end scriptName
	
	-- Makes sure file doesn't already exist in specified path
	-- If it does this will append a number to the end of the file
	--
	-- @param config record {path: alias|string, prefix: string (optional), suffix: string (optional)}
	-- @return string
	
	on uniqueFile(config)
		set config to config & {prefix:"untitled", suffix:""}
		set i to 2
		tell application "Finder"
			set _parent to POSIX path of ((path of config) as string)
			set _name to (prefix of config) & (suffix of config)
			repeat while exists (_parent & _name as POSIX file)
				set _name to (prefix of config) & " " & i & (suffix of config)
				set i to i + 1
			end repeat
			return _name
		end tell
	end uniqueFile
	
end script



script _Growl
	
	-- lib > _Growl
	-- Growl functions
	
	-- Registers the current script for Growl Notifications
	--
	-- @return void
	
	on register(application_name, notifications)
		if growl_registered is not missing value then return
		tell application "GrowlHelperApp"
			register as application application_name ¬
				all notifications notifications ¬
				default notifications notifications ¬
				icon of application (path to me)
		end tell
		set growl_registered to 1
	end register
	
end script



script _List
	
	-- lib > _List
	-- List functions
	
	-- Sort a list
	--
	-- @url http://macscripter.net/viewtopic.php?id=24766
	-- @return list
	
	on bubbleSort(theList)
		-- defining an internal script makes for faster run times!
		script bs
			property alist : theList
		end script
		set theCount to length of bs's alist
		if theCount < 2 then return bs's alist
		repeat with indexA from theCount to 1 by -1
			repeat with indexB from 1 to indexA - 1
				if item indexB of bs's alist > item (indexB + 1) of bs's alist then
					set temp to item indexB of bs's alist
					set item indexB of bs's alist to item (indexB + 1) of bs's alist
					set item (indexB + 1) of bs's alist to temp
				end if
			end repeat
		end repeat
		return bs's alist
	end bubbleSort
	
	-- Returns the index of the first occurrence of _e within _l, or -1 if _l doesn't contain _e
	-- 
	-- @param list _list
	-- @param mixed _element
	-- @return integer
	
	on indexOf(_l, _e)
		repeat with i from 1 to length of _l
			if item i of _l = _e then return i
		end repeat
		return -1
	end indexOf
	
end script



script _Sound
	
	-- lib > _Sound
	-- Play sounds
	
	property _script_play : "import os\nimport sys\nfrom AppKit import NSSound\nfiles = sys.argv[1:]\nfor f in files:\n\tsound = NSSound.alloc()\n\tsound.initWithContentsOfFile_byReference_(f.decode('utf-8'), True)\n\tsound.play()\n\twhile True:\n\t\tif not sound.isPlaying():\n\t\t\tbreak\n"
	
	-- Play a sound
	--
	-- @example
	-- property lib : load script POSIX path of (path to scripts folder) & "lib/lib.scpt"
	-- playFile("/System/Library/Sounds/Basso.aiff", true) of _Sound of lib
	--
	-- @param _path alias|string The sound file to play
	-- @param _background boolean Don't wait for sound to finish
	-- @return void
	
	on playFile(_path, _background)
		if class of _path is alias then set _path to (POSIX path of _path)
		set _script to "python - " & quoted form of _path & " <<'EOF'"
		if _background = true then set _script to _script & " &>/dev/null &"
		do shell script _script & "\n" & _script_play & "\nEOF"
	end playFile
	
	-- Alias to playFile(_path, true)
	--
	-- @see playFile
	
	on play(_path)
		return my playFile(_path, true)
	end play
	
end script



script _Text
	
	-- lib > _Text
	-- Text & string functions
	
	-- Pad the left side of a string with a character
	--
	-- @param string _text The string you want to pad
	-- @param string _character The string you want to pad it with
	-- @param integer _length The desired length of the resulting string
	-- @return string
	
	on padLeft(_Text, _character, _length)
		set _Text to (_Text as string)
		set _character to (_character as string)
		set i to (_length - (length of _Text))
		repeat i times
			set _Text to _character & _Text
		end repeat
		return _Text
	end padLeft
	
	-- Pad the right side of a string with a character
	--
	-- @param string _text The string you want to pad
	-- @param string _character The string you want to pad it with
	-- @param integer _length The desired length of the resulting string
	-- @return string
	
	on padRight(_Text, _character, _length)
		set _Text to (_Text as string)
		set _character to (_character as string)
		set i to (_length - (length of _Text))
		repeat i times
			set _Text to _Text & _character
		end repeat
		return _Text
	end padRight
	
	-- Decode URL entities in a string
	--
	-- @url http://harvey.nu/applescript_url_decode_routine.html
	-- @return string|boolean The decoded string or false on failure (string was invalid)
	
	on URLDecode(theText)
		set sDst to ""
		set sHex to "0123456789ABCDEF"
		set i to 1
		repeat while i ≤ length of theText
			set c to character i of theText
			if c = "+" then
				set sDst to sDst & " "
			else if c = "%" then
				
				-- invalid : missing hex char
				if i > ((length of theText) - 2) then return false
				
				set iCVal1 to (offset of (character (i + 1) of theText) in sHex) - 1
				set iCVal2 to (offset of (character (i + 2) of theText) in sHex) - 1
				
				-- invalid : not 2 hex chars after % sign
				if iCVal1 = -1 or iCVal2 = -1 then return false
				
				set sDst to sDst & (ASCII character (iCVal1 * 16 + iCVal2))
				set i to i + 2
			else
				set sDst to sDst & c
			end if
			set i to i + 1
		end repeat
		return sDst
	end URLDecode
	
	-- Encode URL entities in a string
	--
	-- @url http://harvey.nu/applescript_url_encode_routine.html
	-- @return string The encoded string
	
	on URLEncode(theText)
		set theTextEnc to ""
		repeat with eachChar in characters of theText
			set useChar to eachChar
			set eachCharNum to ASCII number of eachChar
			if eachCharNum = 32 then
				set useChar to "+"
			else if (eachCharNum ≠ 42) and (eachCharNum ≠ 95) and (eachCharNum < 45 or eachCharNum > 46) and (eachCharNum < 48 or eachCharNum > 57) and (eachCharNum < 65 or eachCharNum > 90) and (eachCharNum < 97 or eachCharNum > 122) then
				set firstDig to round (eachCharNum / 16) rounding down
				set secondDig to eachCharNum mod 16
				if firstDig > 9 then
					set aNum to firstDig + 55
					set firstDig to ASCII character aNum
				end if
				if secondDig > 9 then
					set aNum to secondDig + 55
					set secondDig to ASCII character aNum
				end if
				set numHex to ("%" & (firstDig as string) & (secondDig as string)) as string
				set useChar to numHex
			end if
			set theTextEnc to theTextEnc & useChar as string
		end repeat
		return theTextEnc
	end URLEncode
	
end script



script _UI
	
	-- lib > _UI
	-- User interface functions
	
	-- Frontmost application
	--
	-- @return application
	
	on frontmostApplication()
		return application (path to frontmost application as Unicode text)
	end frontmostApplication
	
	-- Frontmost application ID (Bundle Identifier)
	--
	-- @return string
	
	on frontmostApplicationID()
		return id of my frontmostApplication()
	end frontmostApplicationID
	
	-- Frontmost application name
	--
	-- @return string
	
	on frontmostApplicationName()
		return name of my frontmostApplication()
	end frontmostApplicationName
	
	-- Frontmost application path
	--
	-- @return string HFS path
	
	on frontmostApplicationPath()
		return path to frontmost application as Unicode text
	end frontmostApplicationPath
	
	-- Frontmost application path in POSIX form
	--
	-- @return string POSIX path
	
	on frontmostApplicationPOSIXPath()
		return POSIX path of (path to frontmost application)
	end frontmostApplicationPOSIXPath
	
	-- Frontmost application process
	--
	-- @return process
	
	on frontmostApplicationProcess()
		tell application "System Events" to return first application process whose frontmost is true
	end frontmostApplicationProcess
	
	-- Similar to frontmostFileOf(), but if the result is not a directory, it will return the path of the result
	--
	-- @param application|string _app Application or name of an application
	-- @return string|boolean POSIX path of directory or false on failure
	
	on frontmostDirectoryOf(_app)
		set f to frontmostFileOf(_app)
		if f is not false then
			if folder of (info for f) then
				return f
			else
				return ((dirname(POSIX path of f) of _File) as POSIX file) as alias
			end if
		end if
		return false
	end frontmostDirectoryOf
	
	-- Calls frontmostDirectoryOf() using the current frontmost application
	--
	-- @return string|boolean POSIX path of directory or false on failure
	
	on frontmostDirectory()
		return my frontmostDirectoryOf(my frontmostApplicationName())
	end frontmostDirectory
	
	-- Current document of the frontmost window (assuming there is one) of an application
	--
	-- @param application|string _app Application or name of an application
	-- @return alias|boolean Alias of the file or false on failure
	
	on frontmostFileOf(_app)
		if class of _app is application then set _app to name of _app
		if application _app is not running then return false
		set _res to false
		
		-- Run through the various detection methods until we score a match
		set _res to my _frontmostFileOf1(_app)
		if class of _res is boolean and _res is false then set _res to my _frontmostFileOf2(_app)
		if class of _res is boolean and _res is false then set _res to my _frontmostFileOf3(_app)
		return _res
	end frontmostFileOf
	
	-- This method for finding frontmostFileOf() attempts to include an application library for _app, and run the resulting library's frontmostFile() handler
	on _frontmostFileOf1(_app)
		try
			set _applib to my include("Application/" & _app)
			get frontmostFile() of _applib
			return result
		end try
		return false
	end _frontmostFileOf1
	
	on _frontmostFileOf2(_app)
		try
			tell application _app to return ((path of front document) as POSIX file) as alias
		end try
		return false
	end _frontmostFileOf2
	
	on _frontmostFileOf3(_app)
		tell application "System Events" to try
			repeat with w in every window of application process _app
				set attribs to properties of every attribute of w
				repeat with i in attribs
					try
						if (name of i) is "AXDocument" and (value of i) is not missing value then
							return ((URLDecode(value of i) of my _Text) as POSIX file) as alias
						end if
					end try
				end repeat
			end repeat
		on error
			return false
		end try
		return false
	end _frontmostFileOf3
	
	-- Calls frontmostFileOf() using the current frontmost application
	--
	-- @return alias|boolean Alias of the file or false on failure
	
	on frontmostFile()
		return my frontmostFileOf(my frontmostApplicationName())
	end frontmostFile
	
	-- Execute the specified menu item.  In this case, assuming the Finder 
	-- is the active application, arranging the frontmost folder by date.
	--
	-- @param list mList A list in the form og {"Finder", "View", "Arrange By", "Date"}
	-- @author Jacob Rus, September 2006
	-- @return void
	
	on menuClick(mList)
		local appName, topMenu, r
		
		-- Validate our input
		if mList's length < 3 then error "Menu list is not long enough"
		
		-- Set these variables for clarity and brevity later on
		set {appName, topMenu} to (items 1 through 2 of mList)
		set r to (items 3 through (mList's length) of mList)
		
		-- This overly-long line calls the menu_recurse function with
		-- two arguments: r, and a reference to the top-level menu
		tell application "System Events" to my menuClick_recurse(r, ((process appName)'s ¬
			(menu bar 1)'s (menu bar item topMenu)'s (menu topMenu)))
	end menuClick
	
	on menuClick_recurse(mList, parentObject)
		local f, r
		
		-- `f` = first item, `r` = rest of items
		set f to item 1 of mList
		if mList's length > 1 then set r to (items 2 through (mList's length) of mList)
		
		-- either actually click the menu item, or recurse again
		tell application "System Events"
			if mList's length is 1 then
				click parentObject's menu item f
			else
				my menuClick_recurse(r, (parentObject's (menu item f)'s (menu f)))
			end if
		end tell
	end menuClick_recurse
	
	-- Resize a window
	--
	-- @return rectangle New bounds of _window
	
	on resizeWindow(_window, _width, _height)
		set _w to my elementBounds(_window)
		set _new to {x1 of _w, y1 of _w, x2 of _w, y2 of _w}
		if _width is not missing value and _width as integer > 0 then set item 3 of _new to (x1 of _w) + _width
		if _height is not missing value and _height as integer > 0 then set item 4 of _new to (y1 of _w) + _height
		set bounds of _window to _new
		return _new
	end resizeWindow
	
	-- Resize a window anchoring the center of the window
	--
	-- @return rectangle New bounds of _window
	
	on resizeWindowCenter(_window, _width, _height)
		set _w to my elementBounds(_window)
		set _new to {x1 of _w, y1 of _w, x2 of _w, y2 of _w}
		
		if _width as integer > 0 then
			set d to round ((_width - (width of _w)) / 2)
			set item 1 of _new to (x1 of _w) - d
			set item 3 of _new to (x2 of _w) + d
		end if
		
		if _height as integer > 0 then
			set d to round ((_height - (height of _w)) / 2)
			set item 2 of _new to (y1 of _w) - d
			set item 4 of _new to (y2 of _w) + d
		end if
		
		set bounds of _window to _new
		return _new
	end resizeWindowCenter
	
	-- Get a nice record with the dimensions and position of a UI element
	--
	-- @param UI element _element
	-- @return record {x1 : integer, y1: integer, x2 : integer, y2 : integer, width : integer, height : integer}
	
	on elementBounds(_element)
		try
			get bounds of _element as list
			set _b to {x1:item 1 of result, y1:item 2 of result, x2:item 3 of result, y2:item 4 of result}
		on error
			try
				tell application "System Events"
					set p to position of _element as list
					set s to size of _element as list
					set _b to {x1:item 1 of p, y1:item 2 of p, x2:(item 1 of p) + (item 1 of s), y2:(item 2 of p) + (item 2 of s)}
				end tell
			on error error_message number error_number
				--my displayError(error_message, error_number)
				return false
			end try
		end try
		return _b & {width:(x2 of _b) - (x1 of _b), height:(y2 of _b) - (y1 of _b)}
	end elementBounds
	
	-- Returns screenBounds(), while trying to account for the dock (size and orientation) and menu bar
	--
	-- @return record
	-- @see elementBounds
	
	on desktopBounds()
		
		-- the full screen bounds
		set _s to my screenBounds()
		
		-- bounds of the menubar
		tell application "System Events" to tell application process "System Events" to get first UI element whose class is menu bar
		set _m to my elementBounds(result)
		
		-- modify _s to account for the menubar height
		set _b to {x1:x1 of _s, y1:(y1 of _s) + (height of _m), x2:x2 of _s, y2:y2 of _s}
		
		tell application "System Events" to get autohide of dock preferences
		if result is not true then
			set _d to my dockBounds()
			set _o to my dockPosition()
			if _o is "bottom" then
				set y2 of _b to ((y2 of _s) - (height of _d))
			else if _o is "left" then
				set x1 of _b to ((x1 of _s) + (width of _d))
			else if _o is "right" then
				set x2 of _b to ((x2 of _s) - (width of _d))
			end if
		end if
		
		return _b & {width:(x2 of _b) - (x1 of _b), height:(y2 of _b) - (y1 of _b)}
	end desktopBounds
	
	-- Returns elementBounds() of the dock
	--
	-- @return record
	-- @see elementBounds
	
	on dockBounds()
		tell application "System Events" to tell application process "Dock" to get first UI element
		return my elementBounds(result)
	end dockBounds
	
	-- The Dock's current position on the screen
	--
	-- @return string left | right | bottom
	
	on dockPosition()
		tell application "System Events" to return screen edge of dock preferences as text
	end dockPosition
	
	-- Returns elementBounds() of the Finder desktop window (basically the whole screen)
	--
	-- @return record
	-- @see elementBounds
	
	on screenBounds()
		tell application "Finder" to return my elementBounds(window of desktop)
	end screenBounds
	
end script