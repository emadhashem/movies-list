import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MoviesList from './src/components/MoviesList';
import { get_movies_list } from './src/utilities/server_req';
export default function App() {
  // useEffect(() => {
  //   get_movies_list(2)
  //   .then(res => {
  //     console.log(res.data)
  //   })
  // }, [])
  return (
    <SafeAreaView style={styles.container}>
      <MoviesList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
