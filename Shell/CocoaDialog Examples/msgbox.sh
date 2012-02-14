#!/bin/bash

CD="$HOME/bin/Darwin/CocoaDialog.app/Contents/MacOS/CocoaDialog"

rv=`$CD msgbox --no-newline \
    --text "What's your favorite OS?" \
    --informative-text "The 'Cancel' label auto-binds that button to esc" \
    --button1 "OS X" --button2 "GNU/Linux" --button3 "Cancel"`
if [ "$rv" == "1" ]; then
    echo "User likes Macs"
elif [ "$rv" == "2" ]; then
    echo "User likes Linux"
elif [ "$rv" == "3" ]; then
    echo "User doesn't care"
fi
