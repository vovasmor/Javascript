const buttons = document.querySelectorAll('button');
buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        handleClick(event);
    })
});


function handleClick(click) {
    const cardNode = click.target.parentNode;

    const card = {
        wrap: cardNode,
        img: cardNode.querySelector('img'),
        productName: cardNode.querySelector('.productName'),
        button: cardNode.querySelector('button'),
    };

    const text_btn = card.button.innerText;
    if (text_btn === 'Описание') {
        showText(card);
    } else if (text_btn === 'Отмена') {
        hideText(card);
    }
} 

function hideText(card) {
    card.img.style.display = 'block';
    card.wrap.querySelector('.desc').remove();
    card.button.innerText = 'Описание';
}

function showText(card) {
    card.img.style.display = 'none';
    const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A deserunt ipsum modi minus culpa voluptate. Quasi praesentium eligendi cupiditate veritatis!';
    card.productName.insertAdjacentHTML('afterend', `<div class="desc">${text}</div>`);
    card.button.innerText = 'Отмена';
}
