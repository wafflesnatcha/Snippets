#!/usr/bin/env bash
# Bundle identifier of the system default browser application
# (as determined by the default application for the 'http://' URL scheme)

defaults read com.apple.LaunchServices LSHandlers |
	grep -i -B1 -A1 'LSHandlerURLScheme = http;' |
	grep -i 'LSHandlerRoleAll = ' |
	perl -pe 's/^\s*LSHandlerRoleAll\s*=\s*"(.*?)";\s*$/$1/i'