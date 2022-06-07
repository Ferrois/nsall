import { Text, View } from 'react-native'
import React from 'react'
import { Button } from 'native-base'

export default function LoginPage({navigation}) {
  return (
    <View>
        <Text>Login page</Text>
        <Button onPress={()=> navigation.navigate("Interface")}><Text>Bring you to app interface</Text></Button>
    </View>
  )
}
