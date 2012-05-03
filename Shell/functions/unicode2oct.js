# unicode2oct CHARACTER
# Convert a character to its unicode octal value. The output can be used
# directly with printf.
#
# Example:
# $ unicode2oct ã
# \303\243
#
# Example:
# $ snowman=$(unicode2oct ☃)
# $ printf "$snowman $snowman $snowman\n"
# ☃ ☃ ☃
unicode2oct() { echo -n "$1" | hexdump -b | head -n1 | tr "[:lower:]" "[:upper:]" | awk '{for (i=2; i<=NF; i++) printf "\\%s", $i}'; }

# TESTS
# for v in A @ % ∂ à Ũ ŵ ￫ ☠; do echo $v $(unicode2oct "$v"); done
