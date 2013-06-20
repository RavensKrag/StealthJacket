// Movement Variables:
private var jumpSpeed:float = 9.0; 
private var gravity:float = 20.0; 
var runSpeed:float = 6.0; 
var walkSpeed:float = 3; 
private var rotateSpeed:float = 150.0; 
private var grounded:boolean = false; 
private var moveDirection:Vector3 = Vector3.zero; 
private var isWalking:boolean = true; 
private var moveStatus:String = "idle"; 
private var xSpeed = 250.0; 
private var ySpeed = 120.0; 
private var yMinLimit = -40; 
private var yMaxLimit = 80; 
private var x = 0.0; 
private var y = 0.0; 

function Start ()
{

	animation.wrapMode = WrapMode.Loop;
	var punch = animation["punch"];
	var walk = animation["walk"];
	punch.wrapMode = WrapMode.Once;
	animation["punch"].layer = 9;
	
}

// -------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------- UPDATE ---------------------------------------
// -------------------------------------------------------------------------------------------------------------

function Update () {
   //
   // Only allow movement and jumps while -----------------  GROUNDED -------------
   if(grounded) { 
		moveDirection = new Vector3((Input.GetMouseButton(1) ? Input.GetAxis("Horizontal") : 0),0,Input.GetAxis("Vertical")); 
       
		// if moving forward and to the side at the same time, compensate for distance 
		// TODO: may be better way to do this? 
		if(Input.GetMouseButton(1) && Input.GetAxis("Horizontal") && Input.GetAxis("Vertical")) { 
			moveDirection *= .7; 
		} 
       
		moveDirection = transform.TransformDirection(moveDirection); 
		moveDirection *= isWalking ? walkSpeed : runSpeed; 
       
		moveStatus = "idle"; 
		if(moveDirection != Vector3.zero) {
			moveStatus = isWalking ? "walking" : "running"; 
			if (isWalking){
				// invoke WALK animation here
				animation.CrossFade("walk");
			} else {
				// call RUN animation here
				animation.CrossFade("run");
			}
		} else {
			// call IDLE animation here
			animation.CrossFade("idle");
		}
		if( Input.GetKey("t")) {	
			animation.CrossFadeQueued("punch", 0.1, QueueMode.PlayNow);
		}	 
		
	// Jump! 
		if(Input.GetButton("Jump")) 
		{
			// call JUMP animation here
			moveDirection.y = jumpSpeed; 
		}
    } 																	// END "IS GROUNDED"

	
	
	
	// Allow turning at anytime. Keep the character facing in the same direction as the Camera if the right mouse button is down. 
	if(Input.GetMouseButton(1)) { 
		transform.rotation = Quaternion.Euler(0,Camera.main.transform.eulerAngles.y,0); 
	} else { 
		transform.Rotate(0,Input.GetAxis("Horizontal") * rotateSpeed * Time.deltaTime, 0); 
	} 
    
	// Toggle walking/running with the left shift key 
	if(Input.GetKeyDown("left shift")) 
		isWalking = !isWalking; 
    	
	//Apply gravity 
	moveDirection.y -= gravity * Time.deltaTime; 
	//Move controller 
	var controller:CharacterController = GetComponent(CharacterController); 
	var flags = controller.Move(moveDirection * Time.deltaTime); 
	grounded = (flags & CollisionFlags.Below) != 0; 
	};
	static function ClampAngle (angle : float, min : float, max : float) { 
   if (angle < -360) 
      angle += 360; 
   if (angle > 360) 
      angle -= 360; 
   return Mathf.Clamp (angle, min, max); 
} 

// -------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------- END UPDATE  --------------------------------
// -------------------------------------------------------------------------------------------------------------

@script RequireComponent(CharacterController)