
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

export interface GeneratedEmail {
  target: Target;
  subject: string;
  body: string;
  status: 'success' | 'failed';
}
