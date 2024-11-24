import { Alert, ScrollView, ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
//importar o context para verificar se o usuario esta logado
import { useCallback, useContext, useState } from 'react';
import { Container, LoadingArea, List, RowData, InfoData, ValueData, BtnView, Pagination, PaginationText, PaginationTextActive } from '../../styles/custom';
import api from '../../config/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ListUsers() {

    const navigation = useNavigation();

    //Armazenar as informações do usuário
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState('');
    const [loading, setLoading] = useState(false);

    //Recuperar os usuarios da api
    const getUsers = async (page) => {
        setLoading(true);

        const token = await AsyncStorage.getItem('@token');

        //requisição para api indicando a rota
        await api.get(`/users?page=${page}`, {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setUsers(response.data.users);
                setPagination(response.data.pagination);
                // console.log(response.data.pagination)
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
            getUsers(1);
        }, [])
    )

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Container>

                <List>
                    {users.map((user) => {
                        return (
                            <RowData key={user.id}>
                                <InfoData>
                                    <ValueData>
                                        {user.name}
                                    </ValueData>
                                </InfoData>
                                <BtnView>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('ViewUser', { userId: user.id })
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

                    <Pagination>
                        {pagination.prev_page_url &&
                            <TouchableOpacity onPress={() => getUsers(1)}>
                                <PaginationText>
                                    <MaterialCommunityIcons
                                        name='chevron-double-left'
                                        size={20}
                                        color={'#c0c0c0'}
                                    />
                                </PaginationText>
                            </TouchableOpacity>
                        }

                        {pagination.prev_page_url &&
                            <TouchableOpacity onPress={() => getUsers(+pagination.page - 1)}>
                                <PaginationText>
                                    <MaterialCommunityIcons
                                        name='chevron-left'
                                        size={20}
                                        color={'#c0c0c0'}
                                    />
                                </PaginationText>
                            </TouchableOpacity>
                        }

                        <PaginationTextActive>
                            {pagination.page}
                        </PaginationTextActive>
                        
                        {pagination.next_page_url &&
                            <TouchableOpacity onPress={() => getUsers(+pagination.page + 1)}>
                                <PaginationText>
                                    <MaterialCommunityIcons
                                        name='chevron-right'
                                        size={20}
                                        color={'#c0c0c0'}
                                    />
                                </PaginationText>
                            </TouchableOpacity>
                        }

                        {pagination.next_page_url &&
                            <TouchableOpacity onPress={() => getUsers(pagination.lastPage)}>
                                <PaginationText>
                                    <MaterialCommunityIcons
                                        name='chevron-double-right'
                                        size={20}
                                        color={'#c0c0c0'}
                                    />
                                </PaginationText>
                            </TouchableOpacity>
                        }
                    </Pagination>
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