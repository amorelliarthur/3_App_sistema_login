import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, Text, View } from 'react-native';
import { Container, LoadingArea } from '../../styles/custom';
import api from '../../config/api';
import { useNavigation } from '@react-navigation/native';

export default function ViewUser({route}){

    //console.log(route.params.userId)
    const navigation = useNavigation();

    //Armazenar as informações do usuário
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

    //função para recuperar os detalhes do usuario
    const getUser = async () => {
        setLoading(true);

        const { userId } = route.params;

        //requisição para api indicando a rota
        await api.get(`/users/${userId}`)
        .then((response) => {
            setUser(response.data.user);
        }).catch((err) => {
            if(err.response){
                Alert.alert("Ops", err.response.data.message.toString());
                navigation.navigate('ListUsers')
            } else {
                Alert.alert("Ops", "Erro: Tente novamente mais tarde");
            }
        }).finally (() => {
            //Alterar loading para false e ocultar spinner
            setLoading(false);
        }) 
        
    }

    //Executar quando o usuario carregar a tela e chamar a função getUser
    useEffect(() => {
        getUser();
    }, []);

    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <Container>  
                <Text>ID: {user.id}</Text>
                <Text>Nome: {user.name}</Text>
                <Text>Email: {user.email}</Text>

                {loading && 
                    <LoadingArea>
                        <ActivityIndicator size="large" color='#f5f5f5' />
                    </LoadingArea>
                }
            </Container>
        </ScrollView>
    )
}