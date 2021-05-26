import React, { useCallback, useEffect, useRef, useState } from 'react'
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
                // i just need the title, date, img and overview.
                // i usded uuid to get unique id cuz some movies have same id.
                let arr_of_data = res.data.results.map(item => ({
                    title: item.title,
                    overView: item.overview,
                    date: item.release_date,
                    poster: item.poster_path,
                    id: uuid.v4()
                }))
                return [...(cur_data.concat(arr_of_data))]
            })
            setloading(false)

        } catch (e) {
            console.log(e.message, 'from get cur movies')
        }
    }
    function get_movie_id(movie_id = "") {

    }
    // using usecallback hooks help me to increase performance cuz it's a big list.
    const renderItem = useCallback(({ item }) =>
        (<Movie {...item} get_movie_id={get_movie_id} />)
        , [data])

    const keyExtractor = useCallback(item => item.id, [])
    return (
        <View style={styles.container} >
            <FlatList
                style={styles.fList}
                data={data}
                renderItem={renderItem}
                initialNumToRender={15}
                onEndReached={get_movies_of_cur_page}
                onEndReachedThreshold={.1}
                keyExtractor={keyExtractor}
                maxToRenderPerBatch={7}
                updateCellsBatchingPeriod={30}
                removeClippedSubviews={true}
            />
            <LoadingFooter showUp={loading} />
        </View>
    )
}

export default React.memo(MoviesList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    fList: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
})

