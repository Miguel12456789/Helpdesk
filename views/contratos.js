document.addEventListener('DOMContentLoaded', function() {
    initAdvancedSearch();
    initTableSorting();
    initExportFunction();
});

// Initialize advanced search toggle
function initAdvancedSearch() {
    const advancedSearchLink = document.getElementById('advancedSearchLink');
    const advancedOptions = document.getElementById('advancedOptions');
    
    if (advancedSearchLink && advancedOptions) {
        // Check URL parameters to see if advanced search was used
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('contractId') || urlParams.has('clientName') || 
            urlParams.has('dateFrom') || urlParams.has('dateTo')) {
            advancedOptions.style.display = 'block';
        }
        
        advancedSearchLink.addEventListener('click', function(e) {
            e.preventDefault();
            advancedOptions.style.display = 
                advancedOptions.style.display === 'none' ? 'block' : 'none';
        });
    }
}

// Initialize table sorting
function initTableSorting() {
    const sortableHeaders = document.querySelectorAll('th.sortable');
    if (sortableHeaders.length > 0) {
        sortableHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const sortBy = this.getAttribute('data-sort');
                const table = this.closest('table');
                sortTable(table, sortBy);
            });
        });
    }
}

// Initialize export functionality
function initExportFunction() {
    const exportButton = document.getElementById('exportResults');
    if (exportButton) {
        exportButton.addEventListener('click', function(e) {
            e.preventDefault();
            exportTableToCSV('contratos_resultados.csv');
        });
    }
}

// Sort table function
function sortTable(table, column) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Toggle sort direction
    const currentDir = table.getAttribute('data-sort-dir') || 'asc';
    const newDir = currentDir === 'asc' ? 'desc' : 'asc';
    table.setAttribute('data-sort-dir', newDir);
    
    // Find column index
    const headers = table.querySelectorAll('th');
    let columnIndex = Array.from(headers).findIndex(header => 
        header.getAttribute('data-sort') === column);
    
    // Sort rows based on column type
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
        
        // Price sorting (numeric)
        if (column === 'preco') {
            const aNum = parseFloat(aValue.replace(/[^\d,]/g, '').replace(',', '.'));
            const bNum = parseFloat(bValue.replace(/[^\d,]/g, '').replace(',', '.'));
            return newDir === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        // Date sorting
        if (column === 'data') {
            const aDate = parseDate(aValue);
            const bDate = parseDate(bValue);
            return newDir === 'asc' ? aDate - bDate : bDate - aDate;
        }
        
        // Default string comparison
        return newDir === 'asc' 
            ? aValue.localeCompare(bValue, 'pt') 
            : bValue.localeCompare(aValue, 'pt');
    });
    
    // Reorder rows
    rows.forEach(row => tbody.appendChild(row));
}

// Helper function to parse dates in various formats
function parseDate(dateStr) {
    // Handle DD-MM-YYYY format
    if (dateStr.includes('-')) {
        const parts = dateStr.split('-');
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }
    
    // Handle DD/MM/YYYY format
    if (dateStr.includes('/')) {
        const parts = dateStr.split('/');
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }
    
    // Default to original string
    return new Date(dateStr);
}

// Export table to CSV
function exportTableToCSV(filename) {
    const table = document.querySelector('.results-table');
    if (!table) return;
    
    const rows = table.querySelectorAll('tr');
    if (rows.length === 0) return;
    
    // Build CSV content
    const csv = [];
    
    // Get headers (excluding the empty column for details button)
    const headers = Array.from(rows[0].querySelectorAll('th'));
    csv.push(
        headers.slice(0, -1)
            .map(header => `"${header.textContent.replace(/↕/g, '').trim()}"`)
            .join(',')
    );
    
    // Get data rows
    for (let i = 1; i < rows.length; i++) {
        const cols = rows[i].querySelectorAll('td');
        if (cols.length > 0) {
            csv.push(
                Array.from(cols).slice(0, -1)
                    .map(col => `"${col.textContent.trim()}"`)
                    .join(',')
            );
        }
    }
    
    // Download CSV file
    downloadCSV(csv.join('\n'), filename);
}

// Helper function to download CSV
function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}