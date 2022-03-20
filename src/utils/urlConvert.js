const urlConvert = (url) => {
    return `${process.env.REACT_APP_API_BASE_URL}/${url.replace(
        'public\\',
        ''
    )}`.replaceAll('\\', '/');
};

export default urlConvert;
