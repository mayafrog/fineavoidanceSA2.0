# fineavoidanceSA2.0
Full-stack work-in-progress remake of the original fineavoidanceSA using contemporary web technologies. Displays the locations of mobile speed cameras in South Australia on a map and as a list, and also stores this information into a database for future analytical use. Only uses publicly available data. 

Tech stack comprising of:
- Frontend: React
- Backend: Flask
- Database: Google Firebase - Cloud Firestore
- Package Manager: Yarn

Current features:
- Google Map with markers of mobile speed cameras for today's date
- List of freshly scraped  mobile speed cameras currently on the SAPOL website
- Historical data can be viewed using API

Planned:
- Historical data and visualisations integrated into the site
- Alerts if cameras are on a user's predefined route (e.g. daily drive from home to work)

# How to Run

### `yarn start`
Runs the React frontend\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser

### `yarn start-api`
Runs the Flask backend\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser

# Configuration
Google Maps API key into:
- `/.env`
- `api/.flaskenv`

Firecloud key.json into:
- `/api/`
