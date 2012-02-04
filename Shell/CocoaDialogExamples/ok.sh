#!/bin/bash

CD="$HOME/bin/Darwin/CocoaDialog.app/Contents/MacOS/CocoaDialog"

rv=`$CD ok-msgbox --text "We need to make sure you see this message" \
    --informative-text "(Yes, the message was to inform you about itself)" \
    --no-newline --float`
if [ "$rv" == "1" ]; then
    echo "User said OK"
elif [ "$rv" == "2" ]; then
    echo "Canceling"
    exit
fi
