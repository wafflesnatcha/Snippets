#!/usr/bin/env bash
# Usage: is_keyword NAME
#
# Matches shell keywords.
is_keyword() {
	[[ "`type -t $@`" == "keyword" ]]
}
