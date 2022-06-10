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
import Ionicons from "react-native-vector-icons/Ionicons";

// const pageData = [{}]

function HomePage() {
  const timeLeft = useTimeLeft("December 17, 2022 03:24:00");
  return (
    <Box
      flex={1}
      bg={{
        linearGradient: {
          colors: ["emerald.500", "cyan.400"],
          start: [0.8, 0],
          end: [0.2, 0.9],
        },
      }}
      safeArea
    >
      <Center>
        <ScrollView w="100%">
          <Center>
            <Text color={'white'} fontFamily="Poppins" fontSize={"5xl"} mb="5">Home</Text>
            <HomeCard
              icon={
                <Icon
                  as={Ionicons}
                  name="time-outline"
                  size={"4xl"}
                  color="yellow.600"
                />
              }
              title="Countdown"
            >
              <Text
                fontSize={"md"}
                color={"muted.500"}
                ml="4"
                mb="1"
                mt="2"
                fontFamily={"Poppins"}
              >
                Progress. . .
              </Text>
              <Center w="100%">
                  <Box w="100%">
                    <Progress
                      size="md"
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
