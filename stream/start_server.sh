#!/bin/bash
echo ""
echo " RESPAWN ØSTFOLD — OVERLAY SERVER"
echo " ==================================="
echo ""

cd "$(dirname "$0")"

if ! command -v node &> /dev/null; then
  echo " FEIL: Node.js er ikke installert!"
  echo " Last ned fra https://nodejs.org"
  exit 1
fi

node server.js
