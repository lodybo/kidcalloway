angular.module("agendaApp").factory("agendaService", ["$resource", function ($resource) {
	var serviceFactory = {};
	
	var _getItems = function (id) {
		// Fetch all or fetch one?
		var url = "/api/agenda/";
		var agenda = $resource("/api/agenda/:id");
		
		if (id) {
			return agenda.get({id: id});
		}
		
		return agenda.query();
	};
	
	var _addItems = function (gig) {
        var agenda = $resource()
    };
	
	var _updateItems = function () {};
	
	var _removeItems = function () {};
	
	serviceFactory.get = _getItems;
	serviceFactory.add = _addItems;
	serviceFactory.put = _updateItems;
	serviceFactory.delete = _removeItems;
}]);