export class Roll {

    value: number;

    constructor(value: number) {
        if (value < 0 || value > 10) {
            throw new Error('Invalid number');
        }
        this.value = value;
    }

}
