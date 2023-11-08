import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchSearchMovies, image185 } from "../api";
import Loader from "../components/loader";
const { width, height } = Dimensions.get("window");

export default function Search() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const handleSearch = (searchText) => {
    if (searchText && searchText.length > 3) {
      setIsLoading(true);
      fetchSearchMovies({
        query: searchText,
        include_adult: false,
        page: "1",
      }).then((data) => {
        setIsLoading(false);
        setResults(data.results);
      });
    } else {
      setResults([]);
      setIsLoading(false);
    }
  };
  const handleTextDobounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView className={"flex-1 bg-slate-900"}>
      <View
        className={
          "mx-4 mb-3 flex-row justify-between items-center border border-neutral-400 rounded-full"
        }
      >
        <TextInput
          onChangeText={handleTextDobounce}
          placeholder="SearchMovie"
          placeholderTextColor={"lightgray"}
          className={
            "pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide "
          }
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className={"rounded-full p-3 m-1 bg-neutral-400 "}
        >
          <XMarkIcon color={"white"} size={25} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <Loader />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className={"space-y-3"}
        >
          <Text className={"text-white font-semibold ml-1"}>
            Result ({results.length})
          </Text>
          <View className={"flex-row  justify-between flex-wrap"}>
            {results?.map((item) => (
              <TouchableNativeFeedback key={item.id}>
                <View className={"space-y-2 mb-4"}>
                  <Image
                    source={{ uri: image185(item.poster_path) }}
                    className={"rounded-3xl"}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text className={"text-gray-300 ml-1"} >
                    {item?.title?.length > 22
                      ? item.title.slice(0, 22) + "..."
                      : item.title}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            ))}
          </View>
        </ScrollView>
      ) : 
      <View>
        <Text className={"font-bold text-[25px] text-white text-center"}>Not found</Text>
        </View>}
    </SafeAreaView>
  );
}
