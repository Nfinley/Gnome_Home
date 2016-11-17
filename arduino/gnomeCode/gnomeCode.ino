/*
 *  This sketch sends data via HTTP GET requests to data.sparkfun.com service.
 *
 *  You need to get streamId and privateKey at data.sparkfun.com and paste them
 *  below. Or just customize this script to talk to other HTTP servers.
 *
 */

#include <ESP8266WiFi.h>

const int ledPin =  14; 
const char* ssid     = "NCC";  //local network
const char* password = "";
const char* host = "gnome-home.herokuapp.com"; //development server
const char* privateKey = "ZXC123";

int onOffStatus = 0;
int ledState = LOW;

void setup() {
  Serial.begin(9600);
  delay(10);

  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  // We start by connecting to a WiFi network
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP()); 
}

void loop() {
  delay(5000);

  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  const int httpPort = 80;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }
  
  // We now create a URI for the request
  String url = "/GnomeAPI/getGnomeStatus/";
    //url += "?serial_id=";
    url += privateKey;
    url += '/';
    
String PostData = "alive=true";
  client.println("POST /GnomeAPI/getGnomeStatus/QAZ123 HTTP/1.1");
  client.println("Host: gnome-home.herokuapp.com/");
  client.println("User-Agent: Arduino/1.0");
  client.println("Connection: close");
  client.println("Content-Type: application/x-www-form-urlencoded;");
  client.print("Content-Length: ");
  client.println(PostData.length());
  client.println();
  client.println(PostData);
  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 5000) {
      //Serial.println(">>> Client Timeout !");
      client.stop();
      return;
    }
  }
  String line;
  while(client.available()){
    line = client.readStringUntil('\r');
    line.trim();
    Serial.println(line);
  }
  client.stop();
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  
  delay(1000);

  
  // This will send the request to the server
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "User-Agent: test\r\n"+
               "Connection: close\r\n\r\n");
  //unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 5000) {
      //Serial.println(">>> Client Timeout !");
      client.stop();
      return;
    }
  }
  
   //String line;

  // Read all the lines of the reply from server and print them to Serial
  while(client.available()){
    line = client.readStringUntil('\r');
    line.trim();
    Serial.println(line);
  }

  if(line.equals("true")){
    onOffStatus = 1;
    ledState = HIGH;
  }
  else{
    onOffStatus = 0;
    ledState = LOW;
  }

  digitalWrite(ledPin, ledState);
  //Serial.println(host+url);
  
}

