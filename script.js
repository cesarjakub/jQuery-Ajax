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
    let list = [];
    coinList();

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
                $(".table").css("visibility","visible");
                $(".refreshPrice").css("visibility","visible");
                $("#Error").css("visibility","hidden");
            },
            error: function(error){
                $("#Error").css("visibility","visible");
            } 
        });
    }

    function coinList(){
        $.ajax({
            url: `https://api.coingecko.com/api/v3/coins/list?include_platform=false`,
            type: "GET",
            success: function(result){
                for(let i = 0; i < result.length; i++){
                    list.push(result[i].id);
                }
                console.log(list);
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


