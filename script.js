const menuOpenButton = document.querySelector('#menu-open-button'); //Seleciona o botão de abrir o menu.
const menuCloseButton = document.querySelector('#menu-close-button'); // Seleciona o botão de fechar o menu.


//Adiciona um 'Event Listener' (Ouvinte de Eventos) ao botão de abrir.
menuOpenButton.addEventListener('click', function () { 
    document.body.classList.toggle('show-mobile-menu');
    /* document.body refere-se à tag <body> do documento HTML.
       classList é uma propriedade que retorna uma coleção de classes CSS do elemento.
       toggle('show-mobile-menu') faz duas coisas:
            1. Se a classe 'show-mobile-menu' NÃO estiver presente no <body>, ele a ADICIONA.
            2. Se a classe 'show-mobile-menu' JÁ estiver presente no <body>, ele a REMOVE.
            Isso permite que o CSS mude a visibilidade do menu (mostrando-o ou escondendo-o) cada vez que o botão é clicado.
            O toggle pode se comparar a um interruptor de luz: você o liga para acender a luz (mostrar o menu) e o desliga para apagar a luz (esconder o menu). */
});

//Adiciona um 'Event Listener' (Ouvinte de Eventos) ao botão de fechar.
menuCloseButton.addEventListener('click', function () { 
    menuOpenButton.click()
    /* 1. O que está acontecendo?
        - Quando o usuário clica no botão de fechar (menuCloseButton), o código não esconde o menu diretamente. Em vez disso, ele faz o seguinte: Chama o método .click() no botão de abrir (menuOpenButton).

    2. Qual é o efeito?
        - No botão de abrir (menuOpenButton) faz a função de abrir e fechar o menu, dependendo do estado atual do menu. Ou seja, se o menu estiver fechado, ele o abre; se estiver aberto, ele o fecha.

    3. Por que isso funciona?
        - Quando o menu está aberto e o usuário clica no botão de fechar, o código simula um clique no botão de abrir.
        - Isso aciona o Event Listener associado ao botão de abrir, que contém a lógica para alternar a visibilidade do menu.
        -  Como o menu já estava aberto (ou seja, a classe 'show-mobile-menu' estava presente), o toggle() REMOVE essa classe.
        - Assim, o menu é fechado. */
});