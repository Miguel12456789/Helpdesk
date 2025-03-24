// Renderiza a pagina normalmente
const renderPage = (page) => (req, res) => {
    res.render(page);
};

const home = renderPage("home");

module.exports = { home };