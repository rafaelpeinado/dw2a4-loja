var escolhidos = JSON.parse(localStorage.getItem("escolhidos"));
if (escolhidos == null) {
    var carrinhoCompras = [];
} else {
    var carrinhoCompras = escolhidos;      
}            

$(document).ready(function (){
    $('#qtdeCart').html(carrinhoCompras.length);
    
    $.getJSON('json/loja.json', function(data) {
        var item;
        
        $.each(data, function(i, livro) {
            item = "<div class='produto' id='livro" + livro.id + "'>" + 
                        "<div class='imagem'>" +
                            "<img src='" + livro.capa + "'>" + 
                        "</div>" + 
                        "<div class='nome-livro'>" +
                            "<span>" + livro.titulo + "</span>" + 
                        "</div>" +
                        "<div class='autor'>" +
                                "<span>" + livro.autor + "</span>" +
                            "</div>" +
                        "<div class='preco'>" + 
                            "<span> R$ " + livro.preco + "</span>" +
                        "</div>" +
                        "<div id='livro" + livro.id + "' class='add-carrinho'>" +
                           "<a onclick='adicionarCarrinho(" + livro.id + ");'><span class='texto-carrinho'>Adicionar ao carrinho</span></a>" +
                        "</div>" +
                    "</div>";
            $("#index").append(item);
        });
    });
});

function adicionarCarrinho(id) {
    var itemAdicionado = id;
    $.getJSON('json/loja.json', function (data) {
        $.each(data, function(index, livro) {
            if(livro.id == itemAdicionado) {
                carrinhoCompras.push(livro);
                $('#qtdeCart').html(carrinhoCompras.length);
                localStorage.setItem("escolhidos",JSON.stringify(carrinhoCompras));                 
            }
        });
    });
}