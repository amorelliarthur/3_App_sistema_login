import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Button, Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';

export default function Login (){

    //Navegar entre as telas
    const navigation = useNavigation();

    //Armazenar as informações do usuário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Processar/submeter os dados do formulário
    const loginSubmit = () => {
        Alert.alert("",`E-mail: ${email}`);
        Alert.alert("",`Senha: ${password}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../../../assets/logo.png')}/>
            </View>
            <TextInput 
                style={styles.inputForm}
                placeholder='Usuário'
                autoCorrect={false}
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput 
                style={styles.inputForm}
                placeholder='senha'
                autoCorrect={false}
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity style={styles.btnSubmitForm} onPress={loginSubmit}>
                <Text style={styles.txtSubmitForm}>
                    Acessar
                </Text>
            </TouchableOpacity>

            <Text style={styles.linkNewUser} title='Cadastrar' onPress={ () => navigation.navigate('NewUser')}>
                Cadastrar
            </Text>
            <Text style={styles.linkNewUser} title='Recuperar Senha' onPress={ () => navigation.navigate('RecoverPassword')}>
                Recuperar Senha
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
        color: '#f5f5f5',
        marginTop: 10,
        fontSize: 18
    }
});