import { useEffect, useState } from "react"
import { ActivityIndicator, Alert, ScrollView, Text } from "react-native"
import api from "../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { BtnActionEdit, Container, InputFormDash, LabelFormDash, LoadingArea, TxtRequiredFormDash, TxtSubmitFormDash } from "../../styles/custom";

export default function EditUser({ route }){

    const navigation = useNavigation();

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [situationId, setSituationId] = useState('');
    const [loading, setLoading] = useState('');


    const getUser = async () => {

        setLoading(true);
        
        const { userId } = route.params;

        const token = await AsyncStorage.getItem('@token');

        await api.get(`/users/${userId}`, {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            // console.log(response.data.user)
            setId(response.data.user.id);
            setName(response.data.user.name);
            setEmail(response.data.user.email);
            setSituationId(response.data.user.situationId);

        }).catch((err) => {
            if(err.err){
                Alert.alert("Ops", err.response.data.message);
                navigation.navigate('ListUsers');
            } else {
                Alert.alert("Ops", "Erro: Tente novamente!");
                navigation.navigate('ListUsers');
            }
        }).finally (() => {
            //Alterar loading para false e ocultar spinner
            setLoading(false);
        }) 
    }

    useEffect(() => {
        getUser();
    }, []);
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <Container>
                <LabelFormDash>* Nome</LabelFormDash>
                <InputFormDash 
                    placeholder = "Nome completo"
                    autoCorrect = {false}
                    value = {name}
                    onChangeText = {text => setName(text)}
                />
                <LabelFormDash>* Email</LabelFormDash>
                <InputFormDash 
                    placeholder = "E-mail"
                    autoCorrect = {false}
                    keyboardType = "email-address"
                    value = {email}
                    onChangeText = {text => setEmail(text)}
                />
                
                <TxtRequiredFormDash>* Campo obrigatório</TxtRequiredFormDash>
                <BtnActionEdit>
                    <TxtSubmitFormDash>
                        Editar
                    </TxtSubmitFormDash>
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