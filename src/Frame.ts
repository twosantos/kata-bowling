export class Frame {
    public rolls: number[] = [];
    private readonly finalRoll: boolean = false;

    constructor(finalRoll: boolean) {
        this.rolls = [];
        this.finalRoll = finalRoll;
    }

    public roll(num: number): void {
        if (this.score() + num > 10) {
            throw new Error('Invalid roll');
        }
        this.rolls.push(num);
    }

    public score(): number {
        return this.rolls.reduce((a: number, b: number) => a + b, 0);
    }

    private maxRolls(): number {
        return this.finalRoll ? 3 : 2;
    }

    public isComplete(): boolean {
        return this.rolls.length === this.maxRolls() || this.score() === 10;
    }

    public isStrike(): boolean {
        return this.rolls.length === 1 && this.score() === 10;
    }

    public isSpare(): boolean {
        return this.rolls.length === 2 && this.score() === 10;
    }

}