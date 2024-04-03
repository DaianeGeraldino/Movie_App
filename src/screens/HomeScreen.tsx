import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView, StatusBar, } from 'react-native';
import { upcomingMovies, nowPlayingMovies, popularMovies, baseImagePath, searchMovies } from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import { COLORS, SPACING, FONTSIZE, FONTFAMILY } from '../theme/theme';
import CategoryHeader from '../components/CategoryHeader';

const {width, height} = Dimensions.get('window');

const getNowPlayingMoviesLiest = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(" Alguma coisa deu errado no getNowPlayingMoviesLiest Função", error,);
  }
}

const getUpcomingMoviesLiest = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(" Alguma coisa deu errado no getUpcomingMoviesLiest Função", error,);
  }
}

const getPopularMoviesLiest = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(" Alguma coisa deu errado no getPopularMoviesLiest Função", error,);
  }
}


const HomeScreen = ({navigation}: any) => {
const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined)
  const [upcomingMoviesList, setUpComingMoviesList] = useState<any>(undefined)

  useEffect(()=> {
    (async() => {
      let tempNowPlaying = await getNowPlayingMoviesLiest();
      setNowPlayingMoviesList({...tempNowPlaying});

      let tempUpcoming = await getUpcomingMoviesLiest();
      setUpComingMoviesList({...tempUpcoming});

      let tempPopular = await getPopularMoviesLiest();
      setPopularMoviesList({...tempPopular});
    })();
  },[])


  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  }

  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upcomingMoviesList == undefined &&
    upcomingMoviesList == null
  ) {
    return (
    <ScrollView
      style={styles.container}
      bounces = {false}
      contentContainerStyle = {styles.scrollViewContainer}>
      <StatusBar hidden />

      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction}/>
      </View>

      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={COLORS.Orange}/>
      </View>
    </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces = {false}
      contentContainerStyle = {styles.scrollViewContainer}>
        <StatusBar hidden />

      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction}/>
      </View>

      <CategoryHeader title={'Passando agora'}/>
  </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
      display: 'flex',
      backgroundColor: COLORS.Black,
    },
    scrollViewContainer : {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    InputHeaderContainer: {
      marginHorizontal: SPACING.space_36,
      marginTop: SPACING.space_28,
    },
});

export default HomeScreen;