import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Movie = ({ id, overView, date, poster }) => {
    return (
        <View style={{
            flex: 1, width: '100%',marginBottom: 100
        }} >
            <Text>{overView}</Text>
        </View>
    )
}

export default Movie

const styles = StyleSheet.create({})
