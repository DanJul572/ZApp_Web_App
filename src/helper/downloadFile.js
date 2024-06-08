const downloadJsonFile = (content, label) => {
    const jsonString = JSON.stringify(content, null, 2);
    const blob = new Blob([jsonString], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `${label}.json`;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
};

const downloadFileFromBuffer = (bufferData, fileName) => {
    // Create a Blob from the buffer data
    const blob = new Blob([bufferData], {type: 'application/octet-stream'});

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element and set its href attribute to the Blob URL
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;

    // Append the anchor to the body (necessary for Firefox)
    document.body.appendChild(a);

    // Programmatically click the anchor to trigger the download
    a.click();

    // Remove the anchor from the body
    document.body.removeChild(a);

    // Revoke the Blob URL to free up resources
    URL.revokeObjectURL(url);
};

export {downloadJsonFile, downloadFileFromBuffer};
