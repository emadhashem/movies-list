import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

const LoadingFooter = ({ showUp = false }) => {
    if (!showUp) return null
    return (
        <View style={{
            flex: 1, width: '100%',
            height: 50, backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent : 'center'
        }} >
            <ActivityIndicator color="white" animating size={40} />
        </View>
    )
}

export default LoadingFooter

const styles = StyleSheet.create({})
