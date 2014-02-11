﻿#pragma strict

private var ChatScripUrl= "http://127.0.0.1/chatscriptclient.php?";
private var userInput : String = "[Type/dictate your answer]";
private var consoleText : String;
private var scrollPosition : Vector2 = Vector2.zero;
private var showLog : boolean = false;

function Start () {

}

function OnGUI(){

	if (Event.current.type == EventType.KeyDown && (Event.current.keyCode == KeyCode.Return || Event.current.keyCode == KeyCode.Return)){
		consoleText = consoleText+"\n[You] said: "+userInput;
        postMessage(userInput);
        userInput = "";	
	}
	GUILayout.BeginArea(Rect (Screen.width *0.1, Screen.height *0.1, Screen.width *0.8, Screen.height *0.8));	
	
	GUILayout.BeginVertical();
			
		GUI.skin.box.wordWrap = true; // Set the wordwrap on for box only.
		GUI.skin.box.alignment = TextAnchor.LowerLeft; // Text alignment for boxes
		GUI.skin.label.alignment = TextAnchor.UpperCenter; // Text alignment
		
		if(showLog) // Manages log window elements
		{
			GUILayout.Label("Log", GUILayout.Width(250));
			
			scrollPosition = GUILayout.BeginScrollView(scrollPosition, GUILayout.Width(275));			
			GUILayout.Box(consoleText, GUILayout.Width(250)); // Just your message as parameter.			
			GUILayout.EndScrollView ();
						
		}
		
		GUILayout.FlexibleSpace();
		
		// Text box for user input
		userInput = GUILayout.TextField(userInput);
		
		// Horizontal field for "Log", "Reset" and "Rebuild" buttons
		GUILayout.BeginHorizontal();
		
			if(GUILayout.Button("Log"))
			{
				showLog = !showLog; // Toggles log visibility
			}
			if(GUILayout.Button("Reset"))
			{
				 postMessage(":reset");
			}
			if(GUILayout.Button("Rebuild")){
				postMessage(":build 1");
			}
			
		GUILayout.EndHorizontal();
		
	GUILayout.EndVertical();
	
	GUILayout.EndArea();



}

function Update () {
	
}

function postMessage(message:String){

    var msgURL = ChatScripUrl+"message="+WWW.EscapeURL(message);
    print(msgURL);
    var w = WWW(msgURL);
    yield w;	
    consoleText = consoleText+"\n[Snow White] said: "+w.text;
    scrollPosition.y = Mathf.Infinity;

}