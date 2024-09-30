import styled from "styled-components";

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #10101c;
`;
export const Logo = styled.View`
    padding-bottom: 20px;
`;
export const ImgLogo = styled.Image`
    width: 120px;
    height: 120px;
`;
export const InputForm = styled.TextInput`
    background-color: #f5f5f5;
    width: 90%;
    margin-bottom: 15px;
    color: #10101c;
    font-size: 18px;
    border-radius: 20px;
    padding: 10px;
`;
export const BtnSubmitForm = styled.TouchableOpacity`
    background-color: #1f51fe;
    width: 90%;
    height: 45px;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
`;
export const TxtSubmitForm = styled.Text`
    color: #f5f5f5;
    font-size: 22px;
`;
export const LinkNewUser = styled.Text`
    color: #1f51fe;
    margin-top: 10px;
    font-size: 18px;
`;