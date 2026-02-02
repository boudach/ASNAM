#!/bin/bash
# Auto-commit and push script for ASNAM workspace
# Excludes secrets via .gitignore

cd /home/clawdbot/clawd || exit 1

# Check if there are changes to commit
if git diff --quiet && git diff --staged --quiet; then
    echo "No changes to commit"
    exit 0
fi

# Configure git (in case not set)
git config user.email "clawd@clawd.bot" 2>/dev/null || true
git config user.name "ClawdBot" 2>/dev/null || true

# Add all tracked files (respects .gitignore)
git add -A

# Commit with timestamp
COMMIT_MSG="Auto-commit: $(date -u '+%Y-%m-%d %H:%M UTC')"
git commit -m "$COMMIT_MSG" || true

# Push using stored credentials
GITHUB_TOKEN=$(cat .env.github 2>/dev/null | cut -d= -f2)
if [ -n "$GITHUB_TOKEN" ]; then
    git push https://boudach:$GITHUB_TOKEN@github.com/boudach/ASNAM.git master 2>&1
    echo "Pushed at $(date -u '+%H:%M UTC')"
else
    echo "No GitHub token found"
    exit 1
fi
