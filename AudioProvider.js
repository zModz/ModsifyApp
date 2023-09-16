import React, { Component, createContext } from 'react'
import {Text, View, Alert} from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import { DataProvider } from 'recyclerlistview'

export const AudioContext = createContext()
export class AudioProvider extends Component {
  constructor(props){
    super(props)
    this.state = {
      audioFiles: [],
      permissionError: false,
      dataProvider: new DataProvider((r1, r2) => r1 !== r2)
    }
  }

  getAudioFiles = async () => {
    const { dataProvider, audioFiles } = this.state
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio'
    })
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    })

    this.setState({...this.state, dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]), audioFiles: [...audioFiles, ...media.assets]})
  }

  getPermission = async () =>{
    const permission = await MediaLibrary.getPermissionsAsync()
    if(permission.granted){
        console.log("Access granted")
        this.getAudioFiles()
    }

    if(!permission.granted && permission.canAskAgain){
      const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync()

      if(status === 'denied' && canAskAgain){
        Alert.alert('You need to grant access for this app')
      }

      if (status === 'granted') {
        console.log("Access granted")
        this.getAudioFiles()
      }

      if (status === 'denied' && !canAskAgain) {
        // user has denied permissions and cannot ask again so handle appropriately
        this.setState({...this.state, permissionError: true})
      }
    }
  }

  componentDidMount(){
    this.getPermission()
  }

  render() {
    const { dataProvider, audioFiles, permissionError } = this.state
    if (permissionError) return (
        <View>
            <Text>You need to give this app permission to continue!</Text>
        </View>
    )
    return (
        <AudioContext.Provider value={{audioFiles, dataProvider}}>
            {this.props.children}
        </AudioContext.Provider>
    ) 
  }
}

export default AudioProvider