#!/usr/bin/env bash
r=( $(echo "38;5;"{17..21} "38;5;"{21..17}) ) # also nice: "38;5;"{125..129} "38;5;"{128..125}
c=${COLUMNS:-`tput cols`}
printf "%$(($c%${#r[@]}/2))s" ""
for i in ${r[@]}; do for ((x=1; x<=$(($c/${#r[@]})); x++)); do echo -en "\033[${i}m#\033[0m"; done; done;
printf "%$((($c%${#r[@]})-$c%${#r[@]}/2))s" ""