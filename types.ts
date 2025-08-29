
export enum PrdMode {
  Quick = 'quick',
  Professional = 'professional',
  Enterprise = 'enterprise',
}

export interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}