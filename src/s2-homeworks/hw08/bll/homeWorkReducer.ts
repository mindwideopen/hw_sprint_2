import {UserType} from '../HW8'


type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': {
            const stateCopy = [...state]
            const upSorted = [...stateCopy.sort((a: UserType, b: UserType) => a.name.localeCompare(b.name))]

            const downSorted = [...stateCopy.sort((a: UserType, b: UserType) => b.name.localeCompare(a.name))]


            // const upSorted = [...state.sort((a, b) => {
            //     if (a.name < b.name) {
            //         return -1;
            //     }
            //     if (a.name > b.name) {
            //         return 1;
            //     }
            //     return 0;
            // })];
            //
            // const downSorted = [...state.sort((a, b) => {
            //     if (a.name > b.name) {
            //         return -1;
            //     }
            //     if (a.name < b.name) {
            //         return 1;
            //     }
            //     return 0;
            // })];



            return (action.payload === 'up' ? upSorted : action.payload === 'down' ? downSorted : state)

        }

        case 'check': {
            const stateCopy = [...state]
            const stateFiltered = [...stateCopy.filter(user => user.age >= action.payload)]

            return (action.payload === 18 ? stateFiltered : state)
        }
        default:
            return state
    }
}
