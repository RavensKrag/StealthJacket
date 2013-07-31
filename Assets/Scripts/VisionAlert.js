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
	
	// Make sure to target the collision center, not the object's rotational center
	var offset = Vector3(
		target_object.collider.center.x / transform.localScale.x,
		target_object.collider.center.y / transform.localScale.y,
		target_object.collider.center.z / transform.localScale.z
	);
	var target_position : Vector3 = target_object.GetComponent(Transform).position + offset;
	
	// Get a bearing to the target
	var delta : Vector3 = target_position - transform.position;
	Debug.DrawRay(transform.position, delta, Color.green, 3);
	
	// Test all layers except for the following...
	var mask : LayerMask = LayerMask.NameToLayer("DetectionColliders");
	
	if(Physics.Raycast(transform.position, delta.normalized, raycast_query, 
						vision_distance, ~mask.value)
	){
		print("raycast ok");
		// Make sure that there is nothing in betwene the object trying to see, and the target
		print(raycast_query.collider.gameObject.name);
		if(raycast_query.collider.gameObject == target_object) {
			
			return true;
		}
	}
	
	return false;
}