import { useNavigation } from '@react-navigation/native';
import { Alert, ScrollView, ActivityIndicator, Text, View } from 'react-native';
import { useState } from 'react';
import { ContainerLogin, Logo, InputForm, BtnSubmitForm, TxtSubmitForm, LinkNewUser, ImgLogo } from '../../styles/custom'
import api from '../../config/api';
import * as yup from 'yup';
import { LoadingArea } from '../../styles/custom';

// criar e exportar a função com a tela recuperar senha
export default function RecoverPassword (){
    const navigation = useNavigation();
    //Armazenar as informações do usuário
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const recoverPassword = async () => {
        try{
            //Alterar loading para true e paresentar spinner
            setLoading(true);

            //validar o formulario com yup
            await validationSchema.validate({
                email
            }, {abortEarly: false});

            //requisição para API
            await api.post('/recover-password-token', {email})
            .then((response) => {
                //console.log(response.data.message);
                Alert.alert("Sucesso", response.data.message);
                navigation.navigate('VerifyKey');

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
        } finally{
            //Alterar loading para false e ocultar spinner
            setLoading(false);
        }
        //Alert.alert("Sucesso", "Recuperar a senha");
    }

    // função validar com yup
    const validationSchema = yup.object().shape({
        email: yup.string("Erro: Necessário preencher o campo E-mail!")
            .required("Erro: Necessário preencher o campo E-mail!")
            .email("Erro: Necessário preencher um e-mail válido!"),
    });

    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <ContainerLogin>
            <Logo>
                <ImgLogo source={require('../../../assets/logo.png')}/>
            </Logo>
            <InputForm                 
                placeholder='E-mail'
                autoCorrect={false}
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                editable={!loading}
                onChangeText={text => setEmail(text)}
            />
            
            <BtnSubmitForm disabled={loading} onPress={recoverPassword}>
                <TxtSubmitForm>
                    Enviar
                </TxtSubmitForm>
            </BtnSubmitForm>

            <LinkNewUser title='Cadastrar' onPress={ () => navigation.navigate('Login')}>
                Login
            </LinkNewUser>
            
            
            {loading && 
                <LoadingArea>
                    <ActivityIndicator size="large" color='#f5f5f5' />
                </LoadingArea>
            }
            
        </ContainerLogin>
        </ScrollView>
    )
}