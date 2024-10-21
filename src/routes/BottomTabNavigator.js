// importar a função para criar barra de navegação na parte inferior da tela
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// importar icones
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// importar paginas
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import ListUsers from "../pages/ListUsers";
import { ListUserStack } from "./StackNavigator";

// executar a função para criar a barra de navegação na parte inferior da tela
const Tab = createBottomTabNavigator();

// criar o componente com as rotas de navegação utilizando TAB
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerTitle: 'Dashboard',
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={size}/>
                    )
                }}      
            />
            <Tab.Screen
                name="ListUsersTab"
                component={ListUserStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Usuários',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="view-list" color={color} size={size}/>
                    )
                }}      
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerTitle: 'Perfil',
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="account" color={color} size={size}/>
                    )
                }}      
            />
        </Tab.Navigator>

        
    )
}

export default BottomTabNavigator;