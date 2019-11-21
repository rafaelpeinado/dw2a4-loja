//criando tela do carrinho
$(document).ready(function (){
    var escolhidos = JSON.parse(localStorage.getItem("escolhidos"));
    var item;
    var total = 0.0;
    var subtotal = 0.0;
    $.each(escolhidos, function (index, livro){
        subtotal = ((parseFloat(livro.preco.replace(',', '.'))) * parseInt(livro.quantidade));
                        total += subtotal;
                        item = "<div class='produto-carrinho' id='livro" + livro.id + "'>" + 
                                    "<div class='imagem-carrinho'>" +
                                        "<img src='" + livro.capa + "'>" + 
                                    "</div>" + 
                                    "<div class='nome-livro-carrinho'>" +
                                        "<span>" + livro.titulo + "</span>" + 
                                    "</div>" +
                                    "<div class='preco-carrinho'>" +
                                            "<span> R$ " + livro.preco + "</span>" +
                                        "</div>" +
                                    "<div id='livro"+ livro.id +"' class='quantidade-carrinho'>" + 
                                        "<div onclick='diminuirQuantidade(" + livro.id + ");' class='menos-qtde'><a href='carrinho.html'>-</a></div><div><span class='num-qtde'>" + livro.quantidade + "</span></div><div onclick='aumentarQuantidade(" + livro.id + ");' class='mais-qtde'><a href='carrinho.html'>+</a></div>" +
                                    "</div>" +
                                    "<div class='subtotal-carrinho'>" + 
                                        "<span>R$ " + (subtotal.toFixed(2)).toString().replace('.', ',') + "</span>" +
                                    "</div>" +
                                    "<div onclick='removerCarrinho(" + livro.id + ");' class='remover-carrinho'>" +
                                        "<a href='carrinho.html'><span class='texto-remover'>x</span></a>" +
                                    "</div>" +
                                "</div>";
                        $("#lista-carrinho").append(item);
    });
    $("#total").append(total.toFixed(2).toString().replace('.', ','));
});

function finalizar() {
    localStorage.setItem("escolhidos", null);
    alert("Pedido finalizado!");
}

function removerCarrinho(id) {
    var i = 0;
    var novaLista = [];
    var escolhidos = JSON.parse(localStorage.getItem("escolhidos"));
    for(i = 0; i < escolhidos.length; i++){
        if(id != escolhidos[i].id){
            novaLista.push(escolhidos[i]);
        }
    }
    localStorage.setItem("escolhidos",JSON.stringify(novaLista));
    alert("Item removido!"); 
}

function aumentarQuantidade(id) {
    var i = 0;
    var escolhidos = JSON.parse(localStorage.getItem("escolhidos"));
    for(i = 0; i < escolhidos.length; i++){
        if(id == escolhidos[i].id){
            escolhidos[i].quantidade++;
        }
    }
    localStorage.setItem("escolhidos",JSON.stringify(escolhidos));
}

function diminuirQuantidade(id) {
    var i = 0;
    var escolhidos = JSON.parse(localStorage.getItem("escolhidos"));
    for(i = 0; i < escolhidos.length; i++){
        if(id == escolhidos[i].id){
            if(escolhidos[i].quantidade > 1) {
                escolhidos[i].quantidade--;
            }
        }
    }
    localStorage.setItem("escolhidos",JSON.stringify(escolhidos));
}