let showError = document.getElementById("Error");
showError.style.visibility = "hidden";
let searchText = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let currencyList = [];

function getCoinID(id){
    $.ajax({
        url: `https://api.coingecko.com/api/v3/coins/${id}`,
        type: "GET",
        data: {id},
        success: function(result){
            console.log(result);
            showError.style.visibility = "hidden";
        },
        error: function(error){
            showError.style.visibility = "visible";
        } 
    });
}

function getCoinCurrency(){
    $.ajax({

    });
}

$("#searchBtn").click(function(e){
    getCoinID(searchText.value);
})




