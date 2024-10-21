import { describe, expect, it } from "vitest";
import { Seed } from "./seed";

describe("Seed", () => {
	it("should produce the same sequence for string and number seeds", () => {
		const stringSeed = "hello, this will turn into a seed!";
		const seedWithString = new Seed({ seed: stringSeed });
		const numberSeed = seedWithString.state.seed;
		const seedWithNumber = new Seed({ seed: numberSeed });

		for (let i = 0; i < 10; i++) {
			expect(seedWithString.next()).toBe(seedWithNumber.next());
		}
	});

	it("should produce different sequences for different seeds", () => {
		const seed1 = new Seed({ seed: "seed1" });
		const seed2 = new Seed({ seed: "seed2" });

		expect(seed1.next()).not.toBe(seed2.next());
	});

	it("should produce the same sequence when using the same seed", () => {
		const seed1 = new Seed({ seed: "reproducible" });
		const seed2 = new Seed({ seed: "reproducible" });

		for (let i = 0; i < 10; i++) {
			expect(seed1.next()).toBe(seed2.next());
		}
	});

	it("should handle number seeds correctly", () => {
		const numberSeed = 1234567890;
		const seed = new Seed({ seed: numberSeed });

		expect(seed.state.seed).toBe(numberSeed);
	});

	it("should generate random numbers within the specified range", () => {
		const seed = new Seed({ seed: "test" });
		const min = 1;
		const max = 10;

		for (let i = 0; i < 100; i++) {
			const result = seed.between(min, max);
			expect(result).toBeGreaterThanOrEqual(min);
			expect(result).toBeLessThanOrEqual(max);
		}
	});

	it("should generate consistent random numbers with the same seed", () => {
		const seed1 = new Seed({ seed: "consistent" });
		const seed2 = new Seed({ seed: "consistent" });

		for (let i = 0; i < 10; i++) {
			expect(seed1.between(1, 100)).toBe(seed2.between(1, 100));
		}
	});
});
