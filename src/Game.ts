import {Roll} from './Roll';
import {Frame} from "./Frame";

export class Game {
    readonly maxRounds: number = 10;
    private frames: Frame[] = [];

    private manageFrame(frame: Frame, num: number): void {
        let roll: Roll = new Roll(num);
        frame.roll(roll.value);
        let positionInArray: number = this.frames.length > 0 ? this.frames.length - 1 : 0;
        if (!frame.isComplete()) {
            this.frames.push(frame);
        } else {
            if (frame.isStrike()) {
                this.frames.push(frame);
            } else {
                this.frames[positionInArray] = frame;
            }
        }
    }

    public roll(num: number): void {
        let frame: Frame = this.getCurrentFrame();
        if (
            this.frames.length >= this.maxRounds
            && frame.isComplete()
            && (!frame.isStrike() || !frame.isSpare())
        ) {
            throw new Error('Game has ended');
        }
        this.manageFrame(frame, num);
    }

    private getCurrentFrame(): Frame {
        if (this.frames.length === 0) {
            return new Frame(false);
        }
        let frame: Frame = this.frames[this.frames.length - 1];
        if (frame.isComplete()) {
            return new Frame(this.frames.length === this.maxRounds);
        }
        return frame;
    }

    public score(): number {
        let score: number = 0;
        this.frames.forEach((frame: Frame, i: number) => {
            score += frame.score();
            if (frame.isStrike() && i <= 8) score = this.addNextFrameScore(i + 1, 2, score);
            if (frame.isSpare()) score = this.addNextFrameScore(i + 1, 1, score);
        });
        return score;
    }

    private addNextFrameScore(index: number, numberToAdd: number, currentScore: number): number {
        if (
            index >= this.frames.length
            || numberToAdd <= 0
            || this.frames[index] === undefined
        ) {
            return currentScore;
        }

        currentScore += this.frames[index].rolls[0];
        --numberToAdd;

        if (numberToAdd > 0 && this.frames[index].rolls.length > 1) {
            currentScore += this.frames[index].rolls[1];
        }
        if (numberToAdd > 0 && this.frames[index].rolls.length < 2) {
            ++index;
        }

        return this.addNextFrameScore(index, numberToAdd, currentScore);
    }

}
