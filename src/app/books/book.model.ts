export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  available: boolean;
  dueDate?: string; // Only present if borrowed
}