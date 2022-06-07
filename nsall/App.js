import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import useFetch from './Hooks/useFetch.js'
import useTimeLeft from './Hooks/useTimeLeft.js';

export default function App() {
  const [data] = useFetch("https://jsonplaceholder.typicode.com/todos")
  const timeLeft = useTimeLeft("December 17, 2022 03:24:00");
  return (
    <View style={styles.container}>
      <Text>our brand new ns app - ferrois</Text>
      <Text>Target date: December 17, 2022 03:24:00</Text>
      <Text>{timeLeft[0]}days, {timeLeft[1]}hours, {timeLeft[2]}minutes, {timeLeft[3]}seconds</Text>
      <Text>{data && data.map((obj)=>{return(<Text key={obj.id}>id:{obj.id}  </Text>)})}</Text>
      <StatusBar style="auto" />
    </View>
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
