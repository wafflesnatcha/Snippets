# dec2ascii CHARACTER
# Convert a decimal value to its ASCII character representation
dec2ascii() { printf \\$(($1/64*100+$1%64/8*10+$1%8)); }