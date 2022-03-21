import React, { useState, useRef } from 'react';

import ReactQuill, { Quill } from 'react-quill';
import ImageCompress from 'quill-image-compress';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { crearArticulo } from '../../api/services/articulos';

import 'react-quill/dist/quill.snow.css';
import './CrearArticulo.scss';
Quill.register('modules/imageCompress', ImageCompress);

const NewArticle = () => {
    const [htmlRendered, setHtmlRendered] = useState('');

    const initialState = {
        titulo: '',
        textoIntroductorio: '',
        contenido: '',
        fechaPublicacion: '',
        categorias: ['css', 'html'],
    };

    const [selectedDestacado, setSelectedDestacado] = useState(null);
    const [userData, setUserData] = useState(initialState);
    const [sendSucces, setSendSucces] = useState(false);

    const descriptionInput = useRef(null);

    console.log(htmlRendered);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setUserData({
            ...userData,
            [name]: value,
        });
        clearErrors(name);
        clearErrors('custom');
    };

    const handleFileInput = (e) => {
        console.log('hola');
        setSelectedDestacado(e.target.files[0]);
    };

    const handleForm = () => {
        console.log('Inte');
        try {
            const data = {
                titulo: userData.titulo,
                archivoDestacado: selectedDestacado,
                textoIntroductorio: userData.textoIntroductorio,
                contenido: htmlRendered,
                fechaPublicacion: userData.fechaPublicacion,
                categorias: userData.categorias,
            };

            crearArticulo(data)
                .then((response) => {
                    console.log('Post enviado');
                    setSendSucces(true);
                    localStorage.removeItem('content');
                })
                .catch((error) => {
                    console.log(error);
                    setError('custom', {
                        type: 'manual',
                        message: error.contenido.message,
                    });
                });
        } catch (error) {
            console.log(error);
        }
    };

    const maxSize = () => {
        console.log(maxSize);
    };

    return (
        <div className="create-post-container">
            <div className="create-post-form-container">
                <form onSubmit={handleSubmit(handleForm)}>
                    <div className="input-container">
                        <input
                            {...register('titulo', {
                                required: 'Es necesario introducir un título',
                            })}
                            type="text"
                            name="titulo"
                            id="titulo"
                            onChange={handleInputChange}
                            placeholder="Título"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="titulo"
                            render={({ message }) => (
                                <p className="form-custom-error">{message}</p>
                            )}
                        />
                    </div>

                    <div className="input-container">
                        <input
                            {...register('archivoDestacado')}
                            type="file"
                            name="archivoDestacado"
                            id="archivoDestacado"
                            onChange={handleFileInput}
                            placeholder="Archivo destacado"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="archivoDestacado"
                            render={({ message }) => (
                                <p className="form-custom-error">{message}</p>
                            )}
                        />
                    </div>

                    <div className="input-container">
                        <textarea
                            {...register('textoIntroductorio', {
                                required:
                                    'Es necesario introducir un texto introductorio',
                                maxLength: 200,
                            })}
                            onChange={handleInputChange}
                            type="text"
                            name="textoIntroductorio"
                            id="textoIntroductorio"
                            placeholder="Texto introductorio"
                            // TODO: Si le pones ref, no funciona react hook form, porque?
                            // ref={descriptionInput}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="textoIntroductorio"
                            render={({ message }) => (
                                <p className="form-custom-error">{message}</p>
                            )}
                        />

                        <p>
                            {descriptionInput.current
                                ? descriptionInput.current.value.length
                                : '0'}
                            /200
                        </p>
                    </div>

                    <div className="input-container">
                        <input
                            {...register('fechaPublicacion', {
                                required:
                                    'Es necesario introducir una fecha y hora de publicación',
                            })}
                            type="datetime-local"
                            name="fechaPublicacion"
                            id="fechaPublicacion"
                            onChange={handleInputChange}
                            placeholder="Fecha y hora de publicación"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="fechaPublicacion"
                            render={({ message }) => (
                                <p className="form-custom-error">{message}</p>
                            )}
                        />
                    </div>

                    <div className="input-container">
                        <select
                            placeholder="Categorias"
                            {...register('categorias', {
                                required:
                                    'Es necesario introducir al menos una categoría',
                            })}
                            multiple
                            name="categorias"
                            id="categorias"
                            onChange={handleInputChange}
                        >
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                            <option value="javascript">JAVASCRIPT</option>
                        </select>
                        <ErrorMessage
                            errors={errors}
                            name="categorias"
                            render={({ message }) => (
                                <p className="form-custom-error">{message}</p>
                            )}
                        />
                    </div>

                    <div className="text-editor-container">
                        <ReactQuill
                            theme="snow"
                            value={htmlRendered}
                            onChange={setHtmlRendered}
                            modules={{
                                toolbar: {
                                    container: [
                                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                        ['bold', 'italic', 'underline'],
                                        [
                                            { list: 'ordered' },
                                            { list: 'bullet' },
                                        ],
                                        [{ align: [] }],
                                        ['link', 'image'],
                                        ['clean'],
                                        [{ color: [] }],
                                    ],
                                },
                                imageCompress: {
                                    quality: 0.9,
                                    maxWidth: 300,
                                    maxHeight: 300,
                                    imageType: 'image/jpeg',
                                    debug: false,
                                },
                            }}
                        />
                    </div>
                    <ErrorMessage
                        errors={errors}
                        name="custom"
                        render={({ message }) => (
                            <p className="form-custom-error">{message}</p>
                        )}
                    />
                    <input
                        type="submit"
                        value="Publicar"
                        className="publicar-button"
                    />
                </form>
            </div>
        </div>
    );
};

export default NewArticle;
