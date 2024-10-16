import { Alert, ScrollView, ActivityIndicator, Text, View } from 'react-native';
//importar o context para verificar se o usuario esta logado
import { useContext, useEffect, useState } from 'react';
import { Container, LoadingArea } from '../../styles/custom';
import api from '../../config/api';



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

                { users.map((user) => {
                    return (
                        <View key={user.id}>
                            <Text>Id: {user.id}</Text>
                            <Text>Nome: {user.name}</Text>
                            <Text>Email: {user.email}</Text>
                            <Text>Situação: {user.Situation.nameSituation}</Text>
                            <Text></Text>
                        </View>
                    )
                })}

                {loading && 
                <LoadingArea>
                    <ActivityIndicator size="large" color='#f5f5f5' />
                </LoadingArea>
            }
            </Container>      
        </ScrollView>
        
    )
}