import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales, locale } from "expo-localization";
import { I18n } from "i18n-js";
import { InteractionManager } from "react-native";
import { format } from "react-string-format";

//파일의 key 값이 같아야함
const ko = require("../lang/lang.ko.json");
const en = require("../lang/lang.en.json");
const ja = require("../lang/lang.ja.json");
const zh = require("../lang/lang.zh.json");
const es = require("../lang/lang.es.json");

//I18n : i 와 n 사이에 18글자가 존재한다 . 각각의 언어마다 키값을 성정해줌

const i18n = new I18n({
  ko,
  en,
  ja,
  zh,
  es,
});

//default
i18n.enableFallback = true;
i18n.defaultLocale = "ko";

//기기에 설정된 첫번 째 언어를
const deviceLanguage = getLocales()[0].languageCode;
const LOCALE_KEY = "locale";

export const useTranslation = () => {
  const [locale, _setLocale] = useState(null);

  const setLocale = (v) => {
    _setLocale(v);
    AsyncStorage.setItem(LOCALE_KEY, v);
  };

  const init = async () => {
    const fs = await AsyncStorage.getItem(LOCALE_KEY);
    if (fs !== null) {
      _setLocale(fs);
    } else {
      _setLocale(deviceLanguage);
    }
  };

  useEffect(() => {
    init();
  }, []);
  return {
    locale,
    setLocale,
    t: (scope) => i18n.t(scope, { locale }),
    format,
  };
};
