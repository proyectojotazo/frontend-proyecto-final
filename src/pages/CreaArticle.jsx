import React, { useCallback, useState, useMemo, useRef } from 'react';

import { createEditor, Editor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import {
    CodeElement,
    DefaultElement,
    Leaf,
    serialize,
    deserialize,
} from '../components/TextEditor/utilsGutemberg';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { crearArticulo } from '../api/services/articulos';

import '../components/TextEditor/texteditor.scss';
import './CreaArticle.scss';

const CustomEditor = {
    isBoldMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.bold === true,
            universal: true,
        });

        return !!match;
    },

    isCodeBlockActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.type === 'code',
        });

        return !!match;
    },

    toggleBoldMark(editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor);
        Transforms.setNodes(
            editor,
            { bold: isActive ? null : true },
            { match: (n) => Text.isText(n), split: true }
        );
    },

    toggleCodeBlock(editor) {
        const isActive = CustomEditor.isCodeBlockActive(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? null : 'code' },
            { match: (n) => Editor.isBlock(editor, n) }
        );
    },
};

const CreaArticle = () => {
    // TEXT EDITOR
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem('content')) || [
            {
                type: 'paragraph',
                children: [{ text: 'Escribe aquí tu articulo...' }],
            },
        ]
    );

    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    });

    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />;
    }, []);

    // FORM NEW POST
    const initialState = {
        titulo: '',
        textoIntroductorio: '',
        contenido: '',
        fechaPublicacion: '',
        categorias: ['css', 'html'],
    };

    const [selectedDestacado, setSelectedDestacado] = useState(null);
    const [userData, setUserData] = useState(initialState);
    const [htmlRendered, setHtmlRendered] = useState('');
    const [sendSucces, setSendSucces] = useState(false);

    const descriptionInput = useRef(null);

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
        setSelectedDestacado(e.target.files[0]);
    };

    const handleForm = () => {
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
                setSendSucces(true);
                localStorage.removeItem('content');
            })
            .catch((error) => {});
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
                            accept=".jpg, .jpeg, .png, .gif"
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
                            {...register('archivoDestacado', {
                                required:
                                    'Es necesario introducir un archivo destacado',
                            })}
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
                            type="text"
                            name="textoIntroductorio"
                            id="textoIntroductorio"
                            onChange={handleInputChange}
                            placeholder="Texto introductorio"
                            ref={descriptionInput}
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
                            multiple
                            {...register('categorias', {
                                required:
                                    'Es necesario introducir al menos una categoría',
                            })}
                            name="categorias"
                            id="categorias"
                            onChange={handleInputChange}
                            placeholder="Categorias"
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
                        <Slate
                            editor={editor}
                            value={value}
                            onChange={(value) => {
                                setValue(value);
                                const isAstChange = editor.operations.some(
                                    (op) => 'set_selection' !== op.type
                                );
                                if (isAstChange) {
                                    // Save the value to Local Storage.
                                    const content = JSON.stringify(value);
                                    localStorage.setItem('content', content);

                                    const nodes = {
                                        children: value,
                                    };

                                    // Serialize the html and save it to store
                                    const html = serialize(nodes);
                                    setHtmlRendered(html);
                                }
                            }}
                        >
                            <div>
                                <button
                                    type="button"
                                    onMouseDown={(event) => {
                                        event.preventDefault();
                                        CustomEditor.toggleBoldMark(editor);
                                    }}
                                    className="gutemberg-button"
                                >
                                    Bold
                                </button>
                                <button
                                    type="button"
                                    onMouseDown={(event) => {
                                        event.preventDefault();
                                        CustomEditor.toggleCodeBlock(editor);
                                    }}
                                    className="gutemberg-button"
                                >
                                    Code Block
                                </button>
                            </div>
                            <Editable
                                editor={editor}
                                renderElement={renderElement}
                                renderLeaf={renderLeaf}
                                onKeyDown={(event) => {
                                    if (!event.ctrlKey) {
                                        return;
                                    }

                                    switch (event.key) {
                                        case '`': {
                                            event.preventDefault();
                                            CustomEditor.toggleCodeBlock(
                                                editor
                                            );
                                            break;
                                        }

                                        case 'b': {
                                            event.preventDefault();
                                            CustomEditor.toggleBoldMark(editor);
                                            break;
                                        }
                                    }
                                }}
                            />
                        </Slate>
                    </div>

                    <input
                        type="submit"
                        value="Publicar"
                        className="publicar-button"
                    />

                    <ErrorMessage
                        errors={errors}
                        name="custom"
                        render={({ message }) => (
                            <p className="form-custom-error">{message}</p>
                        )}
                    />
                </form>
            </div>
        </div>
    );
};

export default CreaArticle;
