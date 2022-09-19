# fineavoidanceSA2.0
Full-stack work-in-progress remake of the original fineavoidanceSA using contemporary web technologies. Displays the locations of mobile speed cameras in South Australia on a map and as a list, and also stores this information into a database for future analytical use. Only uses publicly available data. 

### Tech stack comprising of:
- Frontend: React
- Backend: Flask
- Database: Google Firebase - Cloud Firestore
- Package Manager: Yarn

### Current features:
- Google Map with markers of mobile speed cameras for selected date (using historical data stored in the database)
- View list of freshly scraped mobile speed cameras
- View list of historical data stored in the database 

### Planned:
- Driving mode with alerts
- Push Notifications if cameras are on a user's predefined route (e.g. daily drive from home to work)
- Static speed / red light cameras
- Statistics using historical data (e.g. frequency of different suburbs)

# How to Run

### `yarn start`
Starts the React frontend\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser

### `yarn start-api`
Starts the Flask backend\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser

# Configuration
Google Maps API key:
- `/.env`
- `api/.flaskenv`

Firecloud key.json:
- `/api/`
