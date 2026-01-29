class UserInterface {
    #buttonEl;
    #inputEl;
    #logic;
    #messageEl;
    constructor(logic) {
        this.#logic = logic;
        this.#buttonEl = document.getElementById('btnCalc');
        this.#inputEl = document.getElementById('input');
        this.#messageEl = document.getElementById('message');

        this.#buttonEl.addEventListener('click', () => this.handleEvent());

        this.#inputEl.addEventListener('keydown', evt => {
            if (evt.key === 'Enter') this.handleEvent();
        });
    }

    handleEvent() {
        const inputValue = parseFloat(this.#inputEl.value);
        if (isNaN(inputValue)) return;

        const { time, change } = this.#logic.ticket(inputValue);
        // if (time === 0) return;
        this.clearInput();
        this.showMessage(time, change);
    }

    showMessage(time, change) {
        const formatedChange = change.toFixed(2).toString().replace('.', ',');
        const message =
            time > 0 ? `Tempo: ${time} minutos.` : `Valor insuficiente`;
        const msgChange = change > 0 ? ` Seu troco: R$ ${formatedChange}` : '';

        this.#messageEl.textContent = `${message}${msgChange}`;
    }

    clearInput() {
        this.#inputEl.value = '';
    }
}

class Logic {
    ticket(value) {
        if (value >= 3) return { time: 120, change: value - 3 };
        else if (value >= 1.75) return { time: 60, change: value - 1.75 };
        else if (value >= 1) return { time: 30, change: value - 1 };
        return { time: 0, change: 0 };
    }
}

const logic = new Logic();
const ui = new UserInterface(logic);
