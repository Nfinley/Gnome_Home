####Gnome @ Home

###FRONT END
User Journey: 

1. Go to home page (single page)
	-Since it is a product page (need to show what the product is see (hue and nest pages))
	- Single page that has about (the company, who we are, why we chose this)
	- purchase section (null for now)
	-login icon
	- demo page (this is how it works)



2. User Logins in
	- Authentication (Auth0)
	-Store data in the database (sequelize)
	-Handle the error (password reset, forgotten user password)
	
3. Once the user logins: 
	-Display the dashboard
	-Have all the devices
	-Area to add the device
	-Can click on or off deach device

4. Device management (gear icon) (have on that is already connected)
	1. Add device
		-Add nickname
		-Go into device management
		-add serial number
		-give confirmation (talking to the device)
		- then a script runs to connect to database
		-if Fails "It cannot find device"

PAGE DESIGN: 
-Something clean and similar to Nest website

####Backend: 

1. Databases
  1. Users - username, password, reference to device (one to many)
  2. Devices 
  3. Unconnected table - one to one; serial number to the physical device (it would be deleted of the unconnected to the device table)

The Device will query: 
	-Post: Am I an authorized device and it will take the command (on/off)
	-Get: Listening for status change



