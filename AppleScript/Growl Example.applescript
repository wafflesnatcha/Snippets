tell application "GrowlHelperApp"
	-- Make a list of all the notification types 
	-- that this script will ever send:
	set the allNotificationsList to ¬
		{"Test Notification", "Another Test Notification"}
	
	-- Make a list of the notifications 
	-- that will be enabled by default.      
	-- Those not enabled by default can be enabled later 
	-- in the 'Applications' tab of the growl prefpane.
	set the enabledNotificationsList to ¬
		{"Test Notification"}
	
	-- Register our script with growl.
	-- You can optionally (as here) set a default icon 
	-- for this script's notifications.
	register as application ¬
		"Growl AppleScript Sample" all notifications allNotificationsList ¬
		default notifications enabledNotificationsList ¬
		icon of application "Script Editor"
	
	--	Send a Notification...
	notify with name ¬
		"Test Notification" title ¬
		"Test Notification" description ¬
		"This is a test AppleScript notification." application name "Growl AppleScript Sample"
	
	notify with name ¬
		"Another Test Notification" title ¬
		"Another Test Notification :) " description ¬
		"Alas — you won't see me until you enable me..." application name "Growl AppleScript Sample"
	
end tell