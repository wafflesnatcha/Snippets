#!/usr/bin/env bash
# rrsync.sh by Guy Baconniere

usage="$0 <src> <dst>"
src=${1:?$usage}
dst=${2:?$usage}

function crushedpath() {
	path="${1:?give a path please}"
	path=$(echo -n "${path}" | sed -e 's,/$,,')
	pathdepth=$(echo -n "${path}" | sed -e 's,[^/],,g' | wc -c)
	echo "${path}"
	for (( i=1; ${i} < ${pathdepth}; i=$(( ${i}+1 )) )); do
		fpath=$(( ${pathdepth} - ${i} ))
		subpath=$(echo -n "${path}" | cut -d "/" -f1-${fpath})
		if [ ! -z "${subpath}" ]; then
			echo "${subpath}"
		fi
	done
}

function doublecrushedpath() {
	src="${1:?give a src path please}"
	dst="${2:?give a dst path please}"
	src=$(echo -n "${src}" | sed -e 's,/$,,')
	dst=$(echo -n "${dst}" | sed -e 's,/$,,')
	srcdepth=$(echo -n "${src}" | sed -e 's,[^/],,g' | wc -c)
	dstdepth=$(echo -n "${dst}" | sed -e 's,[^/],,g' | wc -c)
	if [ $srcdepth -lt $dstdepth ]; then
		maxdepth=$srcdepth;
	else
		maxdepth=$dstdepth;
	fi
	echo "${src} ${dst}"
	for (( i=1; ${i} < ${maxdepth}; i=$(( ${i}+1 )) )); do
		fsrc=$(( ${srcdepth} - ${i} ))
		fdst=$(( ${dstdepth} - ${i} ))
		subsrc=$(echo -n "${src}" | cut -d "/" -f1-${fsrc})
		subdst=$(echo -n "${dst}" | cut -d "/" -f1-${fdst})
		if [ ! -z "${subsrc}" ] || [ ! -z "${subdst}" ]; then
			echo "${subsrc} ${subdst}"
		fi
	done
}

function rrsync() {
	src=${1:?src please}
	dst=${2:?dst please}
	doublecrushedpath "${src}" "${dst}" | while read t_src t_dst; do
		if ! rsync -nlD -- "${t_src}" "${t_dst}" 2>&1 \
			| grep -q -E 'rsync: push_dir#3 "[^"]*" failed: No such
		file or directory'; then
		echo rsync -av "${t_src}" "${t_dst}" || true
		break
	fi
done

}

#crushedpath "${dst}"
#doublecrushedpath "${src}" "${dst}"

rrsync "${src}" "${dst}"