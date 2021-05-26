import React, { useCallback, useEffect, useState } from 'react'
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
                // i just need the id, date, img and overview
                let arr_of_data = res.data.results.map(item => ({
                    id: item.id,
                    overView: item.overview,
                    date: item.release_date,
                    poster: item.poster_path
                }))
                return [...cur_data.concat(arr_of_data)]
            })
            setloading(false)

        } catch (e) {
            console.log(e.message, 'from get cur movies')
        }
    }
    // using usecallback hooks help me to increase performance cuz it's a big list
    const renderItem = useCallback(({ item }) => <Movie {...item} />, [data])
    const keyExtractor = useCallback(item => uuid.v4(), [])

    return (
        <View style = {styles.container} >
            <FlatList
                style={styles.fList}
                data={data}
                renderItem={renderItem}
                initialNumToRender={5}
                onEndReached={get_movies_of_cur_page}
                onEndReachedThreshold={.3}
                keyExtractor={keyExtractor}
                maxToRenderPerBatch={2}
                updateCellsBatchingPeriod={100}
                removeClippedSubviews = {true}
            />
            <LoadingFooter showUp={loading} />
        </View>
    )
}

export default React.memo(MoviesList)

const styles = StyleSheet.create({
    container : {
        flex : 1,
        width : '100%',
        height : '100%'
    },
    fList: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
})

