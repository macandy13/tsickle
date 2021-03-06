/**
 * @fileoverview A source file that uses types that are used in .d.ts files, but
 * that are not available or use different names in Closure's externs.
 * @suppress {checkTypes} checked by tsc
 */


console.log('work around TS dropping consecutive comments');

let /** @type {!NodeListOf<!HTMLParagraphElement>} */ x: NodeListOf<HTMLParagraphElement> = document.getElementsByTagName('p');
console.log(x);

const /** @type {(null|!RegExpExecArray)} */ res: RegExpExecArray|null = /** @type {!RegExpExecArray} */(( /asd/.exec('asd asd')));
console.log(res);
let /** @type {!ReadonlyArray<string>} */ a: ReadonlyArray<string> = [''];
let /** @type {!ReadonlyMap<string, string>} */ m: ReadonlyMap<string, string> = new Map();
let /** @type {!ReadonlySet<string>} */ s: ReadonlySet<string> = new Set();
