function getScroll() {
    return {x: window.pageXOffset, y: window.pageYOffset};
}

function drag(el, event) {
    let scroll = getScroll();
    
    // указатели мыши относительно всего документа, с учетом полосы прокрутки
    let startX = event.clientX + scroll.x;
    let startY = event.clientY + scroll.y;

    // текущие координаты элемента
    var elX = el.offsetLeft;
    var elY = el.offsetTop;

    // считаем разницу между координатой элемента и мышью пользователя 
    // (расстояние между верхним левым углом и местом где был сделан клик)
    var deltaX = startX - elX;
    var deltaY = startY - elY;

    document.addEventListener('mousemove', moveHandler, true);
    document.addEventListener('mouseup', upHandler, true);

    // останавливаем распространение события (всплытие)
    event.stopPropagation();

    // отменяем дефолтные события
    event.preventDefault();

    function moveHandler(e) {
        let scroll = getScroll();

        // Обращаемся к событию перемещания и получаем координаты, складываем с текущими положениями полос прокрутки,
        // и вычитаем дельту между левым углом и кликом
    
        let leftCord = e.clientX + scroll.x - deltaX;
        let topCord = e.clientY + scroll.y - deltaY;
        
        // запрещаем перемещать элементы за видимую область экрана
        if(leftCord > 10 && leftCord < window.innerWidth - (el.offsetWidth + 10)) {
            // смещаем элемент
            el.style.left = leftCord + 'px';
        }

        if(topCord > 10 && topCord < window.innerHeight - (el.offsetHeight + 10)) {
            el.style.top = topCord + 'px';
        }

    }

    function upHandler(e) {
        // после того как отжали мышку удаляем обработчики
        document.removeEventListener('mousemove', moveHandler, true);
        document.removeEventListener('mouseup', upHandler, true);
    }
}