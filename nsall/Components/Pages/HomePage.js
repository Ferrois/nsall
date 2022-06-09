import {
  Box,
  Text,
  Center,
  ScrollView,
  Progress,
  Icon,
} from "native-base";
import useTimeLeft from "../../Hooks/useTimeLeft";
import HomeCard from "../UI/HomeCard";
import Ionicons from "react-native-vector-icons/Ionicons"

// const pageData = [{}]

function HomePage() {
  const timeLeft = useTimeLeft("December 17, 2022 03:24:00");
  return (
    <Box
      flex={1}
      bg={{
        linearGradient: {
          colors: ["#47039E", "#FFBA7A"],
          start: [1, 0],
          end: [0, 1],
        },
      }}
      safeArea
    >
      <Center>
        <ScrollView w="100%">
          <Center>
            <HomeCard icon={<Icon as={Ionicons} name="time-outline" size={"4xl"} color="yellow.600"/>} title="Countdown">
              <Text style={{ fontSize: 16, fontFamily: "sans-serif" }}>
                {timeLeft[4]}vdfa{100 - (timeLeft[4] * 100) / 63072000000}
              </Text>
              <Center w="100%">
                <Box w="100%">
                  <Progress
                    size="xl"
                    shadow={2}
                    mb={4}
                    value={(1 - timeLeft[4] / 63072000000) * 100}
                    mx="4"
                  />
                </Box>
              </Center>
            </HomeCard>
          </Center>
        </ScrollView>
      </Center>
    </Box>
  );
}

export default HomePage;
