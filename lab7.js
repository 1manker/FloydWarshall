//Lucas Manker
//Cosc 3020
//10/29/18
//Lab7


function fillMatrix(num){
	var matrix = [];
	for(var i = 0; i < num; i++){
		var row = [];
		for(var j = 0; j < num; j++){
			row[j] = 0;
		}
		matrix[i] = row;
	}
	return matrix;
}

function addWeight(row, col, weight, matrix){
	var targetRow = matrix[row];
	targetRow[col] = weight;
	matrix[row] = targetRow;
}

function printMatrix(matrix){
	for(var i = 0; i < matrix.length; i++){
		console.log(matrix[i]);
	}
	console.log("\n");
}

function testCaseUndirected(){
	var testMatrix = fillMatrix(6);
	var testArr = [];
	testArr = [[0,1,7],[0,5,14],[0,2,9],[1,3,15],[1,2,10],[2,5,2],[2,3,11],[3,4,6],[4,5,9]];
	for(var i = 0; i < testArr.length; i++){
		var row = testArr[i];
		addWeight(row[0], row[1], row[2], testMatrix);
		addWeight(row[1], row[0], row[2], testMatrix);
	}
	return allPairsShortestPaths(testMatrix);
}

function testCase(){
	testMatrix = fillMatrix(8);
	weightArray = [[0,3,4],[0,1,2], [0,2,1], [1,5,2], [1,4,10], [1,2,1],
	               [2,0,9], [2,4,8], [3,2,2], [4,3,7], [4,6,1], [5,7,3],
	               [6,5,2], [6,4,4], [7,6,1]];
	for(var i = 0; i < weightArray.length; i++){
		var tempV = weightArray[i];
		addWeight(tempV[0], tempV[1], tempV[2], testMatrix);
	}
	return allPairsShortestPaths(testMatrix);
}

function allPairsShortestPaths(matrix){
	var vertMatrix = []
	//initializing values to inf
	for(var i = 0; i < matrix.length; i++){
		var row = [];
		for(var j = 0; j < matrix.length; j++){
			row[j] = Infinity;
		}
		vertMatrix[i] = row;
	}
	//the diagonal values are zeroes 
	for(var i = 0; i < matrix.length; i++){
		var row = vertMatrix[i];
		row[i] = 0;
		vertMatrix[i] = row;
	}
	//filling in edges
	for(var i = 0; i < matrix.length; i++){
		var row = matrix[i];
		var distRow = vertMatrix[i];
		for(var j = 0; j < matrix.length; j++){
			if(row[j] > 0){
				distRow[j] = row[j];
			}
		}
		vertMatrix[i] = distRow;
	}
	for(var k = 0; k < vertMatrix.length; k++){
		var kRow = vertMatrix[k];
		for(var i = 0; i < vertMatrix.length; i++){
			var iRow = vertMatrix[i];
			for(var j = 0; j < vertMatrix.length; j++){
			if(iRow[j] > (iRow[k] + kRow[j])){
				iRow[j] = (iRow[k] + kRow[j]);
			}
			vertMatrix[i] = iRow;
			}
		}
	}
	testEqual(matrix, vertMatrix);
	return vertMatrix;
}

//Testing to make sure the algorithm works properly by testing vertex distance equality w/ Djikstra.
function dijsktra(matrix, vertex){
	var distance = [];
	var visited = [];
	
	for(var i = 0; i < matrix.length; i++){
		distance[i] = Infinity;
		//fills the vertices with infinity since we
		//haven't been to adjacent nodes yet
	}

	distance[vertex] = 0;
	//distance to vertex you're starting from always zero

	while(visited.length < matrix.length){
		//loops until we've hit ever vertex
		var next = visitNext(distance, visited);
		//finds out which node to visit next based on min distance
		visited.push(next);
		//adding the visited node to the visted list
		updateDist(distance, matrix[next], distance[next]);
		//update the distance list based on the information we gained
		//from the newly visited vertex
	}
	return distance;
}

function visitNext(distance, visited){
	tempRow = [];
	//making a deep copy of array
	for(var i = 0; i < distance.length; i++){
		tempRow[i] = distance[i];
	}
	for(var i = 0; i < visited.length; i++){
		var index = visited[i];
		tempRow[index] = Infinity;
		//making all vertices we've visited equal to inf
		//so we don't backtrack
	}
	var min = tempRow.indexOf(Math.min(...tempRow));
	//finding the minimum distance to the next vertex we haven't 
	//traveled to.
	return min;
}

function updateDist(distance, row, dist){
	//updating the minimum distance after we've visited our new vertex.
	for(var i = 0; i < distance.length; i++){
		if(row[i]){
			var size = dist + row[i];
			if(size < distance[i]){
				distance[i] = size;
			}
		}
	}
}

function testEqual(adjMatrix, matrix){
	var errors = 0;
	for(var i = 0; i < matrix.length; i++){
		var row = matrix[i];
		var dRow = dijsktra(adjMatrix, i);
		for(var j = 0; j < matrix.length; j++){
			if(row[j] != dRow[j]){
				errors++;
			}
		}
	}
	console.log("Testing against Djikstra's algorithm found", errors, "errors");
}



var test = testCaseUndirected();
printMatrix(test);

var test2 = testCase();
printMatrix(test2);























