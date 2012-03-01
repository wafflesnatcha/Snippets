is_int () {
	echo -n "$1" | grep -E "^(0|[1-9][[:digit:]]{0,})$" &>/dev/null
}


## Tests
is_int 2; echo "2 : $?"
is_int 0.3; echo "0.3 : $?"
is_int 007; echo "007 : $?"
is_int 7; echo "7 : $?"