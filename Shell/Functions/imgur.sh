#!/usr/bin/env bash

imgur() {
	cat "$1" |
		curl -qSL# --connect-timeout 15 "image=@-" -F "key=1913b4ac473c692372d108209958fd15" http://api.imgur.com/2/upload.xml |
		grep -Eo "<original>(.)*</original>" |
		grep -Eo "http://i.imgur.com/[^<]*"
}