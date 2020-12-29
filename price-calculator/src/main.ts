type Price = number;
type Users = number;

type Config = {
  readonly users: Users;
  readonly price: Price;
};

const configs: readonly Config[] = [
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

/**
 * 結果を格納する
 *
 * 10ユーザー -> 100円
 *
 * TODO: 最適解の選び方（20ユーザ x 2, 10ユーザ x 1みたいな）も保存しておきたい
 * TODO: buildCalculator(configs)(users) みたいな高階関数にしたい
 *
 */
const res: Map<Users, Price> = new Map(
  // 計算しなくてもわかるものは最初から入れておく
  configs.map(({ price, users }) => [users, price])
);

const calc = (users: Users): Price => {
  const cached = res.get(users);

  if (cached) {
    return cached;
  }

  const updateCache = (price: Price) => {
    const current = res.get(users) ?? Infinity;
    console.log(`${current} vs. ${price}`);
    res.set(users, Math.min(current, price));
  };

  const aux = (
    currentIndex: number,
    accPrice: Price,
    restUsers: Users,
    selectedConfigs: readonly Config[]
  ): void => {
    if (restUsers <= 0) {
      updateCache(accPrice);
      // console.log(JSON.stringify(selectedConfigs));
      return;
    }

    const config = configs[currentIndex];
    if (config == undefined) {
      return;
    }

    // 現在見ている価格設定を採用する場合
    // 複数選択可能にしたいのでcurrentIndexは増やさない
    aux(currentIndex, accPrice + config.price, restUsers - config.users, [
      ...selectedConfigs,
      config,
    ]);

    // 現在見ている価格設定を採用しない場合
    aux(currentIndex + 1, accPrice, restUsers, selectedConfigs);
  };

  aux(0, 0, users, []);

  return res.get(users) ?? Infinity;
};

console.log(calc(50));
