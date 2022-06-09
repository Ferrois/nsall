import { Box, StatusBar, View ,Text} from "native-base";
import { ProgressBarAndroidBase, StyleSheet,  } from "react-native";
import useTimeLeft from "../../Hooks/useTimeLeft";

function HomePage() {
  const timeLeft = useTimeLeft("December 17, 2022 03:24:00");
  return (
    <View style={styles.container}>
      <Text>our brand new ns app - ferrois</Text>
      <Text>Target date: December 17, 2022 03:24:00</Text>
      <Box
        // flex={1}
        rounded="sm"
        padding="2"
        bg={{
          linearGradient: {
            colors: ["#B10941", "#DC00E0"],
            start: [1, 0],
            end: [0, 1],
          },
        }}
      >

        <Text color={"white"}>
          {timeLeft[0]}days, {timeLeft[1]}hours, {timeLeft[2]}minutes,{" "}
          {timeLeft[3]}seconds
        </Text>
      </Box>
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
