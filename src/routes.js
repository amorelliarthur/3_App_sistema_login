import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import NewUser from './pages/NewUser';
import RecoverPassword from './pages/RecoverPassword';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        //Agrupar as rotas
        <NavigationContainer>
            {/* Criar uma pilha de páginas */}
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
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}