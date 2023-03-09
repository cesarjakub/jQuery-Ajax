$( document ).ready(() => {
    $("#Error").css("visibility","hidden");
    $(".table").css("visibility","hidden");
    $(".refreshPrice").css("visibility","hidden");
    $("#ErrorBtn").click(() =>{
        document.location.reload();
    });
    $("#refreshBtn").click(() =>{
        console.log("refres prices");
    });

    function cards(img, title, czk, usd, eur, time){
        let text = `
        <tr>
        <th scope="row"><img src="${img}" alt="coin"></th>
        <td>${title}</td>
        <td>${czk}kč</td>
        <td>${usd}$</td>
        <td>${eur}€</td>
        <td>${time}</td>
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
                $("tbody").prepend(cards(result.image.thumb, result.name, czk, eur, usd, ));
                $(".table").css("visibility","visible");
                $(".refreshPrice").css("visibility","visible");
                $("#Error").css("visibility","hidden");
            },
            error: function(error){
                $("#Error").css("visibility","visible");
            } 
        });
    }

    function topTenTable(){
        getCoinID("bitcoin");
        getCoinID("ethereum");
        getCoinID("tether");
        getCoinID("cardano");
        getCoinID("dogecoin");
        getCoinID("solana");
        getCoinID("spacevikings");
        getCoinID("stellar");
        getCoinID("fantom");
    }
    topTenTable();

    $("#searchBtn").click(function(e){
        let val = $("#searchInput").val();
        getCoinID(val);
    })

});


