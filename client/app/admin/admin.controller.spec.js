"use strict";

describe("Testing the Admin controller", function () {
    beforeEach(module("kidCallowayApp"));

    var AdminCtrl, scope, UserService;

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        UserService = new UserServiceMock();

        AdminCtrl = $controller("AdminCtrl", {
            $scope: scope,
            User: UserService
        });
    }));

    it("should contain all the users from the UserService", function () {
        expect(scope.users.length).toEqual(UserService.query().length);
    });
    
    it("should delete a user when called", function () {
        scope.delete(scope.users[0]);

        expect(scope.users.length).toEqual(UserService.query().length);
        expect(scope.users[0].name).toBe("Bram Slaats");
    });
});

function UserServiceMock() {
    var users = [{
        _id: 1,
        name: "Lody Borgers"
    }, {
        _id: 2,
        name: "Bram Slaats"
    }];
    
    function query() {
        return users;
    }

    function remove(user) {
        if (!user.id) {
            throw new Error("User ID is not defined");
        }

        for (var i = 0; i < users.length; i++) {
            if (user.id === users[i]._id) {
                users.splice(i, 1);
                return;
            }

            throw new Error("Given id: " + user.id + ", is not in users array");
        }
    }

    return {
        query: query,
        remove: remove
    }
}