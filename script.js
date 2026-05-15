
//Array de palavras que vocês devem utilizar! Caso queiram adicionar mais alguma palavra, fiquem à vontade. 

const BancoDePalavras = ["TERMO", "CASAL", "LIVRO", "PEDRA", "PORTA", "CARRO", "AVIAO", "NORTE", "SULCO", "VERDE", "PRETO", "BRISA", "FORTE", "DORES", "MENTE", "CORPO", "TEMPO", "SABER", "PODER", "FALAR", "ANDAR", "COMER", "VIVER", "OLHAR", "DIZER", "LEVES", "GRAVE", "CLARO", "TERRA", "PLANO", "LINHA", "PONTO", "FORMA", "IDEIA", "VALOR", "SOMAR", "SUBIR", "JOGAR", "CRIAR", "AMIGO", "FELIZ", "RISOS", "CHUVA", "SOLAR", "VENTO", "NUVEM", "PEDAL", "FONTE", "CAMPO", "LIMPO", "SUAVE", "MAGIA", "SONHO", "LOUCO", "CERTO", "ERRAR", "NIVEL", "FRASE", "PENIS", "TEXTO", "CONTA", "CALMA", "LONGE", "PERTO", "ENTRE", "ANTES", "TARDE", "NOITE", "HORAS", "FIRME", "FRACO", "RAPTO", "LENTO", "NOVOS", "VELHO", "JOVEM", "UNICO", "CHEIO", "VAZIO", "ALTOS", "BAIXO", "LARGO", "FINOS", "ABRIR", "FECHO", "SAIDA", "RODAR", "GIRAR", "PARAR", "MEXER", "TOCAR", "OUVIR", "PENSO", "AGORA", "NUNCA", "CERCA", "PORTO", "PRAIA", "ILHAS", "PEDIR", "PEGAR", "SOLTO", "BUSCA", "ACHAR", "PERDA", "TENTE", "ERROS", "SABIA", "BOING", "METAL", "GALOS", "LONGE", "RITMO"];

//Vamos lá senhores! Ora de montar o Nosso programinha de TERMO! Verifiquem o documento "Guia de montagem do TERMO" para saberem como fazer o joguinho e não se perder no caminho!

//Quantatidade de tentativas que o usuário terá
let tentativas = 6;

//Gera um número aleatório entre 0 e 110 (quantidade atual que tem no banco de palavras - 1)

const numeroAleatorio = Math.floor(Math.random() * 110)

//Seleciona qual será a palavra escolhida para ser advinhada durante o jogo a partir do numero aleatório

const palavraDoJogo = BancoDePalavras[numeroAleatorio];
console.log(palavraDoJogo);
//Pega o endereço id da grid em que as letras ficarão

const grid = document.querySelector("#grid");

/**
 * Exibe uma mensagem para o usuário indicando se ele perdeu ou ganhou o jogo
 * @param {string} texto - Conteúdo
 * @param {string} tipo - Classe da mensagem
 */
function mostrarMensagem(texto, tipo = "") {
  const mensagem = document.getElementById("mensagem");
  mensagem.textContent = ""; //Primeiro zera o que está escrito
  mensagem.textContent = texto; //Escreve a nova mensagem
  mensagem.className = ""; // limpa classes

  if (tipo) {
    mensagem.classList.add(tipo);
  }
}

//Variavel Global que irá conter as letras e quantas vezes elas se repetem
let arrayPalavra = [];
//Conta a quantas vezes determianda letra se repete e coloca no arrayPalavra
//Deve retornar um array assim [["letra", numRepetições], ["letra2", numRepetições2]]
//Exemplo: SABIA
// S -> 1
// A -> 2
// B -> 1
// I -> 1
//[["S", 1], ["A", 2], ["B", 1], ["I", 1]]

function destrinchaPalavra() {
  arrayPalavra = []; //Reseta antes de preencher
  for (let i = 0; i < palavraDoJogo.length; i++) {
    let check = false;
    for (let j = 0; j < arrayPalavra.length; j++) {
      if (palavraDoJogo[i] == arrayPalavra[j][0]) {
        check = true;
        break;
      }
    }
    if (check) {
      for (let h = 0; h < arrayPalavra.length; h++) {
        if (arrayPalavra[h][0] == palavraDoJogo[i]) {
          arrayPalavra[h][1]++;
          break;
        }
      }
    }
    else {
      arrayPalavra.push([palavraDoJogo[i], 1]);
    }
  }
}

/**
 * Verifica quais letras estão corretas e remove do contador de palavras - Verde do termo
 * @param {string} palavraDigitada  - Palavra digitada pelo usuário
 * @returns Array com as posições das letras que estão corretas - Verdes
 */
function verificaCertos(palavraDigitada) {
  let verde = []
  for (let i = 0; i < palavraDigitada.length; i++) {
    if (palavraDigitada[i] === palavraDoJogo[i]) {
      verde.push(i);
      for (let j = 0; j < arrayPalavra.length; j++) {
        if (arrayPalavra[j][0] === palavraDigitada[i]) {
          arrayPalavra[j][1]--;
          break;
        }
      }
    }
  }
  return verde;
}

/**
 * Verifica quais letras existem, mas estão no local errado
 * @param {string} palavraDigitada - Palavra digitada pelo usuário
 * @param {array} certinhos - Array com as posições das letras que já estão corretas - Verdes (Precisa da função acima)
 * @returns Array com as posições das letras que devem ser amarelas
 */
function verificaAmarelos(palavraDigitada, certinhos) {
  let amarelas = [];

  for (let i = 0; i < palavraDigitada.length; i++) {

    if (certinhos.includes(i)) continue;

    arrayPalavra.some((letraArray) => {
      if (letraArray[0] === palavraDigitada[i] && letraArray[1] > 0) {
        amarelas.push(i);
        letraArray[1]--; 
        return true; 
      }
      return false;
    });

  }

  return amarelas;
}

//Junta as letras verdes (corretas) com as amarelas (existem na palavras, mas em local errado)
function verificaPalavra(palavraDigitada) {
  let cores = ["-", "-", "-", "-", "-"];
  let certinhos = verificaCertos(palavraDigitada);
  console.log(certinhos);
  let amarelin = verificaAmarelos(palavraDigitada, certinhos);
  console.log(amarelin);
  //Criar um array que cotém as cores dos quadrados em ordem utilizando esses strings da legenda!
  //Exemplo de array a ser criado ["V", "V", "V", "A", "-""]
  // "V" - Verde
  // "A" - Amarelo
  // "-"" = Errado

  
  for(let i = 0; i<certinhos.length; i++){
    cores[certinhos[i]] = "V";
  }
  for(let i = 0; i< amarelin.length; i++)
  {
    cores[amarelin[i]] = "A"
  }

  //Faça isso de acordo com as posições que devem ser verdes (certinhos), as posiçõs que vem devem ser amarelas (amarelin)
  //Os que sobrarem contiunuam como "-"

  console.log(cores)
  return cores;
}

destrinchaPalavra();
console.log(arrayPalavra);
//Chame a função para mostrar o valor de tentativas para o usuário
function atualizarTentativas(){
  tentativas--;
  mostrarMensagem(`Tentativas Restantes: ${tentativas}`);
}


botao = document.querySelector("#enviar")
botao.addEventListener("click", () => {
  //Pega a palavra digitada pelo usuário, converte tudo para maiúsculo e romove os espaços
  const palavraDigitada = document.querySelector("#palavra").value.toUpperCase();
  if(tentativas<0)
  atualizarTentativas()
    if (tentativas > 0) {
    //Verifica se a palavra digitada é diferente do tamanho padrão do jogo, que é 5!
    console.log(palavraDigitada + palavraDigitada.length)
    if (palavraDigitada.length < 5) {
      return alert("Digite 5 letras!");
    } else {

      let cores = verificaPalavra(palavraDigitada);

      //Adiciona as li na tela juntamente com as cores selecionadas!
      for (let i = 0; i < 5; i++) {
        //Crie o elementos li
        const caixaLetra =  document.createElement("li")
        caixaLetra.classList.add("caixaLetra");
        caixaLetra.textContent = palavraDigitada[i];
          //Adicione a classe "caixaLetra" para essa li recém criada, use o classList - AQUI

          //Adicione como conteúdo dessa li o valor da letra da palavraDigitada na posição i - AQUI

          //Continue o switch abaixo, mas agora colocando a classe para quando for "A" e quando for "-"
          switch (cores[i]) {
          case "V": caixaLetra.classList.add("correto");
            break;
          //Classe para o A: "existeMasErrado"
          
          case "A": caixaLetra.classList.add("existeMasErrado");
          break;

          //Clase para o caso "-": "naoTem"
          case "-": "naoTem";
          break;
        }

        grid.appendChild(caixaLetra);
      }
      //Reseta todas as variaveis para a próxima rodada
      document.getElementById("palavra").value = "";
      console.log(arrayPalavra);
      destrinchaPalavra();

      //Diminui 1 das tentativas do usuário e informa o novo valor para o usuário - AQUI
      console.log(tentativas)

      //Se a palavra do jogo ser igual a digitada pelo usuário, então ele venceu! Informe uma mensagem de texto comemorando!
      //Se não, continua o jogo! A menos que tenha acabado as tentativas dele...
      //Nesse caso, informe que ele perdeu e qual era a palavra do jogo.
      if (palavraDoJogo == palavraDigitada) {
            mostrarMensagem("Você acertou!", "sucesso");
        tentativas = 0;
      } else if (tentativas == 0 && palavraDigitada!= palavraDoJogo) {
            mostrarMensagem("Fim de jogo! A palavra era " + palavraDoJogo, "erro");
      }
    }
  }
});

//Função para conseguir enviar a palavra no input pelo enter
document.getElementById("palavra").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    botao.click();
  }
});
