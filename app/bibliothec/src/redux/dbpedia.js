// Actions
const LOAD_CAT_FACT = 'example/LOAD_CAT_FACT';

export default function reducer(state = {}, action = {}) {
    switch(action.type) {
        case LOAD_CAT_FACT:
            return {
                ...state,
                catFact: action.payload.fact,
            }
        default:
            return state;
    }
}

// Action creators
export function loadCatFact(fact) {
    return { type: LOAD_CAT_FACT, payload: { fact } };
}

// Middleware
export const dbpediaMiddleware = ({ dispatch }) => (next) => async (action) => {
    next(action);

    switch (action.type) {
        case 'FETCH_CAT_FACT': 
            const response = await fetch('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1', { method: 'GET' });

            const json = await response.json();

            dispatch(loadCatFact(json));
            break;
        default:
            break;
    }
};
