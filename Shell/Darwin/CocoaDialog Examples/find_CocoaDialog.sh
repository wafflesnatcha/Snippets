#!/bin/bash

find_cocoadialog()
{
	local paths="/Applications,$HOME/Applications,$HOME/bin,$HOME/lib"
	local search=( `eval echo {${paths}}/CocoaDialog.app` )
	local f
	for f in ${search[@]}; do
		[ -d "$f" -a -f "$f/Contents/MacOS/CocoaDialog" ] &&
			{ echo "$f/Contents/MacOS/CocoaDialog"; return; }
	done
	return 1
}
COCOA_DIALOG=$(find_cocoadialog) || { echo "CocoaDialog.app not found" >&2; exit 1; }

