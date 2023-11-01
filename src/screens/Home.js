import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  fetchPopularMovie,
  fetchTopRatedMovie,
  fetchTrendingMovie,
  fetchUpcomingMovie,
} from "../api";
import TrendingMovie from "../components/trending-movies";
import UpcomingMovie from "../components/upcoming-movie";
import TopRatedMovie from "../components/top-rated";
import Loader from "../components/loader";

export default function Home({ navigation }) {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopularMovie] = useState([]);
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    getTrendingMovie();
    getUpcomingMovie();
    getTopRatedMovie();
    getPopularMovie();
  }, []);

  const getTrendingMovie = async () => {
    const data = await fetchTrendingMovie();
    setTrending(data.results);
    setIsLoader(false);
  };

  const getUpcomingMovie = async () => {
    const data = await fetchUpcomingMovie();
    setUpcoming(data.results);
  };

  const getTopRatedMovie = async () => {
    const data = await fetchTopRatedMovie();
    setTopRated(data.results);
  };

  const getPopularMovie = async () => {
    const data = await fetchPopularMovie();
    setPopularMovie(data.results);
  };
  return (
    <View className="flex-1 bg-slate-950">
      <SafeAreaView>
        <StatusBar style="light" />
        <View
          className={
            "flex-row justify-between items-center mx-4 py-4 border-b-2"
          }
        >
          <Image
            className={"w-[70px] h-[70px]"}
            source={require("../../assets/logo5.png")}
            width={10}
            height={10}
            alt="logo"
          />
          <MagnifyingGlassIcon size={30} strokeWidth={2} color={"white"} />
        </View>
      </SafeAreaView>
      {isLoader ? (
        <Loader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {trending.length > 0 && <TrendingMovie trending={trending} />}
          {upcoming.length > 0 && (
            <UpcomingMovie upcoming={upcoming} title={"Upcoming movie"} />
          )}
          {upcoming.length > 0 && (
            <UpcomingMovie
              upcoming={trending.reverse()}
              title={"Trending movie"}
            />
          )}
          {popular.length > 0 && (
            <UpcomingMovie upcoming={popular} title={"Popular movie"} />
          )}
          {topRated.length > 0 && <TrendingMovie trending={topRated} />}
        </ScrollView>
      )}
    </View>
  );
}
