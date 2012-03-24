# ascii2dec CHARACTER
# Convert an ASCII character to its decimal value
ascii2dec() { printf "%d" "'$1"; }

# TESTS
for v in "A" "∂" "@"; do
	echo -n "$v  "
	ascii2dec "$v"
	echo
done
