import * as Font from "expo-font";

export default useFont = async (callBackFunction) => {
  await Font.loadAsync({
    Poppins: require("./../assets/Fonts/Poppins-Regular.ttf"),
  });
  return callBackFunction();
};
