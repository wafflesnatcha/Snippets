#!/usr/bin/env bash
if [[ ! "$1" || "$1" = "--help" || "$1" = "-h" ]]; then
	echo "Usage: ${0##*/} path/to/bookmarklet.js"
	exit
fi

[[ ! -e "$1" ]] && { echo "$1: file not found" 1>&2; exit 2; }

bin="$(which uglifyjs 2>/dev/null)" || { echo "${0##*/}: uglifyjs required" 1>&2; exit 2; }

if type ruby &>/dev/null; then
	echo -n "javascript:$(cat "$1" | "$bin" | ruby -pe '$_.gsub!(/([^a-zA-Z0-9_\.\-]+)/n) { "%" + $1.unpack("H2" * $1.size).join("%").upcase }')"
elif type php &>/dev/null; then
	echo -n "javascript:$(cat "$1" | "$bin" | php -r 'echo rawurlencode(file_get_contents("php://stdin"));')"
else
	echo "${0##*/}: ruby or php required to URL encode output" 1>&2
	exit 2
fi