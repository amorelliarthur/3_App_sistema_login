import { Button, Text, View, ActivityIndicator, ScrollView } from 'react-native';
//importar o context para verificar se o usuario esta logado
import { AuthContext } from '../../contexts/auth';
import { useContext, useCallback, useState } from 'react';
import api from '../../config/api';
import { Container, LoadingArea, List, RowData, InfoData, ValueData, BtnView, Pagination, PaginationText, PaginationTextActive, RowDataHomeOne, InfoDataHome, ValueDataHome, RowDataHomeTwo, RowDataHomeThree, RowDataHomeFour } from '../../styles/custom';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {

    const navigation = useNavigation();

    //Armazenar as informações do usuário
    const [countUsers, setCountUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    //recuperar a função signOut do context
    const { signOut } = useContext(AuthContext);

    //Recuperar os usuarios da api
    const getQuantity = async () => {
        setLoading(true);

        const token = await AsyncStorage.getItem('@token');

        //requisição para api indicando a rota
        await api.get('/quantity', {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                // console.log(response.data)
                setCountUsers(response.data.countUsers);
            }).catch((err) => {
                if (err.response) {
                    Alert.alert("Ops", err.response.data.message.toString());
                } else {
                    Alert.alert("Ops", "Erro: Tente novamente mais tarde");
                }
            }).finally(() => {
                //Alterar loading para false e ocultar spinner
                setLoading(false);
            })
    }

    // executar quando o usuario carregar a tela e chamar a função getUsers
    useFocusEffect(
        useCallback(() => {
            getQuantity();
        }, [])
    )

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Container>
                <List>
                    <RowDataHomeOne onPress={() => { navigation.navigate('ListUsersTab') }}>
                        <InfoDataHome>
                            <ValueDataHome>
                                <MaterialCommunityIcons
                                    name='account-group'
                                    size={30}
                                    color={'#f5f5f5'}
                                />{` ${countUsers} `} Usuarios
                            </ValueDataHome>
                        </InfoDataHome>
                    </RowDataHomeOne>
                    <RowDataHomeTwo>
                        <InfoDataHome>
                            <ValueDataHome>
                                <MaterialCommunityIcons
                                    name='car-hatchback'
                                    size={30}
                                    color={'#f5f5f5'}
                                />{" "}
                                -
                            </ValueDataHome>
                        </InfoDataHome>
                    </RowDataHomeTwo>
                    <RowDataHomeThree>
                        <InfoDataHome>
                            <ValueDataHome>
                                <MaterialCommunityIcons
                                    name='bus-side'
                                    size={30}
                                    color={'#f5f5f5'}
                                />{" "}
                                -
                            </ValueDataHome>
                        </InfoDataHome>
                    </RowDataHomeThree>
                    <RowDataHomeFour>
                        <InfoDataHome>
                            <ValueDataHome>
                                <MaterialCommunityIcons
                                    name='airplane'
                                    size={30}
                                    color={'#f5f5f5'}
                                />{" "}
                                -
                            </ValueDataHome>
                        </InfoDataHome>
                    </RowDataHomeFour>
                </List>
                {loading &&
                    <LoadingArea>
                        <ActivityIndicator size="large" color='#f5f5f5' />
                    </LoadingArea>
                }
            </Container>
            <Button title='sair' onPress={() => signOut() }/>
        </ScrollView>
    )
}