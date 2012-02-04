on frontmostApplicationName()
	return name of frontmostApplication()
end frontmostApplicationName

on frontmostApplicationPath()
	return path to frontmost application as Unicode text
end frontmostApplicationPath

on frontmostApplicationID()
	return id of frontmostApplication()
end frontmostApplicationID

on frontmostApplicationProcess()
	tell application "System Events" to return first process whose frontmost is true
end frontmostApplicationProcess

on frontmostApplication()
	return application (path to frontmost application as Unicode text)
end frontmostApplication