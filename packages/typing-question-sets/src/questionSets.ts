type TypingQuestion = {
  question: string;
  spelling: string;
};

type TypingQuestionSet = {
  id: string;
  title: string;
  questions: TypingQuestion[];
};

const typingQuestionSets: TypingQuestionSet[] = [
  {
    id: "0b6d3308-5670-41fc-bb3e-590a4d34d754",
    title: "Basic",
    questions: [
      {
        question: "Hello World",
        spelling: "Hello World",
      },
      {
        question: "World",
        spelling: "World",
      },
      {
        question: "世界",
        spelling: "sekai",
      },
      {
        question: "ABC",
        spelling: "abc",
      },
    ],
  },
  {
    id: "9d6156fe-d4c1-4c38-8152-f313cf64020d",
    title: "都道府県",
    questions: [
      {
        question: "東京都",
        spelling: "toukyouto",
      },
      {
        question: "大阪府",
        spelling: "oosakahu",
      },
      {
        question: "福岡県",
        spelling: "hukuokakenn",
      },
      {
        question: "北海道",
        spelling: "hokkaidou",
      },
    ],
  },
  {
    id: "51710ca4-7b81-4e17-9389-384dbf6d75dc",
    title: "Fruits",
    questions: [
      {
        question: "Apple",
        spelling: "Apple",
      },
      {
        question: "Banana",
        spelling: "Banana",
      },
      {
        question: "Cherry",
        spelling: "Cherry",
      },
      {
        question: "Durian",
        spelling: "Durian",
      },
    ],
  },
];

export default typingQuestionSets;
