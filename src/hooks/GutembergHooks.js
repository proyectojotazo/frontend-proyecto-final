import escapeHtml from 'escape-html';
import { Text, Node } from 'slate';

export const CodeElement = (props) => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    );
};

export const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>;
};

export const Leaf = (props) => {
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
        >
            {props.children}
        </span>
    );
};

export const serialize = (node) => {
    if (Text.isText(node)) {
        let string = escapeHtml(node.text);
        if (node.bold) {
            string = `<strong>${string}</strong>`;
        }
        return string;
    }

    const children = node.children.map((n) => serialize(n)).join('');

    switch (node.type) {
        case 'quote':
            return `<blockquote><p>${children}</p></blockquote>`;
        case 'paragraph':
            return `<p>${children}</p>`;
        case 'link':
            return `<a href="${escapeHtml(node.url)}">${children}</a>`;
        case 'code':
            return `<pre><code>${children}</code></pre>`;
        default:
            return `<p>${children}</p>`;
        // return children;
    }
};

// Define a deserializing function that takes a string and returns a value.
export const deserialize = (string) => {
    // Return a value array of children derived by splitting the string.
    return string.split('\n').map((line) => {
        return {
            children: [{ text: line }],
        };
    });
};
