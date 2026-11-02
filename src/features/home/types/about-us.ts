export interface TeamMember {
  id: string;
  name: string;
  role: string;
  team?: string;
  image: string;
  bio?: string;
  tags?: string[];
  tone?: 1 | 2 | 3 | 4 | 5;
  drop?: number;
}
