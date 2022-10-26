import { PrismaClient, Prisma, Post } from '@prisma/client';
const prisma = new PrismaClient();

// モデル投入用のデータ定義
const postData: Post[] = [
    {
        id: 'fa119cb6-9135-57f5-8a5a-54f28d566d0e',
        title: '気持ちを落ち着かせる呼吸法',
        publishDate: new Date('2022-01-31'),
        published: true,
        createdAt: new Date('2022-01-31T04:34:22+09:00'),
        updatedAt: new Date('2022-01-31T04:34:22+09:00'),
    },
    {
        id: '545d5237-15ee-169c-13a2-30f8748e3d6e',
        title: '高ぶる気持ちを存分に発揮したいです',
        publishDate: new Date('2022-01-30'),
        published: true,
        createdAt: new Date('2022-01-31T04:34:22+09:00'),
        updatedAt: new Date('2022-01-31T04:34:22+09:00'),
    },
    {
        id: '95daa18f-90d0-390c-fb96-0d152312936c',
        title: 'ゆっくり落ち着く気持ちを大事にしたいです',
        publishDate: new Date('2022-01-29'),
        published: true,
        createdAt: new Date('2022-01-31T04:34:22+09:00'),
        updatedAt: new Date('2022-01-31T04:34:22+09:00'),
    },
];

const doSeed = async () => {
    const posts = [];
    for (const post of postData) {
        const createPosts = prisma.post.create({
            data: post,
        });
        posts.push(createPosts);
    }
    return await prisma.$transaction(posts);
};

const main = async () => {
    console.log(`Start seeding ...`);

    await doSeed();

    console.log(`Seeding finished.`);
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });