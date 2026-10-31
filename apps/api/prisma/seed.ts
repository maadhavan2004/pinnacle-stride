import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import {
  servicesData,
  technologyCategories,
  projectsData,
  productsData,
  teamMembersData,
  faqsData,
  legalDocuments,
} from '@ps/content';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding PinnacleStride database...');

  // 1. Initial Admin User
  const adminEmail = process.env.INITIAL_OWNER_EMAIL || 'admin@pinnaclestride.com';
  const adminPassword = process.env.INITIAL_OWNER_PASSWORD || 'PinnacleStride2026!Admin';
  const hashedPassword = await argon2.hash(adminPassword);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: hashedPassword,
      displayName: 'Lead Architect',
      role: 'OWNER',
      isActive: true,
    },
  });
  console.log(`Admin user seeded: ${admin.email}`);

  // 2. Technology Categories & Items
  for (let catIndex = 0; catIndex < technologyCategories.length; catIndex++) {
    const cat = technologyCategories[catIndex]!;
    const category = await prisma.technologyCategory.upsert({
      where: { name: cat.name },
      update: { sortOrder: catIndex },
      create: {
        name: cat.name,
        sortOrder: catIndex,
      },
    });

    for (let itemIndex = 0; itemIndex < cat.items.length; itemIndex++) {
      const item = cat.items[itemIndex]!;
      await prisma.technology.upsert({
        where: { name: item.name },
        update: {
          categoryId: category.id,
          sortOrder: itemIndex,
        },
        create: {
          categoryId: category.id,
          name: item.name,
          sortOrder: itemIndex,
          isPublished: true,
        },
      });
    }
  }
  console.log('Technology categories and items seeded.');

  // 3. Core Services
  for (let i = 0; i < servicesData.length; i++) {
    const s = servicesData[i]!;
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        summary: s.summary,
        problemSolved: s.problemSolved,
        whatWeBuild: s.whatWeBuild,
        serviceType: s.serviceType,
        sortOrder: i,
        status: 'PUBLISHED',
      },
      create: {
        slug: s.slug,
        title: s.title,
        summary: s.summary,
        problemSolved: s.problemSolved,
        whatWeBuild: s.whatWeBuild,
        serviceType: s.serviceType,
        sortOrder: i,
        status: 'PUBLISHED',
      },
    });
  }
  console.log('Services seeded.');

  // 4. Projects (internal portfolio & prototypes)
  for (let i = 0; i < projectsData.length; i++) {
    const p = projectsData[i]!;
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        summary: p.summary,
        projectType: p.projectType,
        category: p.category,
        overview: p.overview,
        problem: p.problem,
        solution: p.solution,
        features: p.features,
        contribution: p.contribution,
        results: p.results,
        liveUrl: p.liveUrl,
        repoUrl: p.repoUrl,
        isFeatured: p.isFeatured,
        sortOrder: p.sortOrder,
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
      create: {
        slug: p.slug,
        title: p.title,
        summary: p.summary,
        projectType: p.projectType,
        category: p.category,
        overview: p.overview,
        problem: p.problem,
        solution: p.solution,
        features: p.features,
        contribution: p.contribution,
        results: p.results,
        liveUrl: p.liveUrl,
        repoUrl: p.repoUrl,
        isFeatured: p.isFeatured,
        sortOrder: p.sortOrder,
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });
  }
  console.log('Projects seeded.');

  // 5. Products (Flagship software in development / coming soon)
  for (const pr of productsData) {
    await prisma.product.upsert({
      where: { slug: pr.slug },
      update: {
        name: pr.name,
        tagline: pr.tagline,
        problem: pr.problem,
        targetUsers: pr.targetUsers,
        features: pr.features,
        roadmap: pr.roadmap,
        bodyMd: pr.bodyMd,
        productStatus: pr.productStatus,
        isFeatured: pr.isFeatured,
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
      create: {
        slug: pr.slug,
        name: pr.name,
        tagline: pr.tagline,
        problem: pr.problem,
        targetUsers: pr.targetUsers,
        features: pr.features,
        roadmap: pr.roadmap,
        bodyMd: pr.bodyMd,
        productStatus: pr.productStatus,
        isFeatured: pr.isFeatured,
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });
  }
  console.log('Products seeded.');

  // 6. Team Members
  for (let i = 0; i < teamMembersData.length; i++) {
    const tm = teamMembersData[i]!;
    await prisma.teamMember.create({
      data: {
        fullName: tm.fullName,
        roleTitle: tm.roleTitle,
        bio: tm.bio,
        interests: tm.interests,
        links: tm.links,
        sortOrder: tm.sortOrder,
        isPublished: tm.isPublished,
      },
    });
  }
  console.log('Team members seeded.');

  // 7. FAQs
  for (const f of faqsData) {
    await prisma.faq.create({
      data: {
        topic: f.topic,
        question: f.question,
        answerMd: f.answerMd,
        sortOrder: f.sortOrder,
        isPublished: f.isPublished,
      },
    });
  }
  console.log('FAQs seeded.');

  // 8. Legal Documents
  for (const key of Object.keys(legalDocuments)) {
    const doc = legalDocuments[key]!;
    const bodyMarkdown = doc.sections.map((s) => `### ${s.heading}\n\n${s.content}`).join('\n\n');
    await prisma.legalDocument.upsert({
      where: {
        kind_version: {
          kind: doc.kind,
          version: '1.0',
        },
      },
      update: {
        bodyMd: bodyMarkdown,
        effectiveFrom: new Date('2026-10-31'),
      },
      create: {
        kind: doc.kind,
        version: '1.0',
        bodyMd: bodyMarkdown,
        effectiveFrom: new Date('2026-10-31'),
      },
    });
  }
  console.log('Legal documents seeded.');
  console.log('Database seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
