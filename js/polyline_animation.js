ymaps.ready(['AnimatedLine']).then(init);

function init(ymaps) {
    // Создаем карту.
    var myMap = new ymaps.Map("map", {
        center: [59.960532, 30.469974],
        zoom: 15
    }, {
        searchControlProvider: 'yandex#search'
    });
    // Создаем ломаные линии.
    var firstAnimatedLine = new ymaps.AnimatedLine([
        [59.955897, 30.467442],
        [59.958718, 30.478261],
        [59.959074, 30.477980],
        [59.959279, 30.476775],
        [59.959463, 30.475733],
        [59.959766, 30.474756],
        [59.962538, 30.466871],
        [59.962356, 30.466566],
        [59.962305, 30.466296]
    ], {}, {
        // Задаем цвет.
        strokeColor: "#ED4543",
        // Задаем ширину линии.
        strokeWidth: 5,
        // Задаем длительность анимации.
        animationTime: 3000
    });
    // Добавляем линии на карту.
    myMap.geoObjects.add(firstAnimatedLine);
    // Создаем метки.
    var firstPoint = new ymaps.Placemark([59.955897, 30.467442], {}, {
        preset: 'islands#greenGlyphIcon'
    });
    var secondPoint = new ymaps.Placemark([59.962305, 30.466296], {}, {
        preset: 'islands#blueMoneyCircleIcon'
    });
    // Функция анимации пути.
    function playAnimation() {
        // Убираем вторую линию.
        // Добавляем первую метку на карту.
        myMap.geoObjects.add(firstPoint);
        // Анимируем первую линию.
        firstAnimatedLine.animate()
            // После окончания анимации первой линии добавляем вторую метку на карту и анимируем вторую линию.
            .then(function() {
                myMap.geoObjects.add(secondPoint);
                return ymaps.vow.delay(null, 2000);
            })
            .then(function() {
                // Удаляем метки с карты.
                myMap.geoObjects.remove(firstPoint);
                myMap.geoObjects.remove(secondPoint);
                firstAnimatedLine.reset();
                // Перезапускаем анимацию.
                playAnimation();
            });
    }
    // Запускаем анимацию пути.
    playAnimation();
}
