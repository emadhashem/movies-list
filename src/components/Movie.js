import React, { useMemo, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Card } from 'react-native-elements'
import { custom_str } from '../utilities/helper'
const Movie = ({ title, overView, date, poster, id, get_movie_id = f => f }) => {
    const uri_of_poster = `http://image.tmdb.org/t/p/w185${poster}`
    // moretext is state for showing all overview or some of it
    const [moreText, setmoreText] = useState(false)
    const [curOverView, setcurOverView] = useState(custom_str(overView))
    return (
        <Card containerStyle={styles.conatiner}>

            <Card.Image style={styles.img}
                resizeMode='contain'
                source={{ uri: uri_of_poster }}>
            </Card.Image>
            
            <Card.Divider />

            <View style={styles.date_title} >
                <Text style={styles.title} >{title}</Text>
                <Text style={styles.date} > {date} </Text>
            </View>

            <View style={styles.overView} >
                <Text style={[styles.overView, { height: (moreText) ? 'auto' : '100%' }]} >
                    {
                        curOverView
                    }
                    {
                        (!moreText && custom_str(overView) !== overView) &&
                        (<TouchableOpacity
                            onPress={() => {
                                get_movie_id(id)
                                setmoreText(true)
                                setcurOverView(overView)
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
                                setcurOverView(custom_str(overView))
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
    date_title: {
        flex: 1,
        width: '70%',
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center'
    },
    img: {
        marginBottom: 15
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
