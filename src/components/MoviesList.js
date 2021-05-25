import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { get_movies_list } from '../utilities/server_req'
import LoadingFooter from './LoadingFooter'
import Movie from './Movie'
import uuid from 'react-native-uuid';

const MoviesList = () => {
    const [curPage, setcurPage] = useState(1)
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)


    useEffect(() => {
        // setdata([])
        get_movies_of_cur_page()
        return () => {
            setdata([])
        }
    }, [])


    // function to get movies for current page
    async function get_movies_of_cur_page() {
        try {
            setloading(true)
            setcurPage(curPage + 1)
            const res = await get_movies_list(curPage + 1)
            setdata((cur_data) => {
                // i just need the id, date, img and overview
                let arr_of_data = res.data.results.map(item => ({
                    id: item.id,
                    overView: item.overview,
                    date: item.release_date,
                    poster: item.poster_path
                }))
                return [...cur_data, ...arr_of_data]
            })
            setloading(false)

        } catch (e) {
            console.log(e.message, 'from get cur movies')
        }
    }
    return (
        <FlatList
            style={styles.fList}
            data={data}
            renderItem={({ item }) => <Movie {...item} />}
            initialNumToRender = {7}
            onEndReached={() => get_movies_of_cur_page()}
            onEndReachedThreshold={.0000000001}
            ListFooterComponent={() => <LoadingFooter showUp={loading} />}
            keyExtractor={item => uuid.v4()}
            maxToRenderPerBatch = {10}
            updateCellsBatchingPeriod = {50}
        />
    )
}

export default MoviesList

const styles = StyleSheet.create({
    fList: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
})

