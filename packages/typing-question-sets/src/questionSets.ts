type TypingQuestion = {
  question: string;
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
      },
      {
        question: "World",
      },
    ],
  },
  {
    id: "51710ca4-7b81-4e17-9389-384dbf6d75dc",
    title: "Fruits",
    questions: [
      {
        question: "Apple",
      },
      {
        question: "Banana",
      },
      {
        question: "Cherry",
      },
      {
        question: "Durian",
      },
    ],
  },
];

export default typingQuestionSets;
