import styled from "styled-components";

export const ContainerLogin = styled.SafeAreaView`
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

export const LoadingArea = styled.View`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.6);
    align-items: center;
    justify-content: center;
`;
export const Container = styled.SafeAreaView`
    flex: 1;
    padding: 8px;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #fff;
    align-self: stretch;
`;

export const List = styled.View`
    width: 95%;
`;
export const RowData = styled.View`
    background-color: #f5f5f5;
    padding: 10px;
    margin: 5px 0;
    border-radius: 6px;
    flex-direction: row;
    justify-content: flex-start;
`;
export const InfoData = styled.Text`
    color: #111;
    flex: 1;
    flex-direction: column;
`;
export const ValueData = styled.Text`
    font-size: 16px;
    flex: 0;
`;
export const BtnView = styled.Text`
    justify-content: flex-end;
`;