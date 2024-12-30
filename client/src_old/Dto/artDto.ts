export interface ArtDto {
  id: string;
  title: string;
  desc: string;
  imageUrl: string;
  userId: string;
  User: { firstName: string; lastName: string };
  Likes: string[];

  createdAt: string | Date;
}
