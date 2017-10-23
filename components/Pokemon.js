import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native'
import { Badge, Divider } from 'react-native-elements'

import { uppercaseFirstLetter, getPokemonId } from './util'

export default class Pokemon extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#c0392b' }
    })
    state = {
        pokemon: {
            types: [],
            species: {}
        },
        pokemonFetched: false,
        description: '',
        descriptionFetched: false
    }
    componentDidMount() {
        fetch(this.props.navigation.state.params.url)
            .then(response => response.json())
            .then(json => this.setState({ pokemon: json, pokemonFetched: true }))

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${getPokemonId(this.props.navigation.state.params.url)}/`)
            .then(response => response.json())
            .then(json => this.setState({
                descriptionFetched: true,
                description: json.flavor_text_entries.filter(entries => entries.language.name === 'en')[0].flavor_text
            }))
    }
    render() {
        const { pokemon, description, pokemonFetched, descriptionFetched } = this.state
        const types = pokemon.types.map(typeItem =>
            <Badge key={typeItem.type.name} containerStyle={styles.badge}>
                <Text style={{ color: '#c0392b' }}>{uppercaseFirstLetter(typeItem.type.name)}</Text>
            </Badge>
        )
        if (pokemonFetched && descriptionFetched)
            return (
                <View style={styles.conteiner}>

                    <View style={[styles.header]}>
                        <View style={[styles.baseView, styles.header_img]}>
                            <Image source={{ uri: pokemon.sprites.front_default }} style={{ width: 100, height: 100 }} />
                            <Text style={{ fontWeight: 'bold' }}>#{pokemon.id}</Text>
                        </View >
                        <View style={[styles.baseView, styles.header_dsc]}>
                            {types}
                        </View >
                    </View >

                    <Divider style={{ backgroundColor: '#c0392b', margin: 20 }} />

                    <View style={[{ marginRight: 30, marginLeft: 30 }]}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Description</Text>
                        <Text>{description}</Text>
                    </View >

                    <Divider style={{ backgroundColor: '#c0392b', margin: 20 }} />

                </View >
            )

        return (
            <ActivityIndicator size='large' color='#c0392b' style={styles.activityIndicator} />
        )
    }
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        flexDirection: 'column'
    },
    baseView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flexDirection: 'row'
    },
    header_img: {
        flexDirection: 'column'
    },
    header_dsc: {
        flex: 2,
        flexDirection: 'row'
    },
    badge: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#c0392b',
        marginRight: 10,
        marginLeft: 10
    },
    activityIndicator: {
        marginTop: 20
    }
})