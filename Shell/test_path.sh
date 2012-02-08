#!/usr/bin/env bash

# Test that required commands are in the path
# http://www.bioinspired.com/users/ajg112/software/bashTips.shtml

ARGS=1         # Script requires 1 argument.
E_BADARGS=65   # Wrong number of arguments passed to script.

if [ $# -ne "$ARGS" ] ;
# Test number of arguments to script (always a good idea).
then
  echo "Usage: `basename $0` required";
  exit $E_BADARGS;
fi

for CMD in ${1}; do
   type $CMD &> /dev/null;

   if [ $? != "0" ]; then
      echo "The command '$CMD' is required and is not in your path.";
      exit 1;
   fi
done
