# ascii2hex CHAR
# Convert an ASCII character to its hexadecimal value
# NOTE: can't handle extended unicode characters (i.e. à Ũ ŵ). Use 
# `unicode2hex` instead.
ascii2hex() { printf '%x' "'$1"; }

# TESTS
# for v in A @ % ∂ à Ũ ŵ ￫ ☠; do echo $v $(ascii2hex "$v"); done
