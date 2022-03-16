import React, { useCallback, useState, useMemo } from 'react';

import { createEditor, Editor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import {
    CodeElement,
    DefaultElement,
    Leaf,
    serialize,
    deserialize,
} from '../hooks/GutembergHooks';

import '../components/TextEditor/texteditor.scss';

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
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem('content')) || [
            {
                type: 'paragraph',
                children: [{ text: 'A line of text in a paragraph.' }],
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

    return (
        // Add a toolbar with buttons that call the same methods.
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

                    const html = serialize(nodes);
                    console.log(html);
                }
            }}
        >
            <div>
                <button
                    onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleBoldMark(editor);
                    }}
                    className="gutemberg-button"
                >
                    Bold
                </button>
                <button
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
                            CustomEditor.toggleCodeBlock(editor);
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
    );
};

export default CreaArticle;
