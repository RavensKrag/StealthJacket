// List of nodes to walk to
var walklist;

var delta : Vector3;
var goal : Vector3;

// var n : WalkNode;


var move_speed = 5.0;

function Start () {
	GetDestinationNodes();
	
	delta = new Vector3(0,0,0);
	
	GetNextDestination();
}

function Update () {
	// if(){
		
	// }
	// else{
		
	// }
	
	// var move_vector = delta * Time.deltaTime * move_speed;
	// GetComponent(CharacterController).Move(move_vector * Time.deltaTime); 
	Move(move_speed);
}

function Move(speed) {
	// transform.position += distance;
	transform.position += transform.forward.normalized * speed * Time.deltaTime;
}

function GetNextDestination() {
	var goal_node = walklist.Pop();
	goal = goal_node.transform.position;
	delta = goal - transform.position;
	delta = delta.normalized;
	
	print(delta);
	// Rotate around y axis (up axis) to face the target
	// goal.RotateAround(transform.position, Vector3.up, Mathf.atan());
	// var target_on_plane = Vector3(delta.x, 0, delta.z);
	transform.eulerAngles = Vector3(0, Mathf.Atan2(delta.x, delta.z) * Mathf.Rad2Deg, 0);
}

function PastDestination() {
	// delta.
}

function GetDestinationNodes() {
	// walklist = GameObject.FindGameObjectsWithTag("WalkNode");
	var list = FindObjectsOfType(WalkNodeScript);
	
	// walklist = new LinkedList.<Wa>();
	walklist = new Array();
	
	for(item in list) {
		// if() {
			walklist.Add(item);
		// }
	}
	
	
	// walklist.Sort();
	// walklist.sort(function(a,b){
	// 	return a.y - b.y;
	// });
	
	// Bubble sort
	for(var i=walklist.length-1; i > 0; i--) {
		for(var j=0; j < i; j++) {
			// High index = LOW value
			
			if(walklist[j].transform.position.y < walklist[j+1].transform.position.y) {
				// swap
				var temp = walklist[j];
				walklist[j] = walklist[j+1];
				walklist[j+1] = temp;
			}
		};
	};
	
	for(item in walklist) {
		print(item.transform.position.y);
	}
}
