import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonsList } from "~/components/pokemons-list";

export default component$(() => {
  return (
    <PokemonsList/>
  );
});

export const head: DocumentHead = {
  title: "Nomekop",
  meta: [
    {
      name: "description",
      content: "Gestión de datos de Nomekop",
    },
  ],
};
