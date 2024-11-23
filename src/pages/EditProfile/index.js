import { useEffect, useState } from "react"
import { ActivityIndicator, Alert, ScrollView, Text } from "react-native"
import api from "../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { BtnActionEdit, Container, InputFormDash, LabelFormDash, LoadingArea, TxtRequiredFormDash, TxtSubmitFormDash } from "../../styles/custom";
import * as yup from 'yup';

export default function EditProfile() {

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);


    const getProfile = async () => {

        setLoading(true);

        const token = await AsyncStorage.getItem('@token');

        await api.get('/profile', {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            // console.log(response.data.user)
            setName(response.data.user.name);
            setEmail(response.data.user.email);

        }).catch((err) => {
            if (err.err) {
                Alert.alert("Ops", err.response.data.message);
                navigation.navigate('Home');
            } else {
                Alert.alert("Ops", "Erro: Tente novamente!");
                navigation.navigate('Home');
            }
        }).finally(() => {
            //Alterar loading para false e ocultar spinner
            setLoading(false);
        })
    }

    
    useEffect(() => {
        getProfile();
    }, []);

    const editProfile = async () => {

        try {
            setLoading(true);

            await validationSchema.validate({ name, email }, { abortEarly: false });

            const token = await AsyncStorage.getItem('@token');

            await api.put('/profile', { name, email }, {
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
                    Alert.alert("Ops", "Erro: Perfil não editado. Tente mais tarde!")
                }
            });
        } catch (error) {
            if (error.errors) {
                Alert.alert("Ops", error.errors[0]);
            } else {
                Alert.alert("Ops", "Erro: Não editado. Tente novamente!");
            }
        } finally {
            setLoading(false);
        }
    }

    // função validar com yup
    const validationSchema = yup.object().shape({
        name: yup.string("Erro: Necessário preencher o campo Nome!")
            .required("Erro: Necessário preencher o campo Nome!"),
        email: yup.string("Erro: Necessário preencher o campo E-mail!")
            .required("Erro: Necessário preencher o campo E-mail!")
            .email("Erro: Necessário preencher e-mail válido!"),
    });

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Container>
                <LabelFormDash>* Nome</LabelFormDash>
                <InputFormDash
                    placeholder="Nome completo"
                    autoCorrect={false}
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <LabelFormDash>* Email</LabelFormDash>
                <InputFormDash
                    placeholder="E-mail"
                    autoCorrect={false}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                
                <TxtRequiredFormDash>* Campo obrigatório</TxtRequiredFormDash>

                <BtnActionEdit onPress={editProfile}>
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