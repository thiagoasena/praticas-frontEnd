
function inserirPacote() {
    const destino = document.getElementById("destino").value;
    const preco = document.getElementById("preco").value;
    const duracao = document.getElementById("duracao").value;
    const imagemUrl = document.getElementById("imagem").value;

    const containerDestinos = document.querySelector(".container-destinos");

    const card = document.createElement("div");
    card.classList.add("card", "roteiro-viagens");

    const header = document.createElement("header");
    const img = document.createElement("img");
    img.src = imagemUrl;
    img.alt = destino;
    header.appendChild(img);

    const h3 = document.createElement("h3");
    h3.textContent = destino;
    header.appendChild(h3);

    const main = document.createElement("main");
    const ul = document.createElement("ul");
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");

    li1.textContent = `Áereo ida e volta`;
    li2.textContent = `${duracao} diárias`;
    li3.textContent = `Café da manhã`;

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);

    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");

    h2.textContent = preco;
    span1.textContent = "Taxas inclusas";
    span2.textContent = "Em até 10x sem Juros";

    div.appendChild(h2);
    div.appendChild(span1);
    div.appendChild(span2);

    main.appendChild(ul);
    main.appendChild(div);

    const button = document.createElement("button");
    button.textContent = "Comprar";
    button.addEventListener("click", function () {
        capturarInformacoes(destino, preco, duracao);
    });

    card.appendChild(header);
    card.appendChild(main);
    card.appendChild(button);

    containerDestinos.appendChild(card);
}
