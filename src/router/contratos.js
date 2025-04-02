const express = require('express');
const router = express.Router();

// Sample contract data
const contratos = [
    {
        id: '1',
        objeto: 'Aquisição de material de coluna Cascadia',
        tipoProcedimento: 'Ajuste Direto Regime Geral',
        adjudicante: 'Unidade Local Saúde de Braga, E.P.E.',
        adjudicatario: 'Stryker Portugal - Produtos Médicos Lda',
        preco: 13722.48,
        dataPublicacao: '2025-04-02'
    },
    {
        id: '2',
        objeto: 'Fornecimento e Instalação de Equipamentos de Eletrónica de Consumo e Hotelaria, por Lotes, para o Lar de Santo Antão',
        tipoProcedimento: 'Consulta Prévia',
        adjudicante: 'Centro Social e Paroquial de Nossa Senhora dos Milagres de Aldeia do Bispo - Sabugal',
        adjudicatario: 'Traçoinox - Equipamentos e Climatização, Lda',
        preco: 30945.00,
        dataPublicacao: '2025-04-02'
    },
    {
        id: '3',
        objeto: 'Serviços de Manutenção de Sistemas Informáticos',
        tipoProcedimento: 'Concurso Público',
        adjudicante: 'Câmara Municipal de Lisboa',
        adjudicatario: 'TechSolutions, Lda',
        preco: 45000.00,
        dataPublicacao: '2025-03-15'
    }
];

// Combined route for both search form and results
router.get('/', (req, res) => {
    // Initialize view data
    const viewData = {
        contratos: null
    };
    
    // If there are search parameters, perform search
    if (Object.keys(req.query).length > 0) {
        const { query, tipo, contractId, clientName, dateFrom, dateTo } = req.query;
        
        // Add search parameters to view data
        Object.assign(viewData, { query, tipo, contractId, clientName, dateFrom, dateTo });
        
        // Filter contracts based on search criteria
        let results = [...contratos];
        
        if (query) {
            const searchTerm = query.toLowerCase();
            results = results.filter(contrato => 
                contrato.objeto.toLowerCase().includes(searchTerm) ||
                contrato.adjudicante.toLowerCase().includes(searchTerm) ||
                contrato.adjudicatario.toLowerCase().includes(searchTerm)
            );
        }
        
        if (tipo) {
            results = results.filter(contrato => 
                contrato.tipoProcedimento.toLowerCase().includes(tipo.replace('-', ' '))
            );
        }
        
        if (contractId) {
            results = results.filter(contrato => contrato.id === contractId);
        }
        
        if (clientName) {
            results = results.filter(contrato => 
                contrato.adjudicatario.toLowerCase().includes(clientName.toLowerCase())
            );
        }
        
        // Date filtering
        if (dateFrom) {
            const fromDate = new Date(dateFrom);
            results = results.filter(contrato => 
                new Date(contrato.dataPublicacao) >= fromDate
            );
        }
        
        if (dateTo) {
            const toDate = new Date(dateTo);
            toDate.setHours(23, 59, 59, 999); // End of day
            results = results.filter(contrato => 
                new Date(contrato.dataPublicacao) <= toDate
            );
        }
        
        viewData.contratos = results;
    }
    
    res.render('contratos', viewData);
});

// Contract details route
router.get('/:id', (req, res) => {
    const contrato = contratos.find(c => c.id === req.params.id);
    
    if (!contrato) {
        return res.status(404).send('Contrato não encontrado');
    }
    
    res.render('contrato-detalhes', { contrato });
});

module.exports = router;