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
    /*converst data into invdividual variables and updates page*/
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
            document.getElementById("marketCap").innerText = "$" + Math.round(MarketCapitalization);
        } else if (marketRound >= 7 && marketRound < 10) {
            document.getElementById("marketCap").innerText = "$" + Math.round((MarketCapitalization / 1000000) * 100) / 100 + "MM"
        } else if (marketRound >= 10 && marketRound < 13) {
            document.getElementById("marketCap").innerText = "$" + Math.round((MarketCapitalization / 1000000000) * 100) / 100 + "B"
        } else if (marketRound >= 13 && marketRound < 14) {
            document.getElementById("marketCap").innerText = "$" + Math.round((MarketCapitalization / 1000000000000) * 100) / 100 + "T"
        }

        document.getElementById("symbol").innerText = Symbol;
        document.getElementById("PERatio").innerText = PERatio;
        document.getElementById("EPS").innerText = "$" + EPS;
        document.getElementById("PEG").innerText = PEGRatio;
        document.getElementById("BookValue").innerText = "$" + BookValue;
        document.getElementById("DividendPerShare").innerText = "$" + DividendPerShare;
        document.getElementById("ProfitMargin").innerText = ProfitMargin;

        if (PERatio >= 50) {
            document.getElementById("BuyRating").innerText = "Sell";
            var RatingColor = document.getElementById("BuyRating");
            RatingColor.classList.add("red");
        } else if (PERatio < 50 && PERatio >= 20) {
            document.getElementById("BuyRating").innerText = "Hold";
            var RatingColor = document.getElementById("BuyRating");
            RatingColor.classList.add("yellow");
        } else if (PERatio == "None"){
            document.getElementById("BuyRating").innerText = "Sell";
            var RatingColor = document.getElementById("BuyRating");
            RatingColor.classList.add("red");
        } else {
            document.getElementById("BuyRating").innerText = "Buy";
            var RatingColor = document.getElementById("BuyRating");
            RatingColor.classList.add("green");
        }
        
    },
    search: function () {
        this.fetchFinancials(document.getElementById("finance-search-bar").value);
    },
    clearSearch: function() {
        document.getElementById("finance-search-bar").value = "";
    }
};
/*adds event listeners to the seach bar and search button that real the quote functions and clears searchbar*/
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
/*Loads in filler data by running function with googl*/
financials.fetchFinancials("googl");