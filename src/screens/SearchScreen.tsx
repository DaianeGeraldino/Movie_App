import React, {useState} from 'react';
import { Text, View, StyleSheet, Dimensions, StatusBar, FlatList,  } from 'react-native';
import { COLORS } from '../theme/theme';
import { searchMovies } from '../api/apicalls';

const SearchScreen = () => {

  const [searchList, setSearchList] = useState({})

  const searchMoviesFunction = async (name: string) => {
    try {
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setSearchList(json.results);
    } catch (error){
      console.error("Alguma coisa deu errado no searchMoviesFunction ")
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <FlatList
        data={searchList}
        keyExtractor={(item: any) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shoudlMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />

    </View>
  );
};

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      width,
      alignItems: 'center',
      backgroundColor: COLORS.Black,
    },
});

export default SearchScreen;