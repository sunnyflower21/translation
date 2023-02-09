import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "./src/Button.js";
import { useCookie } from "./src/hook/use-cookie.js";
import { useTranslation } from "./src/hook/use-translation.js";
import * as SplashScreen from "expo-splash-screen";
import LoadingView from "./src/LoadingView.js";
import LottieView from "lottie-react-native";
import { useFonts } from "expo-font";

//현재 기기의 설정 언어  구하기

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { t, locale, setLocale, format } = useTranslation();
  const { cookieKey } = useCookie();
  const y = new Date().getFullYear();
  const m = new Date().getMonth();
  const d = new Date().getDate();
  const [isLoaded, setIsLoaded] = useState(false);
  const todayText = format(t("today_is"), y, m, d);
  const locales = ["ko", "en", "ja", "zh", "es"];

  const [fontsLoaded] = useFonts({
    RIDIBatang: require("./assets/RIDIBatang.otf"),
  });

  useEffect(() => {
    if (cookieKey !== "") {
      setIsLoaded(true);
    }
  }, [cookieKey]);

  useEffect(
    () => {
      if (locale !== null) {
        SplashScreen.hideAsync();
      }
    },
    [locale],
    fontsLoaded
  );

  if (!isLoaded) return <LoadingView></LoadingView>;

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        source={require("./assets/background.json")}
        resizeMode="cover"
        style={{
          position: "absolute",
          zIndex: -1,
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <Text style={styles.todayText}>{todayText}</Text>
          <Text style={styles.cookieText}>{t(cookieKey)}</Text>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.buttonsContainer}>
            {locales.map((item) => (
              <Button
                key={item}
                onPress={() => setLocale(item)}
                isSelected={locale === item}
                text={item.toUpperCase()}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  todayText: {
    fontFamily: "RIDIBatang",
    position: "absolute",
    top: 70,
    fontSize: 13,
    color: "#8b658f",
  },
  cookieText: {
    fontFamily: "RIDIBatang",
    fontSize: 22,
    color: "#372538",
    textAlign: "center",
    marginHorizontal: 30,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 25,
  },
});
