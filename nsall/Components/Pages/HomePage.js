import {
  Box,
  Text,
  Center,
  ScrollView,
  Progress,
  Icon,
  HStack,
  Button,
  AspectRatio,
  Divider,
  VStack,
} from "native-base";
import useTimeLeft from "../../Hooks/useTimeLeft";
import HomeCard from "../UI/HomeCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import IpptCalPage from "./IpptCalPage";
import { socket } from "../../App";
import IpptRecPage from "./IpptRecPage";
// import { socket } from "../../App.js";

//Naviagator in the home widgets
const Stack = createNativeStackNavigator();

function Home() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IpptLB"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IpptRecords"
          component={IpptRecPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IpptGoal"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IpptCal"
          component={IpptCalPage}
          options={{ headerShown: true,headerBackVisible:true, title:"IPPT Score Calculator" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomePage({ navigation }) {
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
          <Center mb={"3"}>
            <Text color={"white"} fontFamily="Poppins" fontSize={"5xl"} mb="5">
              Home
            </Text>
            <CountdownCard />
            <IpptCard navigation={navigation} />
            <LeaveStatusCard />
            <Button onPress={()=>{socket.emit("hello")}}>fasdf</Button>
          </Center>
        </ScrollView>
      </Center>
    </Box>
  );
}

function CountdownCard() {
  const timeLeft = useTimeLeft("December 17, 2022 03:24:00");
  return (
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
      <Text>{timeLeft[0]}Days,{timeLeft[1]}Hours,{timeLeft[2]}Minutes,{timeLeft[3]}Seconds</Text>
    </HomeCard>
  );
}

const buttonData = [
  {
    id: 1,
    flex: 0.2,
    ratio: 1,
    borderRadius: "2xl",
    directory: "IpptLB",
    color: "yellow.300",
    label: "Rank",
    icon: (
      <Icon as={FontAwesome5} name="trophy" color={"yellow.500"} size={25} />
    ),
  },
  {
    id: 2,
    flex: 0.2,
    ratio: 1,
    borderRadius: "2xl",
    directory: "IpptRecords",
    color: "blue.400",
    label: "Record",
    icon: (
      <Icon as={FontAwesome5} name="list-ul" color={"gray.500"} size={25} />
    ),
  },
  {
    id: 3,
    flex: 0.2,
    ratio: 1,
    borderRadius: "2xl",
    directory: "IpptGoal",
    color: "red.400",
    label: "Target",
    icon: <Icon as={Feather} name="target" color={"light.300"} size={30} />,
  },
  {
    id: 4,
    flex: 0.4,
    ratio: 2,
    borderRadius: "2xl",
    directory: "IpptCal",
    color: "green.600",
    label: "Calculator",
    icon: (
      <Icon as={FontAwesome5} name="calculator" color={"light.300"} size={30} />
    ),
  },
];

function IpptCard({ navigation }) {
  const handlePress = (directory) => {
    navigation.navigate(directory);
  };
  return (
    <HomeCard
      icon={
        <Icon
          as={MaterialCommunityIcons}
          name="run-fast"
          color={"blue.800"}
          size={50}
        />
      }
      title="IPPT Record"
    >
      <HStack justifyContent={"space-between"}>
        <Text
          fontSize={"md"}
          color={"muted.500"}
          ml="4"
          mb="1"
          mt="2"
          fontFamily={"Poppins"}
        >
          Progress to target
        </Text>
        <Text
          fontSize={"md"}
          color={"yellow.700"}
          ml="4"
          mb="1"
          mt="2"
          fontFamily={"Poppins"}
          pr="4"
        >
          40 / 60 Pts
        </Text>
      </HStack>
      <Center w="100%">
        <Box w="100%">
          <Progress size="md" shadow={2} mb={4} value={4000 / 60} mx="4" />
        </Box>
      </Center>
      <Divider mb={4} />
      <HStack flex={1} space="2" mb={"3"}>
        {buttonData.map(
          ({
            id,
            flex,
            ratio,
            borderRadius,
            directory,
            color,
            label,
            icon,
          }) => {
            return (
              <VStack flex={flex} key={id}>
                <Center>
                  <Text color={"muted.500"} fontFamily="Poppins">
                    {label}
                  </Text>
                </Center>
                <AspectRatio ratio={ratio}>
                  <Button
                    bg={color}
                    borderRadius={borderRadius}
                    onPress={() => handlePress(directory)}
                  >
                    {icon || null}
                  </Button>
                </AspectRatio>
              </VStack>
            );
          }
        )}
      </HStack>
      
    </HomeCard>
  );
}

function LeaveStatusCard() {
  return (
    <HomeCard
      icon={<Icon as={AntDesign} name="form" size={50} />}
      title="Leaves Status"
    ></HomeCard>
  );
}


export default Home;
