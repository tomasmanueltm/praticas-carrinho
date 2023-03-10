let seletor = (e)=> document.querySelector(e),
    seletorId  = (e)=> document.getElementById(e),
    seletorAll = (e)=> document.querySelectorAll(e);









    
    
function cadastrarCliente()
{
    var objPessoa = {
        id: '',
        nome: seletorId("nomeCliente").value,
        email: seletorId("emailCliente").value,
        cidade: seletorId("cidadeCliente").value,
        telefone: seletorId("telefoneCliente").value
    }; 
    if(validarPessoa(objPessoa) == true)
    {
        alert("Registro Criado")
    }
    else if(validarPessoa(objPessoa) == null)
    {
        alert("inicio de registro criado")
    }
    else
    {
        alert("registro ja existente")
    }
    
}

function validarPessoa(obj)
{
    var clientes = JSON.parse(localStorage.getItem("clientes"));
    if(clientes == null)
    {
        obj.id = 1;
        localStorage.setItem("clientes", JSON.stringify([obj]))
        return null;
    }
    else
    {
        var result =  clientes.filter((coluna)=>{
            return coluna.telefone == obj.telefone
        })
        
        if(result.length == 0)
        {
            obj.id = clientes.length+1;
            clientes.push(obj);
            localStorage.setItem("clientes", JSON.stringify(clientes));
            return true;
        }
        else
        {
            return false;
        }
    }
}












// function validarCampos(ob)
// {

// }

// function setPessoa(item){}
// function getPessoa(){}

// function getProduto(){}
// function setProduto(item){}




function cadastrarProduto()
{
    var objProduto = {
        id: '',
        produto: seletorId("nomeProduto").value,
        preco: seletorId("precoProduto").value,
        desconto: seletorId("descontoProduto").value,
        data: seletorId("dataExpiracaoProduto").value
    }; 
    if(validarProduto(objProduto) == true)
    {
        alert("Registro Criado")
    }
    else if(validarProduto(objProduto) == null)
    {
        alert("inicio de registro criado")
    }
    else
    {
        alert("registro ja existente")
    }
}
function validarProduto(obj)
{
    
    var produtos = JSON.parse(localStorage.getItem("produtos"));
    if(produtos == null)
    {
        obj.id =1;
        localStorage.setItem("produtos", JSON.stringify([obj]))
        return null;
    }
    else
    {
        var result =  produtos.filter((coluna)=>{
            return coluna.produto == obj.produto
        })
        
        if(result.length == 0)
        {
            obj.id = produtos.length+1;
            produtos.push(obj);
            localStorage.setItem("produtos", JSON.stringify(produtos));
            carregarListaProduto();
            return true;
        }
        else
        {
            return false;
        }
    }
}
function carregarListaProduto()
{
    var comboBox = seletorId("produtoItens");
    comboBox.innerHTML = "";
    comboBox.innerHTML += `<option value="" selected disabled>Seleciona Produto</option>`;

    let produtos = JSON.parse(localStorage.getItem("produtos"));
    produtos.forEach((coluna)=>{
           comboBox.innerHTML += `<option value=${coluna.id}>${coluna.produto}</option>`;
    })
    var countCarrinho = JSON.parse(localStorage.getItem("faturas"));
    seletor(".itensCarrinho").innerText = (countCarrinho == null) ? 0 : countCarrinho.length;
} 
if(localStorage.getItem("produtos") != null)
{
    carregarListaProduto();
}




var listaItem = [];
function cadastrarItens()
{
    

    let faturamento = {
        id: "",
        idProduto: seletorId("produtoItens").value,
        qtd: seletorId("qtdProduto").value
    };

    var itens = JSON.parse(localStorage.getItem("faturas"));

    if(itens != null)
    {
       let item = itens.filter(produto=>{
            if(produto.idProduto == faturamento.idProduto)
            {
                produto.qtd = soma(produto.qtd, faturamento.qtd);
                localStorage.setItem('faturas', JSON.stringify(itens));
                alert("produto já existe e foi atualizado o carrinho")
                return produto.idProduto == faturamento.idProduto;
                document.location.reload();
            }

        });
        
 
        if(item.length == 0)
        {
            faturamento.id = itens.length+1;
            itens.push(faturamento);
            alert("produto já foi adicionado no carrinho")
            document.location.reload();
        }

        if(faturamento.idProduto != '' && faturamento.qtd > 0)
        {
            seletor(".itensCarrinho").innerText = itens.length;
            return localStorage.setItem('faturas', JSON.stringify(itens));
        }
        
    }
    else
    {
        if(faturamento.idProduto != "" && faturamento.qtd >= 1)
        {

            faturamento.id = 1;
            localStorage.setItem('faturas', JSON.stringify([faturamento]));
            seletor(".itensCarrinho").innerText = 1;
            document.location.reload();
        }

    }

}
function removerItens(id){
    var item = JSON.parse(localStorage.getItem("faturas"));
    item.forEach((produto, i)=>{
        if(i == id)
        {
            if(produto.qtd == 1)
            {
                apagarItens(id);
            }
            else
            {

                produto.qtd -=1;
                localStorage.setItem("faturas", JSON.stringify(item));
                 alert("removido 1 item do produto no carrinho")
                document.location.reload();
            }
        }
    })
}
function apagarItens(id){
    var item = JSON.parse(localStorage.getItem("faturas"));
    item.splice(id, 1);
    listaItem.splice(id,1);
    localStorage.setItem("faturas", JSON.stringify(item));
    alert("eliminado do carrinho")
    document.location.reload();
}


function soma(a,b)
{
    return  Number.parseInt((parseInt(a)+parseInt(b)));
}





     
faturas = JSON.parse(localStorage.getItem('faturas'));
    if(faturas != null)
    {
        faturas.forEach(fatura=>{
            return consultaProduto(fatura.idProduto, fatura.qtd);
    })
}






  
// CONSULTA PRODUTO PELO ID E OBTER PRECO 
function consultaProduto(id, quantidade)
{
   return JSON.parse(localStorage.getItem("produtos")).forEach(produto=>{
        if(produto.id == id)
        {
            listaItem.push(
                { 
                    produto: produto.produto, 
                    quantidade: quantidade,
                    preco: produto.preco,
                    total: (produto.preco*quantidade) 
                }); 
        }
    })
}


function carregarCarrinho(){}carregarCarrinho();

var listaCarrinho = seletorId("listaCarrinho");
listaItem.forEach((item, i)=>{
    
    var tr = document.createElement("tr");
    tr.innerHTML = `<td>${item.produto}</td>
                    <td>${item.quantidade}</td>
                    <td>${item.preco}</td>
                    <td>${item.total}</td>
                    <td>
                    <i class="bi bi-eye-add" onclick="removerItens(${i})"></i>
                    <i class="bi bi-eye-remove" onclick="apagarItens(${i})"></i>
                    </td> `;
    listaCarrinho.append(tr) 
});
var totalElement = document.createElement("tr");
totalElement.innerHTML = `<td colspan='5' align='rigth'> Total <span id='totalValor'>0</span> Kz</td>`;
listaCarrinho.insertAdjacentElement("beforeEnd", totalElement);

// totalvalor
var total = seletorId("totalValor");
listaItem.forEach(valor=>{
    if(total != null)
    {
        total.innerText = soma((total.textContent == null ? 0 : total.textContent), valor.total);
    }
})




seletorAll(".cadastra").forEach(button => {
    button.addEventListener("click", (e)=>{
        switch (e.target.dataset.opcao) {
            case "cliente":
                cadastrarCliente();
                break;

            case "produto":
                cadastrarProduto();
                break;

            case "itens":
                cadastrarItens();
                break;
        }
    })
});

