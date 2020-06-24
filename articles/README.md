## Anatomy of an article

- Every article has its own directory
- Every article's text content exists at `$article_directory/article.md`
- Every article's hero image exists at `$article_directory/hero.jpg`
- Any additional images live in the article directory

The whole structure looks like this:

```
working-with-databases-part1/
├── article.md
├── hero.jpg
└── mongodb.png
```

## Special files and directories

There are several special files and directories in this directory:

- `README.md` - this file
- `_index.md` - content home page at https://section.io/engineering-education
- `search.md` - engineering education search at https://section.io/engineering-education/search/
- `topic` - topic categories at https://section.io/engineering-education/topic/*
