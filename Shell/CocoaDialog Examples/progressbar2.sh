#!/bin/bash
for (( i = 1; i <= 100; i++ )); do
    echo "$i We're now at $i%"; sleep .05
done|CocoaDialog progressbar --title "My Program"

