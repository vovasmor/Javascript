class Board {
    constructor() {
        this.gameTableElement = document.getElementById('game');
    }

    init(game, status) {
        this.game = game;
        this.status = status;
    }

    /**
     * Рисуем игровое поле
     */
    renderMap() {
        for (let row = 0; row < 3; row++) {
            const tr = document.createElement('tr');
            this.gameTableElement.appendChild(tr);
            for (let col = 0; col < 3; col++) {
                let td = document.createElement('td');
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                tr.appendChild(td);
            }
        }
    }

    initEventHandlers() {
        this.gameTableElement.addEventListener('click', event => this.game.cellClickHandler(event));
    }

     /**
     * Проверяем куда был клик
     */
    isClickByCell(event) {
        return event.target.tagName === 'TD';
    }

    /**
     * Проверяем что клетка свободна.
     */
    isCellEmpty(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        return this.status.mapValues[row][col] === '';
    }

    /**
     * Заполняем клетку
     */
    fillCell(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;
        this.status.mapValues[row][col] = this.status.phase;
        event.target.textContent = this.status.phase;
    }
}
class Game {
    init(status, board) {
        this.status = status;
        this.board = board;
    }
    cellClickHandler(event) {
        if (!this.isCorrectClick(event)) {
            return;
        }
        this.board.fillCell(event);
        if (this.hasWon()) {
            this.status.setStatusStopped();
            this.sayWonPhrase();
        }
        this.status.togglePhase();
    }


    isCorrectClick(event) {
        return this.status.isStatusPlaying() && this.board.isClickByCell(event) && this.board.isCellEmpty(event);
    }

    /**
     * Проверка на победку
     */
    hasWon() {
        return this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
               this.isLineWon({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }) ||
               this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }) ||

               this.isLineWon({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
               this.isLineWon({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
               this.isLineWon({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||

               this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
               this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 });
    }

    isLineWon(a, b, c) {
        let value = this.status.mapValues[a.y][a.x] + this.status.mapValues[b.y][b.x] + this.status.mapValues[c.y][c.x];
        return value === 'XXX' || value === '000';
    }

    /**
     * Сообщаем о победе.
     */
    sayWonPhrase() {
        let figure = this.status.phase === 'X' ? 'Крестики' : 'Нолики';
        alert(`${figure} выиграли!`);
    }
}

window.addEventListener('load', function() {
    const game = new Game();
    const board = new Board();
    const status = new Status();

    board.init(game, status);
    game.init(status, board);

    board.renderMap();
    board.initEventHandlers();
});

class Status {
    constructor() {
        this.status = 'playing';
        this.mapValues = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        this.phase = 'X';
    }


    isStatusPlaying() {
        return this.status === 'playing';
    }

    setStatusStopped() {
        this.status = 'stopped';
    }

    togglePhase() {
        this.phase = this.phase === 'X' ? '0' : 'X';
    }
}
