import { Alert, ScrollView, ActivityIndicator, Text, View } from 'react-native';
//importar o context para verificar se o usuario esta logado
import { useContext, useEffect, useState } from 'react';
import { Container, LoadingArea, List, RowData, InfoData, ValueData, BtnView } from '../../styles/custom';
import api from '../../config/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



export default function ListUsers (){

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
    useEffect(() => {
        getUsers();
    }, []);
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
                                    <MaterialCommunityIcons
                                        name='greater-than'
                                        size={20}
                                        color={'#c0c0c0'}
                                    />
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