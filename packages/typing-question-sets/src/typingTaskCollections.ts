type EnglishTypingTask = {
  language: "English";
  question: string;
};

type JapaneseTypingTask = {
  language: "Japanese";
  question: string;
  reading: string;
};

type TypingTask = EnglishTypingTask | JapaneseTypingTask;

const TYPING_TASK_COLLECTIONS: {
  id: string;
  title: string;
  typingTasks: TypingTask[];
}[] = [
  {
    id: "5d0bbcce-23e5-4c60-8b1a-f1f70eea8f52",
    title: "都道府県",
    typingTasks: [
      { language: "Japanese", question: "北海道", reading: "ほっかいどう" },
      { language: "Japanese", question: "青森県", reading: "あおもりけん" },
      { language: "Japanese", question: "岩手県", reading: "いわてけん" },
      { language: "Japanese", question: "宮城県", reading: "みやぎけん" },
      { language: "Japanese", question: "秋田県", reading: "あきたけん" },
      { language: "Japanese", question: "山形県", reading: "やまがたけん" },
      { language: "Japanese", question: "福島県", reading: "ふくしまけん" },
      { language: "Japanese", question: "茨城県", reading: "いばらきけん" },
      { language: "Japanese", question: "栃木県", reading: "とちぎけん" },
      { language: "Japanese", question: "群馬県", reading: "ぐんまけん" },
      { language: "Japanese", question: "埼玉県", reading: "さいたまけん" },
      { language: "Japanese", question: "千葉県", reading: "ちばけん" },
      { language: "Japanese", question: "東京都", reading: "とうきょうと" },
      { language: "Japanese", question: "神奈川県", reading: "かながわけん" },
      { language: "Japanese", question: "新潟県", reading: "にいがたけん" },
      { language: "Japanese", question: "富山県", reading: "とやまけん" },
      { language: "Japanese", question: "石川県", reading: "いしかわけん" },
      { language: "Japanese", question: "福井県", reading: "ふくいけん" },
      { language: "Japanese", question: "山梨県", reading: "やまなしけん" },
      { language: "Japanese", question: "長野県", reading: "ながのけん" },
      { language: "Japanese", question: "岐阜県", reading: "ぎふけん" },
      { language: "Japanese", question: "静岡県", reading: "しずおかけん" },
      { language: "Japanese", question: "愛知県", reading: "あいちけん" },
      { language: "Japanese", question: "三重県", reading: "みえけん" },
      { language: "Japanese", question: "滋賀県", reading: "しがけん" },
      { language: "Japanese", question: "京都府", reading: "きょうとふ" },
      { language: "Japanese", question: "大阪府", reading: "おおさかふ" },
      { language: "Japanese", question: "兵庫県", reading: "ひょうごけん" },
      { language: "Japanese", question: "奈良県", reading: "ならけん" },
      { language: "Japanese", question: "和歌山県", reading: "わかやまけん" },
      { language: "Japanese", question: "鳥取県", reading: "とっとりけん" },
      { language: "Japanese", question: "島根県", reading: "しまねけん" },
      { language: "Japanese", question: "岡山県", reading: "おかやまけん" },
      { language: "Japanese", question: "広島県", reading: "ひろしまけん" },
      { language: "Japanese", question: "山口県", reading: "やまぐちけん" },
      { language: "Japanese", question: "徳島県", reading: "とくしまけん" },
      { language: "Japanese", question: "香川県", reading: "かがわけん" },
      { language: "Japanese", question: "愛媛県", reading: "えひめけん" },
      { language: "Japanese", question: "高知県", reading: "こうちけん" },
      { language: "Japanese", question: "福岡県", reading: "ふくおかけん" },
      { language: "Japanese", question: "佐賀県", reading: "さがけん" },
      { language: "Japanese", question: "長崎県", reading: "ながさきけん" },
      { language: "Japanese", question: "熊本県", reading: "くまもとけん" },
      { language: "Japanese", question: "大分県", reading: "おおいたけん" },
      { language: "Japanese", question: "宮崎県", reading: "みやざきけん" },
      { language: "Japanese", question: "鹿児島県", reading: "かごしまけん" },
      { language: "Japanese", question: "沖縄県", reading: "おきなわけん" },
    ],
  },
  {
    id: "1eaf1ca0-6cd4-439f-bc74-807475f4f3a5",
    title: "魚の名前",
    typingTasks: [
      { language: "Japanese", question: "鮪", reading: "まぐろ" },
      { language: "Japanese", question: "鯖", reading: "さば" },
      { language: "Japanese", question: "鰯", reading: "いわし" },
      { language: "Japanese", question: "鱈", reading: "たら" },
      { language: "Japanese", question: "鮭", reading: "さけ" },
      { language: "Japanese", question: "鰹", reading: "かつお" },
      { language: "Japanese", question: "鰈", reading: "かれい" },
      { language: "Japanese", question: "鰒", reading: "ふぐ" },
      { language: "Japanese", question: "鮎", reading: "あゆ" },
      { language: "Japanese", question: "鰻", reading: "うなぎ" },
      { language: "Japanese", question: "鯱", reading: "しゃち" },
      { language: "Japanese", question: "鮒", reading: "ふな" },
      { language: "Japanese", question: "鰌", reading: "どじょう" },
      { language: "Japanese", question: "鰍", reading: "かじか" },
      { language: "Japanese", question: "鮴", reading: "めばる" },
      { language: "Japanese", question: "鯉", reading: "こい" },
      { language: "Japanese", question: "鰆", reading: "さわら" },
      { language: "Japanese", question: "鰊", reading: "にしん" },
      { language: "Japanese", question: "鰤", reading: "ぶり" },
      { language: "Japanese", question: "鱚", reading: "きす" },
      { language: "Japanese", question: "鱧", reading: "はも" },
      { language: "Japanese", question: "鱶", reading: "ふか" },
      { language: "Japanese", question: "鱸", reading: "すずき" },
      { language: "Japanese", question: "鮫", reading: "さめ" },
      { language: "Japanese", question: "鮗", reading: "このしろ" },
      { language: "Japanese", question: "鯛", reading: "たい" },
      { language: "Japanese", question: "鯵", reading: "あじ" },
      { language: "Japanese", question: "鯰", reading: "なまず" },
      { language: "Japanese", question: "鮃", reading: "ひらめ" },
    ],
  },
];

export default TYPING_TASK_COLLECTIONS;
