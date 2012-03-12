#!/usr/bin/env bash

show_color() { (( col++ )); printf "\033[38;05;${1}m%-10s" "38;05;${1}"; [[ $(($col % $2)) = 0 ]] && col=0 && echo ; }

col=0
for code in {0..15}; do	show_color $code 8; done
echo

col=0
for code in {16..255}; do show_color $code 6; done
echo
