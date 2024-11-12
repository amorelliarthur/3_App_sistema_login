import { Alert, ScrollView, ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
//importar o context para verificar se o usuario esta logado
import { useCallback, useContext, useState } from 'react';
import { Container, LoadingArea, List, RowData, InfoData, ValueData, BtnView } from '../../styles/custom';
import api from '../../config/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFocusEffect, useNavigation } from '@react-navigation/native';


export default function ListUsers (){

    const navigation = useNavigation();

    //Armazenar as informações do usuário
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    //Recuperar os usuarios da api
    const getUsers = async () => {
        setLoading(true);

        //requisição para api indicando a rota
        await api.get('/users')
        .then((response) => {
            setUsers(response.data.users);
        }).catch((err) => {
            if(err.response){
                Alert.alert("Ops", err.response.data.message.toString());
            } else {
                Alert.alert("Ops", "Erro: Tente novamente mais tarde");
            }
        }).finally (() => {
            //Alterar loading para false e ocultar spinner
            setLoading(false);
        }) 
    }

    // executar quando o usuario carregar a tela e chamar a função getUsers
    useFocusEffect(
        useCallback(() => {
            getUsers();
        }, []) 
    )

    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <Container>

                <List>
                    { users.map((user) => {
                        return (
                            <RowData key={user.id}>
                                <InfoData>
                                    <ValueData>
                                        {user.name}
                                    </ValueData>
                                </InfoData>
                                <BtnView>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('ViewUser', {userId:user.id})
                                    }}>
                                        <MaterialCommunityIcons
                                            name='greater-than'
                                            size={20}
                                            color={'#c0c0c0'}
                                        />
                                    </TouchableOpacity>
                                </BtnView>
                            </RowData>
                        )
                    })}
                </List>
                {loading && 
                    <LoadingArea>
                        <ActivityIndicator size="large" color='#f5f5f5' />
                    </LoadingArea>
                }
            </Container>      
        </ScrollView>
        
    )
}