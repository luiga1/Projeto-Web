function getLocation() {
    if (navigator.geolocation) {
        // Solicita a posição do usuário
        navigator.geolocation.getCurrentPosition(preencheLocal, (e) =>{
            console.log("Erro: " + e);
        });
    } else {
        alert("O navegador não suporta geolocalização.");
    }
}

function preencheLocal(pos) {
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;
  
    document.querySelector("#latitude").value = latitude;
    document.querySelector("#longitude").value = longitude;

    console.log("Localização conseguida com sucesso");
}

async function abrirArquivo() {
    const [handle] = await window.showOpenFilePicker({
        types: [{
            description: "Arquivo JSON",
            accept: { "../json/formulario.json": [".json"] }
        }]
    });
    return handle;
}

async function enviar(){
    
    const arquivo = await fetch('../json/formulario.json')
    const dados = await arquivo.json();

    const nome = document.querySelector("#nome").value;
    const idade = document.querySelector("#idade").value;
    const email = document.querySelector("#email").value;
    const latitude = document.querySelector("#latitude").value;
    const longitude = document.querySelector("#longitude").value;
    const feedback = document.querySelector("#feedback").value;

    const form = {
        'nome': nome,
        'idade': idade,
        'email': email,
        'latitude': latitude,
        'longitude': longitude,
        'mensagem': feedback
    }

    dados.push(form);

    const dados_atualizados = JSON.stringify(dados, null, 2)

    const handle = await abrirArquivo();

    const writable = await handle.createWritable();
    await writable.write(dados_atualizados);
    await writable.close();

}

getLocation();