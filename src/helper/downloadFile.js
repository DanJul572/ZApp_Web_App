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

export {downloadJsonFile};
