/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("menu_list").del();
  await knex("menu_list").insert([
    { id: 1, menu: "冷やし中華", category: "麺", isWaiting: true },
    { id: 2, menu: "焼きそば", category: "麺", isWaiting: true },
    { id: 3, menu: "ミートパスタ", category: "パスタ", isWaiting: true },
    { id: 4, menu: "カレーライス", category: "ごはん", isWaiting: true },
    { id: 5, menu: "あんかけかた焼きそば", category: "麺", isWaiting: true },
    { id: 6, menu: "チャーハン", category: "ごはん", isWaiting: true },
    { id: 7, menu: "オムライス", category: "ごはん", isWaiting: true },
    { id: 8, menu: "ナポリタン", category: "パスタ", isWaiting: true },
    { id: 9, menu: "ガパオライス", category: "ごはん", isWaiting: true },
    { id: 10, menu: "カオソイ", category: "麺", isWaiting: true },
    { id: 11, menu: "そうめん", category: "麺", isWaiting: true },
    { id: 12, menu: "牛丼", category: "ごはん", isWaiting: true },
    { id: 13, menu: "親子丼", category: "ごはん", isWaiting: true },
    { id: 14, menu: "ラーメン", category: "麺", isWaiting: true },
    { id: 15, menu: "生姜焼き定食", category: "ごはん", isWaiting: true },
    { id: 16, menu: "ペペロンチーノ", category: "パスタ", isWaiting: true },
  ]);
};
