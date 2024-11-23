import { useEffect, useState } from "react"
import { ActivityIndicator, Alert, ScrollView, Text } from "react-native"
import api from "../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { BtnActionEdit, Container, InputFormDash, LabelFormDash, LoadingArea, TxtRequiredFormDash, TxtSubmitFormDash } from "../../styles/custom";
import * as yup from 'yup';

export default function EditPasswordProfile() {

    const navigation = useNavigation();

    // Armazenar as informações do usuário
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    
    const getProfile = async () => {

        setLoading(true);

        const token = await AsyncStorage.getItem('@token');

        await api.get('/Profile', {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            

        }).catch((err) => {
            if (err.err) {
                Alert.alert("Ops", err.response.data.message);
                navigation.navigate('Profile');
            } else {
                Alert.alert("Ops", "Erro: Tente novamente!");
                navigation.navigate('Profile');
            }
        }).finally(() => {
            //Alterar loading para false e ocultar spinner
            setLoading(false);
        })
    }

    useEffect(() => {
        getProfile();
    }, []);

    const editPasswordProfile = async () => {

        try {
            setLoading(true);

            await validationSchema.validate({ password }, { abortEarly: false });

            const token = await AsyncStorage.getItem('@token');

            await api.put('/profile-password', { password }, {
                'headers': {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                Alert.alert("Sucesso", response.data.message);
                navigation.navigate('Profile');
            }).catch((err) => {
                if(err.response){
                    Alert.alert("Ops", err.response.data.message);
                } else {
                    Alert.alert("Ops", "Erro: Senha não editada. Tente mais tarde!")
                }
            });
        } catch (error) {
            if (error.errors) {
                Alert.alert("Ops", error.errors[0]);
            } else {
                Alert.alert("Ops", "Erro: Não editada. Tente novamente!");
            }
        } finally {
            setLoading(false);
        }
    }

    // função validar com yup
    const validationSchema = yup.object().shape({
        password: yup.string("Erro: Necessário preencher o campo senha!")
        .required("Erro: Necessário preencher o campo senha!")
        .min(6, "Erro: A senha deve ter no mínimo 6 caracteres")
    });

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Container>
                <LabelFormDash>* Senha</LabelFormDash>
                <InputFormDash
                    placeholder="Nova senha"
                    autoCorrect={false}                    
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                
                <TxtRequiredFormDash>* Campo obrigatório</TxtRequiredFormDash>

                <BtnActionEdit onPress={editPasswordProfile}>
                    <TxtSubmitFormDash>
                        Salvar
                    </TxtSubmitFormDash>
                </BtnActionEdit>

                {loading &&
                    <LoadingArea>
                        <ActivityIndicator size="large" color='#f5f5f5' />
                    </LoadingArea>
                }

            </Container>
        </ScrollView>
    )
}