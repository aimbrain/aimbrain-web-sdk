
/**
 * Assigns own properties of `source` object to the `target` object for all
 * properties that resolve to `undefined`.
 *
 * Example:
 *   defaults({ 'a': 1 }, { 'b': 2 })         => { 'a': 1, 'b': 2 }
 *   defaults({ 'a': 1, 'b': 2 }, { 'b': 3 }) => { 'a': 1, 'b': 2 }
 */
export function defaults<T>(target: T | void, source: T): T {
    const output = Object(target);
    for (let i in source) {
        if (source.hasOwnProperty(i) && !output.hasOwnProperty(i)) {
            output[i] = source[i];
        }
    }
    return output;
}