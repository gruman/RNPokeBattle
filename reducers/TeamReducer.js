import { SELECT_POKEMON } from "../actions/types";

    import pokemon_data from "../data/pokemon_data";

    const INITIAL_STATE = {
      pokemon: pokemon_data,
      selected_pokemon: [] // stores the currently selected Pokemon
    };

    export default (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case SELECT_POKEMON:
          let pokemon = [...state.pokemon];
          let selected_pokemon = [...state.selected_pokemon];

          const is_selected = action.is_selected;

          if (state.selected_pokemon.length < 6 || is_selected) { // there should only be six selected Pokemon
            pokemon = pokemon.map(item => {
              if (item.id == action.id) { // only modify the Pokemon specified in the action
                item.is_selected = !is_selected; // flip the current is_selected value 
              }
              return item;
            });

            if (is_selected) {
              const index_to_remove = selected_pokemon.findIndex(
                item => item.id == action.id
              );
              selected_pokemon.splice(index_to_remove, 1);
            } else {
              selected_pokemon.push(action.pokemon_data);
            }
          }

          return { ...state, pokemon, selected_pokemon };

        default:
          return state;
      }
    };