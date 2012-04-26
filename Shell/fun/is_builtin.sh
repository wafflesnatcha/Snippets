# is_builtin NAME
# Matches shell builtin functions
is_builtin() { [[ "`type -t $@`" == "builtin" ]]; }
