import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import useFetch from './Hooks/useFetch.js'
import useTimeLeft from './Hooks/useTimeLeft.js';

export default function App() {
  // const [data] = useFetch("https://jsonplaceholder.typicode.com/todos")
  const [data] = useFetch("https://sandbox.api.myinfo.gov.sg/com/v3/person-sample/S9812381D")
  const timeLeft = useTimeLeft("December 17, 2022 03:24:00");
  return (
    <View style={styles.container}>
      <Text>our brand new ns app - ferrois</Text>
      <Text>Target date: December 17, 2022 03:24:00</Text>
      <Text>{timeLeft[0]}days, {timeLeft[1]}hours, {timeLeft[2]}minutes, {timeLeft[3]}seconds</Text>
      {/* <Text>{timeLeft}</Text> */}
      {/* <Text>{data && data.map((obj)=>{return(<Text key={obj.id}>id:{obj.id}  </Text>)})}</Text> */}
      {/* <Text>{JSON.stringify(data)}</Text> */}
      <StatusBar style="auto" />
    </View>
    // <NavigationContainer></NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
