#!/usr/bin/env bash

CD="$(which CocoaDialog)"

# inputbox
res=$("$bin" inputbox \
	--title "inputbox" \
    --informative-text "Please give me a string:" \
    --button1 "Okay" \
	--button2 "Cancel"\
	)

[[ ! $(head -n1 <<<"$res") = "2" ]] && { res=$(tail -n1 <<<"$res"); echo "You entered: $res"; }
