#!/usr/bin/env bash
## Display laptop battery charge level (%)

battery() {
	ioreg -w0 -l |
		grep -E '(Max|Current)Capacity' |
		perl -pe 's/^[\s\|]*"(\w*)Capacity" = (.*?)[\s]*$/$2 /gi' |
		awk '{CONVFMT="%.1f" }	{print (($2 / $1 * 100) "%")}'
}
battery
