'use strict';

angular.module('transitApp.version', [
  'transitApp.version.interpolate-filter',
  'transitApp.version.version-directive'
])

.value('version', '0.1');
