// Pegar todas as historias sprint atual 


// Pega todas as tarefas
const listaLinks = [];
const listaFila = [];

document.querySelectorAll('[aria-label="Filhos lista de links Expanded"],[aria-label="Relacionado lista de links Expanded"]')
    .forEach(secao => {
        const listaLinkSecao = secao
            .closest('.com-ibm-team-foundation-web-ui-views-ArtifactListView')
            .querySelectorAll('.com-ibm-team-foundation-web-ui-views-LabelView a');
        listaLinkSecao.forEach(link => listaLinks.push(link.href));
    });

listaLinks.forEach(async (url) => {
    listaFila.push(new Promise((resolve, reject) => {
        $.ajax({
            url,
            type:'GET',
            success: function(response) {
                const parser = new DOMParser()
                const doc = parser.parseFromString(response, 'text/html');
                const data = doc.querySelector('time[itemprop="datePublished"]')?.innerText;
                resolve(data);
            }
        });
    }));
});

Promise.all(listaFila).then((values) => {
    let csvContent = "data:text/csv;charset=utf-8,"
        + values.filter(e => !!e).join(",\n"); //.join("\n")
    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
});
