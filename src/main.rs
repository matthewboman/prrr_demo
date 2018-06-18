#![feature(plugin, custom_derive, const_fn, decl_macro, extern_prelude)]
#![plugin(rocket_codegen)]

#[macro_use] extern crate diesel;
extern crate dotenv;
extern crate r2d2;
extern crate r2d2_diesel;
extern crate rocket;
extern crate rocket_contrib;
extern crate rocket_cors;
#[macro_use] extern crate serde_derive;
#[macro_use] extern crate serde_json;

use rocket::http::Method;
use rocket_cors::{AllowedOrigins, AllowedHeaders};

use routes::*;

mod db;
mod models;
mod routes;
mod schema;

fn rocket() -> rocket::Rocket {
    let pool = db::create_db_pool();
    let (allowed_origins, failed_origins) = AllowedOrigins::some(&["http://localhost:3000"]);
    let options = rocket_cors::Cors {
        allowed_origins: allowed_origins,
        allowed_methods: vec![Method::Get, Method::Put, Method::Post, Method::Delete]
            .into_iter()
            .map(From::from)
            .collect(),
        allowed_headers: AllowedHeaders::all(),
        allow_credentials: true,
        ..Default::default()
    };

    rocket::ignite()
        .manage(pool)
        .mount("/api", routes![all_cats, new_cat, update_cat, delete_cat])
        .mount("/", routes![index])
        .attach(options)
}

#[get("/")]
fn index<'a>() -> &'a str {
    "Hello!"
}

fn main() {
    rocket().launch();
}
