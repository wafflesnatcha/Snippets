# looking for sed, preferrably gsed

bin=$(which gsed sed 2>/dev/null | head -n1)
[[ ! $bin ]] && exit 1

echo "bin=$bin"
