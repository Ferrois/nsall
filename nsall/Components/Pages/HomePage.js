import { Box, StatusBar, View, Text, Center, ScrollView, Progress } from "native-base";
import useTimeLeft from "../../Hooks/useTimeLeft";
import HomeCard from "../UI/HomeCard";

const pageData = ["asdf", "asdf", "asdf", "asdf", "asdf", "asdf", "asdf"];

function HomePage() {
  // const timeLeft = useTimeLeft("December 17, 2022 03:24:00");
  return (
    <Center>
      <ScrollView>
<<<<<<< HEAD
        {pageData.map((str) => {
          return (
            <HomeCard>
              <Text>{str}</Text>
            </HomeCard>
          );
        })}
=======
        <HomeCard>
          <Text style={{fontSize: 16, fontFamily: 'sans-serif'}}>{timeLeft[4]}vdfa{100-timeLeft[4]*100/63072000000}</Text>
          <Center w="100%">
        <Box w="100%">
          <Progress size="xl" shadow={2} mb={4} value={(1-timeLeft[4]/63072000000)*100} mx="4" />
        </Box>
      </Center>
        </HomeCard>
>>>>>>> 50f849129b07feff822bd9689e1943985a76fa48
      </ScrollView>
    </Center>
  );
}

export default HomePage;
