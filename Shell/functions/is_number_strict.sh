# is_number_strict VALUE
# Matches numbers, including negatives and decimals
# No leading 0's except for floats, where one is required if -1.0 > VALUE < 1.0
is_number_strict() { echo -n "$1" | grep -E "^\-?(0|[1-9][[:digit:]]{0,})(\.[[:digit:]]{1,}){0,1}$" &>/dev/null; }


# TESTS
for i in 2 -2 0.3 .3 007 7 1.2 -23.01 .08 0.08 000.08 -.08 -0.08 -000.08 -0 1. . -  0.a a aaa 2a \$4 10% '1*'; do
	printf "%-10s" "$i"
	is_number_strict "$i" && echo "true" || echo "false"
done