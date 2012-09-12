# imgur PATH
#
# Example:
# $ imgur "/path/to/some/image.jpg"
# http://i.imgur.com/wZjS5.jpg

imgur() {
	local url result=$(cat "$1" | curl -qL $([[ $TERM = "dumb" ]] && echo "-sS" || echo "-#") --connect-timeout 15 -F "image=@-" -F "key=1913b4ac473c692372d108209958fd15" "http://api.imgur.com/2/upload.xml")
	url=$(echo -e "$result" | perl -ne 'print if s/.*<original>(http:\/\/i.imgur.com\/[^<]*)<\/original>.*/\1/i')
	[[ $? = 0 && $url ]] && { echo "$url"; return; } || { echo "$result" | perl -ne 'print if s/.*<message>(.*)<\/message>.*/\1/i' >&2; return 1; }
}
