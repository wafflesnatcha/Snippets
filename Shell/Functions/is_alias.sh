# is_alias NAME
# Matches shell aliases
is_alias() { [[ "`type -t $@`" == "alias" ]]; }
