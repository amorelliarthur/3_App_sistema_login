import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, Text, View } from 'react-native';
import { Container, LoadingArea, TitleViewContent, ViewContent, BtnActionEdit, BtnActionDelete, TxtBtnAction} from '../../styles/custom';
import api from '../../config/api';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Profile(){

    //console.log(route.params.userId)
    const navigation = useNavigation();

    //Armazenar as informações do usuário
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

    //função para recuperar os detalhes do usuario
    const getProfile = async () => {
        setLoading(true);

        const token = await AsyncStorage.getItem('@token');

        //requisição para api indicando a rota
        await api.get('/profile',{
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            setUser(response.data.user);
        }).catch((err) => {
            if(err.response){
                Alert.alert("Ops", err.response.data.message.toString());
                navigation.navigate('ListUsers');
            } else {
                Alert.alert("Ops", "Erro: Tente novamente mais tarde");
            }
        }).finally (() => {
            //Alterar loading para false e ocultar spinner
            setLoading(false);
        }) 
        
    }

    // executar quando o usuario carregar a tela e chamar a função getProfiles
    useFocusEffect(
        useCallback(() => {
            getProfile();
        }, []) 
    )

    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <Container>  
                <TitleViewContent>ID</TitleViewContent>
                <ViewContent>{user.id}</ViewContent>

                <TitleViewContent>Nome</TitleViewContent>
                <ViewContent>{user.name}</ViewContent>

                <TitleViewContent>E-mail</TitleViewContent>
                <ViewContent>{user.email}</ViewContent>

                <TitleViewContent>Situação</TitleViewContent>
                <ViewContent>{user.id ? user.Situation.nameSituation : ""}</ViewContent>

                <BtnActionEdit onPress={() => navigation.navigate('EditProfile')}>
                    <TxtBtnAction>
                        Editar
                    </TxtBtnAction>
                </BtnActionEdit>
                <BtnActionEdit onPress={() => navigation.navigate('EditPasswordProfile')}>
                    <TxtBtnAction>
                        Editar senha
                    </TxtBtnAction>
                </BtnActionEdit>

                                
                {loading && 
                    <LoadingArea>
                        <ActivityIndicator size="large" color='#f5f5f5' />
                    </LoadingArea>
                }
            </Container>
        </ScrollView>
    )
}