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

echo " => determine node version..."
readonly NODE_VERSION=`echo "${npm_package_engines_node}" | sed 's/~//g'`
echo "${NODE_VERSION}"

echo " => Cleaning dist-binaries"
rm -rf ${DIST}
mkdir -p ${DIST}

echo " => Creating binaries"
nexe package.json -r "./dist/**/*" -r "./node_module/**/*" -t windows-x64-${NODE_VERSION} -o ${DIST}/sws-windows-x64

echo " => Created binaries"
ls -la ${DIST}
