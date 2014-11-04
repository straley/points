angular.module('incident', ['ionic'])
/**
 * The Incidents factory handles saving and loading incidents
 * from local storage.
 */
.factory('Incidents', function() {
  return {
    all: function() {
      var incidentsString = window.localStorage['incidents'];
      if(incidentsString) {
        return angular.fromJson(incidentsString);
      }
      return [];
    },
    save: function(incidents) {
      window.localStorage['incidents'] = angular.toJson(incidents);
    }
  }
})

.controller('IncidentsCtrl', function($scope, $timeout, Modal, Incidents) {

  // Load or initialize incidents
  $scope.incidents = Incidents.all();

  // Create our modal
  Modal.fromTemplateUrl('new-incident.html', function(modal) {
    $scope.incidentModal = modal;
  }, {
    scope: $scope
  });

  $scope.createIncident = function(incident) {
    $scope.incidents.push({
      child: incident.child,
      selection: incident.selection,
      notes: incident.notes
    });
    $scope.incidentModal.hide();

    // Inefficient, but save all the incidentss
    Incidents.save($scope.incidents);
    incident.title = "";
  };

  $scope.newIncident = function() {
    $scope.incident = {datetime: new Date()};
    $scope.incidentModal.show();
  };

  $scope.closeNewIncident = function() {
    $scope.incidentModal.hide();
  }
});
