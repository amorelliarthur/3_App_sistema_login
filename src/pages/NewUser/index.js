import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, ScrollView} from 'react-native';
import api from '../../config/api';
import * as yup from 'yup';

import { Container, Logo, InputForm, BtnSubmitForm, TxtSubmitForm, LinkNewUser, ImgLogo } from '../../styles/custom'

//Criar a função com a tela cadastrar usuario

export default function NewUser (){

    const navigation = useNavigation();

    //Armazenar as informações do usuário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Processar/submeter os dados do formulário
    const addUser = async () => {
        try{

            //validar o formulario com yup
            await validationSchema.validate({
                name, email, password
            }, {abortEarly: false});

            //requisição para API
            await api.post('/new-users', {name, email, password})
            .then((response) => {
                //console.log(response.data.message);
                Alert.alert("Sucesso", response.data.message);
                navigation.navigate('Login');
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
                Alert.alert("Ops", "Erro: Tente novamente!" );
            }
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
            <Logo>
                <ImgLogo source={require('../../../assets/logo.png')}/>
            </Logo>
            <InputForm
                placeholder='Nome'
                value={name}
                onChangeText={text => setName(text)}
            />
            <InputForm
                placeholder='E-mail'
                autoCorrect={false}
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <InputForm
                placeholder='Senha'
                autoCorrect={false}
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <BtnSubmitForm onPress={addUser}>
                <TxtSubmitForm>
                    Cadastrar
                </TxtSubmitForm>
            </BtnSubmitForm>
            <LinkNewUser onPress={ () => navigation.navigate('Login')}>
                Login
            </LinkNewUser>
        </Container>
        </ScrollView>
    )
}
