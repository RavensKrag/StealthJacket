#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter(c : Collider) {
	// print("FINISH");
	var player = c.gameObject.GetComponent(PlayerScript);
	if(player != null) {
		player.Win();
	}
}