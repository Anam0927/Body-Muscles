// -- Maphilight options
$.fn.maphilight.defaults = {
    fill: true,
    fillColor: '335C81',
    fillOpacity: 0.5,
    stroke: true,
    strokeColor: '335C81',
    strokeOpacity: 0.75,
    strokeWidth: 0.75,
    fade: true,
    alwaysOn: false,
    neverOn: false,
    groupBy: 'rel',
    wrapClass: true,
    shadow: false,
    shadowX: 0,
    shadowY: 0,
    shadowRadius: 6,
    shadowColor: '335C81',
    shadowOpacity: 0.2,
    shadowPosition: 'outside',
    shadowFrom: false
}

$(document).ready(() => {

    // -- image map plug-ins
    let mql = window.matchMedia('(max-width: 992px)');
    console.log(mql);
    if (mql.matches) {
        $('img[usemap]').maphilight();
        $('img[usemap]').imageMap(0);
    } else {
        $('.map').maphilight();
        $('.map').imageMap(0);
    }

    // -- make heading align center when cards are not expanded
    const heightOfCard = $('.card').height() + 'px';
    $('.title').css('line-height', heightOfCard);

    // : Card interaction related code

    // -- variables

    const cardsCon = $('.cards-container');
    const cards = cardsCon.children();

    const parts = ['arm', 'abs', 'back', 'glutes', 'leg'];

    const partClassNames = [];
    const partNameAttr = [];
    const partCardClass = []
    $.each(parts, function (index, partName) {
        const cardN = `.${partName}-card`;
        const classN = `.${partName}`;
        const nameN = `[name=\"${partName}\"]`;
        partClassNames.push(classN);
        partNameAttr.push(nameN);
        partCardClass.push(cardN);
    });

    // -- functions

    // * function to expand a card
    function expand(trig) {
        trig.siblings().each(function (index, sibling) {
            if ($(sibling).hasClass("expand"))
                notExpand($(sibling));
        });
        trig.addClass('expand');
        trig.siblings().addClass('display');
        trig.children('.details').addClass('expand');
        trig.children('.small-lines').addClass('expand');
        trig.find('.icon').addClass('expand');
        trig.focusin();
        setTimeout(function () {
            trig.addClass('overflowAllowed');
        }, 500);
    }

    // * function to unexpand a card
    function notExpand(trig) {
        trig.siblings().removeClass('display');
        trig.removeClass('expand');
        trig.children('.details').removeClass('expand');
        trig.children('.small-lines').removeClass('expand');
        trig.find('.icon').removeClass('expand');
        trig.scrollTop(0);
        trig.removeClass('overflowAllowed');
        trig.focusout();
    }


    // TODO - cards should expand and unexpand on click
    cards.on('click', function () {
        var trig = $(this);
        if (trig.hasClass('expand')) {
            notExpand(trig);
        } else {
            expand(trig);
        }
    });

    // TODO - muscle part should be highlighted on card hover and focus
    $.each(parts, function (index, partName) {
        const classN = partCardClass[index];
        const nameN = partNameAttr[index];

        if (!(mql.matches)) {
            $(classN).hover(() => {
                if (!($(classN).hasClass("expand")))
                    $(nameN).trigger("mouseover");
            }, () => {
                if (!($(classN).hasClass("expand")))
                    $(nameN).trigger("mouseout");
            });
        }

        $(classN).focusin(function (e) {
            $(nameN).trigger("mouseover");
        }).focusout(function (e) {
            $(nameN).trigger("mouseout");
        });
    });

    // TODO - cards should expand on click on muscle part
    $.each(partClassNames, function (index, part) {
        const cardN = $(partCardClass[index]);
        $(part).on("click", function () {
            if (cardN.hasClass('expand')) {
                notExpand(cardN);
            } else {
                expand(cardN);
            }
        });
    });

    // : Card interaction related code - END


    // : Carousel related code

    // -- variables
    const track = $('.carousel__track'); // * track wherein all slides will move
    const slides = track.children(); // * gets an array of all (immediate) children of track, which are the individual slides
    const nextButton = $('.carousel__button--right');
    const prevButton = $('.carousel__button--left');
    const nav = $('.carousel__nav'); // * navigation bar
    const bars = nav.children(); // * array containing individual bars of the navbar

    const slideSize = slides.width(); // * gets the width of one slide

    // TODO - arrange the slides next to one another
    slides.each((index, slide) => {
        const toMove = slideSize * index + 'px';
        $(slide).css('left', toMove);
    });

    // TODO - when left arrow is clicked, move slides to the left
    prevButton.on('click tap', (e) => {

        const currentSlide = track.children('.current__slide');
        const prevSlide = currentSlide.prev();
        const amntToMove = prevSlide.css('left');
        const transformAmount = 'translateX(-' + amntToMove + ')';

        const currentBar = nav.children('.current__slide');
        const prevBar = currentBar.prev();

        const prevIndex = slides.index(prevSlide);

        // -- move to the previous slide
        track.css('transform', transformAmount);

        // -- change current slide
        currentSlide.removeClass('current__slide');
        prevSlide.addClass('current__slide');

        // -- change bar color to current slide number
        currentBar.removeClass('current__slide');
        $(prevBar).addClass('current__slide');

        // -- change navigation arrow's visibility
        if (prevIndex === 0) {
            prevButton.addClass('is-hidden');
            nextButton.removeClass('is-hidden');
        } else if (prevIndex === slides.length - 1) {
            prevButton.removeClass('is-hidden');
            nextButton.addClass('is-hidden');
        } else {
            nextButton.removeClass('is-hidden');
            prevButton.removeClass('is-hidden');
        }
    });

    // TODO - when right arrow is clicked, move slides to the right
    nextButton.on('click tap', (e) => {

        const currentSlide = track.children('.current__slide');
        const nextSlide = currentSlide.next();
        const amntToMove = nextSlide.css('left');
        const transformAmount = 'translateX(-' + amntToMove + ')';

        const currentBar = nav.children('.current__slide');
        const nextBar = currentBar.next();

        const nextIndex = slides.index(nextSlide);

        // -- move to the next slide
        track.css('transform', transformAmount);

        // -- change current slide
        currentSlide.removeClass('current__slide');
        nextSlide.addClass('current__slide');

        // -- change bar color to current slide number
        currentBar.removeClass('current__slide');
        $(nextBar).addClass('current__slide');

        // -- change navigation arrow's visibility
        if (nextIndex === 0) {
            prevButton.addClass('is-hidden');
            nextButton.removeClass('is-hidden');
        } else if (nextIndex === slides.length - 1) {
            prevButton.removeClass('is-hidden');
            nextButton.addClass('is-hidden');
        } else {
            nextButton.removeClass('is-hidden');
            prevButton.removeClass('is-hidden');
        }

        console.log(currentSlide);

    });


    // TODO - when nav indicator is clicked, move to that slide
    nav.on('click tap', (e) => {

        // -- what indicator was clicked on?
        const targetBar = e.target.closest('button');

        // -- exit function if button is not clicked
        if (!targetBar) return;

        // -- execution continued if actual nav bar is clicked
        const currentSlide = track.children('.current__slide');
        const currentBar = nav.children('.current__slide');
        const targetIndex = bars.index(targetBar);
        const targetSlide = $(slides[targetIndex]);

        const amntToMove = targetSlide.css('left');
        const transformAmount = 'translateX(-' + amntToMove + ')';

        // -- move to the next slide
        track.css('transform', transformAmount);

        // -- change current slide
        currentSlide.removeClass('current__slide');
        targetSlide.addClass('current__slide');

        // -- change bar color to current slide number
        currentBar.removeClass('current__slide');
        $(targetBar).addClass('current__slide');
        console.log(slides.length);

        // -- change navigation arrow's visibility
        if (targetIndex === 0) {
            prevButton.addClass('is-hidden');
            nextButton.removeClass('is-hidden');
        } else if (targetIndex === slides.length - 1) {
            prevButton.removeClass('is-hidden');
            nextButton.addClass('is-hidden');
        } else {
            nextButton.removeClass('is-hidden');
            prevButton.removeClass('is-hidden');
        }

    });

    // : Carousel related code - END
    if (mql.matches) {
        $(document).on("click", () => {


            $.each(cards, function (index, card) {

                const prt = partNameAttr[index];
                if ($(card).hasClass('expand')) {
                    console.log(prt);
                    $(prt).trigger("mouseover");
                } else {
                    $(prt).trigger("mouseout");
                }

            });

        });
    }
});