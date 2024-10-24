//Gerenciar a navegação entre as telas
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
//configuração e gestao da navegação entre as telas
const Stack = createNativeStackNavigator();

//importar as páginas
import ListUsers from "../pages/ListUsers";
import ViewUser from "../pages/ViewUser";
import AddUser from "../pages/AddUser";

import { TitleIcon } from "../styles/custom";

const screenOptions = {
    headerStyle: {
        backgroundColor: '#10101c'
    },
    headerTintColor: '#1f51fe'
}

//Criar a função com as telas
const ListUserStack = () => {

    //console.log(route.params.userId)
    const navigation = useNavigation();

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen 
                name="ListUsers"
                component={ListUsers}
                options={{
                    headerTitle: "Listar Usuários",
                    headerRight: () => (
                        <TitleIcon 
                            onPress={() =>{
                                navigation.navigate('AddUser')
                            }}>
                            <MaterialCommunityIcons
                                name="plus-circle-outline"
                                size={25}
                                color="#1f51fe" 
                            />
                        </TitleIcon>
                    )
                }}
            />

            <Stack.Screen 
                name="ViewUser"
                component={ViewUser}
                options={{
                    headerTitle: "Detalhes do Usuários"
                }}
            />

            <Stack.Screen 
                name="AddUser"
                component={AddUser}
                options={{
                    headerTitle: "Cadastrar Usuário"
                }}
            />
        </Stack.Navigator>
    )
}

export { ListUserStack };