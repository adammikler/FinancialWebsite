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

        let marketRound = MarketCapitalization.toString().length;
        if (marketRound < 7) {
            document.getElementById("marketCap").innerText = "$" + MarketCapitalization;
        } else if (marketRound >= 7 && marketRound < 10) {
            document.getElementById("marketCap").innerText = "$" + MarketCapitalization / 1000000 + "M"
        } else if (marketRound >= 10 && marketRound < 13) {
            document.getElementById("marketCap").innerText = "$" + MarketCapitalization / 1000000000 + "B"
        } else if (marketRound >= 13 && marketRound < 14) {
            document.getElementById("marketCap").innerText = "$" + MarketCapitalization / 1000000000000 + "T"
        }
    
        console.log(marketRound);

        document.getElementById("symbol").innerText = Symbol;
        document.getElementById("PERatio").innerText = PERatio;
        document.getElementById("EPS").innerText = "$" + EPS;
        document.getElementById("PEG").innerText = PEGRatio;
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