import { templates } from "../data/templates"
import type { Template } from "../data/types"

export async function getTemplates(): Promise<Template[]> {
    return templates;
}

export async function getTemplateBySlug(slug: string): Promise<Template | null> {
    return templates.find((t) => t.slug === slug) ?? null;
}