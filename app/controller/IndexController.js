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
			var funcion;
			var pesos = $scope.neurona.pesos;

			switch(tipo){
				case 'and':
					funcion = $scope.funcion.and;
					$scope.console.push('============== Procesando funcion AND ================');
				break;

				case 'or':
					funcion = $scope.funcion.or;
					$scope.console.push('============== Procesando funcion OR =================');
				break;

				case 'xor':
					funcion = $scope.funcion.xor;
					$scope.console.push('============== Procesando funcion XOR ================');
				break;
			}
			var j = 1;
			for(var i = 0; i < funcion.length; i++) {
				var value = funcion[i];
				var result = util.resolverEcuacionActivacion(value.x1, value.x2, pesos.w1, pesos.w2, pesos.w3);

				$scope.console.push('Iteracion #'+j);
				$scope.console.push('w1: ' + pesos.w1.toFixed(2) +'- w2: ' + pesos.w2.toFixed(2) + '- w3: ' + pesos.w3.toFixed(2)+ '- resultado:' + result.toFixed(2));
				if(util.resolver(result) != value.y){
					$scope.console.push('Recalculando pesos...');
					pesos.w1 = util.resolverEcuacionpeso(pesos.w1, value.y, value.x1);
					pesos.w2 = util.resolverEcuacionpeso(pesos.w2, value.y, value.x2);
					pesos.w3 = util.resolverEcuacionpeso(pesos.w3, value.y, -1);
					i = -1;
				}
				j++;
				if(i == funcion.length-1){
					$scope.console.push('Los Pesos optimos son: ## w1: ' + pesos.w1.toFixed(2) +'- w2: ' + pesos.w2.toFixed(2) + '- w3: ' + pesos.w3.toFixed(2)+ ' ##');
					$scope.console.push('================== Fin procesamiento ====================');
				}
				
			};
			
		},
		probar: function() {
			var util = this;
			var pesos = $scope.neurona.pesos;
			var test = $scope.test;
			var result = util.resolverEcuacionActivacion(test.x1, test.x2, pesos.w1, pesos.w2, pesos.w3);

			return util.resolver(result);
		}
	};
	$scope.test = {
		x1: null,
		x2: null
	}
	$scope.console = [];
	$scope.eventos = {
		clickEntrenamiento: function() {
			utilities.aprender($scope.funcion.actual);
		},
		clickProbar: function() {
			console.log('hello');
			$scope.console.push('=========================== TEST NEURONA ============================');
			$scope.console.push($scope.test.x1 + ' ' + $scope.funcion.actual + ' ' + $scope.test.x2 + ' = ' + utilities.probar());
			$scope.console.push('========================= FIN TEST NEURONA ==========================');
			$scope.response = $scope.test.x1 + ' ' + $scope.funcion.actual + ' ' + $scope.test.x2 + ' = ' + utilities.probar();
		},
		clickLimpiarConsola: function() {
			$scope.console = [];
		} 
	};
	$scope.funcion = {
		actual: 'and',
		and:[{x1: 1, x2: 1, y: 1 },
			 {x1: 1, x2: -1, y: -1 },
			 {x1: -1, x2: 1, y: -1 },
			 {x1: -1, x2: -1, y: -1 }],

		or: [{x1: 1, x2: 1, y: 1 },
			 {x1: 1, x2: -1, y: 1 },
			 {x1: -1, x2: 1, y: 1 },
			 {x1: -1, x2: -1, y: -1 }]
	};

	$scope.patternNombre=/^[a-zA-Z]*$/;

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
}).directive('test', function() {
  return {
    templateUrl: 'app/view/test.html'
  };
});