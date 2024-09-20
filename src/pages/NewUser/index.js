import { useNavigation } from '@react-navigation/native';
import { Text, View} from 'react-native';

export default function NewUser (){

    const navigation = useNavigation();
    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>NewUser</Text>
            <Text onPress={() => {navigation.navigate('Login')}}>Login</Text>
        </View>
    )
}