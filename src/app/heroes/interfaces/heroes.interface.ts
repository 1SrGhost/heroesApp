/* Creando una interfaz llamada IHeroes. */
export interface IHeroes {
    id?:               string;
    superhero:        string;
    publisher:        Publisher;
    alter_ego:        string;
    first_appearance: string;
    characters:       string;
    alt_img?:          string;
}

/* Creando un tipo llamado Publisher que solo puede ser uno de dos valores: DCComics o MarvelComics. */
export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}