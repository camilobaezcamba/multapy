#!/bin/bash
set -e
#    .---------- constant part!
#    vvvv vvvv-- the code from above
VERDE='\033[0;32m'
ROJO='\033[0;31m'
NC='\033[0m' # No Color

# Continued from above example
echo -e "${VERDE}"Generando android"${NC}"
ionic cordova build android --release --prod > /dev/null || (echo -e "${ROJO}"Falló al construir, ejecutar "${NC}"ionic cordova build android --release --prod && exit 1)
echo -e "${VERDE}"Firmando"${NC}"
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore multas.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk multas -storepass cambalupe > /dev/null || (echo -e "${ROJO}"Falló al firmar, ejecutar "${NC}"jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore multas.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk multas && exit 1)
echo -e "${VERDE}"Optimizando"${NC}"
rm -rf multas.apk > /dev/null
/home/camilo/Desarrollo/android-sdk-linux/build-tools/21.0.0/zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk multas.apk > /dev/null || (echo -e "${ROJO}"Falló zipalign, ejecutar "${NC}"/home/camilo/Desarrollo/android-sdk-linux/build-tools/21.0.0/zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk multas.apk && exit 1)
echo -e "${VERDE}"Finalizado"${NC}"
