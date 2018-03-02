# Multapy [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
Listado de infracciones

[![alt text](src/ios_logo.svg)](https://itunes.apple.com/us/app/multapy/id1268332527?mt=8) [![alt text](src/android_logo.png)](https://play.google.com/store/apps/details?id=com.ionicframework.multas136991) 

## Configuración de libreria Social Sharing

[GitHub: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin](https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)

### Android

Si solamente se quiere compartir texto se puede borrar el permiso WRITE_EXTERNAL_STORAGE para no solicitar al usuario final un permiso que no utilizará la app.

1. Se deben borrar las líneas indicadas más abajo que se encuentran en el archivo "plugin.xml" de la librería descargada
    
    **path del archivo**: plugins/cordova-plugin-x-socialsharing/plugin.xml
    
        <config-file target="AndroidManifest.xml" parent="/*">
          <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
        </config-file>
        
2. Borrar la plataforma

    ```
      $ ionic cordova platform remove android
    ```
    
3. Volver a agregar la plataforma
    
    ```
      $ ionic cordova platform add android
    ```

## Compilación y despliegue
Para compilar basta con ejecutar el comando correspondiente a cada plataforma

```sh
  $ npm install
```

### Web local (Testing)


1. Iniciar el servicio

    ```sh
      $ ionic lab
    ```

2. Ingresar a [http://localhost:8100/ionic-lab](http://localhost:8100/ionic-lab)



### Android
Compilar, firmar y optimizar

```sh
  $ ./android.sh
```

### iOS
Compilar

```sh
  $ ./ios.sh
```


