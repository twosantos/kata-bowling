import {Game} from '../src/Game';


const normalGame = [
    {
        score: 30,
        tries: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
    },
    {
        score: 0,
        tries: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        score: 155,
        tries: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
    },
    {
        score: 300,
        tries: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
    }
];

describe('test game happy path', (): void => {

    test.each(normalGame)('test game with rolls and its score (%s)',
        (gameData: any): void => {
            let game: Game = new Game();
            gameData.tries.forEach((roll: number): void => {
                game.roll(roll);
            });

            expect(game.score()).toBe(gameData.score);
        },
    );

});
