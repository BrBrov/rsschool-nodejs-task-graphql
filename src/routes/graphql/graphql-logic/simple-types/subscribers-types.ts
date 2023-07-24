import { SubscribersOnAuthors, User } from '@prisma/client';

export default interface UserWithSubscribe extends User {
	userSubscribedTo?: SubscribersOnAuthors[];
  subscribedToUser?: SubscribersOnAuthors[];	
}