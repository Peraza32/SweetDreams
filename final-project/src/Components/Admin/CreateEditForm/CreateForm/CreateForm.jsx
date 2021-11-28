import React, { useState, useContext } from 'react';
import { useAdminContext } from '../../../../Contexts/AdminContext';
import { useAdminServices } from '../../../../Services/Admin.services';
import SessionContext from '../../../../Contexts/SessionContext';
const CreateForm = () => {
    const { helpMessage, setHelpMessage } = useAdminContext();
    const { authenticated } = useContext(SessionContext);
    const [ data, setData ] = useState({
        title: '',
        description: '',
        image: '',
    });

    const handleInputChange = ( e ) => {
        setData({
            ...data, [ e.target.name ]: e.target.value
        });
    }

    const resetAll = ( e ) => {
        e.preventDefault();
        e.target.reset();
        setData({
            title: '',
            description: '',
            image: '',
        });
    }

    const clearForm = ( e ) => {
        e.preventDefault();
        document.querySelector('#create-form').reset();
        setData({
            title: '',
            description: '',
            image: '',
        });
    }

    const validateData = ( e ) => {
        e.preventDefault();
        let allOk = true;

        const { title, description, image } = { ...data };

        const helpMessageContainer = document.querySelector('#help-message');
        
        if ( title.trim() === '' ) {
            setHelpMessage( 'Debes ingresar un titulo' ); 
            allOk = false;
        } else if ( description.trim() === '' ) {
            setHelpMessage( 'Debes ingresar una descripción' );
            allOk = false;
        } else if ( image.trim() === '' ) {
            setHelpMessage( 'Debes ingresar una URL como imagen' ); 
            allOk = false;
        }

        if ( allOk ) {
            createPost( title, description, image );
        }
        else {
            helpMessageContainer.classList.remove('hidden');

            setTimeout(() => {
                helpMessageContainer.classList.add('hidden');
            }, 3500);
        }
    }

    const createPost = async ( title, description, image ) => {
        try {
            //const loginInfo = await useAdminServices.tempLogin();
            const token = authenticated.token;

            const response = await useAdminServices.createPost( token, title, description, image );

            if( response ) {
                console.log( response );
                resetAll();
            } else {
                console.log('Ha ocurrido un error');
            }       
        } catch ( error ) {
            console.log( error );
        }
    }

    return (
        <div className='bg-purple-700 flex flex-col items-center w-1/2'>
            <form id='create-form' className='bg-gray-100 flex flex-col mt-5 p-5 rounded-lg w-4/5'>
                <h2 className='font-normal font-bold text-center text-3xl'>Create post</h2>

                <label htmlFor='title-input' className='mt-2'>Title</label>
                <input 
                    type='text' 
                    id='title-input' 
                    name='title' 
                    placeholder='f.e. The benefits of exercise' 
                    className='border-2 border-gray-300 mt-1 px-3 py-1 rounded' 
                    onChange={ handleInputChange }
                />

                <label htmlFor='description-text-area' className='mt-4'>Description</label>
                <textarea 
                    id='description-text-area' 
                    name='description' 
                    cols='40' 
                    rows='5' 
                    placeholder='f.e. The health benefits of regular physical activity and exercise cannot be ignored. Everyone benefits from exercise, regardless of age, gender, or physical ability' 
                    className='border-2 border-gray-300 mt-1 px-3 py-1 rounded'
                    onChange={ handleInputChange }
                />

                <label htmlFor='image-input' className='mt-4'>Image</label>
                <input 
                    type='text' 
                    id='image-input' 
                    name='image' 
                    placeholder='f.e. https://health.clevelandclinic.org/wp-content/uploads/sites/3/2013/09/inexpensiveExercise-1277759983-770x533-1.jpg' 
                    className='border-2 border-gray-300 mt-1 px-3 py-1 rounded'
                    onChange={ handleInputChange }
                />

                <div className='flex justify-evenly w-full mt-2'>
                    <button 
                        id='clear-all' 
                        className='bg-gray-300 hover:bg-gray-400 mt-5 px-2 py-2 rounded self-center text-center w-2/6'
                        onClick={ clearForm }
                    >Clear all</button>

                    <button 
                        type='submit' 
                        id='submit' 
                        className='bg-green-600 hover:bg-green-700 mt-5 px-2 py-2  rounded self-center text-center text-white w-2/6'
                        onClick={ validateData }
                    >Create post</button>
                </div>
            </form>

            <p id='help-message' className='bg-orange hidden mt-8 py-2 rounded text-center text-xl text-white w-3/4'>{ helpMessage }</p>
        </div>
    );
}

export default CreateForm;