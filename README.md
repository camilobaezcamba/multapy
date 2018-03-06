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
Para compilar basta con ejecutar el comando correspondiente a cada plataforma luego del siguiente comando

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
Compilar, firmar y optimizar.

Para poder ejecutar el comando de compilación es necesario realizar las siguientes configuraciónes:

1. Copiar y pegar **(no renombrar)** el archivo "release.properties.sample" cambiando de nombre a "release.properties"
2. Editar los valores según su configuración local:

    | Clave | Valor |
    | -------  | ----- |
    | keyStorePath | Ubicación del keystore para firmar la app|
    | keyStorePassword | Contraseña del almacén de claves |
    | keyAliasName | Alias de la llave |
    | keyAliasPassword | Contraseña de la llave |
    | zipAlignPath | Ubicación de la librería ZipAlign para optimización de la app|
    | apkFile | Nombre del apk listo para subir a Google Play Store | 


Ejecutar el siguiente comando:

```sh
  $ ./android.sh
```

### iOS
Ejecutar el siguiente comando:

```sh
  $ ./ios.sh
```


## Atribución
Como base para la construcción de la aplicación se utilizó
[Ionic Conference Application](https://github.com/ionic-team/ionic-conference-app)
