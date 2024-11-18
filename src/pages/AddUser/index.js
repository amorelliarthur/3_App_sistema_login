import { ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//importar o context para verificar se o usuario esta logado
import { Container, LabelFormDash, InputFormDash, BtnSubmitFormDash, TxtSubmitFormDash, TxtRequiredFormDash, LoadingArea  } from '../../styles/custom';
import { useState } from 'react';
import api from '../../config/api';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddUser (){

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [situationId, setSituationId] = useState(4);
     
    const [loading, setLoading] = useState(false);

    //Processar/submeter os dados do formulário
    const addUser = async () => {

        const token = await AsyncStorage.getItem('@token');

        try{

            //Alterar loading para true e paresentar spinner
            setLoading(true);

            //validar o formulario com yup
            await validationSchema.validate({
                name, email, password
            }, {abortEarly: false});

            //requisição para API
            await api.post('/users', {name, email, password, situationId}, {
                'headers': {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                //console.log(response.data.message);
                Alert.alert("Sucesso", response.data.message);
                navigation.navigate('ListUsers');
            }).catch((err) => {
            //console.log(err.response.data.message.toString());
                if(err.response){
                    Alert.alert("Ops", err.response.data.message.toString());
                } else {
                    Alert.alert("Ops", "Erro: Tente novamente mais tarde");
                }
            });

        } catch (error){
            if(error.errors){
                Alert.alert("Ops", error.errors[0]);
            } else {
                Alert.alert("Ops", "Erro: Usuário nao cadastradom, tente novamente!" );
            }
        } finally{
            //Alterar loading para false e ocultar spinner
            setLoading(false);
        }
    }

    // função validar com yup
    const validationSchema = yup.object().shape({
        name: yup.string("Erro: Necessário preencher o campo Nome!")
            .required("Erro: Necessário preencher o campo Nome!"),
        email: yup.string("Erro: Necessário preencher o campo E-mail!")
            .required("Erro: Necessário preencher o campo E-mail!")
            .email("Erro: Necessário preencher e-mail válido!"),
        password: yup.string("Erro: Necessário preencher o campo Senha!")
            .required("Erro: Necessário preencher o campo Senha!")
            .min(6, "Erro: A senha deve ter no mínimo 6 caracteres!"),
    });

    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <Container>
                <LabelFormDash>* Nome</LabelFormDash>
                <InputFormDash 
                    placeholder="Nome completo"
                    autoCorrect= {false}
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <LabelFormDash>* E-mail</LabelFormDash>
                <InputFormDash 
                    placeholder="E-mail"
                    autoCorrect= {false}
                    keyboardType= "email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <LabelFormDash>* Senha</LabelFormDash>
                <InputFormDash 
                    placeholder="Senha"
                    autoCorrect= {false}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                <TxtRequiredFormDash>* Campo obrigatório</TxtRequiredFormDash>
                <BtnSubmitFormDash onPress={addUser}>
                    <TxtSubmitFormDash>
                        Cadastrar
                    </TxtSubmitFormDash>
                </BtnSubmitFormDash>
                {loading && 
                    <LoadingArea>
                        <ActivityIndicator size="large" color='#f5f5f5' />
                    </LoadingArea>
                }
            </Container>
        </ScrollView>
    )
}