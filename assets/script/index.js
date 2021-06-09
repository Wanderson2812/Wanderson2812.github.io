$(document).ready(function () {
    getArrayObj();
});

function getArrayObj() {
    var obj = [];

    $.getJSON("assets/script/data.json", function (data) {
    }).done(function (data) {
        obj = data;
        mountObjectArray(obj);
    }).always(function () {
        slick();
    });
}

function mountObjectArray(obj) {
    var character = obj.characters;
    var element_type = obj.element_type;

    for (var i = 0; i < character.length; i++) {
        var newObj = [];
        newObj = character[i];
        getColor(element_type, newObj);
    }

    appendCardNavigation(character);
}

function slick() {
    $('.card').slick({
        arrows: false,
        asNavFor: '.navigation',
        focusOnSelect: true
    });

    if (window.innerWidth < 425) {
        $('.navigation').slick({
            arrows: false,
            mobileFirst: true,
            adaptiveHeight: true,
            focusOnSelect: true,
            slidesToShow: 2,
            infinite: true,
            asNavFor: '.card'
        });
    } else if (window.innerWidth >= 425 && window.innerWidth < 768) {
        $('.navigation').slick({
            arrows: false,
            mobileFirst: true,
            adaptiveHeight: true,
            focusOnSelect: true,
            slidesToShow: 3,
            infinite: true,
            asNavFor: '.card'
        });
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        $('.navigation').slick({
            arrows: false,
            mobileFirst: true,
            adaptiveHeight: true,
            focusOnSelect: true,
            slidesToShow: 4,
            infinite: true,
            asNavFor: '.card'
        });
    } else {
        $('.navigation').slick({
            arrows: false,
            vertical: true,
            verticalSwiping: true,
            asNavFor: '.card',
            focusOnSelect: true,
            infinite: true
        });
    }
}

function getColor(element_type, newObj) {
    var color = element_type;
    var characterObj = newObj;

    for (var idx in color) {
        if (color[idx].element == characterObj.element) {
            characterObj.type_element = color[idx];
            appendCard(characterObj);
            break;
        }
    }
}

function appendCard(characterObj) {
    var currentCard = $('.card').append(cardLayout);
    var $this = currentCard.find('.slide-card').last().attr('id', characterObj.name);

    $this.parents('.slide-card-center').css('background-color', '#' + characterObj.type_element.color.color_main + '').css('transition', '0.5s');
    $this.find('.background').css('background-color', '#' + characterObj.type_element.color.color_secondary + '');
    $this.find('#img').attr('src', '' + characterObj.art_official + '');
    $this.find('#name').text(characterObj.name);
    $this.find('#description').text(characterObj.description);

    changeEvents(characterObj, $this);
}

function appendCardNavigation(characterObj) {
    for (var idx in characterObj) {
        $('.navigation').append(layoutNavigation);
        var currentCard = $('.card-navigation').last().attr('id', '' + characterObj[idx].name + '');
        currentCard.find('.img-nav').attr('src', '' + characterObj[idx].art_card + '');
    }
}

function changeEvents(characterObj, $this) {
    $this.hover(function () {
        if ($this.is(':hover')) {
            $this.parents('.slide-card-center').css('background-color', '#' + characterObj.type_element.color.color_secondary + '').css('transition', '0.5s');
            $this.find('.background').css('background-color', '#' + characterObj.type_element.color.color_main + '');
        } else {
            $this.parents('.slide-card-center').css('background-color', '#' + characterObj.type_element.color.color_main + '').css('transition', '0.5s');
            $this.find('.background').css('background-color', '#' + characterObj.type_element.color.color_secondary + '');
        }
    });
}

var cardLayout =
    '<div class="slide-card-center">\n\
        <div class="slide-card">\n\
            <div class="background"></div>\n\
            <div class="details">\n\
                <h2 id="name"></h2>\n\
                <p id="description"></p>\n\
                <a href="#">Mais Detalhes</a>\n\
            </div>\n\
            <img loading="lazy" id="img"/>\n\
        </div>\n\
    </div>';

var layoutNavigation =
    '<li class="card-navigation">\n\
        <img loading="lazy" class="img-nav"/>\n\
    </li>';