const filmesContainer = document.querySelector('.filmes-container');

const API_KEY = '763d99024684b6a2716831d859397c68'; 
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;

async function carregarFilmes() {
    try {
        const resposta = await fetch(API_URL);
        const dados = await resposta.json();
        const filmes = dados.results;

        filmesContainer.innerHTML = ''; 

        filmes.forEach(filme => {
            const divFilme = document.createElement('div');
            divFilme.classList.add('filme');

            divFilme.innerHTML = `
                <img class="capa" src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="capa">
                <h1>${filme.title}</h1>
                <p>${filme.overview}</p>
            `;

            filmesContainer.appendChild(divFilme);
        });
    } catch (erro) {
        console.error('Erro ao carregar filmes:', erro);
    }
}

async function carregarFilmePorNome() {
    const input = document.querySelector('.input-buscar').value.trim();

    if (input === '') {
        carregarFilmes();
    }

    const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(input)}`;

    try {
        const resposta = await fetch(API_URL); 
        const dados = await resposta.json();   
        const filmes = dados.results;          

        filmesContainer.innerHTML = ''; 

        if (filmes.length === 0) {
            carregarFilmes();
        }

        filmes.forEach(filme => {
            const divFilme = document.createElement('div');
            divFilme.classList.add('filme');

            divFilme.innerHTML = `
                <img class="capa" src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="capa">
                <h1>${filme.title}</h1>
                <p>${filme.overview}</p>
            `;

            filmesContainer.appendChild(divFilme);
        });
    } catch (erro) {
        console.error('Erro ao carregar filmes:', erro);
    }
}

const input = document.querySelector('.input-buscar');
input.addEventListener('keydown', (event) => {
    if(event.key == 'Enter'){
        carregarFilmePorNome();
    }
})

const lupa = document.querySelector('.lupa-buscar');
lupa.addEventListener('click', carregarFilmePorNome);


carregarFilmes();
