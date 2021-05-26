import React, { useMemo, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Card } from 'react-native-elements'
import { custom_str } from '../utilities/helper'
const Movie = ({ title, overView, date, poster, id, get_movie_id = f => f }) => {
    const uri_of_poster = `http://image.tmdb.org/t/p/w185${poster}`
    const [moreText, setmoreText] = useState(false)
    const [showedText, setshowedText] = useState(custom_str(overView))
    return (
        <Card containerStyle={styles.conatiner}>
            <Card.Image source={{ uri: `http://image.tmdb.org/t/p/w185${poster}` }}>
            </Card.Image>
            <Card.Divider />
            <View style={styles.film_date_title} >
                <Text style={styles.title} >{title}</Text>
                <Text style={styles.date} >
                    {date}
                </Text>
            </View>
            <View style={styles.overView} >
                <Text style={[styles.overView, { height: (moreText) ? 'auto' : '100%' }]} >
                    {
                        showedText
                    }
                    {
                        (!moreText) &&
                        (<TouchableOpacity
                            onPress={() => {
                                get_movie_id(id)
                                setmoreText(true)
                                setshowedText(overView)
                            }}
                            style={styles.udr_btn_conatiner} >
                            <Text style={styles.udr_btn} >Show More</Text>
                        </TouchableOpacity>)
                    }
                    {
                        (moreText) &&
                        (<TouchableOpacity
                            onPress={() => {
                                get_movie_id(id)
                                setmoreText(false)
                                setshowedText(custom_str(overView))
                            }}
                            style={styles.udr_btn_conatiner} >
                            <Text style={styles.udr_btn} >Show Less</Text>
                        </TouchableOpacity>)
                    }
                </Text>
            </View>
        </Card>
    )
}

export default React.memo(Movie)

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
    },
    film_date_title: {
        flex: 1,
        width: '70%',
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
        marginBottom: 5
    },
    date: {
        flex: 1,
        alignItems: 'center',
    },
    overView: {

    },
    udr_btn_conatiner: {
        flex: 1,
    },
    udr_btn: {
        textDecorationLine: 'underline',

    }
})
