// Gerenciar a navegação entre as telas
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Configuração e gestão da navegação entre as telas
const Stack = createNativeStackNavigator();

// Importar as páginas
import Home from "../pages/Home";

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: '#10101c'
    },
    headerTintColor: '#1f51fe'
}

// Criar a função com as telas
const HomeStack = () => {

    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>            

            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerTitle: "Dashboard"
                }}
            />
            
        </Stack.Navigator>
    )
}

// Exportar a função com as telas
export { HomeStack };