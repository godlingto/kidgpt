
export type Language = 'ko' | 'en';

export interface QAResponse {
  answer: string;
  inferredAnimal: string | null;
}

export interface BlockedResponse {
  message: string;
  alternatives: string[];
}
