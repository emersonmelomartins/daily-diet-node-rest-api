- Versão do Flutter utilizada 3.32.8 

- Precisa estar com a JDK17
```shell
# jdk11 caso precise voltar
setx JAVA_HOME "C:\Program Files\Eclipse Adoptium\jdk-11.0.26.4-hotspot" /M

# jdk17
setx JAVA_HOME "C:\Program Files\Eclipse Adoptium\jdk-17.0.14.7-hotspot" /M
```

- Comando para gerar arquivos automaticos (JsonSerializer, Freezer, Etc...)
```shell
dart run build_runner watch -d
```

- Comando para formatar toda a base de código
```shel
dart format .
```