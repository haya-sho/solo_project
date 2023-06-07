/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("menu_list").del();
  await knex("menu_list").insert([
    { id: 1, menu: "冷やし中華", category: "麺" },
    { id: 2, menu: "焼きそば", category: "麺" },
    { id: 3, menu: "ミートパスタ", category: "パスタ" },
    { id: 4, menu: "カレーライス", category: "ごはん" },
    { id: 5, menu: "あんかけかた焼きそば", category: "麺" },
    { id: 6, menu: "チャーハン", category: "ごはん" },
    { id: 7, menu: "オムライス", category: "ごはん" },
    { id: 8, menu: "ナポリタン", category: "パスタ" },
    { id: 9, menu: "ガパオライス", category: "ゴハン" },
    { id: 10, menu: "カオソイ", category: "麺" },
    { id: 11, menu: "そうめん", category: "麺" },
    { id: 12, menu: "牛丼", category: "ごはん" },
    { id: 13, menu: "親子丼", category: "ごはん" },
    { id: 14, menu: "ラーメン", category: "麺" },
    { id: 15, menu: "生姜焼き定食", category: "ごはん" },
    { id: 16, menu: "ペペロンチーノ", category: "パスタ" },
  ]);
};
