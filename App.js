import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function App() {
  const [estado, setarEstado] = useState('leitura')
  const [anotacao, setarAnotacao] = useState('')
  const [anotacao2, setarAnotacao2] = useState('Exemplo 05')
  const [notaParaEditar, setarNotaParaEditar] = useState('')
  const [arrNotes, setArrNotes] = useState([])

  useEffect(()=>{

    // Quando inicializar p app ler anotações

    (async () => {
      try {
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
        setarAnotacao(anotacaoLeitura)
      } catch (error) {
        console.log("Erro ao ler anotações " + error)
      }
    })();

  },[])
  
  const setData = async() => {
    try{
      await AsyncStorage.setItem('anotacao', anotacao)
    } catch(error){
      console.log(error)
    }

    alert('Sua anotação foi salva com sucesso.')
  }

  function atualizarTexto(){
    setData()
    setarEstado('leitura')
  }

  function editarNota(texto){
    setarEstado('atualizando')
    setarNotaParaEditar(texto)
  }
  
  if (estado == "leitura"){
    return (
      <View style={styles.container}>

      <StatusBar hidden></StatusBar>

        <View style={styles.header}>
          <Text style={styles.textHeader}>Annotys</Text>
        </View>

          <ScrollView>
            <View style={styles.containerNote}>
            {
              (anotacao != '' || anotacao2 != '')?
              <View>
                <Text onPress={()=>editarNota(anotacao)} style={styles.notePainel}>{anotacao}</Text>
                <Text onPress={()=>editarNota(anotacao2)} style={styles.notePainel}>{anotacao2}</Text>
              </View>
              :
              <View><Text style={{textAlign: 'center', opacity: 0.3}}>Nenhuma anotações encontrada!</Text></View>
            }
            </View>
          </ScrollView>

        <TouchableOpacity style={styles.btnNote} onPress={()=>{setarEstado('atualizando')}}>
          {
            (anotacao != '' || anotacao2 != '')?
            <Icon name="file-edit-outline" size={50} color="#eb4034"></Icon>
            :
            <Icon name="file-plus" size={50} color="#eb4034"></Icon>
          }
        </TouchableOpacity>
      </View>
    );
  } else if ('atualizando'){
    return (
      <View style={styles.container}>

          <StatusBar hidden></StatusBar>

          <View style={styles.header}>
            <Text style={styles.textHeader}>Annotys</Text>
          </View>

          <ScrollView>
            <View style={styles.containerNote}>
              <TextInput autoFocus={true} onChangeText={(text) => setarAnotacao(text)} multiline={true} numberOfLines={10} autoCorrect={false} value={anotacao} style={styles.noteEdit}></TextInput>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.btnNote} onPress={()=>{atualizarTexto()}}>
            <Icon name="content-save-edit-outline" size={50} color="#eb4034"></Icon>
          </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop: 0,
    height: '100%'
  },
  header:{
    width: '100%',
    padding: 10,
    backgroundColor: '#eb4034',
  },
  textHeader: {
    color: 'white',
    fontSize: 19.5,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  containerNote:{
    padding: 15 
  },
  note: {
    fontSize: 16,
    textAlignVertical: 'top',
    height: 450,
  },  
  notePainel: {
    fontSize: 16,
    textAlignVertical: 'top',
    height: 33,
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1,
    padding: 5
  },
  noteEdit:{
    fontSize: 16,
    textAlignVertical: 'top',
    height: 450,
    backgroundColor: 'yellow'
  },
  btnNote:{
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    borderRadius: 25
  },
  btnPlus:{
    color: 'white',
    position: 'relative', 
    textAlign: 'center',
    marginTop: -5,
    fontSize: 40
  },
})