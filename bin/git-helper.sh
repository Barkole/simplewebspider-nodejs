## Git Pull helper
gp() {
    echo -e "\E[30;1m--- [STATUS] -------------------------------------------------------------------\E[0m"
    git status -sb
    echo -e "\E[30;1m--- [FETCH] --------------------------------------------------------------------\E[0m"
    git fetch -p --all
    echo -e "\E[30;1m--- [UPDATE] -------------------------------------------------------------------\E[0m"
    git pull
    if [[ -f ./package.json ]]; then
        echo -e "\E[30;1m--- [YARN INSTALLL] ------------------------------------------------------------\E[0m"
        yarn install
    fi
}

## Git Commit Helper
gcp() {
    if [ "$1" = "" ]; then
        echo "Usage: gcp \"Commit Message\""
        return
    fi
    
    echo -e "\E[30;1m--- [STATUS] -------------------------------------------------------------------\E[0m"
    git status -sb
    echo -e "\E[30;1m--- [ADD] ----------------------------------------------------------------------\E[0m"
    git add -A -v
    echo -e "\E[30;1m--- [COMMIT] -------------------------------------------------------------------\E[0m"
    git commit -v -m "$1"
    echo -e "\E[30;1m--- [PUSH] ---------------------------------------------------------------------\E[0m"
    git push -u --follow-tags
}

## Git merge current branch with master
gmm() {
    echo -e "\E[30;1m--- [STATUS] -------------------------------------------------------------------\E[0m"
    git status -sb
    echo -e "\E[30;1m--- [FETCH] --------------------------------------------------------------------\E[0m"
    git fetch -p --all
    echo -e "\E[30;1m--- [MERGE] --------------------------------------------------------------------\E[0m"
    git merge origin/master
    gp
}

## Get master checkout
gmc () {
    echo -e "\E[30;1m--- [CHECKOUT MASTER] ----------------------------------------------------------\E[0m"
    git checkout master
    gp
}

## Get branch checkout
gbc() {
    options=()
    
    echo -e "\E[30;1m--- [CHECKOUT MASTER] ----------------------------------------------------------\E[0m"
    git checkout master
    echo -e "\E[30;1m--- [REMOVE LOCAL BRANCHES] ----------------------------------------------------\E[0m"
    git branch | grep -v "master" | while read branch; do echo "delete local branch $branch"; git branch -d "$branch" || true; done
    echo -e "\E[30;1m--- [REMOVE REMOVE BRANCHES] ---------------------------------------------------\E[0m"
    git remote prune origin
    git branch -r | while read branch; do echo "delete remote branch $branch"; git branch -d -r "$branch" || true; done
    echo -e "\E[30;1m--- [FETCH] --------------------------------------------------------------------\E[0m"
    git fetch -p --all
    echo -e "\E[30;1m--- [RESTORE ALL REMOTE BRANCHES] ----------------------------------------------\E[0m"
    git branch -r | grep -v '\->' | while read branch; do echo "Create track for ${branch}"; git branch --track "${branch#origin/}" "$branch" || true; done
    echo -e "\E[30;1m--- [PULL] ---------------------------------------------------------------------\E[0m"
    git pull --all
    
    echo -e "\E[30;1m--- [SELECT BRANCH] ------------------------------------------------------------\E[0m"
    #for bash version 4 or higher use mapfile.
    #Fallback to while loop if mapfile not found
    mapfile -t options < <(git for-each-ref \
    --format='%(refname:short)' refs/heads/) &>/dev/null \
    || while read line; do options+=( "$line" ); done \
    < <(git for-each-ref --format='%(refname:short)' refs/heads/)
    
    options+=('Exit')
    
    select opt in "${options[@]}"
    do
        if [[ "$opt" ]] && [[ "$opt" == 'Exit' ]]; then
            echo "Bye Bye"
            return 0
            elif [[ "$opt" ]]; then
            echo -e "\E[30;1m--- [CHECKOUT BRANCH] ----------------------------------------------------------\E[0m"
            git checkout "$opt"
            gp
            return 0
        else
            echo "Wrong Input. Please enter the correct input"
        fi
    done
}

"$@"
