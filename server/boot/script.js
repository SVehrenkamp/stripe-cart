// module.exports = function(app) {
//   var User = app.models.User;
//   var Role = app.models.Role;
//   var RoleMapping = app.models.RoleMapping;

// User.create([
//     {username: 'admin', email: 'scott@vehrenkamp.com', password: 'compaq'},
//     {username: 'application', email: 'scott@vehrenkamp.com', password: 'app123'}
//   ], function(err, users) {
//     if (err) return console.log(err);
 
//     //create the admin role
//     Role.create({
//       name: 'admin'
//     }, function(err, role) {
//       if (err) console.log(err);
 
//       //make bob an admin
//       role.principals.create({
//         principalType: RoleMapping.USER,
//         principalId: users[1].id
//       }, function(err, principal) {
//         console.log(err);
//       });
//     });
//     console.log('Role Created');
//   }); //end USER
// }