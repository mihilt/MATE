import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function Login({ navigation }) {
  return (
    // Title
    <View style={styles.container}>
      <View style={styles.text1}>
        <Text style={{fontWeight: 'bold', fontSize: 64, color: '#FFFFFF',}}>MATE</Text> 
      </View>
      
      <View style={styles.login}>
        <View style={{marginBottom: 15,}}>
          <TouchableOpacity onPress={() => navigation.navigate("StudendNumberLoginScreen")}>
            <Text style= {{height: 45, paddingHorizontal: 85, paddingVertical: 5,  backgroundColor: "#315EFF", color: "#FFFFFF", fontSize: 30, alignItems: 'center'}}>학번 로그인</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Text style= {{height: 45, paddingHorizontal: 72, paddingVertical: 5,  backgroundColor: "#FEE500", fontSize: 30, alignItems: 'center'}}>카카오 로그인</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text1: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#315EFF',
    borderBottomLeftRadius: 64, // borderRadius -> borderBottomLeftRadius, borderTopLeftRadius,...

  },
  login: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
export default Login;