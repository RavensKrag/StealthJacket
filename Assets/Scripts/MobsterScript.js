// List of nodes to walk to
var walklist;

// Current position in the walk list
var walklist_i = 0;

var delta : Vector3;
var goal : Vector3;

// var n : WalkNode;


var move_speed = 1.0;

function Start () {
	// walklist = GameObject.FindGameObjectsWithTag("WalkNode");
	walklist = FindObjectsOfType(WalkNodeScript);
	
	delta = new Vector3(0,0,0);
	
	GetNextDestination();
}

function Update () {
	// if(){
		
	// }
	// else{
		
	// }
	
	var move_vector = delta * Time.deltaTime * move_speed;
	// GetComponent(CharacterController).Move(move_vector * Time.deltaTime); 
	Move(move_vector);
}

function Move(distance) {
	transform.position += distance;
}

function GetNextDestination() {
	goal = walklist[walklist_i].transform.position;
	delta = goal - transform.position;
	delta = delta.normalized;
	
	walklist_i++;
}

function PastDestination() {
	// delta.
}