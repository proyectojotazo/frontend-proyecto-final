const urlConvert = (url) => {
    return url
        ? `${process.env.REACT_APP_API_BASE_URL}/${url.replace(
              'public\\',
              ''
          )}`.replaceAll('\\', '/')
        : null;
};

export default urlConvert;
