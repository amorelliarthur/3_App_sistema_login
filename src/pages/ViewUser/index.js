import { Button, Text, View } from 'react-native';
//importar o context para verificar se o usuario esta logado


export default function ViewUser({route}){

    console.log(route.params.userId)

    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>VIewUser</Text>

        </View>
    )
}