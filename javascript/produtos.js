var escolhidos = JSON.parse(localStorage.getItem("escolhidos"));
if (escolhidos == null) {
    var carrinhoCompras = [];
} else {
    var carrinhoCompras = escolhidos;      
}            

$(document).ready(function (){
    $('#qtdeCart').html(carrinhoCompras.length);                  
});

function adicionarCarrinho(id) {
    var itemAdicionado = id;
    $.getJSON('json/loja.json', function (data) {
        $.each(data, function(index, value) {
            if(value.id == itemAdicionado) {
                carrinhoCompras.push(value);
                $('#qtdeCart').html(carrinhoCompras.length);
                localStorage.setItem("escolhidos",JSON.stringify(carrinhoCompras));                 
            }
        });
    });
}