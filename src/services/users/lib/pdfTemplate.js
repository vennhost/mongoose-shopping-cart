const getDocDefinition = usersArray => {
  const detailsTable = {
    body: [],
    widths: [200, 300]
  };

  usersArray.map(user => {
    detailsTable.body.push(["Name", `${user.name}`]);
    detailsTable.body.push(["Surname", `${user.surname}`]);
  });

  return {
    // In here we define what we want to put into our PDF
    content: [
      { text: "Participant Ticket", style: "header" },
      { table: detailsTable }
    ]
  };
};

module.exports = getDocDefinition;
