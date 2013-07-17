// May want to just poll the level and find the start zone
// would be better if there's only one start
	// or maybe you want to keep multi-start, because you want checkpoints?
	// though should probably refactor code for checkpoints
var level_start : StartZoneScript;

function Start () {
	WarpToStartZone();
}

function Update () {
	
}

function WarpToStartZone() {
	transform.position = level_start.transform.position;
}