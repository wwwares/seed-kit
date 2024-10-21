function processSeed(seed: string | number): number {
	if (typeof seed === "number") {
		return seed;
	}

	const decimalSeed = seed.split("").reduce((acc, char) => {
		// biome-ignore lint/style/noParameterAssign: not needed
		acc += (char.charCodeAt(0) / 100) * (acc || 1);
		return acc;
	}, 0);

	return Number(decimalSeed.toString().replace(".", "").slice(0, 10));
}

type SeedOptions = {
	seed?: string | number;
};

export class Seed {
	private _mz: number;
	private _mw: number;
	private _seed: number;
	public providedSeed?: string | number;

	constructor(opts: SeedOptions = {}) {
		this._mz = 987654321;
		this._mw = 123456789;
		const seed =
			opts.seed !== undefined ? processSeed(opts.seed) : this.randomSeed;
		this.providedSeed = opts.seed;
		this._mw = (123456789 + seed) & 0xffffffff;
		this._mz = (987654321 - seed) & 0xffffffff;
		this._seed = seed;
	}

	get randomSeed() {
		return 1 + Math.floor(Math.random() * 0xffffffff);
	}

	random() {
		this._mz = (36969 * (this._mz & 65535) + (this._mz >> 16)) & 0xffffffff;
		this._mw = (18000 * (this._mw & 65535) + (this._mw >> 16)) & 0xffffffff;
		const r = ((this._mz << 16) + (this._mw & 65535)) >>> 0;
		return r / 4294967296;
	}

	get state() {
		return {
			mw: this._mw,
			mz: this._mz,
			seed: this._seed,
		};
	}

	between(min: number, max: number) {
		return Math.floor(this.random() * (max - min + 1)) + min;
	}

	next() {
		return this.random();
	}
}
