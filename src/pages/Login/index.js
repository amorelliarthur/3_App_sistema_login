import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator} from 'react-native';
import api from '../../config/api';
import * as yup from 'yup';
import { LoadingArea } from '../../styles/custom';

//importar o context para verificar se o usuario esta logado
import { AuthContext } from '../../contexts/auth';


// importar arquivos com componente css
import { Container, Logo, InputForm, BtnSubmitForm, TxtSubmitForm, LinkNewUser, ImgLogo } from '../../styles/custom'

export default function Login (){

    //Navegar entre as telas
    const navigation = useNavigation();

    //Armazenar as informações do usuário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    //Recuperar a função signIn do context
    const { signIn } = useContext(AuthContext);

    //Processar/submeter os dados do formulário
    const loginSubmit = async () => {
        //Alert.alert("",`E-mail: ${email}`);
        //Alert.alert("",`Senha: ${password}`);

        //if(!validate()) return;

        try{

            //Alterar loading para true e paresentar spinner
            setLoading(true);

            //validar o formulario com yup
            await validationSchema.validate({
                email, password
            }, {abortEarly: false});

            //requisição para API
            await api.post('/login', {email, password})
            .then((response) => {
                //console.log(response.data.message);
                //Alert.alert("Sucesso", response.data.message);

                AsyncStorage.setItem('@token', response.data.user.token);
                AsyncStorage.setItem('@name', response.data.user.name);
                AsyncStorage.setItem('@email', response.data.user.email);
                
                //redirecionar para pag inicial
                //navigation.navigate('Home');
                //chamar a função que está no memo e no context
                signIn();

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

    // validar formulario com js puro
   /* const validate = () => {
        if(!email){
            Alert.alert("Ops", "Erro: Necessário preencher o campo Usuário!");
            return false;
        }
        if(!password){
            Alert.alert("Ops", "Erro: Necessário preencher o campo senha!");
            return false;
        }

        return true;
    }*/

    // função validar com yup
    const validationSchema = yup.object().shape({
        email: yup.string("Erro: Necessário preencher o campo Usuário!")
            .required("Erro: Necessário preencher o campo Usuário!"),
        password: yup.string("Erro: Necessário preencher o campo Senha!")
            .required("Erro: Necessário preencher o campo Senha!"),
    });

    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <Container>
            <Logo>
                <ImgLogo source={require('../../../assets/logo.png')}/>
            </Logo>
            <InputForm                 
                placeholder='Usuário'
                autoCorrect={false}
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                editable={!loading}
                onChangeText={text => setEmail(text)}
            />
            <InputForm                 
                placeholder='Senha'
                autoCorrect={false}
                secureTextEntry={true}
                value={password}
                editable={!loading}
                onChangeText={text => setPassword(text)}
            />
            <BtnSubmitForm disabled={loading} onPress={loginSubmit}>
                <TxtSubmitForm>
                    Acessar
                </TxtSubmitForm>
            </BtnSubmitForm>

            <LinkNewUser title='Cadastrar' onPress={ () => navigation.navigate('NewUser')}>
                Cadastrar
            </LinkNewUser>
            <LinkNewUser title='Recuperar Senha' onPress={ () => navigation.navigate('RecoverPassword')}>
                Recuperar Senha
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

/*const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#10101c'
    },
    logo: {
        paddingBottom: 20 
    },
    inputForm: {
        backgroundColor: '#f5f5f5',
        width: '90%',
        marginBottom: 15,
        color: '#10101c',
        fontSize: 18,
        borderRadius: 20,
        padding: 10
    },
    btnSubmitForm:{
        backgroundColor: '#1f51fe',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    txtSubmitForm:{
        color: '#f5f5f5',
        fontSize: 22
    },
    linkNewUser: {
        color: '#1f51fe',
        marginTop: 10,
        fontSize: 18
    }
});*/