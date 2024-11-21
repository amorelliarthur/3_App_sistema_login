import { ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//importar o context para verificar se o usuario esta logado
import { Container, LabelFormDash, InputFormDash, BtnSubmitFormDash, TxtSubmitFormDash, TxtRequiredFormDash, LoadingArea } from '../../styles/custom';
import { useEffect, useState } from 'react';
import api from '../../config/api';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddUser() {

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [situationId, setSituationId] = useState();
    const [situations, setSituations] = useState([]);
    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    //Processar/submeter os dados do formulário
    const addUser = async () => {

        const token = await AsyncStorage.getItem('@token');

        try {

            //Alterar loading para true e paresentar spinner
            setLoading(true);

            //validar o formulario com yup
            await validationSchema.validate({
                name, email, password, situationId
            }, { abortEarly: false });

            //requisição para API
            await api.post('/users', { name, email, password, situationId }, {
                'headers': {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => {
                    //console.log(response.data.message);
                    Alert.alert("Sucesso", response.data.message);
                    navigation.navigate('ListUsers');
                }).catch((err) => {
                    //console.log(err.response.data.message.toString());
                    if (err.response) {
                        Alert.alert("Ops", err.response.data.message.toString());
                    } else {
                        Alert.alert("Ops", "Erro: Tente novamente mais tarde");
                    }
                });

        } catch (error) {
            if (error.errors) {
                Alert.alert("Ops", error.errors[0]);
            } else {
                Alert.alert("Ops", "Erro: Usuário nao cadastradom, tente novamente!");
            }
        } finally {
            //Alterar loading para false e ocultar spinner
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
        password: yup.string("Erro: Necessário preencher o campo Senha!")
            .required("Erro: Necessário preencher o campo Senha!")
            .min(6, "Erro: A senha deve ter no mínimo 6 caracteres!"),
        situationId: yup.number("Erro: Necessário preencher o campo situação!")
            .required("Erro: Necessário preencher o campo situaçãos!")
            .positive("Erro: Necessário preencher o campo situação!")
            .integer("Erro: Necessário preencher o campo situação!"),
    });

    const getSituation = async () => {
        const token = await AsyncStorage.getItem('@token');
        await api.get('/situations', {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            // console.log(response.data.situations)
            var listSituations = response.data.situations.map((situation) => {
                return { label: situation.nameSituation, value: situation.id }
            });

            setSituations(listSituations);
        }).catch((err) => {
            //console.log(err.response.data.message.toString());
            if (err.response) {
                setSituations({ label: err.response.data.message, value: "" })
            } else {
                setSituations({ label: "Nenhuma situação encontrada", value: "" })
            }
        });
    }

    useEffect(() => {
        getSituation();
    }, []);

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
                <LabelFormDash>* E-mail</LabelFormDash>
                <InputFormDash
                    placeholder="E-mail"
                    autoCorrect={false}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <LabelFormDash>* Senha</LabelFormDash>
                <InputFormDash
                    placeholder="Senha"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <LabelFormDash>* Situação </LabelFormDash>
                <DropDownPicker
                    placeholder='Selecione'
                    open={open}
                    value={situationId}
                    items={situations}
                    setOpen={setOpen}
                    setValue={setSituationId}
                    setItems={setSituations}
                    listMode="SCROLLVIEW"
                    dropDownContainerStyle={{
                        borderColor: '#1f51fe',
                        borderRadius: 6,
                    }}
                    textStyle={{
                        fontSize: 17,
                    }}
                    style={{
                        borderColor: '#1f51fe',
                        borderRadius: 6
                    }}
                />

                <TxtRequiredFormDash>* Campo obrigatório</TxtRequiredFormDash>
                <BtnSubmitFormDash onPress={addUser}>
                    <TxtSubmitFormDash>
                        Cadastrar
                    </TxtSubmitFormDash>
                </BtnSubmitFormDash>
                {loading &&
                    <LoadingArea>
                        <ActivityIndicator size="large" color='#f5f5f5' />
                    </LoadingArea>
                }
            </Container>
        </ScrollView>
    )
}