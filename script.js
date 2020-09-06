// -- Maphilight options
$.fn.maphilight.defaults = {
    fill: true,
    fillColor: '0077B6',
    fillOpacity: 0.5,
    stroke: false,
    strokeColor: '153243',
    strokeOpacity: 1,
    strokeWidth: 1,
    fade: true,
    alwaysOn: false,
    neverOn: false,
    groupBy: 'rel',
    wrapClass: true,
    shadow: false,
    shadowX: 0,
    shadowY: 0,
    shadowRadius: 6,
    shadowColor: '153243',
    shadowOpacity: 0.2,
    shadowPosition: 'outside',
    shadowFrom: false
}

$(document).ready((e) => {

    // -- image map plug-ins
    $('img[usemap]).rwdImageMaps();
    $('img[usemap]').maphilight()

    // -- make heading align center when cards are not expanded
    const heightOfCard = $('.card').height() + 'px';
    $('h1').css('line-height', heightOfCard);

    // : Card interaction related code

    // : Carousel related code

    // -- variables
    const track = $('.carousel__track');    // * track wherein all slides will move
    const slides = track.children();        // * gets an array of all (immediate) children of track, which are the individual slides
    const nextButton = $('.carousel__button--right');
    const prevButton = $('.carousel__button--left');
    const nav = $('.carousel__nav');        // * navigation bar
    const bars = nav.children();            // * array containing individual bars of the navbar
    
    const slideSize = slides.width();       // * gets the width of one slide

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
});