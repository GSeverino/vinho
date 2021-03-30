
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, Animated, ImageBackground, Alert} from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import axios from 'axios'; // npm i axios
import AsyncStorage from '@react-native-community/async-storage';

export default function Login({navigation}) {

const api = 'http://192.168.100.88/react/LabSystem/apilabsystem/'; 
  /*const api = 'http://192.168.0.103/react/LabSystem/apilabsystem/'; */

const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');  

const[offset] = useState(new Animated.ValueXY({x:0, y:90}));
const[opac] = useState(new Animated.Value(0));


const storeData = async (value) => {
try {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem('@storage_Key', jsonValue)
} catch (e) {
  // saving error
}
}

const mensagemDadosIncorretos = () =>
Alert.alert(
  "Erro ao Logar",
  "E-mail e senha divergentes.",
  [
    { text: "OK"  }
  ],
  { cancelable: true }
);    


    
    async function logar(){
      //navigation.navigate('Home');
      const obj = {email, senha};
      const res = await axios.post(api + 'login.php', obj);
      
      if(res.data.retorno === 'Dados corretos!'){
         
          //alert(res.data.obj.nome);
          storeData(res.data.obj);

          if(res.data.obj.nivel === 'admin'){

            navigation.navigate('MenuAdmin', {nome: res.data.obj.nome});

          }else if(res.data.obj.nivel === 'ocp'){

            navigation.navigate('Menu', {nome: res.data.obj.nome});

          }
          
        
      }else if(res.data.retorno === 'Dados incorretos!'){
          mensagemDadosIncorretos();
      }
      else{
          alert('Erro ao conectar com o banco de dados!')
      }
    }
  

  useEffect(()=> {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue:0, 
        speed:4,
        bounciness:20
      }),
      Animated.timing(opac, {
        toValue:1,
        duration:1000,
      })
    ]).start();
   
  }, []);

  
  
  return(
      
    <ImageBackground source={require('../../../assets/img/fundo1.jpg')} style={styles.imgBg} >          
      <KeyboardAvoidingView 
          style={styles.background}>
        <View style={styles.logo}>
          <Image style={{width:320}} resizeMode = "contain" source={require('../../../assets/img/logo1.jpg')}></Image>
        </View>

        <Animated.View 
        style={[styles.formulario,
          {
            opacity: opac,
            transform: [{translateY: offset.y}]
          }
        
        ]}>
          
          <TextInput 
            style={styles.input}
            placeholder="Insira seu Email"
            type='email'
            dataCorrect={false}
            value={email}
            onChangeText={(email)=> setEmail(email)}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            dataCorrect={false}
            value={senha}
            onChangeText={(senha)=> setSenha(senha)}
          />
          
          <View style={styles.viewBotao}>
            <TouchableOpacity 
            style={styles.botao}
            onPress={() => logar()}>
            <Text style={styles.textoBotao}>Logar</Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity 
            style={styles.botaoRecuperar}
            onPress={() => navigation.navigate('RecuperarSenha')}>
            <Text style={styles.textoRecuperar}>Recuperar Senha</Text>
          </TouchableOpacity>

        </Animated.View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    //backgroundColor: '#191919',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    flex: 1,
    
    justifyContent: 'center',
  },

  formulario: {
    flex: 1,
    paddingBottom:30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop:-50
  },

  input: {
    backgroundColor: '#FFF',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding:10,
    width: '90%'
  },

  viewBotao:{
    width: '90%',
    borderRadius: 7,
  },

  botao: {
    backgroundColor: 'maroon',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 7,
    padding:10,
    
    
  },
  textoBotao:{
    color:'white',
    fontSize:18
  },

  botaoRecuperar:{
    marginTop:20,
  },

  textoRecuperar:{
    color:'black',
    
  },

  imgBg:{
    flex:1,
    width: null,
    height: null,
    opacity: 1,
    justifyContent: "flex-start",
    backgroundColor: '#000'
  },
});
