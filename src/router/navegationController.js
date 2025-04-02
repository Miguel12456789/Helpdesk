// Renderiza a pagina normalmente
const renderPage = (page) => (req, res) => {
    res.render(page, {
        navFile: 'nav',
        footerFile: 'footer',
    });
};

const home = renderPage("home");

module.exports = { home };