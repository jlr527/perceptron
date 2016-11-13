app.controller('IndexController', function ($scope) {
	var utilities = {
		random: function() {
			var number = (Math.random() * 10 + 1).toFixed(1);
			return number;
		},
		recalcularPesosRandom: function() {
			$scope.neurona.pesos = {
				w1: this.random(),
				w2: this.random(),
				w3: this.random()
			}
		},
		resolverEcuacionGeneral: function(x1, w1, x2, w2, t) {
			return (x1*w1)+(x2*w2)+(-1*t);
		},
		resolverEcuacionpeso(): function(w, e, x1, x2) {
			return w+(e*x1*x2);
		}
	}

	$scope.neurona = {
		pesos: {
			w1: utilities.random(),
			w2: utilities.random(),
			w3: utilities.random()
		}
	}

}).directive('formInput', function() {
  return {
    templateUrl: 'app/view/formInput.html'
  };
}).directive('result', function() {
  return {
    templateUrl: 'app/view/result.html'
  };
}).directive('process', function() {
  return {
    templateUrl: 'app/view/process.html'
  };
});