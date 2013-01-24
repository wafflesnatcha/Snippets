#!/usr/bin/env bash
# Usage: titlecase STRING ...
# 
# Example: 
# $ titlecase "Lorem ipsum-dolor   sit, amet."
# > Lorem Ipsum-dolor   Sit, Amet.   
titlecase() {
	[[ ${#@} < 1 ]] && return 1
	local text="$@"
	local output end word
	while [ ${#text} -gt 0 ]; do
		end="${text#*[[:space:]]}"
		[ "$text" = "$end" ] && end=""
		word="${text:0:$((${#text} - ${#end}))}"
		output="$output$(echo "${word:0:1}" | tr "[:lower:]" "[:upper:]")${word:1}"
		text="$end"
	done
	echo "$output"
}

# Tests
# titlecase "Lorem ipsum-dolor   sit, amet.   "
