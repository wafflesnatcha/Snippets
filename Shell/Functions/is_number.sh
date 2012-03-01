is_number () {
	echo -n "$1" | grep -E "^\-?(0|[1-9][[:digit:]]{0,})(\.[[:digit:]]{1,}){0,1}$" &>/dev/null
}


## Tests
is_number 2;       echo "2      : $?"
is_number 0.3;     echo "0.3    : $?"
is_number 007;     echo "007    : $?"
is_number 7;       echo "7      : $?"
is_number -23.01;  echo "-23.01 : $?"
is_number .08;     echo ".08    : $?"
is_number 0.08;    echo "0.08   : $?"
is_number -.08;    echo "-.08   : $?"
is_number -0.08;   echo "-0.08  : $?"
is_number -0 ;     echo "-0     : $?"