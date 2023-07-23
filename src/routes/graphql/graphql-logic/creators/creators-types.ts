export type PostDTOCreator = {
  authorId: string;
  content: string;
  title: string;
}

export type ProfileDTOCreator = {
  userId: string;
  memberTypeId: string;
  isMale: boolean;
  yearOfBirth: number;
}

export type UserDTOCreator = {
  name: string;
  balance: number;
}