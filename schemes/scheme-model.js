const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep
};

function find() {
  return db("schemes");
}
async function findById(id) {
  const item = await db("schemes").where({ id });
  return item;
}

//Takes id passed through URL params
//Joins scheme and step table at following columns: scheme_id,scheme_name,step_number,instructions.
//returns an array comprised of each step assigned to the scheme

function findSteps(id) {
  return db("schemes as s")
    .join("steps as st", "s.id", "st.scheme_id")
    .select(
      "s.id",
      "s.scheme_name as Scheme Name",
      "st.step_number as Step",
      "st.instructions"
    )
    .where({ scheme_id: id })
    .orderBy("Step");
}

//Takes a object with signature {scheme_name:value} adds it to the array and returns the object

async function add(scheme) {
  const [id] = await db.insert(scheme).into("schemes");
  return await findById(id);
}

//Takes an object with signature {scheme_name:value} and id passed through URL Params
async function update(changes, id) {
  try {
    const updatedScheme = await db("schemes")
      .where({ id })
      .update(changes);
    return await findById(updatedScheme);
  } catch (error) {
    return error;
  }
}

//Takes an ID passed through URL Params, if item with that ID exists it is deleted and the object is returned
//else returns undefined

async function remove(id) {
  const [removedScheme] = await findById(id);
  if (removedScheme) {
    await db("schemes")
      .where({ id })
      .del();
    return removedScheme;
  } else {
    return undefined;
  }
}

async function addStep(stepData, id) {
  const step_number = (await findSteps(id)).length + 1;
  stepData.step_number = step_number;
  stepData.scheme_id = id;
  const [stepID] = await db("steps").insert(stepData);
  return [stepID, stepData];
}
