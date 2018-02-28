# Multapy


## Configuracion de libreria Social Sharing

Borrar el permiso WRITE_EXTERNAL_STORAGE del archivo

    plugins/cordova-plugin-x-socialsharing/plugin.xml
    
        <config-file target="AndroidManifest.xml" parent="/*">
          <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
        </config-file>
    
    ionic cordova platform remove android
    ionic cordova platform add android
