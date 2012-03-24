# ascii2hex CHAR
# Convert an ASCII character to its hexadecimal value
ascii2hex() { printf '%x' "'$1"; }


# TESTS
for v in "A" "∂" "@"; do
	echo -n "$v  "
	ascii2hex "$v"
	echo
done
