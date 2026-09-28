#!/bin/bash
# Instala las dependencias al arrancar una sesión de Claude Code en la web,
# para que `npm run build` y `npx tsc --noEmit` funcionen desde el primer
# mensaje. En la compu de Ailu no hace nada: ahí `npm install` se corre a mano.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# `install` y no `ci`: respeta el package-lock igual, pero reusa node_modules si
# el contenedor ya lo tiene cacheado, y no lo borra entero en cada sesión.
npm install --no-audit --no-fund
