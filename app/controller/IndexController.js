app.controller('IndexController', function ($scope) {
	var utilities = {
		random: function() {
			var number = (Math.random() * 10 + 1).toFixed(1);
			return parseFloat(number);
		},
		recalcularPesosRandom: function() {
			$scope.neurona.pesos = {
				w1: this.random(),
				w2: this.random(),
				w3: this.random()
			}
		},
		resolverEcuacionActivacion: function(x1, x2, w1, w2, t) {
			return (x1*w1)+(x2*w2)+(-1*t);
		},
		resolverEcuacionpeso: function(w, x1, x2) {
			var e = $scope.neurona.e;
			return w+(e*x1*x2);
		},
		resolver: function(number) {
			if(number >= 0){
				return 1;
			}
			return -1;
		},
		aprender: function(tipo) {
			var util = this;
			var salir = false;
			var funcion;
			var pesos = $scope.neurona.pesos;

			switch(tipo){
				case 'and':
					funcion = $scope.funcion.and;
				break;

				case 'or':
					funcion = $scope.funcion.or;
				break;

				case 'xor':
					funcion = $scope.funcion.xor;
				break;
			}

			for(var i = 0, i < funcion.lenght; i++) {
				var value = funcion[i];
				var result = util.resolverEcuacionActivacion(value.x1, value.x2, pesos.w1, pesos.w2, pesos.w3);

				if(util.resolver(result) == -1){
					pesos.w1 = util.resolverEcuacionpeso(pesos.w1, value.y, value.x1);
					pesos.w2 = util.resolverEcuacionpeso(pesos.w2, value.y, value.x2);
					pesos.w3 = util.resolverEcuacionpeso(pesos.w1, value.y, -1);
					i = 0;
				}
			};
			
		}
	};

	$scope.funcion = {
		and:[{x1: 1, x2: 1, y: 1 },
			 {x1: 1, x2: 0, y: -1 },
			 {x1: 0, x2: 1, y: -1 },
			 {x1: 0, x2: 0, y: -1 }],

		or: [{x1: 1, x2: 1, y: 1 },
			 {x1: 1, x2: 0, y: 1 },
			 {x1: 0, x2: 1, y: 1 },
			 {x1: 0, x2: 0, y: -1 }]
	};
	$scope.neurona = {
		e: 0.5,
		pesos: {
			w1: utilities.random(),
			w2: utilities.random(),
			w3: utilities.random()
		}

	};


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