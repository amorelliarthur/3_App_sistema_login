//Gerenciar a navegação entre as telas
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//configuração e gestao da navegação entre as telas
const Stack = createNativeStackNavigator();

//importar as páginas
import ListUsers from "../pages/ListUsers";
import ViewUser from "../pages/ViewUser";

//Criar a função com as telas
const ListUserStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ListUsers"
                component={ListUsers}
                options={{
                    headerTitle: "Listar Usuários"
                }}
            />

            <Stack.Screen 
                name="ViewUser"
                component={ViewUser}
                options={{
                    headerTitle: "Detalhes do Usuários"
                }}
            />
        </Stack.Navigator>
    )
}

export { ListUserStack };