# converts ASCII character to its decimal value
ascii2dec() { printf '%d' "'$1"; }

# converts ASCII character to a hexadecimal value
ascii2hex() { printf '%x' "'$1"; }

# converts decimal value to its ASCII character representation
dec2ascii() { printf \\$(($1/64*100+$1%64/8*10+$1%8)); }

# converts a hexadecimal value to an ASCII character
hex2ascii() { printf \\x"$1"; }