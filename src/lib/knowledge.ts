import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const KNOWLEDGE_DIR = path.join(process.cwd(), "content", "knowledge-base");

interface FaqItem {
    question: string;
    answer: string;
}

export interface KnowledgeArticle {
    slug: string;
    title: string;
    description: string;
    date: string;
    faq: FaqItem[];
    contentHtml: string;
}

/**
 * Returns true when an article's frontmatter marks it as unpublished
 * (either `draft: true` or `published: false`).
 */
function isDraft(data: Record<string, unknown>): boolean {
    return data.draft === true || data.published === false;
}

export function getAllSlugs(): string[] {
    if (!fs.existsSync(KNOWLEDGE_DIR)) return [];
    return fs
        .readdirSync(KNOWLEDGE_DIR)
        .filter((file) => file.endsWith(".md"))
        .filter((file) => {
            const raw = fs.readFileSync(path.join(KNOWLEDGE_DIR, file), "utf-8");
            const { data } = matter(raw);
            return !isDraft(data);
        })
        .map((file) => file.replace(/\.md$/, ""));
}

export async function getArticle(slug: string): Promise<KnowledgeArticle | null> {
    const filePath = path.join(KNOWLEDGE_DIR, `${slug}.md`);

    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    // Unpublished (draft) articles are hidden everywhere.
    if (isDraft(data)) return null;

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        title: data.title ?? "",
        description: data.description ?? "",
        date: data.date ?? "",
        faq: (data.faq as FaqItem[]) ?? [],
        contentHtml,
    };
}

export async function getAllArticles(): Promise<KnowledgeArticle[]> {
    const slugs = getAllSlugs();
    const articles = await Promise.all(slugs.map((slug) => getArticle(slug)));
    return articles.filter((a): a is KnowledgeArticle => a !== null);
}
