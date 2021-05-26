import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
const LoadingFooter = ({ showUp = false }) => {
    if (!showUp) return null
    return (
        <View style={{
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignSelf: 'center',
            height: 50
        }} >
            <ActivityIndicator color="white" animating size={40} />
        </View>
    )
}

export default LoadingFooter

const styles = StyleSheet.create({})
