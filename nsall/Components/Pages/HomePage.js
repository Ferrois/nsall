import { StatusBar, View } from "native-base";
import { StyleSheet, Text } from "react-native";
import useTimeLeft from "../../Hooks/useTimeLeft";

function HomePage() {
  const timeLeft = useTimeLeft("December 17, 2022 03:24:00");
  return (
    <View style={styles.container}>
      <Text>our brand new ns app - ferrois</Text>
      <Text>Target date: December 17, 2022 03:24:00</Text>
      <Text>
        {timeLeft[0]}days, {timeLeft[1]}hours, {timeLeft[2]}minutes,{" "}
        {timeLeft[3]}seconds
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomePage;
