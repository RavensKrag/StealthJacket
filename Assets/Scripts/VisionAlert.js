var parent_object;
var vision_distance : float;

function Start () {
	parent_object = transform.parent.gameObject;
}

function Update () {
	
}

function OnTriggerEnter(c : Collider) {
	var obj = c.gameObject;
	
	if(IsPathToTargetClear(obj)) {
		obj.GetComponent(PlayerScript).Spotted();
	}
}

function TurnTowardsDisturbance() {
	
}



function IsPathToTargetClear(target_object) {
	var raycast_query : RaycastHit; // will contain data from the first thing that was hit
	
	
	// TODO: Refactor code so that the ray casts to the collision center, instead of the transform center
	
	var target_position : Vector3 = target_object.GetComponent(Transform).position;
	// This offset is necessary because the ray is trying to cast to the
	// parent object origin, which is on the plane, instead of the collision origin
	target_position.y = 1;
	
	
	var delta : Vector3 = target_position - transform.position;
	Debug.DrawRay(transform.position, delta, Color.green, 3);
	// print(Vector3.Distance(transform.position, target_object.GetComponent(Transform).position));
	
	// Test all layers except for the following...
	var mask : LayerMask = LayerMask.NameToLayer("DetectionColliders");
	
	if(Physics.Raycast(transform.position, delta.normalized, raycast_query, 
						vision_distance, ~mask.value)
	){
		// Make sure that there is nothing in betwene the object trying to see, and the target
		print(raycast_query.collider.gameObject.name);
		if(raycast_query.collider.gameObject != target_object) {
			
			return false;
		}
	}
	
	return true;
}