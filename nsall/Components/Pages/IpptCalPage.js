import {
  Box,
  Button,
  Center,
  HStack,
  Slider,
  Spinner,
  Text,
  VStack,
  Flex,
  ScrollView,
  Heading,
  Divider,
  Icon,
} from "native-base";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { StyleSheet } from "react-native";
import returnMinsec from "../../Helpers/returnMinsec";

export default function IpptCalPage({ navigation }) {
  const [age, setAge] = useState(20);
  const [pushups, setPushups] = useState(30);
  const [situps, setSitups] = useState(30);
  const [run, setRun] = useState(720);
  const [calcdata, setCalcdata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [data] = useFetch(
  //   "https://ippt.vercel.app/api?age=20&situps=30&pushups=30&run=720"
  // );
  const handleCalc = () => {
    setIsLoading(true);
    fetch(
      `https://ippt.vercel.app/api?age=${age}&situps=${situps}&pushups=${pushups}&run=${run}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCalcdata(data);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    handleCalc();
  }, []);
  return (
    <Box
      safeArea
      flex={1}
      bg={{
        linearGradient: {
          colors: ["emerald.500", "cyan.400"],
          start: [0.8, 0],
          end: [0.2, 0.9],
        },
      }}
      // justifyContent={"center"}
    ><ScrollView pt={"12"}>
      <Box p={4} bg={"gray.100"} rounded={"2xl"} mx={"4"} shadow={5} mb={32}>
        <VStack>
          <Center>
            <HStack
              mb={3}
              alignItems={"center"}
              // justifyContent={"space-between"}
              w={"100%"}
            >
              <Button
                
                onPress={() => {
                  navigation.navigate("HomePage");
                }}
                bg={"gray.100"}
              >
                <Icon
                as={AntDesign}
                name="back"
                size={"4xl"}
                color="black"
              />
              </Button>
              <Text fontSize={"2xl"} fontFamily={"Poppins"}>
                IPPT Calculator
              </Text>
            </HStack>
            <Divider />
            <VStack mt={"3"} w={"90%"} justifyContent={"space-between"}>
              <Text style={styles.text}>Age:</Text>
              <HStack justifyContent={"space-between"}>
                <Slider
                  w={"3/4"}
                  defaultValue={age}
                  minValue={18}
                  maxValue={60}
                  onChange={(val) => setAge(val)}
                  onValueChange={(val) => setAge(val)}
                  size="md"
                >
                  <Slider.Track>
                    <Slider.FilledTrack />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider>
                <Text>{age}</Text>
              </HStack>
            </VStack>
            <VStack
              w={"90%"}
              justifyContent={"space-between"}
              style={styles.stack}
            >
              <Text style={styles.text}>Push ups:</Text>
              <HStack justifyContent={"space-between"}>
                <Slider
                  w={"3/4"}
                  defaultValue={pushups}
                  minValue={0}
                  maxValue={60}
                  onChange={(val) => setPushups(val)}
                  onValueChange={(val) => setPushups(val)}
                  size="md"
                >
                  <Slider.Track>
                    <Slider.FilledTrack />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider>
                <Text>{pushups}</Text>
              </HStack>
            </VStack>
            <VStack
              w={"90%"}
              justifyContent={"space-between"}
              style={styles.stack}
            >
              <Text style={styles.text}>Sit ups:</Text>
              <HStack justifyContent={"space-between"}>
                <Slider
                  w={"3/4"}
                  defaultValue={situps}
                  minValue={0}
                  maxValue={60}
                  onChange={(val) => setSitups(val)}
                  onValueChange={(val) => setSitups(val)}
                  size="md"
                >
                  <Slider.Track>
                    <Slider.FilledTrack />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider>
                <Text>{situps}</Text>
              </HStack>
            </VStack>
            <VStack
              w={"90%"}
              justifyContent={"space-between"}
              style={styles.stack}
            >
              <Text style={styles.text}>Run:</Text>
              <HStack justifyContent={"space-between"}>
                <Slider
                  w={"3/4"}
                  defaultValue={run}
                  minValue={510}
                  maxValue={1100}
                  onChange={(val) => setRun(val)}
                  onValueChange={(val) => setRun(val)}
                  step={10}
                  size="md"
                >
                  <Slider.Track>
                    <Slider.FilledTrack />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider>
                <Text>
                  {returnMinsec(run)[0]}``{returnMinsec(run)[1]}`
                </Text>
              </HStack>
            </VStack>
            <Button
              onPress={() => handleCalc()}
              mt={"2"}
              height={"10"}
            >
              <Text fontWeight={"bold"} color="white">
                Calculate
              </Text>
            </Button>
            <Box w={"100%"} justifyContent={"space-between"}>
              {isLoading ? (
                <Spinner color="cyan.500" />
              ) : calcdata != null ? (
                <Box w={"100%"} justifyContent={"space-between"}>
                    <Flex direction="column" style={styles.container}>
                      <Heading size="md" mb={"2"}>
                        Result
                      </Heading>
                      <Box>
                        <Box
                          alignItems={"center"}
                          overflow="hidden"
                          borderColor="primary.400"
                          borderWidth="2"
                          bg="primary.200"
                        >
                          <Text style={styles.resulttext}>
                            Push up score: {calcdata.pushups.score}
                          </Text>
                        </Box>
                        <Box
                          alignItems={"center"}
                          overflow="hidden"
                          borderColor="primary.400"
                          borderWidth="2"
                          bg="primary.300"
                        >
                          <Text style={styles.resulttext}>
                            Sit up score: {calcdata.situps.score}
                          </Text>
                        </Box>
                        <Box
                          alignItems={"center"}
                          overflow="hidden"
                          borderColor="primary.400"
                          borderWidth="2"
                          bg="primary.200"
                        >
                          <Text style={styles.resulttext}>
                            Run score: {calcdata.run.score}
                          </Text>
                        </Box>
                        <Box
                          alignItems={"center"}
                          overflow="hidden"
                          borderColor="primary.400"
                          borderWidth="2"
                          bg="primary.300"
                        >
                          <Text style={styles.resulttext}>
                            Total score: {calcdata.total}
                          </Text>
                        </Box>
                        <Box
                          alignItems={"center"}
                          overflow="hidden"
                          borderColor="primary.400"
                          borderWidth="2"
                          bg="primary.200"
                        >
                          <Text style={styles.resulttext}>
                            Award: {calcdata.result.name}
                          </Text>
                        </Box>
                        <Box
                          alignItems={"center"}
                          overflow="hidden"
                          borderColor="primary.400"
                          borderWidth="2"
                          bg="primary.300"
                        >
                          <Text style={styles.resulttext}>
                            Cash Prize: {calcdata.result.cash}
                          </Text>
                        </Box>
                      </Box>
                    </Flex>
                  {/* <Text> Push up score: {calcdata.pushups.score} </Text>
                <Text> Sit up score: {calcdata.situps.score}</Text>
                <Text> Run score: {calcdata.run.score} </Text>
                <Text> Total score: {calcdata.total} </Text>
                <Text> Award: {calcdata.result.name} </Text>
                <Text> Cash Prize: {calcdata.result.cash}</Text> */}
                </Box>
              ) : null}
            </Box>
          </Center>
        </VStack>
      </Box></ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  resulttext: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
});
