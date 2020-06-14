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

# Must no clean up, as we use incremental compilation
#echo " => cleaning ./dist"
#rm -rf ./dist
#mkdir -p ./dist

echo " => create env override..."
echo "# Auto generated" > ./dist/.env.override
echo BUILD_VERSION=${npm_package_version} >> ./dist/.env.override
echo BUILD_NAME=${npm_package_name} >> ./dist/.env.override
echo BUILD_TIMESTAMP=`date -Is -u` >> ./dist/.env.override
if [[ -z $(git status -s) ]]; then
    echo BUILD_SHA=`git rev-parse HEAD` >> ./dist/.env.override
else
    echo BUILD_SHA=`git rev-parse HEAD`-DIRTY >> ./dist/.env.override
fi
cat ./dist/.env.override

echo " => tsc..."
tsc --resolveJsonModule
