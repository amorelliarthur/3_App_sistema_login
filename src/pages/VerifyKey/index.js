import { useState } from 'react';
import { Alert, ScrollView, ActivityIndicator, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Logo, InputForm, BtnSubmitForm, TxtSubmitForm, LinkNewUser, ImgLogo, LoadingArea } from '../../styles/custom'
import api from '../../config/api';
import * as yup from 'yup';

export default function VerifyKey (){

    const navigation = useNavigation();

    //Armazenar as informações do usuário
    const [recoverPasswordToken, setRecoverPasswordToken] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [formNewPassword, setFormNewPassword] = useState(false);  
    const [loading, setLoading] = useState(false);

    const verifyKey = async () => {
        try{

            //Alterar loading para true e paresentar spinner
            setLoading(true);

            //validar o formulario com yup
            await validationSchema.validate({
                recoverPasswordToken
            }, {abortEarly: false});

            //requisição para API
            await api.post('/validate-recover-password-token', {recoverPasswordToken})
            .then((response) => {
                //console.log(response.data.message);
                Alert.alert("Sucesso", response.data.message);
                //Apresentar formulario nova senha
                setFormNewPassword(true);
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
    }

    // função validar com yup
    const validationSchema = yup.object().shape({        
        recoverPasswordToken: yup.string("Erro: Necessário preencher o campo Código de verificação!")
            .required("Erro: Necessário preencher o campo Código de verificação!"),
    });

    const editPAssword = async () => {
        try{
            //Alterar loading para true e paresentar spinner
            setLoading(true);

            //validar o formulario com yup
            await validationSchemaPassword.validate({
                password , recoverPasswordToken
            }, {abortEarly: false});

            //requisição para API
            await api.put('/update-password-token', {recoverPasswordToken, password})
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
        } finally{
            //Alterar loading para false e ocultar spinner
            setLoading(false);
        }
    }

    // função validar com yup
    const validationSchemaPassword = yup.object().shape({
        recoverPasswordToken: yup.string("Erro: Código de verificação inválido!")
            .required("Erro: Código de verificação inválido!"),
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
            {formNewPassword ? 
            <>
                <InputForm
                    placeholder='Nova senha'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    editable={!loading}
                />
                <BtnSubmitForm disabled={loading} onPress={editPAssword}>
                    <TxtSubmitForm>
                        Salvar
                    </TxtSubmitForm>
                </BtnSubmitForm>
            </>
            : 
                <>
                    <InputForm
                        placeholder='Código de verificação'
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={recoverPasswordToken}
                        onChangeText={text => setRecoverPasswordToken(text)}
                        editable={!loading}
                    />
                    <BtnSubmitForm disabled={loading} onPress={verifyKey}>
                        <TxtSubmitForm>
                            Validar
                        </TxtSubmitForm>
                    </BtnSubmitForm>
                </>
            }
            
            <LinkNewUser onPress={ () => navigation.navigate('Login')}>
                Login
            </LinkNewUser>
            {loading && 
                <LoadingArea>
                    <ActivityIndicator size="large" color='#f5f5f5' />
                </LoadingArea>
            }
        </Container>
        </ScrollView>
    )
}