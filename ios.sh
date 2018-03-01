#!/bin/bash
set -e
#    .---------- constant part!
#    vvvv vvvv-- the code from above
VERDE='\033[0;32m'
ROJO='\033[0;31m'
NC='\033[0m' # No Color

# Continued from above example
echo -e "${VERDE}"generando ios"${NC}"
ionic cordova build ios --release --prod > /dev/null || (echo -e "${ROJO}"Falló al construir, ejecutar "${NC}"ionic cordova build ios --release --prod && exit 1)
echo -e "${VERDE}"finalizado"${NC}"
