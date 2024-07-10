class Carousel {
    constructor(element, options) {
        this._element = element;
        this._items = Array.from(this._element.querySelectorAll('.carousel-item'));
        this._interval = options.interval;
        this._currentIndex = 0;
        this._isPlaying = options.ride === 'carousel';

        if (this._isPlaying) {
            this._start();
        }

        this._element.querySelector('[data-bs-slide="prev"]').addEventListener('click', () => this._prev());
        this._element.querySelector('[data-bs-slide="next"]').addEventListener('click', () => this._next());
    }

    _start() {
        this._intervalId = setInterval(() => this._next(), this._interval);
    }

    _stop() {
        clearInterval(this._intervalId);
    }

    _next() {
        this._goTo(this._currentIndex + 1);
    }

    _prev() {
        this._goTo(this._currentIndex - 1);
    }

    _goTo(index) {
        this._items[this._currentIndex].classList.remove('active');
        this._currentIndex = (index + this._items.length) % this._items.length;
        this._items[this._currentIndex].classList.add('active');
    }
}

// Attach Carousel to the global window object
window.Carousel = Carousel;
