# is_number VALUE
# Matches numbers, including negatives and decimals
is_number() { echo -n "$1" | grep -E "^\-?[0-9]{0,}\.?[0-9]{1,}$" &>/dev/null; }


# TESTS
for i in 2 -2 0.3 .3 007 7 1.2 -23.01 .08 0.08 000.08 -.08 -0.08 -000.08 -0 1. . -  0.a a aaa 2a \$4 10% '1*'; do
	printf "%-10s" "$i"
	is_number "$i" && echo "true" || echo "false"
done
