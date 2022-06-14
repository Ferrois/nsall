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
  Flex,
  FlatList,
  Heading,
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
import IpptRecPage from "./IpptRecPage";
import { useContext, useEffect } from "react";
import { socket } from "../../Helpers/socket";
import { StyleSheet } from "react-native";
import { StoreContext } from "../../Store/StoreContext";
import { SafeAreaView } from "react-native-safe-area-context";
import IpptTGPage from "./IpptTGPage";

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
          name="IpptRecords"
          component={IpptRecPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IpptGoal"
          component={IpptTGPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IpptCal"
          component={IpptCalPage}
          options={{
            headerShown: false,
            // headerBackVisible: true,
            // title: "IPPT Score Calculator",
          }}
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
    >
      <Center>
        <ScrollView w="100%">
          <Center mb={"20"}>
            <Text
              color={"white"}
              fontFamily="Poppins"
              fontSize={"5xl"}
              mb="3"
              mt="10"
            >
              Home
            </Text>
            <CountdownCard />
            <IpptCard navigation={navigation} />
            <LeaveStatusCard />
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
      title="Countdown to ORD"
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
      <Flex direction="row">
        <Text style={styles.text1}> {timeLeft[0]}</Text>
        <Text style={styles.text2}> Days</Text>
        <Text style={styles.text1}> {timeLeft[1]} </Text>
        <Text style={styles.text2}> Hours</Text>
        <Text style={styles.text1}> {timeLeft[2]}</Text>
        <Text style={styles.text2}> Mins</Text>
        <Text style={styles.text1}> {timeLeft[3]}</Text>
        <Text style={styles.text2}> Secs</Text>
      </Flex>
    </HomeCard>
  );
}

const buttonData = [
  {
    id: 2,
    flex: 0.25,
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
    flex: 0.25,
    ratio: 1,
    borderRadius: "2xl",
    directory: "IpptGoal",
    color: "red.400",
    label: "Target",
    icon: <Icon as={Feather} name="target" color={"light.300"} size={30} />,
  },
  {
    id: 4,
    flex: 0.5,
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
  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;
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
          40 / {store.userInfo.ippt.goal} Pts
        </Text>
      </HStack>
      <Center w="100%">
        <Box w="100%">
          <Progress size="md" shadow={2} mb={4} value={40*100 / store.userInfo.ippt.goal} mx="4" />
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
  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;
  return (
    <HomeCard
      icon={<Icon as={AntDesign} name="form" size={50} />}
      title="Leave Status"
    >
      {store.userInfo.leaves.length != 0 ? (
        store.userInfo.leaves.map(({ date, status_, reason }) => {
          const dayDate = new Date(date);
          return (
            <Box w={"100%"} justifyContent={"space-between"} key={reason}>
              <ScrollView>
                <Flex direction="column" style={styles.container}>
                  <Box w={"100%"}>
                    <Box
                      alignItems={"center"}
                      overflow="hidden"
                      borderColor="primary.400"
                      borderWidth="2"
                      bg="primary.200"
                    >
                      <Text style={styles.resulttext}>
                        {dayDate.toDateString()}
                      </Text>
                    </Box>
                    <Box
                      alignItems={"center"}
                      overflow="hidden"
                      borderColor="primary.400"
                      borderWidth="2"
                      bg="primary.300"
                    >
                      <Text style={styles.resulttext}>Status: {status_}</Text>
                    </Box>
                    <Box
                      alignItems={"center"}
                      overflow="hidden"
                      borderColor="primary.400"
                      borderWidth="2"
                      bg="primary.200"
                    >
                      <Text style={styles.resulttext}>{reason}</Text>
                    </Box>
                  </Box>
                </Flex>
              </ScrollView>
            </Box>
          );
        })
      ) : (
        <Text color={"muted.400"} fontSize={"md"}>
          No data available
        </Text>
      )}
    </HomeCard>
  );
}

const styles = StyleSheet.create({
  text1: {
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 10,
  },
  text2: {
    fontSize: 15,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  resulttext: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
});
export default Home;
