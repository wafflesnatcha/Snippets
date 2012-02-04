#!/bin/bash

bin="$(which CocoaDialog)"

# inputbox
res=$($bin inputbox --title "I Need Input" \
    --informative-text "Please give me a string:" \
    --button1 "Okay" --button2 "Cancel")

[[ ! $(head -n1 <<<"$res") = "2" ]] && { res=$(tail -n1 <<<"$res"); echo "You entered: $res"; }


# progressbar
for (( i = 1; i <= 100; i++ )); do
    echo "$i We're now at $i%"; sleep .05
done|CocoaDialog progressbar --title ""