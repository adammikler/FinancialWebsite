let financials = {
    apiKey: 'P0QBP93K53OG6N25',
    fetchFinancials: async function(company) {
        await fetch(
            'https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + 
            company.toUpperCase() +
            '&apikey=' +
            this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayData(data));
    },
    displayData: function(data) {
        const { PERatio } = data;
        const { EPS } = data;
        const { PEGRatio } = data;
        const { MarketCapitalization } = data;
        const { BookValue } = data;
        const { DividendPerShare } = data;
        const { ProfitMargin } = data;
        const { Symbol } = data;

        document.getElementById("symbol").innerText = Symbol;
        document.getElementById("PERatio").innerText = PERatio;
        document.getElementById("EPS").innerText = EPS;
        document.getElementById("PEG").innerText = PEGRatio;
        document.getElementById("marketCap").innerText = "$" + MarketCapitalization;
        document.getElementById("BookValue").innerText = "$" + BookValue;
        document.getElementById("DividendPerShare").innerText = "$" + DividendPerShare;
        document.getElementById("ProfitMargin").innerText = ProfitMargin;
    },
    search: function () {
        this.fetchFinancials(document.getElementById("finance-search-bar").value);
    },
    clearSearch: function() {
        document.getElementById("finance-search-bar").value = "";
    }
};

document.getElementById("finance-button").addEventListener("click", function () {
    financials.search();
    financials.clearSearch();
});

document.getElementById("finance-search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        financials.search();
        financials.clearSearch();
    }
});

financials.fetchFinancials("googl");