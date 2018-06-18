use diesel;
use diesel::prelude::*;
use diesel::pg::PgConnection;

use schema::cats;
use schema::cats::dsl::cats as all_cats;

#[derive(Serialize, Queryable, Debug, Clone)]
pub struct Cat {
    pub id: i32,
    pub name: String,
    pub bio: String,
    pub kills: i32,
    pub image_url: String,
}

#[derive(Serialize, Deserialize, Insertable)]
#[table_name = "cats"]
pub struct NewCat {
    pub name: String,
    pub bio: String,
    pub kills: i32,
    pub image_url: String,
}

impl Cat {
    pub fn show(id: i32, conn: &PgConnection) -> Vec<Cat> {
        all_cats.find(id)
            .load::<Cat>(conn)
            .expect("Sometimes cats don't come when you call them")
    }

    pub fn all(conn: &PgConnection) -> Vec<Cat> {
        all_cats.order(cats::id.desc())
            .load::<Cat>(conn)
            .expect("Error herding cats")
    }

    pub fn create(cat: NewCat, conn: &PgConnection) -> bool {
        diesel::insert_into(cats::table)
            .values(&cat)
            .execute(conn)
            .is_ok()
    }

    pub fn update_by_id(id: i32, cat: NewCat, conn: &PgConnection) -> bool {
        use schema::cats::dsl::{
            name as n,
            bio as b,
            kills as k,
            image_url as img,
        };
        let NewCat { name, bio, kills, image_url } = cat;

        diesel::update(all_cats.find(id))
            .set((n.eq(name), b.eq(bio), k.eq(kills), img.eq(image_url)))
            .get_result::<Cat>(conn)
            .is_ok()
    }

    pub fn delete_by_id(id: i32, conn: &PgConnection) -> bool {
        if Cat::show(id, conn).is_empty() {
            return false;
        }
        diesel::delete(all_cats.find(id))
            .execute(conn)
            .is_ok()
    }
}
