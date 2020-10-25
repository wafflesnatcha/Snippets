#!/usr/bin/env bash

if [[ $1 = "--help" || $1 = "-h" ]]; then
	echo "Usage: ${0##*/} [FILE]"
	exit
fi

ERROR() { [[ $1 ]] && echo "${0##*/}: $1" 1>&2; [[ $2 > -1 ]] && exit $2; }

type uglifyjs &>/dev/null || ERROR "uglifyjs required" 3
type ruby php &>/dev/null || ERROR "ruby or php required to URL encode output" 4

input="${1:--}"
[[ ! $input = "-" && ! -e "$input" ]] && ERROR "$input: file not found" 2

output=$(uglifyjs "$input" | {
	if type ruby &>/dev/null; then
		ruby -pe '$_.gsub!(/([^a-zA-Z0-9_\.\-]+)/n){"%"+$1.unpack("H2"*$1.size).join("%").upcase}'
	elif type php &>/dev/null; then
		php -r 'echo rawurlencode(file_get_contents("php://stdin"));'
	else
		cat
	fi
})

[[ $output ]] && echo -n "javascript:$output" || exit 1