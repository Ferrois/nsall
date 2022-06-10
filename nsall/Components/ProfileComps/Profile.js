import { Box, Center, ScrollView, Text } from "native-base";
import React from "react";
import Animated,{FadeInDown} from "react-native-reanimated";

export default function Profile() {
  return (
    <Box flex={1} safeArea>
      <ScrollView>
        <Center>
          <Animated.View entering={FadeInDown}>
            <Text fontSize={"3xl"}>Profile</Text>
          </Animated.View>
        </Center>
      </ScrollView>
    </Box>
  );
}
