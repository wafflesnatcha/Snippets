#!/usr/bin/env bash
. ~/.bash_profile

for(( i=0; i<20; i++ )); do
	activate -i "com.google.Chrome"
	cliclick 238 162
	sleep 0.4
	cliclick 287 411
	sleep 0.2
	osascript -e 'tell application "System Events" to tell process "Google Chrome" to key code 125'
	sleep 0.4
done