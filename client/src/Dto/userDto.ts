import type { ArtDto } from "./artDto";

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  art: ArtDto[];
}
