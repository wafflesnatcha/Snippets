
'Set objVoice = CreateObject("SAPI.SpVoice")
'Set objVoice.Voice = objVoice.GetVoices("VW Kate").Item(0)
'strText = Wscript.Arguments(0)

Dim strText

if WScript.Arguments.length > 0 Then
	Set objArgs = WScript.Arguments
	For Each strArg in objArgs
		strText = strText & strArg & " "
	Next
else
	Set objIE = CreateObject("InternetExplorer.Application")
	'objIE.Navigate("about:blank")
	strText = objIE.document.parentwindow.clipboardData.GetData("text")
	objIE.Quit
end if

Set objVoice = CreateObject("SAPI.SpVoice")
objVoice.Speak strText
