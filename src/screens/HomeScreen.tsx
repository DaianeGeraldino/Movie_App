import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView, StatusBar, FlatList, } from 'react-native';
import { upcomingMovies, nowPlayingMovies, popularMovies, baseImagePath, searchMovies } from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import { COLORS, SPACING, FONTSIZE, FONTFAMILY } from '../theme/theme';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const {width, height} = Dimensions.get('window');

const getNowPlayingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(" Alguma coisa deu errado no getNowPlayingMoviesLiest Função", error,);
  }
}

const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(" Alguma coisa deu errado no getUpcomingMoviesLiest Função", error,);
  }
}

const getPopularMoviesList = async () => {
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
      let tempNowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList(tempNowPlaying.results);

      let tempPopular = await getPopularMoviesList();
      setPopularMoviesList(tempPopular.results);
      
      let tempUpcoming = await getUpcomingMoviesList();
      setUpComingMoviesList(tempUpcoming.results);
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

      <CategoryHeader title={'Em cartaz'}/>
      <FlatList 
        data={nowPlayingMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal
        contentContainerStyle={styles.containerGap36}
        renderItem={({item,index}) => (
          <MovieCard
          shouldMarginatedAtEnd={true}
          cardFunction={() => {
            navigation.push('MovieDetails', {movieid: item.id});
          }}
            cardWidth = {width * 0.7}
            isFirst= {index == 0 ? true : false}
            isLast = {index == nowPlayingMoviesList?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w780', item.poster_path)}/>
          )}
        />
      <CategoryHeader title={'Em alta'}/>
      <FlatList 
        data={popularMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal
        contentContainerStyle={styles.containerGap36}
        renderItem={({item,index}) => (
          <MovieCard
          shouldMarginatedAtEnd={true}
          cardFunction={() => {
            navigation.push('MovieDetails', {movieid: item.id});
          }}
            cardWidth = {width / 3}
            isFirst= {index == 0 ? true : false}
            isLast = {index == popularMoviesList?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}/>
          )}
        />
      <CategoryHeader title={'Em breve'}/>
      <FlatList 
        data={upcomingMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal
        contentContainerStyle={styles.containerGap36}
        renderItem={({item,index}) => (
          <MovieCard
          shouldMarginatedAtEnd={true}
          cardFunction={() => {
            navigation.push('MovieDetails', {movieid: item.id});
          }}
            cardWidth = {width / 3}
            isFirst= {index == 0 ? true : false}
            isLast = {index == upcomingMoviesList?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}/>
          )}
        />
  </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
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
  containerGap36: {
    gap: SPACING.space_36,
  },
});

export default HomeScreen;