import { Button, ScrollView, Text, View } from 'react-native';
//importar o context para verificar se o usuario esta logado
import { Container, LabelFormDash, InputFormDash, BtnSubmitFormDash, TxtSubmitFormDash, TxtRequiredFormDash  } from '../../styles/custom';
import { useState } from 'react';

export default function AddUser (){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [situationId, setSituationId] = useState(4);

    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <Container>
                <LabelFormDash>* Nome</LabelFormDash>
                <InputFormDash 
                    placeholder="Nome completo"
                    autoCorrect= {false}
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <LabelFormDash>* E-mail</LabelFormDash>
                <InputFormDash 
                    placeholder="E-mail"
                    autoCorrect= {false}
                    keyboardType= "email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <LabelFormDash>* Senha</LabelFormDash>
                <InputFormDash 
                    placeholder="Senha"
                    autoCorrect= {false}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                <TxtRequiredFormDash>* Campo obrigatório</TxtRequiredFormDash>
                <BtnSubmitFormDash>
                    <TxtSubmitFormDash>
                        Cadastrar
                    </TxtSubmitFormDash>
                </BtnSubmitFormDash>
            </Container>
        </ScrollView>
    )
}