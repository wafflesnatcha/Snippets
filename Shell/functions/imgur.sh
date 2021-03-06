#!/usr/bin/env bash
# Usage: imgur PATH
#
# Upload an image to the Imgur hosting service <http://imgur.com>.
imgur() {
	local url result
	result=$(cat "$1" | curl -qL $([[ ${TERM:dumb} = "dumb" ]] && echo "-sS" || echo "-#") --connect-timeout 15 -F "image=@-" -F key=1913b4ac473c692372d108209958fd15 http://api.imgur.com/2/upload.xml)
	url=$(echo -e "$result" | perl -ne 'print if s/.*<original>(http:\/\/i.imgur.com\/[^<]*)<\/original>.*/\1/i')
	[[ $? = 0 && $url ]] && { echo "$url"; return; } || { echo "$result" | perl -ne 'print if s/.*<message>(.*)<\/message>.*/\1/i' >&2; return 1; }
}
