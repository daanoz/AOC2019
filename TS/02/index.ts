import { Puzzle, Runner, BasePuzzle, Result } from '../shared/';
import { IntCodeProcessor } from './int-code-processor.class';

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public args = {
        noun: 12,
        verb: 2,
        position: 0,
        target: 19690720
    };

    public run() {
        const result: Result = {};

        const input: number[] = this.getInputAsRows(',').map(r => parseInt(r, 10));

        result.a = this.executeWithArgs(input, this.args.noun, this.args.verb, this.args.position);
        result.b = this.findInputForOutput(input, this.args.target);

        return result;
    }

    private findInputForOutput(input: number[], output: number): number {
        for (let noun = 0; noun <= 99; noun++) {
            for (let verb = 0; verb <= 99; verb++) {
                const result = this.executeWithArgs(input, noun, verb, 0);
                if (result === output) {
                    return (100 * noun + verb);
                }
            }
        }
        return -1;
    }

    private executeWithArgs(instructions: number[], noun: number, verb: number, position: number): number {
        const input = [...instructions];
        input[1] = noun;
        input[2] = verb;
        const processor = new IntCodeProcessor(input);
        processor.execute();
        return processor.readPosition(position);
    }
}

Runner(PuzzleSolution);