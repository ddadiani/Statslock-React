# Statslock

Use the public Deadlock API to display various stats about player match history, hero lore and gameplay stats.

Hosted with Github pages: https://ddadiani.github.io/Statslock-React/

## Notes

Due to how Github pages works, the site displays 404 on refresh if you are in a subdirectory on the website, you need to
go to the root of the domain to make the site work again. The site works normally while hosted locally.


<img width="1150" height="939" alt="image" src="https://github.com/user-attachments/assets/992c0c54-a780-4048-8183-92b320ee4076" />
<!-- <img width="1311" height="861" alt="image" src="https://github.com/user-attachments/assets/e666daa1-2128-4f6a-9c48-d2bab6ee6b33" /> -->
<img width="1248" height="917" alt="image" src="https://github.com/user-attachments/assets/31ca2780-0b42-43bb-98b9-344b2a454513" />


## Tech Stack

- React using React Router
- Deadlock API
- Fusejs
- CSS

## Setup / Installation

> [!NOTE]
> NodeJS is needed. (preferably node24)

1. Clone the repo and move into it

```shell
git clone https://github.com/ddadiani/Statslock-React.git
cd Statslock-React
```

2. Install dependencies

```shell
npm install
```

3. Run the dev server

```shell
npm run dev
```

## Build for production

```shell
npm run build
```

## Deploy

Deployed via GitHub Pages using the `gh-pages` npm package.

```shell
npm run deploy
```

## Credits

Uses the free Deadlock API, no auth needed
https://api.deadlock-api.com/
