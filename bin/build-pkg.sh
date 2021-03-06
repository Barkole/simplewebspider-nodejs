#!/bin/bash
set -e # Exit on first error
set -E
set -o functrace
function handle_error() {
    local retval=$?
    local line=${last_lineno:-$1}
    # Sleep to allow others to print their errors first
    sleep 1
    echo "Failed at ${line}: ${BASH_COMMAND}"
    echo "Trace: " "$@"
    exit $retval
}
if ((${BASH_VERSION%%.*} <= 3)) || [[ ${BASH_VERSION%.*} == 4.0 ]]; then
    trap '[[ $FUNCNAME = handle_error ]] || { last_lineno=$real_lineno; real_lineno=$LINENO; }' DEBUG
fi
trap 'handle_error $LINENO ${BASH_LINENO[@]}' ERR

readonly DIST="./dist-binaries"

echo " => Cleaning ${DIST}"
rm -rf ${DIST}
mkdir -p ${DIST}

echo " => Creating binaries"
pkg . -t node12-linux-x64,node12-macos-x64,node12-win-x64,node12-alpine-x64 -o ${DIST}/sws "$@" --options --enable-source-maps > ${DIST}/pkg.txt

echo " => Created binaries"
ls -la ${DIST}

# Sleep does not change the output file
#sleep 3m
