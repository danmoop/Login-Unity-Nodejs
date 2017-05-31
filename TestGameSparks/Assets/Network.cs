using UnityEngine;
using System;
using System.Collections.Generic;
using SocketIO;
using UnityEngine.SceneManagement;

public class Network : MonoBehaviour {

	static SocketIOComponent socket;
	public UnityEngine.UI.InputField Field; //TextField for our password
	public GameObject Button; // Login button
	public string FieldText; //Text from our textfield

	void Start(){
		socket = GetComponent<SocketIOComponent>();
		Debug.Log("Connected");
		socket.On("login", onLogin); //Event from server-side
		socket.On("wrongPass", onWrongPass); //Event from server-side
	}

	void onLogin(SocketIOEvent e){
		SceneManager.LoadScene("AfterLogin"); // Open scene if password is right
	}

	void onWrongPass(SocketIOEvent e){
		Debug.Log("wrong pass"); // We got a message in Unity Console
	}

	void Update(){
	}

	public void OnBtnLoginClick(){
		FieldText = Field.text; // Assign text to our variable
		socket.Emit("loginRequest", new JSONObject(FieldText)); 
		// Send our text and check if it's right (Exactly in JSON)
		// Exactly in JSON, because server checks only JSON
	}
}
