#!/bin/bash
set -e
#    Se definen los colores
VERDE='\033[0;32m'
ROJO='\033[0;31m'
NC='\033[0m' # No Color

PROPERTY_FILE=release.properties

#Obtiene el valor de la propiedad
function getProperty {
   PROP_KEY=$1
   PROP_VALUE=`cat $PROPERTY_FILE | grep "$PROP_KEY" | cut -d'=' -f2`
   echo $PROP_VALUE
}

# Inicia el proceso de compilación, firmado y optimización
echo -e "${VERDE}"Generando android"${NC}"
ionic cordova build android --release --prod > /dev/null || (echo -e "${ROJO}"Falló al construir, ejecutar "${NC}"ionic cordova build android --release --prod && exit 1)
echo -e "${VERDE}"Firmando"${NC}"
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $(getProperty "keyStorePath") platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk $(getProperty "keyAliasName") -storepass $(getProperty "keyStorePassword") > /dev/null || (echo -e "${ROJO}"Falló al firmar, ejecutar "${NC}"jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $(getProperty "keyStorePath") platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk $(getProperty "keyAliasName") -storepass $(getProperty "keyStorePassword")&& exit 1)
echo -e "${VERDE}"Optimizando"${NC}"
rm -rf $(getProperty "apkFile") > /dev/null
$(getProperty "zipAlignPath") -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk $(getProperty "apkFile") > /dev/null || (echo -e "${ROJO}"Falló zipalign, ejecutar "${NC}"$(getProperty "zipAlignPath") -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk $(getProperty "apkFile") && exit 1)
echo -e "${VERDE}"Finalizado"${NC}"
