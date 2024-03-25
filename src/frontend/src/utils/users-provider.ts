// Funciones de acceso a la API de usuarios.

import { Pokemon } from "~/models/Pokemon"

// Obtiene todos los pokemons
export const getPokemons = async (): Promise<Pokemon[]>  => {
    try {
        const response = await fetch('http://localhost:8000/pokemons/')
        const pokemons = response.json()
        return pokemons
    } catch (error) {
        console.error(error)
    }

    return <Pokemon[]><unknown>null
}

// Obtiene los pokemons salvajes
export const getSalvajes = async (): Promise<Pokemon[]>  => {
    try {
        const response = await fetch('http://localhost:8000/pokemons/salvajes/')
        const salvajes = response.json()
        return salvajes
    } catch (error) {
        console.error(error)
    }

    return <Pokemon[]><unknown>null
}

// Obtiene los pokemons no salvajes
export const getNoSalvajes = async (): Promise<Pokemon[]>  => {
    try {
        const response = await fetch('http://localhost:8000/pokemons/noSalvajes/')
        const noSalvajes = response.json()
        return noSalvajes
    } catch (error) {
        console.error(error)
    }

    return <Pokemon[]><unknown>null
}

// Añade un pokemon.
export const addPokemon = async (pokemon: Pokemon)  => {
    try {
        await fetch('http://localhost:8000/pokemons/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pokemon),
        })
        
    } catch (error) {
        console.error(error)
    }
}

// Modifica un pokemon.
export const updatePokemon = async (id: string, pokemon: Pokemon)  => {
    try {
        await fetch(`http://localhost:8000/pokemons/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pokemon),
        })
        
    } catch (error) {
        console.error(error)
    }
}


// Elimina un usuario.
export const deletePokemon = async (id: string)  => {
    try {
        await fetch(`http://localhost:8000/pokemons/${id}`,
        {
            method: 'DELETE',
        })
    } catch (error) {
        console.error(error)
    }
}