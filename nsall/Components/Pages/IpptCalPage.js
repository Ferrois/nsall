import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  Slider,
  Spinner,
  Text,
  VStack,
  Flex,
  Spacer,
  ScrollView,
  Heading,
  Container,
} from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import returnMinsec from "../../Helpers/returnMinsec";
import useFetch from "../../Hooks/useFetch";

export default function IpptCalPage() {
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
    <Box safeArea>
      <VStack mt={"20"}>
        <Center>
          <HStack
            w={"90%"}
            justifyContent={"space-between"}
            style={styles.stack}
          >
            <Text style={styles.text}>Age:</Text>
            <Slider
              w={"3/4"}
              defaultValue={age}
              minValue={18}
              maxValue={60}
              onChange={(val) => setAge(val)}
              size="md"
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
            <Text>{age}</Text>
          </HStack>
          <HStack
            w={"90%"}
            justifyContent={"space-between"}
            style={styles.stack}
          >
            <Text style={styles.text}>Push ups:</Text>
            <Slider
              w={"3/4"}
              defaultValue={pushups}
              minValue={0}
              maxValue={60}
              onChange={(val) => setPushups(val)}
              size="md"
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
            <Text>{pushups}</Text>
          </HStack>
          <HStack
            w={"90%"}
            justifyContent={"space-between"}
            style={styles.stack}
          >
            <Text style={styles.text}>Sit ups:</Text>
            <Slider
              w={"3/4"}
              defaultValue={situps}
              minValue={0}
              maxValue={60}
              onChange={(val) => setSitups(val)}
              size="md"
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
            <Text>{situps}</Text>
          </HStack>
          <HStack
            w={"90%"}
            justifyContent={"space-between"}
            style={styles.stack}
          >
            <Text style={styles.text}>Run:</Text>
            <Slider
              w={"3/4"}
              defaultValue={run}
              minValue={510}
              maxValue={1100}
              onChange={(val) => setRun(val)}
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
          <Button
            onPress={() => handleCalc()}
            mt={"2"}
            height={"10"}
            width={"30%"}
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
                <ScrollView>
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
                </ScrollView>
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
    </Box>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  stack: {
    paddingTop: 10,
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
