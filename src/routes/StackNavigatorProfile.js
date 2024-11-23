// Gerenciar a navegação entre as telas
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Configuração e gestão da navegação entre as telas
const Stack = createNativeStackNavigator();

// Importar as páginas
import Profile from "../pages/Profile";
import EditProfile from '../pages/EditProfile';
import EditPasswordProfile from "../pages/EditPasswordProfile";

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: '#10101c'
    },
    headerTintColor: '#1f51fe'
}

// Criar a função com as telas
const ProfileStack = () => {

    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>            

            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerTitle: "Perfil"
                }}
            />

            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                    headerTitle: "Editar Perfil"
                }}
            />

            <Stack.Screen
                name="EditPasswordProfile"
                component={EditPasswordProfile}
                options={{
                    headerTitle: "Editar Senha do Perfil"
                }}
            />
        </Stack.Navigator>
    )
}

// Exportar a função com as telas
export { ProfileStack };