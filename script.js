let showError = document.getElementById("Error");
showError.style.visibility = "hidden";
let searchText = document.getElementById("searchInput");

function cards(img, title, czk, usd, eur){
    let text = `
    <tbody class="table-group-divider">
      <tr>
        <img src="${img}" alt="img">
        <td>${title}</td>
        <td>${czk}kč</td>
        <td>${usd}$</td>
        <td>${eur}€</td>
      </tr>
    </tbody>`;
    return text;
}

function getCoinID(id){
    $.ajax({
        url: `https://api.coingecko.com/api/v3/coins/${id}`,
        type: "GET",
        data: {
            id
        },
        success: function(result){
            console.log(result);
            let czk = result.market_data.current_price.czk;
            let eur = result.market_data.current_price.eur;
            let usd = result.market_data.current_price.usd;
            $(".table").append(cards(result.image.large ,result.name, czk, eur, usd));
            showError.style.visibility = "hidden";
        },
        error: function(error){
            showError.style.visibility = "visible";
        } 
    });
}

$("#searchBtn").click(function(e){
    getCoinID(searchText.value);
})





