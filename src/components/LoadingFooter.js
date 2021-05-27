import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
const LoadingFooter = ({ showUp = false }) => {
    if (!showUp) return null
    return (
        <View style={styles.indicator_container} >
            <ActivityIndicator color="black" animating size={40} />
        </View>
    )
}
export default LoadingFooter
const styles = StyleSheet.create({
    indicator_container: {
        width: '100%',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        height: 50
    }
})
