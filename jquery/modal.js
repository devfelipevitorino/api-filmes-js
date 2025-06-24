$(function () {
    iniciarModal();

    function iniciarModal() {
        $('.filmes-container').on('click', '.filme', async function (e) {
            e.stopPropagation();

            const titulo = $(this).find('h1').text();
            const descricao = $(this).find('p').text();
            const imagem = $(this).find('img').attr('src');
            const lancamentoBruto = $(this).attr('data-lancamento');
            const filmeId = $(this).attr('data-id');

            const dataFormatada = formatarData(lancamentoBruto);
            $('#modal-titulo').text(titulo);
            $('#modal-descricao').text(descricao);
            $('#modal-imagem').attr('src', imagem);
            $('#modal-lancamento').text(dataFormatada);

            $('#modal-diretor').text('Carregando...');

            if (filmeId) {
                const diretor = await buscarDiretor(filmeId);
                $('#modal-diretor').text(diretor || 'Não encontrado');
            }

            $('.bg').fadeIn();
        });

        $('body, .closeBtn').on('click', function () {
            $('.bg').fadeOut();
        });

        $('.form').on('click', function (e) {
            e.stopPropagation();
        });
    }

    function formatarData(dataIso) {
        if (!dataIso) return '--';
        const [ano, mes, dia] = dataIso.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    async function buscarDiretor(id) {
        try {
            const resposta = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=763d99024684b6a2716831d859397c68&language=pt-BR`);
            const dados = await resposta.json();
            const crew = dados.crew || [];
            const diretorObj = crew.find(pessoa => pessoa.job === 'Director');
            return diretorObj ? diretorObj.name : null;
        } catch (erro) {
            console.error('Erro ao buscar diretor:', erro);
            return null;
        }
    }
});
