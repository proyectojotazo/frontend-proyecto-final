import React, { useState, useRef, useEffect } from 'react';

import ReactQuill, { Quill } from 'react-quill';
import ImageCompress from 'quill-image-compress';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { useParams } from 'react-router-dom';

import {
    crearArticulo,
    getAllCategorias,
    getArticulosId,
    responderArticulo,
} from '../../api/services/articulos';

import 'react-quill/dist/quill.snow.css';
import './CrearArticulo.scss';

Quill.register('modules/imageCompress', ImageCompress);

const NewArticle = () => {
    // Si es de respuesta a otro article
    const { articleId } = useParams();
    const [postToResponse, setPostToResponse] = useState(null);
    console.log(postToResponse);

    const [htmlRendered, setHtmlRendered] = useState('');

    const initialState = {
        titulo: '',
        textoIntroductorio: '',
        contenido: '',
        fechaPublicacion: '',
    };

    const [selectedDestacado, setSelectedDestacado] = useState(null);
    const [userData, setUserData] = useState(initialState);
    const [sendSucces, setSendSucces] = useState(false);
    const [categoriasFetched, setCategoriasFetched] = useState([]);
    const [categoriasSelected, setCategoriasSelected] = useState([]);
    const descriptionInput = useRef(null);
    const [programPost, setProgramPost] = useState(false);

    useEffect(() => {
        getAllCategorias()
            .then((data) => {
                setCategoriasFetched(data);
            })
            .catch((error) => console.log(error));

        if (articleId) {
            getArticulosId(articleId).then((data) => setPostToResponse(data));
        }
    }, []);

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

        if (name === 'fechaPublicacion') {
            value > new Date().toISOString()
                ? setProgramPost(true)
                : setProgramPost(false);
        }
    };

    const handleFileInput = (e) => {
        setSelectedDestacado(e.target.files[0]);
    };

    const handleCategories = (e) => {
        const categoria = e.target.innerText;
        if (!categoriasSelected.includes(categoria)) {
            e.target.classList.toggle('selected-button');
            setCategoriasSelected((prevArray) => [...prevArray, categoria]);
        } else {
            e.target.classList.toggle('selected-button');
            setCategoriasSelected(
                categoriasSelected.filter((item) => item !== categoria)
            );
        }
    };

    console.log(categoriasSelected.length);

    const handleForm = () => {
        if (categoriasSelected.length < 1) {
            console.log('errooor');
            setError('categorias', {
                type: 'manual',
                message: 'Debes introducir al menos una categoria',
            });
        }

        try {
            const data = {
                titulo: userData.titulo,
                archivoDestacado: selectedDestacado,
                textoIntroductorio: userData.textoIntroductorio,
                contenido: htmlRendered,
                fechaPublicacion: userData.fechaPublicacion,
                categorias: categoriasSelected,
            };

            if (postToResponse) {
                console.log(data);
                responderArticulo(articleId, data).then((response) => {
                    console.log('Respuesta enviada');
                    setSendSucces(true);
                    localStorage.removeItem('content');
                });
            } else {
                crearArticulo(data).then((response) => {
                    console.log('Post enviado');
                    setSendSucces(true);
                    localStorage.removeItem('content');
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="create-post-container">
            {postToResponse && (
                <div className="to-response-container">
                    <h4 className="custom-title-form">
                        Respuesta al articulo <b>{postToResponse.titulo}</b> de{' '}
                        {postToResponse.usuario[0].nickname}
                    </h4>
                </div>
            )}
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

                    {/* TODO: MOSTRAR VISTA PREVIA DE LA FOTO */}
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

                    <div className="categorias-container-main">
                        <h4 className="categorias-title">
                            ¿De qué temas nos hablas?
                        </h4>
                        <div className="categorias-container">
                            {categoriasFetched.map((e, key) => (
                                <div
                                    className="single-categoria-container"
                                    key={key}
                                >
                                    <button
                                        className="categoria-button"
                                        type="button"
                                        onClick={handleCategories}
                                    >
                                        {e}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <ErrorMessage
                        errors={errors}
                        name="categorias"
                        render={({ message }) => (
                            <p className="form-custom-error categorias-error">
                                {message}
                            </p>
                        )}
                    />

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

                    <div className="input-container">
                        <input
                            {...register('fechaPublicacion')}
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

                    <input
                        type="submit"
                        value={
                            !programPost ? 'Publicar post' : 'Programar post'
                        }
                        className="publicar-button"
                    />
                </form>
            </div>
        </div>
    );
};

export default NewArticle;
