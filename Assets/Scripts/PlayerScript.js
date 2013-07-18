enum State {Normal, Hiding, Spotted, Win};

// May want to just poll the level and find the start zone
// would be better if there's only one start
	// or maybe you want to keep multi-start, because you want checkpoints?
	// though should probably refactor code for checkpoints
var level_start : StartZoneScript;
var current_state : State;

function Start () {
	current_state = State.Normal;
	
	WarpToStartZone();
}

function Update () {
	switch(current_state) {
		case State.Normal:
			
			break;
		case State.Hiding:
			
			break;
		case State.Spotted:
			WarpToStartZone();
			current_state = State.Normal;
			break;
		
		case State.Win:
			print("WINN");
			if(transform.position.y >= 0 && transform.position.y < 0.1) {
				rigidbody.velocity = new Vector3(0,2,0);
				
			}
			break;
	}
}

function Spotted() {
	// Other object call this function to let the player object know it has been spotted
	current_state = State.Spotted;
}

function Win() {
	current_state = State.Win;
}

function WarpToStartZone() {
	transform.position = level_start.transform.position;
}