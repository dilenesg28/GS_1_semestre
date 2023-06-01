document.querySelector("#salvar").addEventListener("click", cadastrar)

let contas = []

window.addEventListener("load", () => {
    contas = JSON.parse(localStorage.getItem("contas")) || []
    atualizar()
})




/****************************************************************** */
document.querySelector("#busca").addEventListener("keyup", ()=> {
    let busca = document.querySelector("#busca").value
    let contasFiltradas = contas.filter((conta) =>{
        return conta.titulo.toLowerCase().includes(busca.toLowerCase())
    })
    filtrar(contasFiltradas)
})

function filtrar(contas){
    document.querySelector("#contas").innerHTML = ""
    contas.forEach((conta) =>{
        document.querySelector("#contas").innerHTML 
                    += criarCard(conta)
    })
}
/*///////////////////////////////////////////////*/
document.querySelector("#busca").addEventListener("clear", ()=> {
    let limpa = document.querySelector("#busca").value
    atualizar()
})

/****************************************************************** */
document.querySelector("#filtrar_pendentes").addEventListener("click", () => {
    let contasFiltradas = contas.filter(conta => !conta.concluida)
    filtrar(contasFiltradas)
})
document.querySelector("#filtrar_concluidas").addEventListener("click", () => {
    let contasFiltradas = contas.filter(conta => conta.concluida)
    filtrar(contasFiltradas)
})
document.querySelector("#limpar_filtro").addEventListener("click", () => {
    
    atualizar()
})
/*---------------------------------------------*/ 
function atualizar() {
    localStorage.setItem("contas", JSON.stringify(contas))
    document.querySelector("#contas").innerHTML = ""
    contas.forEach(conta =>
        document.querySelector("#contas").innerHTML += criarCard(conta))     
    
 
}

function filtrar(lista){
    document.querySelector("#contas").innerHTML = ""
    lista.forEach(conta => 
        document.querySelector("#contas").innerHTML += criarCard(conta))
}

function cadastrar() {
    const titulo = document.querySelector("#titulo").value
    const litros = document.querySelector("#litros").value
    const dataI = document.querySelector("#dataI").value 
    const categoria = document.querySelector("#categoria").value
    const obs = document.querySelector("#obs").value
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))

    const conta = { //JSON Java Script Object Notation
        id:Date.now(),
        titulo,
        litros,
        dataI,
        categoria,
        obs,
        concluida: false
    }

    if (!isValid(conta.titulo, document.querySelector("#titulo"))) return
    if (!isValid(conta.categoria, document.querySelector("#categoria"))) return
    if (!isValid(conta.dataI, document.querySelector("#dataI"))) return
    contas.push(conta)
    atualizar()  
   
    modal.hide()

}


function isValid(valor, campo) {
    if (valor.length == 0) {
        campo.classList.add("is-invalid")
        campo.classList.remove("is-valid")
        return false
    } else {
        campo.classList.add("is-valid")
        campo.classList.remove("is-invalid")
        return true
    }

}

function apagar(id){
   
    contas = contas.filter(conta => conta.id !== id)
    atualizar()
}

function concluir(id){
    let contaEncontrada = contas.find(conta => conta.id == id)
    contaEncontrada.concluida=true
    atualizar()
}
function criarCard(conta) {
    let disabled = conta.concluida ? "disabled" : ""

    const card = `
        <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card">
            <div class="card-header"  style="background-color: #4682B4;" style="font-size: medium;">${conta.titulo}                 
            </div>
            <div class="input-group-addon"  >
                <span class="glyphicon glyphicon-th" >${conta.dataI}</span>
                
            </div>
            <div class="card-body" style="background-color: #B0C4DE;"> 
                <p class="card-text" >${conta.obs}</p>                 
            </div>
            <div class="card-body" style="background-color: #B0C4DE;"> 
                <span class="badge text-bg-warning">${conta.categoria}</span>
                <span class="badge text-bg-warning">${conta.litros}litros</span>
            </div>       
            <div class="card-footer" style="background: #6495ED;">
                <a href="#" onClick="concluir(${conta.id})" class="btn btn-success ${disabled}" title="marcar como concluída">
                    <i class="bi bi-check2"></i>
                </a>
                <a href="#" onClick="apagar(${conta.id})" class="btn btn-danger" title="apagar tarefa">
                    <i class="bi bi-trash3"></i>
                </a>
            </div> <!-- card footer -->
        </div> <!-- card -->
    </div> <!-- col -->
    `
    return card
}