# PrrrStack Demo
PRRR stack (Postgres, Rust, Rocket, React) is a functionalish<sup>[1](#functionalish)</sup> approach for writing modern web applications.

## Why PrrrStack?
1. Marketing. Stacks are a good introduction to concepts, but more importantly, they're a marketing technique that allows one to gloss over the decision-making process on a technology-by-technology basis in favor of a one-size-fits-all solution.
2. Cats. Though Diesel does a lot of the heavy lifting as an ORM, it doesn't get to be part of the acronym because we lose the pun, but feel free to start marketing the PRRR-D (pronounced purdy) Stack. Web development definitely needs more bandwagons.
3. Fuck Oracle.
4. Rust is a fast and reliable systems language, and Rocket makes writing a server extremely approachable for someone with no low-level experience.
5. Two-way data binding is awful and adds unnecessary complexity with no benefit, so Angular and Vue were out of the picture. Also, see reason 2.

## Getting Started
Rocket requires the nightly version of Rust to run, so make sure you have it installed. You'll also want to ensure you're using it in this project's directory.

    curl -s https://static.rust-lang.org/rustup.sh | sh -s -- --channel=nightly
    cd prrr_demo
    rustup override add nightly
    cargo run

You'll need Node and NPM/Yarn and a global installation of Webpack.

    npm i -G webpack
    cd frontend
    npm i
    npm run dev

## Details
The server runs at `localhost:8000` and the SPA runs at `localhost:3000`.

### Endpoints
* **GET** `/api/cats` - returns all the cats
* **POST** `/api/cats` - creates a new cat in the database
* **PUT** `/api/cats/:id` - updates the cat with the given `:id`
* **DELETE** `/api/cats/:id` - deletes the cat with the given `:id` (RIP little buddy)




<a name="functionalish">1</a>: Though neither are strictly functional, Rust has written into the language a bias against mutation, and React's unidirectional flow and stateless functional components bias a more functional programming style. 
