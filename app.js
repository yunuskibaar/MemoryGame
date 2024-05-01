const emojis = ["😂","😂","😎","😎","🐶","🐶","😙","😙","🤩","🤩","😄","😄","🤔","🤔","🥱","🥱"];

var shuf_emojis = emojis.sort(() => (Math.random() > 0.5) ? 2 : -1);

let openCards = []; 

for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement('div');
    box.className = "item";
    box.innerHTML = shuf_emojis[i];
    box.style.cursor = "pointer";

    
    box.onclick = () => {
        
        if (box.classList.contains('matched') || openCards.length === 2) {
            return;
        }

        box.classList.add('boxOpen');
        openCards.push(box);

        
        if (openCards.length === 2) {
            if (openCards[0].innerHTML !== openCards[1].innerHTML) {
                setTimeout(() => {
                    openCards.forEach(card => {
                        card.classList.remove('boxOpen');
                    });
                    openCards = []; 
                }, 1000); 
            } else {
                openCards.forEach(card => {
                    card.classList.add('matched');
                });
                openCards = []; 
                
                if (document.querySelectorAll('.matched').length === emojis.length) {
                    document.querySelector('.game').innerHTML = '<h2>YOU WON!</h2>';
                }
            }
        }
    };

    document.querySelector('.game').appendChild(box);
}
