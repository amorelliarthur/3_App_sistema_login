// Incluir os componentes utilizado para estruturar o conteúdo
import { Alert } from 'react-native';

// Incluir AsyncStorage para armazenar dados
import AsyncStorage from '@react-native-async-storage/async-storage';

// Arquivo com as configurações da API
import api from '../config/api';


export const getValToken = async () => {

    // Chamar a função validar token
    await valUser();

    // Recuperar o token do AsyncStorage
    const valueToken = await AsyncStorage.getItem('@token');

    // Verificar se existe token
    if (valueToken !== null) {
        return valueToken;
    } else {
        return null;
    }
}

// Validar o token na API
const valUser = async () => {

    // Recuperar o token do AsyncStorage
    const valueToken = await AsyncStorage.getItem('@token');

    // Criar o cabeçalho da requisição enviando o token
    const headers = {
        'headers': {
            'Authorization': `Bearer ${valueToken}`
        }
    }

    // Requisição para a API indicando a rota e os dados
    await api.get('/val-token', headers)
        .then((response) => { // Acessar o then quando a API retornar status sucesso

            //console.log(response.data);
            // Salvar os dados no AsyncStorage
            AsyncStorage.setItem('@token', response.data.user.token);
            AsyncStorage.setItem('@name', response.data.user.name);
            AsyncStorage.setItem('@email', response.data.user.email);
        }).catch((err) => { // Acessar o catch quando a API retornar status erro

            //console.log(err.response.data);
            if (err.response) { // Acessa o IF quando existir a mensagem de erro

                // Remover os dados no AsyncStorage
                AsyncStorage.removeItem('@token');
                AsyncStorage.removeItem('@name');
                AsyncStorage.removeItem('@email');
                //Alert.alert('Ops', err.response.data.message);

            } else { // Acessa o ELSE quando a API não responder

                // Remover os dados no AsyncStorage
                AsyncStorage.removeItem('@token');
                AsyncStorage.removeItem('@name');
                AsyncStorage.removeItem('@email');

                //Alert.alert('Ops', "Erro: Necessário realizar o login para acessar a página!");

            }
        });
}