## Requisitos

* Node.js 20 ou superior
* Expo

## Como rodar o projeto baixado
Instalar todas as dependencias indicada pelo package.json
```
npm install
```

Executar o projeto
```
npx expo start
```


## Sequencia para criar o projeto
Criar o projeto com React Native usando expo
```
npx create-expo-app@latest . --template
blank
```

Executar o projeto
```
npx expo start
```

Transforma o CSS em componentes
```
npm install styled-components --legacy-peer-deps

```

Dependencia para navegar entre as paginas
```
npm install @react-navigation/native @react-navigation/native-stack
```
```
npx expo install react-native-screens react-native-safe-area-context
```

Realizar chamadas para API
```
npm install axios
```

Validar o formulário
```
npm install yup
```

async-storage é utilizado para armazenar dados persistentes no dispositivo
```
npx expo install @react-native-async-storage/async-storage
```

Criar na parte inferior da tela a barra de navegação
```
npm install @react-navigation/bottom-tabs --legacy-peer-deps
```

Biblioteca de icones
```
npm install --save react-native-vector-icons --legacy-peer-deps
```