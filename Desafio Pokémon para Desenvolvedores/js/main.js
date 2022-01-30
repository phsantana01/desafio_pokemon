/**
 * Está função utiliza a API XMLHttpRequest para fazer uma requisição HTTP
 * @param {string} url Representa o endereço para qual será feita a requisição
 * @returns {object} Retorna a resposta de requisição
 */
 function fazRequisicao(url) {
     try{
        let request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send();
        return request.responseText;
    }catch{
        console.log("Ocorreu um erro, atualize a página e tente novamente.")
    }
 }

 /**
 * Está função utiliza a API OpenWeatherMap e a função fazRequisicao para acessar as informações referentes ao clima de qualquer cidade do mundo.
 * @param {string} cidade Represeta o nome da cidade informada no input html
 * @var tempo Guarda o valor da resposta de requisição convetido em um objeto JS.
 * @var detTempo Guarda o valor da temperatura.
 * @var detClima Guarda o valor do clima.
 * @var temperatura Guarda o valor da temperatura convetido em graus celsius 
 * @var tempoCidade Guarda as variaveis [temperatura, detTempo, detClima]
 * @returns {Array} Retorna @var tempoCidade
 */
function pesquisaTempo(cidade) {
    try{
        var resposta = fazRequisicao(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=0ecb14b40ebd57470e448fe8152aa037&lang=pt`);
        var tempo = JSON.parse(resposta);
        var detTempo = tempo.weather[0].main;
        var detClima = tempo.weather[0].description;
        var temperatura = Math.round(tempo.main.temp - 273,15);
        var tempoCidade = [temperatura, detTempo, detClima];
        return tempoCidade;
    }catch{
        console.log("Algo deu errado, verifique o nome da cidade que foi digitada.");
        window.alert("Algo deu errado, verifique o nome da cidade que foi digitada.");
    }
}

/**
 * Está função utiliza os parametros recebidos para definir e guardar na variavel @var tipo um valor que representa um tipo de pokémon
 * dependendo da validação que for realizada.
 * @param {Number} temperatura Representa a temperatura
 * @param {String} detClima Representa o clima
 * @returns @var tipo Retorna a variavel tipo que contém uma string
 */
function defineTipo(temperatura, detClima) {
    var tipo;
    if(detClima.includes("Rain") || detClima.includes("rain")){
        tipo = "electric";
        return tipo;
    }
    if(temperatura < 5) {
        tipo = "ice";
        return tipo;
    } else if(temperatura >= 5 && temperatura < 10) {
        tipo = "water";
        return tipo;
    } else if(temperatura >= 12 && temperatura < 15) {
        tipo = "grass";
        return tipo;
    } else if(temperatura >= 15 && temperatura < 21) {
        tipo = "ground";
        return tipo;
    } else if(temperatura >= 23 && temperatura < 27) {
        tipo = "bug";
        return tipo;
    } else if(temperatura >= 27 && temperatura < 33) {
        tipo = "rock";
        return tipo;
    } else if(temperatura > 33) {
        tipo = "fire";
        return tipo;
    } else {
        tipo = "normal";
        return tipo;
    }
}

/**
 * Está função utiliza a API PokéAPI e a função fazRequisição para acessar as informações de um tipo de pokémon.
 * @param {String} tipo Representa um tipo de pokémon
 * @var tiposDePokemon Guarda um objeto JS com informações sobre um dos tipos de pokémon
 * @var numAleatorio Guarda um número aleatório que não ultrapasse a quantidade de pokémon que existem em cada tipo
 * @var pokemonAleatorio Guarda o nome de um pokémon aleatório
 * @returns retorna @var pokemonAleatorio
 */
 function pesquisaPokemon(tipo) {

     var resposta = fazRequisicao(`https://pokeapi.co/api/v2/type/${tipo}`);
     var tiposDePokemon = JSON.parse(resposta);
     var numAleatorio = Math.round(Math.random() * tiposDePokemon.pokemon.length);
     var pokemonAleatorio = tiposDePokemon.pokemon[numAleatorio].pokemon.name;
     return pokemonAleatorio;
 }

 /**
  * Está função utiliza a API PokéAPI e a função fazRequisicao para acessar o link de uma imagem de um pokémon
  * @param {String} pokemon Representa o nome de um pokémon
  * @var pokemonDet Guarda um objeto JS com informações sobre um pokémon
  * @var pokemonImg Guarda uma string com o link da imagem de um pokémon
  * @returns retorna @var pokemonImg
  */
 function pesquisaImagem(pokemon){
    var resposta = fazRequisicao(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    var pokemonDet = JSON.parse(resposta);
    var pokemonImg = pokemonDet.sprites.front_default;
    return pokemonImg;
 }


var info = document.querySelector(".info");
var btn = document.querySelector("#send");

/**
 * Está função recebe um Array com as informações sobre o clima e uma url de uma imagen e então faz a inserção dessas informações
 * no html
 * @param {Array} infos Guarda informações sobre o clima de uma cidade
 * @param {String} pokemonImagem Guarda a url da imagen de um pokémon
 */
function exibeInformacoes(infos, pokemonImagem) {
    info.innerHTML = `
    <div class="conteudoPrincipal">
        <main class="infobox">
            <div class="temp">
                <span>Temperatura: </span>
                <span>${infos[0]}°C</span>
            </div>
            <div class="clima">
                <span>Clima: </span>
                <span>${infos[1]} - ${infos[2]}</span>
            </div> 
            <div class="nomePokemon">
                <span>Pokémon: </span>
                <span>${infos[3]}</span>
            </div> 
            <div class="pokeImg">
                <img class="pokeImg" src="${pokemonImagem}">
            </div>
        </main>
    </div> `    
}

/**
 * Esse é um evento adicionado ao botão da pagina html, guarda em variaveis o retorno de funções, concatena as informações necessárias
 * em um array e por fim, utiliza a função exibeInformacoes para inserir as informações no html
 */
btn.addEventListener("click", function(e){
    e.preventDefault();
    var cidade = document.querySelector("#cidade").value;
    var detCidade = pesquisaTempo(cidade);
    var tipo = defineTipo(...detCidade);
    var pokemonAleatorio = pesquisaPokemon(tipo);
    var pokemonImagem = pesquisaImagem(pokemonAleatorio);
    var infos = detCidade.concat(pokemonAleatorio);
    exibeInformacoes(infos, pokemonImagem);
})
 