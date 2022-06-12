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
} from "native-base";
import React, { useState } from "react";
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
  const [data] = useFetch(
    "https://ippt.vercel.app/api?age=20&situps=30&pushups=30&run=720"
  );
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
  return (
    <Box safeArea>
      <VStack mt={"20"}>
        <Center>
          <HStack w={"90%"} justifyContent={"space-between"}>
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
          <HStack w={"90%"} justifyContent={"space-between"}>
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
          <HStack w={"90%"} justifyContent={"space-between"}>
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
          <HStack w={"90%"} justifyContent={"space-between"}>
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
              {returnMinsec(run)[0]}.{returnMinsec(run)[1]}
            </Text>
          </HStack>
          <Button onPress={() => handleCalc()}>Calculate</Button>
          <Text>
            {isLoading ? (
              <Spinner color="cyan.500" />
            ) : calcdata != null ? (
             
              <Box> Award: {calcdata.result.name} </Box>
              
            ) : (
              JSON.stringify(data)
            )}
          </Text>
        </Center>
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    color: "black",
    
  },
})
