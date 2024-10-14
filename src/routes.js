import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import NewUser from './pages/NewUser';
import RecoverPassword from './pages/RecoverPassword';
import Home from './pages/Home';
import VerifyKey from './pages/VerifyKey';
import { useState, useMemo, useEffect } from 'react'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getValToken } from './services/auth';
import { AuthContext } from './contexts/auth';

const Stack = createNativeStackNavigator();

export default function Routes() {

    const [userToken, setUserToken] = useState(null);

    //Usar o Memo para memorizar o componente e só executar se tiver o token alterado
    const authContext = useMemo(() => {
        return {

            //Criar uma função signIn/validar token para ser consumida por outras paginas
            signIn: async () => {
                const valToken = AsyncStorage.getItem('@token');
                setUserToken(valToken); 
            },
            //Criar uma função signOut/sair para ser consumida por outras paginas
            signOut: async () => {
                AsyncStorage.removeItem('@token');
                AsyncStorage.removeItem('@name');
                AsyncStorage.removeItem('@email');
                setUserToken(null);
            }
        }
    });

    //verificar se o usuario possui token e chamar a função validar token
    const getToken = async () => {
        try{
            const valToken = await getValToken();
            if(valToken != null){
                setUserToken(valToken);
            } else {
                setUserToken(null);
            }
        } catch (err){
            setUserToken(null);
        } 
    }

    //executar quando o usuario acessar a tela e chamar a função getToken
    useEffect(() => {
      getToken();
    }, []);
    

    return (
        //Compartilhar a context de login com todas as páginas
        <AuthContext.Provider value={authContext}>        
            {/* Agrupar as rotas */}
            <NavigationContainer>
                {userToken ? (
                    <Stack.Navigator>
                        <Stack.Screen 
                            name='Home'
                            component={Home}
                        />
                    </Stack.Navigator>
                ) : (
                    /* Criar uma pilha de páginas */
                    <Stack.Navigator>
                        {/* Carregar as telas */}
                        <Stack.Screen 
                            name= 'Login'
                            component={Login}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen 
                            name='NewUser'
                            component={NewUser}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen 
                            name='RecoverPassword'
                            component={RecoverPassword}
                            options={{headerTitle: "Recuperar Senha"}}
                        />
                        <Stack.Screen 
                            name='VerifyKey'
                            component={VerifyKey}
                            options={{headerTitle: "Atualizar Senha"}}
                        />
                        
                    </Stack.Navigator>
                )}                
            </NavigationContainer>
        </AuthContext.Provider>
    )
}