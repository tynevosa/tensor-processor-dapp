import z from "zod"

const ModelSchema = z.object({
    cover_image_url: z.string().url("Cover image URL must be a valid URL"),
    name: z.string().min(1, "Name must be at least 1 character long"),
    short_desc: z.string().min(1, "Short description must be at least 1 character long"),
    description: z.string().min(1, "Description must be at least 1 character long"),
    replicate_link: z.string().url("Replicate link must be a valid URL"),
});

export { ModelSchema }