interface All<V> {
  more: string;
  desc: string;
  val: V;
}

type AllParams<V> = { allParams: All<V>; };

function all<V>(params: All<V>): AllParams<V> {
  return { allParams: params };
}

function alDefaults<V, D extends keyof Partial<All<V>>>(defaults: Pick<All<V>, D>) {
  return (nonDefaults: Omit<All<V>, D>) => ({
    ...defaults,
    ...nonDefaults,
  }) as All<V>;
}

/**
 * A function factory returning a function which calls "all" with defaults that
 * may be overridden.
 * @param defaults The default parameters.
 * @returns Function with defaults.
 */
function allDefaults</* Problem: DefaultsValue is unknown */
  DefaultsValue,
  Defaults extends Partial<All<DefaultsValue>>>(defaults: Defaults) {
  type Params<P> = Pick<All<P>, Exclude<keyof All<P>, keyof Defaults>> &
    Partial<All<P>>;

  /* Problem: It seems nicer to have used DefaultsValue here instead of Defaults["val"] */
  return <OverrideValue = Defaults['val']>(params: Params<OverrideValue>) =>
    ({
      ...defaults,
      ...params,
    } as All<OverrideValue>);
}

const desc = 'some description';
const val = 12345 as const;
const more = 'more';

// Type: function all<12345>(params: All<12345>): { allParams: All<12345>; }
all({ desc, val, more }); // output => { allParams: { desc: 'some description', val: 12345, more: 'more' } }

// Examples:

const allHelp1 = alDefaults<12345, 'desc' | 'val'>({ desc, val });
// Type: const allHelp1: <12345>(params: Params<12345>) => All<12345>
console.log(allHelp1({ more })); // output => { desc: 'some description', val: 12345, more: 'more' }

const allHelp2 = alDefaults<12345, 'desc'>({ desc });
// Type: const allHelp2: <12345>(params: Params<12345>) => All<12345>
allHelp2({ more, val }); // output => { desc: 'some description', more: 'more', val: 12345 }

const allHelp3 = alDefaults<true, 'desc' | 'val'>({ desc, val: true });
// Type: const allHelp3: <false>(params: Params<false>) => All<false>
allHelp3({ more, val: false as const }); // output => { desc: 'some description', val: false, more: 'more' }
