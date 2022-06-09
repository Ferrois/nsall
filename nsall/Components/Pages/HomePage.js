import { Box, StatusBar, View, Center, Text, ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import useTimeLeft from "../../Hooks/useTimeLeft";

function HomePage() {
  // const timeLeft = useTimeLeft("December 17, 2022 03:24:00");
  return (
    <Center>
      <ScrollView minHeight={"12"}>

      </ScrollView>
    </Center>
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
