const Mutation = {
  insertPeople(parent, { data }, { db, pubsub }, info) {
    try {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const index = db.people.findIndex((person) => person.ssn === data[i].ssn);
        console.log(index);
        if (index === -1) {
          db.people.push(data[i]);
        } else {
          db.people[index] = data[i];
        }
      }
      return true;
    } catch {
      return false;
    }
  },
};
module.exports = Mutation;
