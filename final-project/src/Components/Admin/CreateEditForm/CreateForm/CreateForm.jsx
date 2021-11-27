import React, { useState } from 'react';
import { useAdminServices } from '../../../../Services/Admin.services';

const CreateForm = () => {
    const [ data, setData ] = useState({
        title: '',
        description: '',
        image: '',
    });

    const handleInputChange = ( e ) => {
        setData({
            ...data, [ e.target.name ]: e.target.value
        });
        console.log( data );
    }

    const resetAll = ( e ) => {
        e.preventDefault();
        e.target.reset();
        setData({
            title: '',
            description: '',
            image: '',
        })
    }

    const createPost = async () => {
        try {
            const { title, description, image } = { ...data };
            
            const loginInfo = await useAdminServices.tempLogin();
            const token = loginInfo['token'];

            const response = await useAdminServices.createPost( token, title, description, image );
            
            if( response ) {
                console.log( response );
            } else {
                console.log('Ha ocurrido un error');
            }       
        } catch ( error ) {
            console.log( error );
        }
    }

    return (
        <div className='bg-purple-700 flex flex-col items-center w-1/2'>
            <form onSubmit={ resetAll } className='bg-gray-100 flex flex-col mt-5 p-5 rounded-lg w-4/5'>
                <h2 className='font-normal font-bold text-center text-3xl'>Create post</h2>

                <label htmlFor='title-input' className='mt-2'>Title</label>
                <input 
                    type='text' 
                    id='title-input' 
                    name='title' 
                    placeholder='f.e. The benefits of exercise' 
                    className='border-2 border-gray-300 mt-1 px-3 py-1 rounded' 
                    onChange={ handleInputChange }
                    required
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
                    required 
                />

                <label htmlFor='image-input' className='mt-4'>Image</label>
                <input 
                    type='text' 
                    id='image-input' 
                    name='image' 
                    placeholder='f.e. https://health.clevelandclinic.org/wp-content/uploads/sites/3/2013/09/inexpensiveExercise-1277759983-770x533-1.jpg' 
                    className='border-2 border-gray-300 mt-1 px-3 py-1 rounded'
                    onChange={ handleInputChange }
                    required 
                />

                <div className='flex justify-evenly w-full mt-2'>
                    <button 
                        id='clear-all' 
                        className='bg-gray-300 hover:bg-gray-400 mt-5 px-2 py-2 rounded self-center text-center w-2/6'
                    >Clear all</button>

                    <button 
                        type='submit' 
                        id='submit' 
                        className='bg-green-600 hover:bg-green-700 mt-5 px-2 py-2  rounded self-center text-center text-white w-2/6'
                        onClick={ createPost }
                    >Create post</button>
                </div>
            </form>
        </div>
    );
}

export default CreateForm;