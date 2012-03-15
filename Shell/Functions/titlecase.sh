# titlecase STRING ...
# 
# Usage: 
# $ titlecase "Lorem ipsum dolor sit amet."
# Lorem Ipsum Dolor Sit Amet.

titlecase() {
	[[ ${#@} < 1 ]] && return 1
	local r;
	for a in $@; do r="$r`echo ${a:0:1} | tr a-z A-Z`${a:1} "; done
	echo -n ${r:0:((${#r}-1))}
}

