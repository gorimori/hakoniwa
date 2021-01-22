type Price = number;
type Users = number;

type Plan = {
  readonly users: Users;
  readonly price: Price;
};

const samplePlans: readonly Plan[] = [
  {
    // 10
    users: 10,
    price: 100,
  },

  {
    // 9.5
    users: 20,
    price: 190,
  },

  {
    // 9.5
    users: 30,
    price: 285,
  },

  {
    // 9.3
    users: 50,
    price: 465,
  },
];

const total = (plans: readonly Plan[]): Price =>
  plans.reduce((sum, current) => sum + current.price, 0);

class Result {
  #current: Plan[] = [{ price: Infinity, users: NaN }];

  update(candidate: readonly Plan[]) {
    if (total(this.#current) <= total(candidate)) {
      return;
    }

    this.#current = [...candidate];
  }

  get(): Plan[] {
    return this.#current;
  }
}

class Simulator {
  #cache: Map<Users, Result> = new Map();
  #plans: readonly Plan[];

  constructor(plans: readonly Plan[]) {
    this.#plans = [...plans];
  }

  private getCachedPlans(users: Users): Plan[] | undefined {
    return this.#cache.get(users)?.get();
  }

  private updateCache(users: Users, candidate: readonly Plan[]): void {
    if (this.#cache.has(users)) {
      this.#cache.get(users)?.update(candidate);
      return;
    }

    const result = new Result();
    result.update(candidate);
    this.#cache.set(users, result);
  }

  calc(users: Users): Plan[] {
    if (this.#cache.has(users)) {
      return this.getCachedPlans(users) ?? [];
    }

    const aux = (
      currentIndex: number,
      accPrice: Price,
      restUsers: Users,
      selectedPlans: readonly Plan[]
    ): void => {
      console.log("class, aux");
      if (restUsers <= 0) {
        this.updateCache(users, selectedPlans);
        return;
      }

      const plan = this.#plans[currentIndex];
      if (plan == undefined) {
        return;
      }

      // 現在見ている価格設定を採用する場合
      // 複数選択可能にしたいのでcurrentIndexは増やさない
      aux(currentIndex, accPrice + plan.price, restUsers - plan.users, [
        ...selectedPlans,
        plan,
      ]);

      // 現在見ている価格設定を採用しない場合
      aux(currentIndex + 1, accPrice, restUsers, selectedPlans);
    };

    aux(0, 0, users, []);

    return this.getCachedPlans(users) ?? [];
  }
}

export const buildCalc = (plans: readonly Plan[]) => (users: Users): Plan[] => {
  const result = new Result();

  const aux = (
    currentIndex: number,
    accPrice: Price,
    restUsers: Users,
    selectedPlans: readonly Plan[]
  ): void => {
    console.log("closure, aux");
    if (restUsers <= 0) {
      result.update(selectedPlans);
      return;
    }

    const plan = plans[currentIndex];
    if (plan == undefined) {
      return;
    }

    // 現在見ている価格設定を採用する場合
    // 複数選択可能にしたいのでcurrentIndexは増やさない
    aux(currentIndex, accPrice + plan.price, restUsers - plan.users, [
      ...selectedPlans,
      plan,
    ]);

    // 現在見ている価格設定を採用しない場合
    aux(currentIndex + 1, accPrice, restUsers, selectedPlans);
  };

  aux(0, 0, users, []);

  return result.get();
};

const calc = buildCalc(samplePlans);
console.log(calc(40));
console.log(calc(80));

// const sim = new Simulator(samplePlans);
// console.log(sim.calc(40));
// console.log(sim.calc(80));
