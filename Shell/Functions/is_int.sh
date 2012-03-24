# is_int VALUE
# Matches whole numbers (can have leading 0's)
is_int() { [[ $* =~ ^[0-9]*$ ]]; }


# TESTS
for i in "2" "0.3" ".3" "007" "7" "1.2" "-23.01" ".08" "0.08" "000.08" "-.08" "-0.08" "-000.08" "-0" "1." "." "-" "0.a" "a" "aaa" "2a" "\$4" "10%" "1*"; do
	printf "%-10s" "$i"
	is_int "$i" && echo "true" || echo "false"
done
