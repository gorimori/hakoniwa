type Price = number;
type Users = number;

type Plan = {
  readonly users: Users;
  readonly price: Price;
};

const plans: readonly Plan[] = [
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
].sort((a, b) => {
  // TODO: 必要？
  // usersの降順に並べ替える
  return b.users - a.users;
});

type Result = {
  readonly price: Price;
  readonly composition: readonly Plan[];
};

/**
 * 結果を格納する
 *
 * 10ユーザー -> 100円
 *
 * TODO: buildCalculator(configs)(users) みたいな高階関数にしたい
 *
 */
const res: Map<Users, Result> = new Map(
  // 計算しなくてもわかるものは最初から入れておく
  plans.map(({ price, users }) => [
    users,
    { price, composition: [{ users, price }] },
  ])
);

const calc = (users: Users): Result => {
  const cached = res.get(users);

  if (cached) {
    return cached;
  }

  const updateCache = (result: Result) => {
    const current = res.get(users);
    console.log(result);

    if (current == undefined) {
      res.set(users, result);
      return;
    }

    if (result.price < current.price) {
      res.set(users, result);
      return;
    }
  };

  const aux = (
    currentIndex: number,
    accPrice: Price,
    restUsers: Users,
    selectedPlans: readonly Plan[]
  ): void => {
    if (restUsers <= 0) {
      updateCache({ composition: selectedPlans, price: accPrice });
      // console.log(JSON.stringify(selectedConfigs));
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

  return res.get(users) ?? { price: Infinity, composition: [] };
};

console.log(calc(40));
