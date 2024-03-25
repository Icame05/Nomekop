import { component$ } from '@builder.io/qwik';

export const Header = component$(() => {
    return (
        <header class="py-8 text-center" style="background-color: black; color: white">
            <div class="text-center" style="display: flex; justify-content: center; align-items: center">
                <img src="./img/Nomekop.png" alt="logo" width="150px" />
                <h1 class="text-4xl font-bold" style="background-color= #261A3C">
                    Nomekop
                </h1>
            </div>
        </header>
    )
});