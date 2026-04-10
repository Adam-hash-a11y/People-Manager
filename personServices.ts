import { Person } from "./person.type";
import { personList } from "./personData";

export function filterById(id: number): Person[] {
  return personList.filter((p) => {
    return p.id == id;
  });
}

export function getAllPeople() {
  let kid = 0;
  let female = 0;
  let men = 0;
  for (const element of personList) {
    if (element.type == "kid") {
      kid += 1;
    } else if (element.type == "women") {
      female += 1;
    } else if (element.type == "men") {
      men += 1;
    }
  }
  return { kids: kid, females: female, men: men };
}

export function addPerson(body: Person) {
  const id = Number(body.id);
  const age = Number(body.age);
  const name = body.name;
  const gender = body.gender;
  const type = body.type;

  const exists = personList.find((p) => p.id === id);
  if (exists) {
    return null;
  }

  const newPerson: Person = {
    id,
    name,
    age,
    gender,
    type,
  };

  personList.push(newPerson);

  return newPerson;
}

export function getPeopleByFilter(gender: string, type: string) {
  let result = personList;

  if (gender) {
    result = result.filter((p) => p.gender === gender);
  }

  if (type) {
    result = result.filter((p) => p.type === type);
  }

  return result;
}

export function deletePersonById(id: number) {
  const index = personList.findIndex((p) => p.id === id);

  if (index === -1) {
    return false;
  }

  personList.splice(index, 1);

  return true;
}
