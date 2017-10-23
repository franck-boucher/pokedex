import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'

import PokemonList from './components/PokemonList'
import Pokemon from './components/Pokemon'

const Routes = StackNavigator({
    PokemonList: { screen: PokemonList },
    Pokemon: { screen: Pokemon }
})

export default class App extends React.Component {
    render() {
        return <Routes />
    }
}