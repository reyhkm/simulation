export interface Target {
  id: number;
  name: string;
  company: string;
  position: string;
}

export interface AttackParams {
  ceoName: string;
  projectName: string;
  amount: string;
}

export interface EmailBody {
  greeting: string;
  paragraphs: string[];
  closing: string;
  signature: string;
}

export interface GeneratedEmail {
  target: Target;
  subject: string;
  body: EmailBody | string; // Can be structured or a simple string for errors
  status: 'success' | 'failed';
}
