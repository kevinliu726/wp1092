const Query = {
  statsCount(parent, { severity, locationKeywords }, { db, pubsub }, info) {
    try {
      if (!severity) severity = -1;
      const ret = [];
      for (let i = 0; i < locationKeywords.length; i++) {
        const peoples = db.people.filter(
          (person) => person.location.description.includes(locationKeywords[i]) && person.severity >= severity
        );
        if (!peoples) {
          peoples = [];
        }
        ret.push(peoples.length);
      }
      return ret;
    } catch {
      return null;
    }
  },
};

module.exports = Query;
