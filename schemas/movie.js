import { z } from 'zod'

const movieSchema = z.object({
    title: z
        .string({
            invalid_type_error: 'Movie title must be a string',
            required_error: 'Movie title is required',
        })
        .max(250),
    year: z.number().int().min(1900).max(2024),
    rated: z.enum(['PG-13', 'R', 'TV-MA', 'TV-14', 'N/A']),
    released: z.string().length(11),
    runtime: z.number().min(1).max(300),
    genre: z.array(
        z.enum([
            'Action',
            'Drama',
            'Fantasy',
            'Horror',
            'Sci-Fi',
            'Thriller',
            'Biography',
            'Comedy',
            'Crime',
            'Adventure',
            'History',
        ]),
    ),
    director: z.array(z.string().max(250)),
    writer: z.array(z.string().max(250)),
    actors: z.array(z.string().max(250)),
    plot: z.string().max(255),
    language: z.array(
        z.enum([
            'English',
            'Spanish',
            'Russian',
            'French',
            'Old English',
            'Norse',
            'Old',
            'Latin',
        ]),
    ),
    country: z.array(
        z.enum(['USA', 'UK', 'Ireland', 'Canada', 'France', 'Hong Kong']),
    ),
    awards: z.string().max(500),
    poster: z.string().url(),
    metascore: z.number(),
    imdbrating: z.number(),
    imdbvotes: z.number(),
    imdbid: z.string(),
    type: z.enum(['movie', 'series']),
    response: z.boolean(),
    images: z.array(z.string().url()),
})

export const validateMovie = (object) => {
    return movieSchema.safeParse(object)
}

export const validatePartialMovie = (object) => {
    return movieSchema.partial().safeParse(object)
}
