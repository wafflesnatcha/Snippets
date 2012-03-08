#!/bin/bash

CD="$HOME/lib/CocoaDialog.app/Contents/MacOS/CocoaDialog"

rv=`$CD yesno-msgbox --no-cancel --string-output --no-newline \
    --text  "This is a simple first example" \
    --informative-text "We're just going to echo the string output"`
echo "User pressed the $rv button"

rv=`$CD yesno-msgbox --text "Do you like CocoaDialog?"`
if [ "$rv" == "1" ]; then
    echo "User likes this program"
elif [ "$rv" == "2" ]; then
    echo "User does not like this program"
elif [ "$rv" == "3" ]; then
    echo "User has no opinion (pressed cancel)"
fi
