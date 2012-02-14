#!/bin/bash

COCOA_DIALOG=""

if [ -d "/Applications/CocoaDialog.app" ]; then
COCOA_DIALOG="/Applications/CocoaDialog.app/Contents/MacOS/CocoaDialog"
elif [ -d "$HOME/Applications/CocoaDialog.app" ]; then
COCOA_DIALOG="$HOME/Applications/CocoaDialog.app/Contents/MacOS/CocoaDialog"
else
echo "CocoaDialog.app not found"
exit 1
fi