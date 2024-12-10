function buscarCEP() {
    var cep = document.getElementById("cep").value.trim();  // Remove espaços extras

    // Verificar se o CEP tem 8 caracteres e é numérico
    if (cep.length !== 8 || isNaN(cep)) {
        alert("Por favor, digite um CEP válido com 8 dígitos numéricos.");
        return;
    }

    // Montar a URL da API ViaCEP
    var url = `https://viacep.com.br/ws/${cep}/json/`;

    // Fazer a requisição com o fetch
    fetch(url)
        .then(response => {
            // Verificar se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error("Erro ao buscar dados.");
            }
            return response.json();  // Converter a resposta para JSON
        })
        .then(data => {
            if (data.erro) {
                document.getElementById("resultado").innerHTML = "CEP não encontrado.";
            } else {
                // Exibir os resultados na página
                document.getElementById("resultado").innerHTML = 
                    `<strong>Rua:</strong> ${data.logradouro} <br>
                    <strong>Bairro:</strong> ${data.bairro} <br>
                    <strong>Cidade:</strong> ${data.localidade} <br>
                    <strong>Estado:</strong> ${data.uf} <br>
                    <strong>CEP:</strong> ${data.cep}`;
            }
        })
        .catch(error => {
            // Caso haja algum erro de rede ou de API
            document.getElementById("resultado").innerHTML = "Erro ao conectar com a API. Tente novamente.";
            console.error("Erro:", error);  // Logar o erro para depuração
        });
}