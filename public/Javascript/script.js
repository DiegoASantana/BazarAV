const input = document.querySelector('#pesquisar');

// Adicione um ouvinte de evento 'keydown' ao campo de entrada
input.addEventListener('keydown', function(event) {
if (event.keyCode === 13) {
    event.preventDefault();
    const searchTerm = input.value.trim(); // Obter o valor digitado e remover espaços em branco
    if (searchTerm !== '') {
        const url = `/pesquisa/${encodeURIComponent(searchTerm)}`; // Construir a URL com o parâmetro de pesquisa
        fetch(url)
            .then(response => {
            if (response.ok) {
                //return response.json();
                window.location.href= url;
            } else {
                throw new Error('Erro na requisição');
            }
            }).catch(error=>{
                console.error('Erro ao fazer a requisição', error);
            })
            .then(data => {
            // Aqui você pode lidar com a resposta da requisição
            console.log(data);
            //console.log(encodeURIComponent(searchTerm))
            })
            .catch(error => {
            // Lidar com erros de requisição
            console.log(error);
            });
    }
}
});