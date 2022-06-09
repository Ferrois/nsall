import { Box, StatusBar, View, Text, Center, ScrollView } from "native-base";
import useTimeLeft from "../../Hooks/useTimeLeft";
import HomeCard from "../UI/HomeCard";

const pageData = [
  "asdf",
  "asdf",
  "asdf",
  "asdf",
  "asdf",
  "asdf",
  "asdf" 
]

function HomePage() {
  const timeLeft = useTimeLeft("December 17, 2022 03:24:00");
  return (
    <Center>
      <ScrollView>
        <HomeCard>
          <Text>Fuck u</Text>
        </HomeCard>
      </ScrollView>
    </Center>
  );
}

export default HomePage;
