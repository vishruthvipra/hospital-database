/**
 * Created by vishruthkrishnaprasad on 12/2/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController)
        function profileController(UserService, $location, loggedin) {
            var vm = this;
            vm.user = loggedin.data;
            var user = vm.user;
            var userId = user._id;
            vm.logout = logout();

            function init() {
                var promise = UserService.findUserById(userId);
                promise.success(function (user) {
                    vm.user = user;

                });
            }

            init();
            vm.updateUser = updateUser;
            vm.deleteUser = deleteUser;

            function updateUser(newUser) {
                var update = UserService
                    .updateUser(userId, newUser)
                    .success(function (user) {
                        if(update != null)
                        {
                            vm.message = "User succesfully updated!"
                        }
                        else {
                            vm.error = "Unable to update..."
                        }
                });
            }
            
            function deleteUser(user) {
                var update = UserService
                    .deleteUser(userId, user)
                    .success(function (user) {
                        if (user != null) {
                            $location.url("login");
                        }
                        else {
                            vm.error = "Could not delete user";
                        }
                    })
            }

            function logout() {
                UserService
                    .logout()
                    .then(function (response) {
                        $location.url("/home");
                    });
            }
        }

})();