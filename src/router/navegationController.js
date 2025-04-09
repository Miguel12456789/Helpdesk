// Renderiza a pagina normalmente
const renderPage = (page) => (req, res) => {
    res.render(page, {
        navFile: 'nav',
        footerFile: 'footer',
    });
};

const home = renderPage("home");
const base_gov = renderPage("base_gov")
const estatisticas_setor_publico = renderPage("estatisticas_setor_publico")
const estatisticas_operadores_economicos = renderPage("estatisticas_operadores_economicos")
const oportunidade_contratacao_publica = renderPage("oportunidade_contratacao_publica")
const outros = renderPage("outros")

module.exports = { home, base_gov, estatisticas_setor_publico, estatisticas_operadores_economicos, oportunidade_contratacao_publica, outros };