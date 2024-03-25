import { component$, useStore, useTask$, useVisibleTask$, $, useSignal } from '@builder.io/qwik';
import { Pokemon } from '~/models/Pokemon';
import { addPokemon, deletePokemon, getNoSalvajes, getSalvajes, getPokemons, updatePokemon } from '~/utils/users-provider';

export const PokemonsList = component$(() => {

    const store = useStore<{ pokemons: Pokemon[] }>({
        pokemons: []
    })

    const form = useStore({
        id: '',
        nombre: '',
        tipo1: '',
        tipo2: '',
        peso: '',
        generacion: '',
        entrenador: '',
    })

    const addOrModify = useSignal("Añadir")

    const oldId = useSignal("")

    const pokemonsByEnt = useSignal("Todos")

    useTask$(async () => {
        console.log("Desde useTask")

    })

    useVisibleTask$(async () => {
        console.log("Desde useVisibleTask")
        store.pokemons = await getPokemons()
    })

    const handleSubmit = $(async (event) => {
        event.preventDefault() // evita el comportamiento por defecto
        if (addOrModify.value === 'Añadir') {
            await addPokemon(form)
        } else {
            await updatePokemon(oldId.value, form)
            addOrModify.value = "Añadir"
        }
    })

    const handleInputChange = $((event: any) => {
        const target = event.target as HTMLInputElement
        form[target.name] = target.value
    })

    const copyForm = $((pokemon: Pokemon) => {
        form.id = pokemon.id
        form.nombre = pokemon.nombre
        form.tipo1 = pokemon.tipo1
        form.tipo2 = pokemon.tipo2
        form.peso = pokemon.peso
        form.generacion = pokemon.generacion
        form.entrenador = pokemon.entrenador
    })

    const cleanForm = $(() => {
        form.nombre = ""
        form.tipo1 = ""
        form.tipo2 = ""
        form.peso = ""
        form.generacion = ""
        form.entrenador = ""
    })

    const deletePk = $(async (id: string) => {
        await deletePokemon(id)
        store.pokemons = await getPokemons()
    })

    return (
        <div id='main' class="flex w-full justify-center">
            <div>
                <div class="px-6 py-4 rounded-xl" style="background-color: #7D55C7;">
                    <table class="border-separate border-spacing-2">
                        <thead>
                            <tr>
                                <th class="title">ID</th>
                                <th class="title">Nombre</th>
                                <th class="title">Primer Tipo</th>
                                <th class="title">Segundo Tipo</th>
                                <th class="title">Peso</th>
                                <th class="title">Generacion</th>
                                <th class="title">Entrenador</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {store.pokemons.map((pokemon) => (
                                <tr key={pokemon.id}>
                                    <td>{pokemon.id}</td>
                                    <td>{pokemon.nombre}</td>
                                    <td>{pokemon.tipo1}</td>
                                    <td>{pokemon.tipo2}</td>
                                    <td>{pokemon.peso}</td>
                                    <td>{pokemon.generacion}</td>
                                    <td>{pokemon.entrenador}</td>
                                    <td>
                                        <button
                                            class="bg-red-600"
                                            onClick$={() => deletePk(pokemon.id)}>
                                            <i class="fa-solid fa-trash"></i>
                                            Borrar
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            class="bg-orange-600"
                                            onClick$={() => {
                                                addOrModify.value = 'Modificar';
                                                oldId.value = pokemon.id;
                                                copyForm(pokemon);
                                            }}>
                                            <i class="fa-solid fa-pencil"></i>
                                            Modificar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr></tr>
                            <tr>
                                <form onSubmit$={handleSubmit}>
                                    <td>
                                        <input
                                            name='id'
                                            type="number"
                                            value={form.id}
                                            onInput$={handleInputChange} />
                                    </td>
                                    <td>
                                        <input
                                            name='nombre'
                                            type="text"
                                            value={form.nombre}
                                            onInput$={handleInputChange} />
                                    </td>
                                    <td>
                                        <select
                                            name='tipo1'
                                            value={form.tipo1}
                                            onInput$={handleInputChange}
                                        >
                                            <option value="Normal">Normal</option>
                                            <option value="Fuego">Fuego</option>
                                            <option value="Agua">Agua</option>
                                            <option value="Planta">Planta</option>
                                            <option value="Eléctrico">Eléctrico</option>
                                            <option value="Hielo">Hielo</option>
                                            <option value="Lucha">Lucha</option>
                                            <option value="Veneno">Veneno</option>
                                            <option value="Tierra">Tierra</option>
                                            <option value="Volador">Volador</option>
                                            <option value="Psíquico">Psíquico</option>
                                            <option value="Bicho">Bicho</option>
                                            <option value="Roca">Roca</option>
                                            <option value="Fantasma">Fantasma</option>
                                            <option value="Dragón">Dragón</option>
                                            <option value="Siniestro">Siniestro</option>
                                            <option value="Acero">Acero</option>
                                            <option value="Hada">Hada</option>
                                        </select>
                                    </td>
                                    <td>
                                    <select
                                            name='tipo2'
                                            value={form.tipo2}
                                            onInput$={handleInputChange}
                                        >
                                            <option value=""></option>
                                            <option value="Normal">Normal</option>
                                            <option value="Fuego">Fuego</option>
                                            <option value="Agua">Agua</option>
                                            <option value="Planta">Planta</option>
                                            <option value="Eléctrico">Eléctrico</option>
                                            <option value="Hielo">Hielo</option>
                                            <option value="Lucha">Lucha</option>
                                            <option value="Veneno">Veneno</option>
                                            <option value="Tierra">Tierra</option>
                                            <option value="Volador">Volador</option>
                                            <option value="Psíquico">Psíquico</option>
                                            <option value="Bicho">Bicho</option>
                                            <option value="Roca">Roca</option>
                                            <option value="Fantasma">Fantasma</option>
                                            <option value="Dragón">Dragón</option>
                                            <option value="Siniestro">Siniestro</option>
                                            <option value="Acero">Acero</option>
                                            <option value="Hada">Hada</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            name='peso'
                                            type="text"
                                            value={form.peso}
                                            onInput$={handleInputChange} />
                                    </td>
                                    <td>
                                    <select
                                            name='generacion'
                                            value={form.generacion}
                                            onInput$={handleInputChange}
                                        >
                                            <option value="Primera">Primera</option>
                                            <option value="Segunda">Segunda</option>
                                            <option value="Tercera">Tercera</option>
                                            <option value="Cuarta">Cuarta</option>
                                            <option value="Quinta">Quinta</option>
                                            <option value="Sexta">Sexta</option>
                                            <option value="Séptima">Séptima</option>
                                            <option value="Octava">Veneno</option>
                                            <option value="Novena">Novena</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            name='entrenador'
                                            type="text"
                                            value={form.entrenador}
                                            onInput$={handleInputChange} />
                                    </td>
                                    <td>
                                        <button
                                            class="bg-green-600"
                                            type='submit'>
                                            <i class="fa-solid fa-check"></i>
                                            Aceptar
                                        </button>
                                    </td>
                                    <td>
                                        <span
                                            class="button bg-red-600"
                                            style={`visibility: ${addOrModify.value === 'Añadir' ? 'hidden' : 'visible'}`}
                                            onClick$={() => { addOrModify.value = "Añadir"; cleanForm(); }}>
                                            <i class="fa-solid fa-x"></i>
                                            Cancelar
                                        </span>
                                    </td>
                                </form>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <button class={pokemonsByEnt.value === 'Todos' ? 'button-Todos-highlighted' : 'button-Todos'}
                    onClick$={async () => { pokemonsByEnt.value = 'Todos'; store.pokemons = await getPokemons() }}>
                    Todos
                </button>

                <button class={pokemonsByEnt.value === 'Salvajes' ? 'button-Todos-highlighted' : 'button-Todos'}
                    onClick$={async () => { pokemonsByEnt.value = 'Salvajes'; store.pokemons = await getSalvajes() }}>
                    Pokemons salvajes
                </button>

                <button class={pokemonsByEnt.value === 'noSalvajes' ? 'button-Todos-highlighted' : 'button-Todos'}
                    onClick$={async () => { pokemonsByEnt.value = 'noSalvajes'; store.pokemons = await getNoSalvajes() }}>
                    Pokemons con entrenadores
                </button>

            </div>
        </div>)
});