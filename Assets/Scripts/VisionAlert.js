var parent_object;

function Start () {
	parent_object = transform.parent.gameObject;
}

function Update () {
	
}

function OnTriggerEnter(c : Collider) {
	// print("FINISH");
	c.gameObject.GetComponent(PlayerScript).Spotted();
}

function TurnTowardsDisturbance() {
	
}