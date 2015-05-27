module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

User.create([
    {username: 'admin', email: 'scott@vehrenkamp.com', password: 'compaq'},
    {username: 'application', email: 'scott@vehrenkamp.com', password: 'app123'}
  ], function(err, users) {
    if (err) return cb(err);
 
    //create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) cb(err);
 
      //make bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      }, function(err, principal) {
        cb(err);
      });
    });
    console.log('Role Created');
  }); //end USER
}