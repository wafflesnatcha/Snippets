# Usage: string_repeat STRING MULTIPLIER
# string_repeat "THE BEST " 20

string_repeat() {
	for (( c=1; c<=$2; c++)); do
		printf "$1"
	done
}
