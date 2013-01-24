#!/usr/bin/env bash
# Usage: is_function NAME
#
# Matches function names.
is_function() {
	[[ "`type -t $@`" == "function" ]]
}
