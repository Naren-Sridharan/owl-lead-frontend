import owl_lead from "../assets/images/owl_lead.png";
import location from "../assets/images/location.png";
import intro from "../assets/images/intro.png";
import home from "../assets/images/home.png";
import anyone_around from "../assets/images/anyone_around.png";
import pso_finder from "../assets/images/pso_finder.png";
import emergency from "../assets/images/emergency.png";
import emergency_call from "../assets/images/emergency_call.png";
import emergency_contact from "../assets/images/emergency_contact.png";
import delete_contact from "../assets/images/delete_contact.png";
import add_contact from "../assets/images/add_contact.png";
import sos from "../assets/images/sos.png";
import close from "../assets/images/close.png";

// load once and use images everywhere
export const IMAGES = {
	owl_lead: owl_lead,
	location: location,
	intro: intro,
	home: home,
	anyone_around: anyone_around,
	pso_finder: pso_finder,
	emergency: emergency,
	emergency_call: emergency_call,
	emergency_contact: emergency_contact,
	delete_contact: delete_contact,
	add_contact: add_contact,
	sos: sos,
	close: close,
};

// set server address
export const server_address = "https://owl-lead-backend.herokuapp.com/";

// set distance server address
export const distance_server_address =
	"https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial";

// set directions server address
export const directions_server_address =
	"https://www.google.com/maps/dir/?api=1";

// API Key for google maps
export const API_KEY = "AIzaSyCy_gaMIh9ugIJqylorjU0cJkqtlayk1qA";

// Theme Colors
export const COLORS = {
	dark: "#2d327a",
	light: "#f6eea9",
	highlight: "#bdf772",
	levels: {
		LOW: "lightblue",
		MODERATE: "yellow",
		HIGH: "green",
	},
	intro: "#6d42c2",
};

// Emergency Number
export const EMERGENCY_NUMBER = "000";

// Task name for fetching Pedestrian Counts
export const FETCH_PEDESTRIAN_COUNTS = "FETCH_PEDESTRIAN_COUNTS";

//actual password
export const actual_password = "teamMA26";
