uppercaseFirstLetter = (string) => string ? string.charAt(0).toUpperCase() + string.slice(1) : string

getPokemonId = (url) => {
    const urlArray = url.split('/')
    return urlArray[urlArray.length - 2]
}

module.exports = { uppercaseFirstLetter, getPokemonId }