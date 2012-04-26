#!/usr/bin/env bash
. colors.sh

COLUMNS=${COLUMNS:-`tput cols`}
printf "${CLR_BG_BLUE}${CLR_B}%${COLUMNS}s${CLR_R}\n" "Right aligned"
printf "${CLR_BG_MAGENTA}${CLR_B}%-${COLUMNS}s${CLR_R}\n" "Left aligned"