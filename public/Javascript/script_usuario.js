const divCadastrar = document.querySelector('#cadastrar');


if(usuario !== ''){
    divCadastrar.style.display = 'none';
    const divUsuarioLogado = document.querySelector('#usuarioLogado');
    divUsuario = document.querySelector('#usuario');

    //elemento h2
    var bemVindo = document.createElement('h4');
    
    bemVindo.setAttribute('id', 'bem_vindo');

    bemVindo.textContent = `Bem-Vindo, ${usuario}!`

    divUsuario.appendChild(bemVindo)

    //-------------------------

    //elemento SAIR
    var sair = document.createElement('a')

    sair.setAttribute('href', '/logout')

    sair.textContent = 'Sair';

    divUsuario.appendChild(sair);
    
    divUsuarioLogado.style.display='flex';

}