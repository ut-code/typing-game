import { TypingTask } from "@typing/core";

const TYPING_TASK_COLLECTIONS: {
  id: string;
  title: string;
  typingTasks: TypingTask[];
}[] = [
  {
    id: "0b6d3308-5670-41fc-bb3e-590a4d34d754",
    title: "Basic",
    typingTasks: [
      {
        word: "Hello World",
        spellingList: ["Hello World"],
      },
      {
        word: "World",
        spellingList: ["World"],
      },
      {
        word: "世界",
        spellingList: ["sekai"],
      },
      {
        word: "ABC",
        spellingList: ["ABC"],
      },
    ],
  },
  {
    id: "9d6156fe-d4c1-4c38-8152-f313cf64020d",
    title: "都道府県",
    typingTasks: [
      {
        word: "東京都",
        spellingList: [],
      },
      {
        word: "大阪府",
        spellingList: ["oosakafu"],
      },
      {
        word: "福岡県",
        spellingList: ["fukuokaken"],
      },
      {
        word: "北海道",
        spellingList: ["hokkaidou"],
      },
    ],
  },
  {
    id: "51710ca4-7b81-4e17-9389-384dbf6d75dc",
    title: "Fruits",
    typingTasks: [
      {
        word: "Apple",
        spellingList: ["Apple"],
      },
      {
        word: "Banana",
        spellingList: ["Banana"],
      },
      {
        word: "Cherry",
        spellingList: ["Cherry"],
      },
      {
        word: "Durian",
        spellingList: ["Durian"],
      },
    ],
  },
];

export default TYPING_TASK_COLLECTIONS;
