export interface ArtDto {
  id: string;
  title: string;
  desc: string;
  imageUrl: string;
  User: { firstName: string; lastName: string };

  createdAt: string | Date;
}
