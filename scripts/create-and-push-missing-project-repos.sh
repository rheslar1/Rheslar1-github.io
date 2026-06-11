#!/usr/bin/env bash
set -euo pipefail

owner="${GITHUB_OWNER:-rheslar1}"
visibility="${GITHUB_VISIBILITY:-public}"
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

case "$visibility" in
  public|private|internal) ;;
  *)
    echo "GITHUB_VISIBILITY must be public, private, or internal" >&2
    exit 2
    ;;
esac

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI is required: https://cli.github.com/" >&2
  exit 127
fi

gh auth status >/dev/null

repos=(
  bare-metal-custom-board-bring-up
  connected-iot-device
  drv8801-brushed-dc-motor-controller
  edge-ai-tinyml-microcontroller
  fpga-hps-memory-mapped-driver
  medical-wearable-power-manager
  read-only-rootfs-docker-containerization
)

for repo in "${repos[@]}"; do
  full_name="${owner}/${repo}"
  repo_path="${root}/embedded-system-repos/${repo}"

  if [[ ! -d "${repo_path}/.git" ]]; then
    echo "Skipping ${repo}: ${repo_path} is not a git repository" >&2
    continue
  fi

  if gh repo view "${full_name}" >/dev/null 2>&1; then
    echo "Repository exists: ${full_name}"
  else
    echo "Creating ${visibility} repository: ${full_name}"
    gh repo create "${full_name}" "--${visibility}" --description "${repo}"
  fi

  git -C "${repo_path}" remote set-url origin "git@github.com:${full_name}.git"
  git -C "${repo_path}" push -u origin "$(git -C "${repo_path}" branch --show-current)"
done
