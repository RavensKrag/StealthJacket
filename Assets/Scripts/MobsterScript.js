// List of nodes to walk to
var walklist;
// Current destination
var goal_node;
// Speed in units per second
var move_speed = 5.0;
// Within this distance, the mobster has reached his target
var distance_threshold = 0.1;

private var anim:Animator;

// Whether or not the mobster shoud loop the path, or just follow to the end
var loop : boolean = true;

function Start () {
	anim = GetComponent(Animator);
	
	GetDestinationNodes();
	MarkNextDestination();
}

function Update () {
	WalkAlongNodes();
	
	// if you detect the player
	// make the player reset to the origin
}

function WalkAlongNodes() {
	if(goal_node) {
		var p_a = transform.position;
		var p_b = goal_node.transform.position;
		
		var a : Vector3 = Vector3(p_a.x, 0, p_a.z);
		var b : Vector3 = Vector3(p_b.x, 0, p_b.z);
		
		// print(Vector3.Distance(a,b));
		
		if(Vector3.Distance(a,b) < distance_threshold) {
			MarkNextDestination();
		}
		
		Move(move_speed);
	}
}

function Move(speed) {
	anim.SetFloat("Speed", speed);
	
	// transform.position += transform.forward.normalized * speed * Time.deltaTime;
	rigidbody.velocity = transform.forward.normalized * speed;
}

function MarkNextDestination() {
	if(walklist.length > 0) {
		goal_node = walklist.Pop();
		
		if(loop) {
			walklist.Unshift(goal_node); // Recycle node
		}
		
		var delta = goal_node.transform.position - transform.position;
		delta = delta.normalized;
		
		// print(delta);
		// print(walklist.length);
		
		// Rotate to face target
		transform.eulerAngles = Vector3(0, Mathf.Atan2(delta.x, delta.z) * Mathf.Rad2Deg, 0);
	}
	else {
		goal_node = null;
	}
}

function GetDestinationNodes() {
	var list = FindObjectsOfType(WalkNodeScript);
	
	walklist = new Array();
	
	for(node in list) {
		if(node.attached_mobster == this) {
			walklist.Add(node);
		}
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
	
	// for(item in walklist) {
	// 	print(item.transform.position.y);
	// }
}

@script RequireComponent(Rigidbody)