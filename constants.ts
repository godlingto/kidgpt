
import type { Language } from './types';

export const TEXTS: Record<Language, any> = {
  ko: {
    header: {
      parentsLink: '보호자 안내',
    },
    hero: {
      title: '상상력이 자라나는 동물 탐험!',
      tagline: '궁금한 걸 물어보고, 나만의 동물 스티커를 만들어봐요!',
      cta: '지금 바로 놀아보기',
    },
    demo: {
      qaTitle: '동물 Q&A',
      qaSubtitle: '무엇이든 물어보세요!',
      stickerTitle: '나만의 스티커 만들기',
      stickerSubtitle: '어떤 동물을 만들어 볼까요?',
      inputPlaceholder: '예: 북극곰은 무엇을 먹어요?',
      submit: '질문하기',
      stickerButton: '스티커 만들기!',
      generatingSticker: '스티커 만드는 중...',
      saveSticker: '스티커 저장',
      animalNamePlaceholder: '동물 이름을 입력해요',
      loadingAnswer: '답변을 생각하고 있어요...',
      error: '앗, 문제가 생겼어요. 다시 시도해 볼까요?',
      moderatedMessage: '음, 그건 조금 어려운 질문이에요. 대신 이런 동물은 어때요?',
    },
    parents: {
      title: '보호자님, 안심하세요!',
      subtitle: 'Kid GPT는 아이들을 위해 안전하게 만들어졌어요.',
      points: [
        { title: '안전 최우선', description: '부적절한 질문과 답변은 인공지능이 스스로 필터링해요.' },
        { title: '가입 필요 없음', description: '개인정보 없이, 바로 모든 기능을 체험할 수 있어요.' },
        { title: '창의력 쑥쑥', description: '질문하고 만들며 아이의 상상력과 표현력을 길러줘요.' },
      ],
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Kid GPT. 모든 권리 보유.`,
    },
    errorBoundary: {
        title: "앗, 문제가 발생했어요!",
        message: "페이지를 새로고침하거나 잠시 후 다시 시도해 주세요."
    }
  },
  en: {
    header: {
      parentsLink: 'For Parents',
    },
    hero: {
      title: 'Explore Animals with Your Imagination!',
      tagline: 'Ask anything you wonder and create your very own animal stickers!',
      cta: 'Play Now!',
    },
    demo: {
      qaTitle: 'Animal Q&A',
      qaSubtitle: 'Ask anything!',
      stickerTitle: 'Create Your Own Sticker',
      stickerSubtitle: 'Which animal should we make?',
      inputPlaceholder: 'e.g., What do polar bears eat?',
      submit: 'Ask',
      stickerButton: 'Make a Sticker!',
      generatingSticker: 'Making your sticker...',
      saveSticker: 'Save Sticker',
      animalNamePlaceholder: 'Enter an animal name',
      loadingAnswer: 'Thinking of an answer...',
      error: 'Oops! Something went wrong. Let\'s try again.',
      moderatedMessage: 'Hmm, that\'s a tricky question. How about we ask about one of these animals instead?',
    },
    parents: {
      title: 'Peace of Mind for Parents',
      subtitle: 'Kid GPT is built with safety first for your child.',
      points: [
        { title: 'Safety First', description: 'Our AI automatically filters inappropriate questions and answers.' },
        { title: 'No Sign-Up Needed', description: 'Jump right in and try all features without sharing personal info.' },
        { title: 'Boosts Creativity', description: 'Asking and creating helps grow your child\'s imagination and expression.' },
      ],
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Kid GPT. All rights reserved.`,
    },
    errorBoundary: {
        title: "Oops! Something went wrong.",
        message: "Please try refreshing the page or come back later."
    }
  },
};

export const SUGGESTED_QUESTIONS: Record<Language, string[]> = {
  ko: [
    '북극곰은 무엇을 먹어요?',
    '판다는 하루에 얼마나 자요?',
    '독수리는 얼마나 높이 날 수 있어요?',
    '사자는 왜 갈기가 있어요?',
    '펭귄은 추운 곳에서 어떻게 살아요?',
    '돌고래는 어떻게 이야기해요?',
  ],
  en: [
    'What does a polar bear eat?',
    'How long does a panda sleep each day?',
    'How high can an eagle fly?',
    'Why do lions have manes?',
    'How do penguins live in the cold?',
    'How do dolphins talk to each other?',
  ],
};
