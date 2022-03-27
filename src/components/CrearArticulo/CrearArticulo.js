import React, { useState, useRef, useEffect } from 'react';

import ReactQuill, { Quill } from 'react-quill';
import ImageCompress from 'quill-image-compress';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { useParams, useNavigate } from 'react-router-dom';

import {
    crearArticulo,
    getAllCategorias,
    getArticulosId,
    responderArticulo,
    editArticle,
} from '../../api/services/articulos';

import urlConvert from '../../utils/urlConvert';

import 'react-quill/dist/quill.snow.css';
import './CrearArticulo.scss';

Quill.register('modules/imageCompress', ImageCompress);

const NewArticle = ({ modo }) => {
    const { articleId } = useParams();
    const [postLoaded, setpostLoaded] = useState(null);

    const [htmlRendered, setHtmlRendered] = useState();

    const [toResponse, setToResponse] = useState(false);
    const [toEdit, setToEdit] = useState(false);

    const initialState = {
        titulo: '',
        textoIntroductorio: '',
        contenido: '',
        fechaPublicacion: '',
    };

    console.log();

    const [selectedDestacado, setSelectedDestacado] = useState(null);
    const [userData, setUserData] = useState(initialState);
    const [sendSucces, setSendSucces] = useState(false);
    const [categoriasFetched, setCategoriasFetched] = useState([]);
    const [categoriasSelected, setCategoriasSelected] = useState([]);
    const descriptionInput = useRef(null);
    const [programPost, setProgramPost] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getAllCategorias()
            .then((data) => {
                setCategoriasFetched(data);
            })
            .catch((error) => console.log(error));

        if (articleId) {
            getArticulosId(articleId).then((data) => {
                setpostLoaded(data);
                if (modo === 'editar') {
                    setToEdit(true);
                    setUserData({
                        ...userData,
                        titulo: data.titulo,
                        textoIntroductorio: data.textoIntroductorio,
                        fechaPublicacion: data.fechaPublicacion,
                    });
                    setHtmlRendered(data.contenido);
                    reset({
                        titulo: data.titulo,
                        textoIntroductorio: data.textoIntroductorio,
                    });
                    setCategoriasSelected(data.categorias);
                    setPreviewImage(urlConvert(data.archivoDestacado));
                }

                if (modo === 'responder') {
                    setToResponse(true);
                }
            });
        }
    }, []);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
        reset,
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
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
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
                textoIntroductorio: userData.textoIntroductorio,
                contenido: htmlRendered,
                fechaPublicacion: userData.fechaPublicacion,
                categorias: categoriasSelected,
                archivoDestacado: selectedDestacado,
            };

            const form = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                form.append(key, value);
            });

            if (toResponse) {
                responderArticulo(articleId, form).then((response) => {
                    console.log('Respuesta enviada');
                    navigate(`../articles/${articleId}`);
                    setSendSucces(true);
                });
            } else if (toEdit) {
                editArticle(articleId, form).then((response) => {
                    console.log('Post editado');
                    navigate(`../articles/${articleId}`);
                    setSendSucces(true);
                });
            } else {
                // TODO: Redirigir a home despues de crear articulo. Como obtener id?
                crearArticulo(form).then((response) => {
                    console.log('Post publicado');
                    setSendSucces(true);
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="create-post-container">
            {postLoaded && toResponse && (
                <div className="to-response-container">
                    <h4 className="custom-title-form">
                        Respuesta al articulo <b>{postLoaded.titulo}</b> de{' '}
                        {postLoaded.usuario[0].nickname}
                    </h4>
                </div>
            )}

            {postLoaded && toEdit && (
                <div className="to-response-container">
                    <h4 className="custom-title-form">
                        Edita tu artículo <b>"{postLoaded.titulo}"</b>
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
                    <div className="input-container">
                        {previewImage && (
                            <div className="image-preview-container">
                                <img
                                    src={previewImage}
                                    alt="imagen destacada del post"
                                    width={200}
                                />
                            </div>
                        )}
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
                                        className={
                                            categoriasSelected.includes(e)
                                                ? 'selected-button'
                                                : 'categoria-button'
                                        }
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
                            toEdit
                                ? 'Editar post'
                                : !programPost
                                ? 'Publicar post'
                                : 'Programar post'
                        }
                        className="publicar-button"
                    />
                </form>
            </div>
        </div>
    );
};

export default NewArticle;
