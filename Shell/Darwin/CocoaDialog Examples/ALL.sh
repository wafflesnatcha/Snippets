#!/usr/bin/env bash

bin="$(which CocoaDialog)"

# inputbox
res=$("$bin" inputbox \
	--title "inputbox" \
    --informative-text "Please give me a string:" \
    --button1 "Okay" \
	--button2 "Cancel"\
	)

[[ ! $(head -n1 <<<"$res") = "2" ]] && { res=$(tail -n1 <<<"$res"); echo "You entered: $res"; }

# bubble 
"$bin" bubble --debug --title "My first bubble" --text "How do you like it?"

# progressbar
for (( i = 0; i <= 100; i++ )); do
    echo "$i We're now at $i%"; sleep .05
done | "$bin" progressbar --title "progressbar"