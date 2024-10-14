import { Button, Text, View } from 'react-native';
//importar o context para verificar se o usuario esta logado
import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';

export default function Home (){

    //recuperar a função signOut do context
    const { signOut } = useContext(AuthContext);

    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Home</Text>

            <Text>Sair</Text>
            <Button title='sair' onPress={() => signOut() }/>
        </View>
    )
}