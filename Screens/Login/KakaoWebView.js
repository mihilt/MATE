// Web View import
import { useEffect } from "react";
import { View } from 'react-native'
import { WebView } from 'react-native-webview';

export default function KakaoWebView() {
    useEffect(() => {
        fetchApi();
    }, [])
    async function fetchApi() {
        
    }
    return (
      <View style={{flex: 1, marginTop: 40, backgroundColor: 'blue'}}>
        <WebView 
          originWhitelist={['*']}
          scalesPageToFit={false}
          source = {{uri : 'https://kauth.kakao.com/oauth/authorize?client_id=235fc02960c0239e43b70d9e3fd2c9e6&redirect_uri=http://3.37.159.244:8080/kakaoLogin&response_type=code'}}
        />
      </View>
    );
}