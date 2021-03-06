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

echo " => cleaning ./dist"
rm -rf ./dist
mkdir -p ./dist

echo " => cleaning ts build info"
rm -rf tsconfig.tsbuildinfo
