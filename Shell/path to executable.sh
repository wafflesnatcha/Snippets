progbin=`which ftpsync.pl ftpsync 2>/dev/null | sed 1q`
[[ ! $progbin ]] && exit 1
