import {
    createContext,
    useContext,
    useState,
} from 'react';

const AdminContext = createContext();

export const AdminProvider = ( props ) => {
    const [ formState, setFormState ] = useState( 'create' );

    const changeFormState = newState => setFormState ( newState );

    const providerValue = {
        formState: formState,
        changeFormState: changeFormState,
    }
        
    return (
        <AdminContext.Provider value={ providerValue }>
            { props.children }
        </AdminContext.Provider>
    );
}

export const useAdminContext = () => {
    const context = useContext( AdminContext );

    if( !context ) {
        throw new Error( 'No estás dentro del Admin Context' );
    }

    return context;
}