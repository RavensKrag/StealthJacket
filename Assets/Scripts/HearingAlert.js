var parent_object;

var target_object;

var turn_speed : double;

function Start () {
	parent_object = transform.parent.gameObject;
	target_object = null;
}

function Update () {
	TurnTowardsDisturbance();
}

function OnTriggerEnter(c : Collider) {
	// print("FINISH");
	target_object = c.gameObject;
}

function OnTriggerExit (c : Collider) {
	target_object = null;
}

function TurnTowardsDisturbance() {
	if(target_object != null) {
		
	}
}