// Renderiza a pagina normalmente
const renderPage = (page) => (req, res) => {
    res.render(page, {
        navFile: 'nav',
        footerFile: 'footer',
    });
};

const home = renderPage("home");
const contratos = renderPage("contratos");

module.exports = { home, contratos };