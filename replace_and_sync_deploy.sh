#!/bin/bash

# Navigate to the specified folder
cd /home/admin/Documents/Rheslar1-github.io

# Clone the blackboxai/bbb-docs-pkg repository to a temporary location
TEMP_REPO="/tmp/bbb-docs-pkg"
if [ -d "$TEMP_REPO" ]; then
    echo "Updating temporary repository: $TEMP_REPO"
    cd "$TEMP_REPO"
    git pull origin main
else
    echo "Cloning blackboxai/bbb-docs-pkg to temporary repository: $TEMP_REPO"
    git clone https://github.com/blackboxai/bbb-docs-pkg.git "$TEMP_REPO"
    cd "$TEMP_REPO"
fi

# Get the latest commit hash from blackboxai/bbb-docs-pkg main branch
LATEST_COMMIT=$(git rev-parse origin/main)
cd ..

# Loop through each directory in the folder
for repo in */; do
    cd "$repo"

    # Check if the folder is a git repository
    if [ -d .git ]; then
        echo "Checking repository: $repo"

        # Remove Axe test files
        echo "Removing Axe test files from $repo"
        find . -type f -name "*axe*" -not -path "./node_modules/*" -exec rm -f {} +
        find . -type d -name "*axe*" -not -path "./node_modules/*" -exec rm -rf {} +

        # Replace all instances of "study" with "C++ design patterns demonstrated"
        echo "Replacing 'study' with 'C++ design patterns demonstrated' in all files for $repo"
        find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i 's/study/C++ design patterns demonstrated/g' {} +

        # Check the status of the repository
        git status

        # If there are uncommitted changes, add and commit them
        if ! git diff-index --quiet HEAD --; then
            echo "Changes found in $repo. Committing changes."
            git add .
            git commit -m "Replaced 'study' with 'C++ design patterns demonstrated' and removed Axe test files"
        fi

        # Ensure the main branch is up-to-date with blackboxai/bbb-docs-pkg
        echo "Ensuring main branch of $repo is up-to-date with blackboxai/bbb-docs-pkg"
        git fetch "$TEMP_REPO" main:bbb-docs-pkg
        git diff --quiet HEAD bbb-docs-pkg
        if [ $? -ne 0 ]; then
            echo "Differences found between main branch of $repo and blackboxai/bbb-docs-pkg. Merging changes."
            git merge bbb-docs-pkg
            git commit -m "Merged changes from blackboxai/bbb-docs-pkg"
        fi

        # Pull the latest changes from the remote repository
        echo "Pulling latest changes from remote repository for $repo"
        git pull origin main

        # Push changes to the remote repository
        echo "Pushing changes to remote repository for $repo"
        git push origin main

        # Deploy the repository with conditional logic
        echo "Deploying the repository $repo"
        if [ "$repo" == "repo1/" ]; then
            npm run deploy
        elif [ "$repo" == "repo2/" ]; then
            # Example for repo2
            firebase deploy
        else
            echo "No specific deployment command for $repo. Skipping deployment."
        fi

        # Verify the change in documentation
        echo "Verifying change in documentation for $repo"
        grep -r "C++ design patterns demonstrated" . | grep -v "replace_and_sync_deploy.sh"

        # Verify the change in code
        echo "Verifying change in code for $repo"
        grep -r "C++ design patterns demonstrated" . | grep -v "replace_and_sync_deploy.sh"

        # Verify the change in React UI
        echo "Verifying change in React UI for $repo"
        grep -r "C++ design patterns demonstrated" . | grep -v "replace_and_sync_deploy.sh"
    else
        echo "The directory $repo is not a git repository."
    fi

    # Navigate back to the main folder
    cd ..
done

# Remove the temporary repository
rm -rf "$TEMP_REPO"
