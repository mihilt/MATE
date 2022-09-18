// Web View import
import { useEffect, useState } from "react";
import { View } from 'react-native'
import { WebView } from 'react-native-webview';
import axios from "axios";

export default function KakaoWebView({navigation}) {

  const [ kakaoLoginData, setKakaoLoginData ] = useState({})
  
  useEffect(() => {
      fetchApi();
  }, [])
  
  
  async function fetchApi() {
      //const response = await axios.get('https://kauth.kakao.com/oauth/authorize?client_id=235fc02960c0239e43b70d9e3fd2c9e6&redirect_uri=http://3.37.159.244:8080/kakaoLoginOK');
      const resposne = await axios.get('http://3.37.159.244:8080/kakaoLoginOK');
      setKakaoLoginData(resposne.data);
      console.log("kakao webview data : ", resposne);
      if(resposne.data !== {}) {
        navigation.navigate("SignUpScreen", resposne.data);
      }
      
  }
  return (
    <View style={{flex:1,}}>
      <WebView 
        originWhitelist={['*']}
        scalesPageToFit={false}
        source = {{uri : 'https://kauth.kakao.com/oauth/authorize?client_id=235fc02960c0239e43b70d9e3fd2c9e6&redirect_uri=http://3.37.159.244:8080/kakaoLogin&response_type=code'}}
      />
    </View>
  );
}