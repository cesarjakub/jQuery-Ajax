$( document ).ready(() => {
    $("#Error").css("visibility","hidden");
    $(".table").css("visibility","hidden");
    $("#ErrorBtn").click(() =>{
        document.location.reload();
    });

    function cards(img, title, czk, usd, eur){
        let text = `
        <tr>
        <th scope="row"><img src="${img}" alt="coin"></th>
        <td>${title}</td>
        <td>${czk}kč</td>
        <td>${usd}$</td>
        <td>${eur}€</td>
        </tr>`;
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
                $("tbody").prepend(cards(result.image.thumb, result.name, czk, eur, usd));
                $("#Eroor").css("visibility","hidden");
                $(".table").css("visibility","visible");
            },
            error: function(error){
                $("#Error").css("visibility","visible");
                
            } 
        });
    }

    $("#searchBtn").click(function(e){
        let val = $("#searchInput").val();
        getCoinID(val);
    })

});



