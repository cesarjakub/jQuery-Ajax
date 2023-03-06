$( document ).ready(() => {
    $("#Error").css("visibility","hidden");
    $(".table").css("visibility","hidden");
    $("#ErrorBtn").click(() =>{
        document.location.reload();
    });

    function cards(img, title, czk, usd, eur){
        let text = `
                    <div class="card" style="width: 18rem;">
            <img src="${img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">CZK: ${czk}</li>
                <li class="list-group-item">EUR: ${eur}</li>
                <li class="list-group-item">USD: ${usd}</li>
            </ul>
            </div>`;
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
                $(".cards").append(cards(result.image.small, result.name, czk, eur, usd));
                $("#Eroor").css("visibility","hidden");
            },
            error: function(error){
                $("#Error").css("visibility","visible");
                
            } 
        });
    }

    function coinList(){
        $.ajax({
            url: ``,
            type: "GET",
            data:{

            },
            success: function(result){
                
                $("#Eroor").css("visibility","hidden");
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



