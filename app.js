const emojis = ["😂","😂","😎","😎","🐶","🐶","😙","😙","🤩","🤩","😄","😄","🤔","🤔","🥱","🥱"];

var shuf_emojis = emojis.sort(() => (Math.random() > 0.5) ? 2 : -1);

let openCards = []; // Açık kartları saklamak için bir dizi oluşturuyoruz

for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement('div');
    box.className = "item";
    box.innerHTML = shuf_emojis[i];
    box.style.cursor = "pointer";

    // Kart üzerine tıklandığında açma ve kapama işlemlerini gerçekleştirir
    box.onclick = () => {
        // Eğer kart zaten eşleştiyse veya iki kart eşleşmişse, tıklama işlemini durdur
        if (box.classList.contains('matched') || openCards.length === 2) {
            return;
        }

        box.classList.add('boxOpen');
        openCards.push(box);

        // Eğer iki kart açıksa ve içerikleri eşleşmiyorsa, kartları kapat
        if (openCards.length === 2) {
            if (openCards[0].innerHTML !== openCards[1].innerHTML) {
                setTimeout(() => {
                    openCards.forEach(card => {
                        card.classList.remove('boxOpen');
                    });
                    openCards = []; // Açık kartları temizle
                }, 1000); // 1 saniye bekleyerek kartları kapat
            } else {
                openCards.forEach(card => {
                    card.classList.add('matched');
                });
                openCards = []; // Açık kartları temizle

                // Tüm kartlar eşleştiğinde "you won" yazısı görüntüle
                if (document.querySelectorAll('.matched').length === emojis.length) {
                    document.querySelector('.game').innerHTML = '<h2>YOU WON!</h2>';
                }
            }
        }
    };

    document.querySelector('.game').appendChild(box);
}
