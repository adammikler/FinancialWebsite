let quote = {
    apiKey: 'P0QBP93K53OG6N25',
    fetchQuote: async function(company) {
        await fetch(
            'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + 
            company.toUpperCase() +
            '&apikey=' +
            this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayData(data));
    },

    displayData: function(data) {
        data = JSON.parse(JSON.stringify(data).replace(/\s(?=\w+":)/g, ""));
        const { "01.symbol": symbol } = data.GlobalQuote;
        const { "02.open": open } = data.GlobalQuote;
        const { "03.high": high } = data.GlobalQuote;
        const { "04.low": low } = data.GlobalQuote;
        const { "05.price": price } = data.GlobalQuote;
        const { "09.change": change } = data.GlobalQuote;
        const { "10. changepercent": percent} = data.GlobalQuote;

        document.querySelector(".symbol").innerText = symbol;
        document.querySelector(".open").innerText = "$" + open;
        document.querySelector(".high").innerText = "$" + high;
        document.querySelector(".low").innerText = "$" + low;
        document.querySelector(".price").innerText = "$" + price;
        document.querySelector(".change").innerText = "$" + change;
        document.querySelector(".percent").innerText = percent;

        if ((change / Math.abs(change)) == -1) {
            var priceChange = document.getElementById("priceChange");
            priceChange.classList.add("red");
            var percentChange = document.getElementById("percentChange");
            percentChange.classList.add("red");
        } else if ((change / Math.abs(change)) == 1) {
            var priceChange = document.getElementById("priceChange");
            priceChange.classList.add("green");
            var percentChange = document.getElementById("percentChange");
            percentChange.classList.add("green");
        }

    },
    search: function () {
        this.fetchQuote(document.getElementById("index-search").value);
    },
    clearSearch: function() {
        document.getElementById("index-search").value = "";
    }
};

document.getElementById("index-button").addEventListener("click", function () {
    quote.search();
    quote.clearSearch();
});

document.getElementById("index-search").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        quote.search();
        quote.clearSearch();
    }
});

quote.fetchQuote("googl");