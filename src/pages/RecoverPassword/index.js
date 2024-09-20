import { useNavigation } from '@react-navigation/native';
import { Text, View} from 'react-native';

export default function RecoverPassword (){
    const navigation = useNavigation();
    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>RecoverPassword</Text>
            <Text onPress={() => {navigation.navigate('Login')}}>Login</Text>
        </View>
    )
}