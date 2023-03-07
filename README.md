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

### Planned features:
- Driving mode with alerts
- Push Notifications if cameras are on a user's predefined route (e.g. daily drive from home to work)
- Static speed / red light cameras
- Statistics using historical data (e.g. frequency in different streets / suburbs)

### Possible features:
- User accounts
- Give users ability to report cameras that are not listed
- Give users ability to upvote / downvote a camera (to show it was spotted at listed location, along with time spotted)
- Webscraping of forums / Facebook groups for the above functionality
- More statistics using crowdsourced data to show accuracy of listed cameras
- Analysis of data - potentially using AI / ML, to show trends (e.g. day of the week, month of the year, holidays, special events)

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
- `/api/.flaskenv`

Firecloud:
- `/api/key.json`
