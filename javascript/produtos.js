var escolhidos = JSON.parse(localStorage.getItem("escolhidos"));
if (escolhidos == null) {
    var carrinhoCompras = [];
} else {
    var carrinhoCompras = escolhidos;      
}            

$(document).ready(function (){
    $('#qtdeCart').html(quantidadeItens());
    
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
                        "<div onclick='adicionarCarrinho(" + livro.id + ");' class='add-carrinho'>" +
                           "<a><span class='texto-carrinho'>Adicionar ao carrinho</span></a>" +
                        "</div>" +
                    "</div>";
            $("#index").append(item);
        });
    });
});

function adicionarCarrinho(id) {
    var i = 0;
    var existe = false;
    if (carrinhoCompras.length != 0) {
        if(existeItemCarrinho(id) == -1) {
            adicionarLivro(id);
        } else {
            adicionarQuantidade(existeItemCarrinho(id));
        }
    } else {
        adicionarLivro(id);
    }
}

function quantidadeItens() {
    var totalItens = 0;
    var i = 0;
    for(i = 0; i < carrinhoCompras.length; i++) {
        totalItens += carrinhoCompras[i].quantidade;
    }
    return totalItens;
}

function existeItemCarrinho(id) {
    var i = 0;
    for(i = 0; i < carrinhoCompras.length; i++) {
        if(id == carrinhoCompras[i].id) {
            return i;
        }
    }
    return -1;
}

function adicionarLivro(id) {
    $.getJSON('json/loja.json', function (data) {
        $.each(data, function(index, livro) {
            if(livro.id == id) {
                livro.quantidade = 1;
                carrinhoCompras.push(livro);    
                atualizarCarrinho();           
            }
        });
    });
}

function adicionarQuantidade(posicao) {
    carrinhoCompras[posicao].quantidade++;
    atualizarCarrinho();
}

function atualizarCarrinho() {
    $('#qtdeCart').html(quantidadeItens());
    localStorage.setItem("escolhidos",JSON.stringify(carrinhoCompras)); 
}