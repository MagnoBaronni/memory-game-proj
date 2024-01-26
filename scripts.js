  
      // Crie uma matriz com pares de números representando as cartas
      const cards = [1, 1, 2, 2, 3, 3, 4, 4]

      // Crie um objeto para armazenar as imagens correspondentes para cada carta
      async function generateImagePairs() {
        const imagePairs = {};
        for (let i = 0; i < cards.length; i++) {
          if (!imagePairs[cards[i]]) {
            const id = Math.floor(Math.random() * 1000) + 1;
            const url = `https://picsum.photos/id/${id}/200/300`;
            imagePairs[cards[i]] = [url, url]; 
          }
        }
      
        return imagePairs;
      }


      // Embaralhe a matriz de cartas
      function shuffleCards(cards) {
        cards.sort(() => Math.random() - 0.5);
      }

      let flippedCards = 0;
      let firstCard, secondCard;
      let attempts = 0;

      // Selecione as cartas e atribua um número da matriz a cada carta
      async function createCards() {
        const imagePairs = await generateImagePairs();
        shuffleCards(cards);
        const cardsList = document.querySelector(".container");
        for (let i = 0; i < cards.length; i++) {
      
      const card = document.createElement("div");
      const cardBack = document.createElement("div");
      const cardFront = document.createElement("div");
      
      card.classList.add("card");
      cardBack.classList.add("back");
      cardFront.classList.add("front");
      
      cardBack.style.backgroundImage = `url('card-back.png')`;
      const cardNumber = cards[i];
      const cardImage = imagePairs[cardNumber].pop();
      cardFront.style.backgroundImage = `url(${cardImage})`;
      
      card.setAttribute("data-card", cardNumber);
      card.appendChild(cardBack);
      card.appendChild(cardFront);
      card.addEventListener("click", flipCard);
      cardsList.appendChild(card);
    }
  }

      // Vire a carta clicada
      function flipCard() {
      if (flippedCards < 2 && !this.classList.contains("flip")) {
      flippedCards++;
      this.classList.add("flip");
      if (flippedCards === 1) {
      firstCard = this;
      } else {
        secondCard = this;
        attempts++;
        updateAttempts();
        checkForMatch();
          }
        }
      }

      // Verifique se as cartas viradas são iguais
      function checkForMatch() {
      const isMatch =
      firstCard.getAttribute("data-card") === secondCard.getAttribute("data-card");
      isMatch ? disableCards() : unflipCards();
      }

      // Desabilita as cartas viradas se forem iguais
      function disableCards() {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
 
      
      //Reset Board
      console.log(document.querySelectorAll(".card:not(.flip)").length);
      if (document.querySelectorAll(".card:not(.flip)").length === 0) {    
      }   
      resetBoard();
      }

      // Desvira as cartas se não forem iguais
      function unflipCards() {
        setTimeout(() => {
          firstCard.classList.remove("flip");
          secondCard.classList.remove("flip");
          resetBoard();
        }, 1000);
      }

      // Reinicia o tabuleiro
      function resetBoard() {
        [flippedCards, firstCard, secondCard] = [0, null, null];
      }

      // Atualiza o número de tentativas
      function updateAttempts() {
        const attemptsElement = document.querySelector(".attempts");
        attemptsElement.textContent = `Tentativas: ${attempts}`;
      }

     // Win Game( saudação)
     function showCongratulations() {
     const congratulationsContainer = document.querySelector(
      ".congratulations-container"
     );
     const congratulationsElement = document.createElement("p");
     congratulationsElement.classList.add("congratulations");
     congratulationsElement.textContent = `Parabéns! Você venceu!`;
     congratulationsContainer.appendChild(congratulationsElement);
     }

      // At this point the time, 
     //the level set by the user is treated and given a certain amount of time, 


      var nivelMosquito = 10
      var nivel = window.location.search
      var nivel = (nivel.replace('?', ''))

      if (nivel === 'normal') {
        nivelMosquito = 25

      }else if (nivel ==='dificil') {
        nivelMosquito = 10
      }
      else if (nivel === 'chucknorris') {
        nivelMosquito = 8
      }

      //then at the end of this time the game ends and restarts automatically.
      let tempo = setInterval(function(){ 
      nivelMosquito -= 1
    
      // Wins
      if (document.querySelectorAll(".card:not(.flip)").length === 0 && nivelMosquito >= 0) {
        
        setTimeout(function(){
          showCongratulations()}, 1000)
      
        setTimeout(function(){
          window.location.reload()
           }, 1899)
      }
    
      //Game Over
      if (nivelMosquito < 0){

      setTimeout(function(){
        const congratulationsContainer = document.querySelector(
          ".congratulations-container"
        );
        const congratulationsElementB = document.createElement("p");
        congratulationsElementB.classList.add("congratulationsB");
        congratulationsElementB.textContent = '---------GAME OVER----------';
        congratulationsContainer.appendChild(congratulationsElementB); 
      }, 1000)
  
      //Reload Screem
      setTimeout(function(){
      window.location.reload()}, 1899)
   
      // Set nivel -time  
      } else {
      document.getElementById('cronometro').innerHTML = nivelMosquito
      } } , 1000)

  
  
     // Iniciar jogo
     createCards();