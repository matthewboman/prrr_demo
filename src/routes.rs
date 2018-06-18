use rocket_contrib::Json;
use serde_json::Value;

use db::DbConn;
use models::{Cat, NewCat};

#[get("/cats", format = "application/json")]
fn all_cats(conn:DbConn) -> Json<Value> {
    let cats = Cat::all(&conn);
    Json(json!({
        "status": 200,
        "result": cats,
    }))
}

#[post("/cats", format = "application/json", data = "<new_cat>")]
fn new_cat(new_cat: Json<NewCat>, conn: DbConn) -> Json<Value> {
    Json(json!({
        "status": Cat::create(new_cat.into_inner(), &conn),
        "result": Cat::all(&conn),
    }))
}

#[put("/cats/<id>", format = "application/json", data = "<new_cat>")]
fn update_cat(id: i32, new_cat: Json<NewCat>, conn: DbConn) -> Json<Value> {
    let status = if Cat::update_by_id(id, new_cat.into_inner(), &conn) { 200 } else { 404 };
    Json(json!({
        "status": status,
        "result": Cat::all(&conn),
    }))
}

#[delete("/cats/<id>")]
fn delete_cat(id: i32, conn: DbConn) -> Json<Value> {
    let status = if Cat::delete_by_id(id, &conn) { 200 } else { 404 };
    Json(json!({
        "status": status,
        "result": null,
    }))
}
