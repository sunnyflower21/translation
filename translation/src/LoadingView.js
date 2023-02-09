import LottieView from "lottie-react-native";
import { View } from "react-native";

export default () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        autoPlay={true}
        style={{ width: 150, height: 200, backgroundColor: "#eee" }}
        source={require("../assets/loading.json")}
      ></LottieView>
    </View>
  );
};
