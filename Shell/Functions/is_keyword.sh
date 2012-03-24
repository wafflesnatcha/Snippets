# is_keyword NAME
# Matches shell aliases
## Matches shell keywords
is_keyword() { [[ "`type -t $@`" == "keyword" ]]; }
