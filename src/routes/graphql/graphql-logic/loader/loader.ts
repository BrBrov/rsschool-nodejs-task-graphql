import { MemberType, Post, PrismaClient, Profile, User } from '@prisma/client';
import DataLoader from 'dataloader';

export default class Loader {
	public prisma: PrismaClient;
	public user: DataLoader<string, User>;
	public profiles: DataLoader<string, Profile[]>;
	public posts: DataLoader<string, Post[]>;
	public subscribersFor: DataLoader<string, User[]>;
	public subscribedTo: DataLoader<string, User[]>;
	public memberType: DataLoader<string, MemberType[]>;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
		this.user = this.dlUser();
		this.profiles = this.dlProfiles();
		this.posts = this.dlPosts();
		this.subscribedTo = this.dlSubscribed();
		this.subscribersFor = this.dlSubscribe();
		this.memberType = this.dlMembers();
	}

	private dlUser(): DataLoader<string, User> {
		return new DataLoader(async (idArr: readonly string[]) => {
			const users = await this.prisma.user.findMany({
				where: {
					id: { in: [...idArr] },
				},
				include: {
					subscribedToUser: true,
					userSubscribedTo: true,
				},
			});
			
			return idArr.map((id: string) => users.find((user) => user.id === id));
		}) as DataLoader<string, User>;
	};

	private dlProfiles(): DataLoader<string, Profile[]> {
		return new DataLoader(async (idArr: readonly string[]) => {
			const profiles = await this.prisma.profile.findMany({
				where: {
					userId: { in: [...idArr] },
				},
			});
			
			return idArr.map((id) => profiles.find((profile) => profile.userId === id));
		}) as unknown as DataLoader<string, Profile[]>;
	};

	private dlPosts() {
		return new DataLoader(async (idArr: readonly string[]) => {
			const posts = await this.prisma.post.findMany({
				where: {
					authorId: { in: [...idArr] },
				},
			});
			
			return idArr.map((id: string) => posts.find((post) => post.authorId === id));
		}) as unknown as DataLoader<string, Post[]>;
	};

	private dlSubscribed() {
		return new DataLoader(async (idArr: readonly string[]) => {
			const subs = await this.prisma.subscribersOnAuthors.findMany({
				where: {
					subscriberId: { in: [...idArr] },
				},
				select: {
					subscriberId: true,
					author: true,
				},
			});
			
			return idArr.map((id: string) => subs.find((subscribe) => subscribe.subscriberId === id)?.author);
		}) as unknown as DataLoader<string, User[]>;

	};

	private dlSubscribe() {
		return new DataLoader(async (idArr: readonly string[]) => {
			const subs = await this.prisma.subscribersOnAuthors.findMany({
				where: {
					authorId: { in: [...idArr] },
				},
				select: {
					subscriber: true,
					authorId: true,
				},
			});
			
			return idArr.map((id) => subs.find((subscribe) => subscribe.authorId === id)?.subscriber);
		}) as unknown as DataLoader<string, User[]>;
	};

	private dlMembers() {
		return new DataLoader(async (idArray: readonly string[]) => {
			const mems = await this.prisma.memberType.findMany({
				where: {
					id: {
						in: [...idArray]
					}
				}
			});
			
			return idArray.map((id: string) => mems.find((mem) => mem.id === id));
		}) as unknown as DataLoader<string, MemberType[]>;
	};
}