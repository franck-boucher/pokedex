import React from 'react'
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { List, ListItem, Avatar } from 'react-native-elements'

import { uppercaseFirstLetter, getPokemonId } from './util'

export default class PokemonList extends React.Component {
    static navigationOptions = {
        title: 'Pokedex',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#c0392b' }
    }
    state = {
        pokemons: []
    }
    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=10000')
            .then(response => response.json())
            .then(json => this.setState({ pokemons: json.results }))
    }
    keyExtractor = (item, index) => item.name
    renderRow = ({ item }) => <PokemonListItem pokemon={item} handlePress={this.handlePress} />
    handlePress = (pokemon) => this.props.navigation.navigate('Pokemon', { url: pokemon.url, title: uppercaseFirstLetter(pokemon.name) })
    render() {
        if (this.state.pokemons[0])
            return (
                <List style={styles.list}>
                    <FlatList
                        data={this.state.pokemons}
                        renderItem={this.renderRow}
                        keyExtractor={this.keyExtractor}
                    />
                </List>
            )

        return (
            <ActivityIndicator size='large' color='#c0392b' style={styles.activityIndicator} />
        )
    }
}

const PokemonListItem = ({ pokemon, handlePress }) =>
    <ListItem
        hideChevron
        key={pokemon.name}
        title={uppercaseFirstLetter(pokemon.name)}
        onPress={() => handlePress(pokemon)}
        avatar={<Avatar
            small
            source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png` }}
            title={pokemon.name}
        />}
    />

const styles = StyleSheet.create({
    list: {
        marginTop: 0
    },
    activityIndicator: {
        marginTop: 20
    }
})